package main

import (
	"encoding/json"
	"fmt"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

func handler(req events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	api := req.QueryStringParameters["api"]

	basename, err := getBasename(api)
	if err != nil {
		return handleError(400, err)
	}

	endpoint, err := getEndpoint(api, req.QueryStringParameters)
	if err != nil {
		return handleError(400, err)
	}

	query := ""
	for k, v := range req.QueryStringParameters {
		if k == "api" || k == "endpoint" && api == "geo" {
			continue
		}
		query = fmt.Sprintf("%s&%s=%s", query, k, v)
	}

	uri := fmt.Sprintf("%s/%s?%s&appid=%s", basename, endpoint,
		query, os.Getenv("REACT_APP_APIKEY"))

	resp, err := http.Get(uri)
	if err != nil {
		return handleError(502, err)
	}

	strResp, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return handleError(500, err)
	}

	var parsResp map[string]any
	json.Unmarshal([]byte(strResp), &parsResp)

	return &events.APIGatewayProxyResponse{
		StatusCode: resp.StatusCode,
		Headers: map[string]string{
			"Content-Type":                "application/json",
			"Access-Control-Allow-Origin": "*",
		},
		Body: string(strResp),
	}, nil
}

func getBasename(api string) (basename string, err error) {
	switch api {
	case "weather", "forecast", "geo":
		basename = "https://api.openweathermap.org"
	case "flight":
		basename = "https://skyscanner44.p.rapidapi.com"
	default:
		return "", fmt.Errorf("Request with error api: %s, allowed apis: 'current', 'forecast', 'geo', 'flight'", api)
	}
	return basename, nil
}

func getEndpoint(api string, queryParams map[string]string) (endpoint string, err error) {
	switch api {
	case "weather":
		endpoint = "data/2.5/weather"
	case "forecast":
		endpoint = "data/2.5/forecast"
	case "geo":
		endpoint = fmt.Sprintf("geo/1.0/%s", queryParams["endpoint"])
	default:
		return "", fmt.Errorf("Request with error api: %s, allowed apis: 'current', 'forecast', 'geo', 'flight'", api)
	}
	return endpoint, nil
}

func handleError(code int, err error) (*events.APIGatewayProxyResponse, error) {
	log.Println(err.Error())
	return &events.APIGatewayProxyResponse{
		StatusCode: code,
		Headers: map[string]string{
			"Access-Control-Allow-Origin": "*",
		},
		Body: err.Error(),
	}, err
}

func main() {
	lambda.Start(handler)
}
