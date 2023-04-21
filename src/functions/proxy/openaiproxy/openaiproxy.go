package openaiproxy

import (
	//	"encoding/json"
	"context"
	"fmt"
	"github.com/aws/aws-lambda-go/events"
	openai "github.com/sashabaranov/go-openai"
	"log"
	"os"
	"strconv"
)

// Handler handles requests to OpenAI API
func Handler(queryParams map[string]string) (*events.APIGatewayProxyResponse, error) {
	c := openai.NewClient(os.Getenv("REACT_APP_OPENAI_API_KEY"))
	ctx := context.Background()

	model, ok := queryParams["model"]
	if !ok {
		return handleError(400,
			fmt.Errorf("Missing 'model' in query"))
	}

	maxTokensStr, ok := queryParams["max_tokens"]
	if !ok {
		return handleError(400,
			fmt.Errorf("Missing 'max_tokens' in query string"))
	}

	maxTokens, err := strconv.Atoi(maxTokensStr)
	if err != nil {
		return handleError(400,
			fmt.Errorf("'max_tokens' must be an integer, got %s instead",
				maxTokensStr))
	}

	prompt, ok := queryParams["prompt"]
	if !ok {
		return handleError(400,
			fmt.Errorf("Missing 'prompt' in query string"))
	}

	req := openai.CompletionRequest{
		Model:     model,
		MaxTokens: maxTokens,
		Prompt:    prompt,
	}

	for param, elem := range map[string]*float32{
		"temperature":       &req.Temperature,
		"top_p":             &req.TopP,
		"frequency_penalty": &req.FrequencyPenalty,
		"presence_penalty":  &req.PresencePenalty,
	} {
		valStr, ok := queryParams[param]
		if ok {
			val, err := strconv.ParseFloat(valStr, 32)
			if err != nil {
				return handleError(400, fmt.Errorf(
					"'%s' must be a float, got %s instead",
					param,
					valStr))
			}
			*elem = float32(val)
		}
	}

	resp, err := c.CreateCompletion(ctx, req)
	if err != nil {
		return handleError(500, err)
	}

	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers: map[string]string{
			"Content-Type":                "text/plain",
			"Access-Control-Allow-Origin": "*",
		},
		Body: string(resp.Choices[0].Text),
	}, nil
}

func handleError(code int, err error) (*events.APIGatewayProxyResponse, error) {
	log.Println(err.Error())
	return &events.APIGatewayProxyResponse{
		StatusCode: code,
		Headers: map[string]string{
			"Content-Type":                "text/plain",
			"Access-Control-Allow-Origin": "*",
		},
		Body: err.Error(),
	}, nil
}
