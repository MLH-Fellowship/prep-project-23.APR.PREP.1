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

func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	const basename = "https://api.openweathermap.org/data/2.5"
	var endpoint string

	switch kind := request.QueryStringParameters["kind"]; kind {
	case "weather":
		endpoint = "weather"
	case "forecast":
		endpoint = "forecast"
	default:
		return handleError(400, fmt.Errorf(
			"Request with error kind: %s, allowed kinds: 'current', 'forecast'",
			kind))
	}

	uri := fmt.Sprintf(
		"%s/%s?q=%s&units=metric&appid=%s", basename, endpoint,
		request.QueryStringParameters["q"],
		os.Getenv("REACT_APP_APIKEY"))

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
