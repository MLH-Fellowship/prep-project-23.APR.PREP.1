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

	query := buildQueryStr(api, req.QueryStringParameters)

	proxiedReq, err := buildRequest(api, basename, endpoint, query)
	if err != nil {
		return handleError(400, err)
	}
	client := http.Client{}
	resp, err := client.Do(proxiedReq)
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
	case "weather", "forecast", "geo", "air_pollution":
		return "https://api.openweathermap.org", nil
	case "flight":
		return "https://skyscanner44.p.rapidapi.com", nil
	case "maps":
		return "https://maps.googleapis.com", nil
	default:
		return "", fmt.Errorf("Request with error api: %s, allowed apis: 'current', 'forecast', 'geo', 'air_pollution', 'flight', 'maps'", api)
	}
	return basename, nil
}

func getEndpoint(api string, queryParams map[string]string) (endpoint string, err error) {
	switch api {
	case "weather":
		return "data/2.5/weather", nil
	case "forecast":
		return "data/2.5/forecast", nil
	case "geo":
		return fmt.Sprintf("geo/1.0/%s", queryParams["endpoint"]), nil
	case "air_pollution":
		return "data/2.5/air_pollution", nil
	case "flight":
		return "fly-to-country", nil
	case "maps":
		return "maps/api/geocode/json", nil
	default:
		return "", fmt.Errorf("Request with error api: %s, allowed apis: 'current', 'forecast', 'geo', 'air_pollution', 'flight', 'maps'", api)
	}
}

func buildQueryStr(api string, queryParams map[string]string) (query string) {
	for k, v := range queryParams {
		if k == "api" || k == "endpoint" && api == "geo" {
			continue
		}
		query = fmt.Sprintf("%s&%s=%s", query, k, v)
	}
	return query[1:] // remove initial ’&’
}

func buildRequest(api, basename, endpoint, query string) (req *http.Request, err error) {
	switch api {
	case "weather", "forecast", "geo", "air_pollution":
		uri := fmt.Sprintf("%s/%s?%s&appid=%s", basename, endpoint,
			query, os.Getenv("REACT_APP_APIKEY"))
		req, err := http.NewRequest("GET", uri, nil)
		return req, err
	case "flight":
		uri := fmt.Sprintf("%s/%s?%s", basename, endpoint,
			query)
		req, err := http.NewRequest("GET", uri, nil)
		if err != nil {
			return req, err
		}
		req.Header = http.Header{
			"X-RapidAPI-Key": []string{
				os.Getenv("REACT_APP_SKYSCANNER_API_KEY"),
			},
			"X-RapidAPI-Host": []string{
				"skyscanner44.p.rapidapi.com",
			},
		}
		return req, nil
	case "maps":
		uri := fmt.Sprintf("%s/%s?%s&key=%s", basename, endpoint,
			query, os.Getenv("REACT_APP_GMAPS"))
		req, err := http.NewRequest("GET", uri, nil)
		return req, err
	default:
		return nil, fmt.Errorf("Request with error api: %s, allowed apis: 'current', 'forecast', 'geo', 'flight'", api)
	}
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
