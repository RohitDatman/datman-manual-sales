{
	"info": {
		"_postman_id": "f2802e6d-c0c5-4747-944d-18e143c3359e",
		"name": "qa_auth_addition",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "20291388"
	},
	"item": [
		{
			"name": "Cardstream Copy",
			"item": [
				{
					"name": "Wallet APIs",
					"item": [
						{
							"name": "Wallet recharge",
							"item": [
								{
									"name": "api_token scenarios",
									"item": [
										{
											"name": "TC001 - Valid api_token",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC001 processed as the api token is valid\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": \"{{cardstream_test_cvv}}\",\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC002 - Invalid api_token",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC002 passed - Request not processed as the api_token is invalid\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Token is empty or Invalid token\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{invalid_api_token}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										}
									],
									"event": [
										{
											"listen": "prerequest",
											"script": {
												"type": "text/javascript",
												"exec": [
													"pm.collectionVariables.set(\"invalid_api_token\", \"invalidapitoken\");"
												]
											}
										},
										{
											"listen": "test",
											"script": {
												"type": "text/javascript",
												"exec": [
													""
												]
											}
										}
									]
								},
								{
									"name": "shopper_id scenarios",
									"item": [
										{
											"name": "TC003 - Valid ShopperId",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC003 Passed - Request got processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC004 - Invalid ShopperId - empty",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC004 Passed- empty shopper id is not allowed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": \"\",\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC005 - Invalid ShopperId - special characters",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([500])",
															"})",
															"",
															"if(pm.response.code==500)",
															"{",
															"pm.test(\"TC005 Passed: Request is not processed\", function () {",
															" ;",
															"});",
															"    ",
															"}"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": \"!@#$%^&*()-_=+~:;\",\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC006 - Invalid ShopperId - alphabets",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([500])",
															"})",
															"",
															"if(pm.response.code==500)",
															"{",
															"pm.test(\"TC007 Passed: Request is not processed\", function () {",
															" ;",
															"});",
															"    ",
															"}"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": \"abcdefgh\",\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										}
									],
									"event": [
										{
											"listen": "prerequest",
											"script": {
												"type": "text/javascript",
												"exec": [
													"pm.collectionVariables.set(\"invalid_shopper_id\", \"5775675757\");",
													""
												]
											}
										},
										{
											"listen": "test",
											"script": {
												"type": "text/javascript",
												"exec": [
													""
												]
											}
										}
									]
								},
								{
									"name": "merchantTokenId scenarios",
									"item": [
										{
											"name": "TC007 - Invalid merchantTokenId - empty",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC008 Passed - Request not processed as merchantTokenId is empty\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"failed\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC008 - Invalid merchantTokenId - special characters",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC009 Passed - Request not processed as merchantTokenId is invalid\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"failed\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \" !@#$%^&*()-_=+~:;,<\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC009 - Valid merchantTokenId - master token",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC010 Passed - request is processed \", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC009a - Invalid merchantTokenId - master token invalid",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC09a Passed - request is processed \", function () {",
															"    pm.expect(pm.response.text()).to.include(\"failed\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"mxtoken_462e5cf60dbed6fd698e69d8fc1860c397878789\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC010 - Valid merchantTokenId - eg direct token",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC010 Passed - request processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"egtoken_20122407DK25ZH41PZ93BJJ\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC010a - Invalid merchantTokenId - eg direct token invalid",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC010a Passed - request processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"failed\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"egtoken_20122407DK25ZH41PZ93BJJ89335345\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC011a - Invalid merchantTokenId - optomany direct token invalid",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC011a Passed - request processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"failed\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"zPd88hZaItJp/EmQwN4v1CNDeY+adU0/eugRgg5/b2EfMQ==65464566\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										}
									]
								},
								{
									"name": "amount scenarios",
									"item": [
										{
											"name": "TC012 - Valid amount - cent values",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC013 passed - cent value is not accepted\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Card Declined\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": {{cent_amount}},\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC014 - Invalid amount - empty",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC015 passed - empty amount is not accepted\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC015 - Invalid amount - special characters",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC016 Passed - Special characters as amount is not allowed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Invalid amount\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \" !@#$%^&*()-_=+~\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC016 - Invalid amount - alphabets",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC017 Passed - alphabets as amount is not allowed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Invalid amount\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"abcdefgh\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC017 - Invalid amount - more than allowed amount value",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC018 Passed - amount is exceeded and the request is not processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Card Declined\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": {{exceeded_amount}},\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC018 - Invalid amount - amount value as 0",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC019 Passed - amount value as 0.00 is not allowed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": {{0_amount}},\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC019 - Invalid amount - invalid decimal value",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC020 Passed - invalid decimal values are not allowed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Card Declined\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": {{invalid decimal_amount}},\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										}
									],
									"event": [
										{
											"listen": "prerequest",
											"script": {
												"type": "text/javascript",
												"exec": [
													"pm.collectionVariables.set (\"cent_amount\", \"0.01\");",
													"",
													"pm.collectionVariables.set (\"special_characters_amount\", \" !@#$%^&*()-_=+~:;[{]}\\|/?.>,<\");",
													"",
													"pm.collectionVariables.set (\"exceeded_amount\", \"10000.00\");",
													"",
													"pm.collectionVariables.set (\"0_amount\", \"0.00\");",
													"",
													"pm.collectionVariables.set (\"invalid decimal_amount\", \"1.589686\");",
													"",
													"pm.collectionVariables.set (\"alphabets_amount\", \"abcdef\");",
													"",
													"pm.collectionVariables.set (\"large_amount\", _.random(50, true).toFixed(2));",
													"",
													"",
													""
												]
											}
										},
										{
											"listen": "test",
											"script": {
												"type": "text/javascript",
												"exec": [
													""
												]
											}
										}
									]
								},
								{
									"name": "order_id scenarios",
									"item": [
										{
											"name": "TC021 - Valid order_id",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC021 Passed - request is processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															"pm.collectionVariables.set(\"valid_order_id\", _.random (100000,2000000));"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{valid_order_id}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC022 - Repeated order_id",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"// if(pm.response.code==200)",
															"// {",
															"// pm.test(\"TC022 Passed - request is processed\", function () {",
															"//     pm.expect(pm.response.text()).to.include(\"success\");",
															"// });",
															"    ",
															"// }",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{valid_order_id}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC023 - Invalid order_id - empty",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC023 Passed - empty order id is not allowed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": \"\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										}
									],
									"event": [
										{
											"listen": "prerequest",
											"script": {
												"type": "text/javascript",
												"exec": [
													"pm.collectionVariables.set(\"invalid_order_id\", \"0\");",
													"",
													"",
													"",
													""
												]
											}
										},
										{
											"listen": "test",
											"script": {
												"type": "text/javascript",
												"exec": [
													""
												]
											}
										}
									]
								},
								{
									"name": "first_name scenarios",
									"item": [
										{
											"name": "TC027 - Valid first_name",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC027 Passed - request processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC028 - Invalid first_name - empty",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC028 Passed - empty first name is not allowed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC029 - first_name - special characters",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC029 Passed - Request processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"!@#$%^&*()-_=+\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC030 - Valid first_name - long character",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC030 Passed - request is processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"Pseudopseudohypoparathyroidism Pseudopseudohypoparathyroidism Pseudopseudohypoparathyroidism\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC031 - Valid first_name - numbers",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC031 Passed - request processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": {{numbers_first_name}},\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										}
									],
									"event": [
										{
											"listen": "prerequest",
											"script": {
												"type": "text/javascript",
												"exec": [
													"pm.collectionVariables.set(\"numbers_first_name\", \"1234567890\"); "
												]
											}
										},
										{
											"listen": "test",
											"script": {
												"type": "text/javascript",
												"exec": [
													""
												]
											}
										}
									]
								},
								{
									"name": "last_name scenarios",
									"item": [
										{
											"name": "TC032 - Valid last_name",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC032 Passed - request processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC033 - Valid last_name - numbers",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC033 Passed - request processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": {{numbers_last_name}},\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC034 - last_name - special characters",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC034 Passed - request processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"!@#$%^&*()-_=+\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC035 - Valid last_name - long character",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC035 Passed - request processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Pseudopseudohypoparathyroidism Pseudopseudohypoparathyroidism Pseudopseudohypoparathyroidism\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC036 - Invalid last_name - empty",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC036 Passed - empty last name is not allowed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										}
									],
									"event": [
										{
											"listen": "prerequest",
											"script": {
												"type": "text/javascript",
												"exec": [
													"pm.collectionVariables.set(\"numbers_last_name\", \"1234567890\"); "
												]
											}
										},
										{
											"listen": "test",
											"script": {
												"type": "text/javascript",
												"exec": [
													""
												]
											}
										}
									]
								},
								{
									"name": "sending scenarios",
									"item": [
										{
											"name": "TC037 - Valid sending - to",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC037 Passed - request processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC041 - sending - empty",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC041 Passed - empty Sending is not allowed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										}
									],
									"event": [
										{
											"listen": "prerequest",
											"script": {
												"type": "text/javascript",
												"exec": [
													"pm.collectionVariables.set(\"numbers_sending\", \"1234567890\"); ",
													"",
													"",
													""
												]
											}
										},
										{
											"listen": "test",
											"script": {
												"type": "text/javascript",
												"exec": [
													""
												]
											}
										}
									]
								},
								{
									"name": "address scenarios",
									"item": [
										{
											"name": "house_number",
											"item": [
												{
													"name": "TC042 - Valid house_number",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC042 Passed - request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC043 - house_number - empty",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC043 Passed - request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC044 - house_number - alphabets",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC044 Passed - request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"abcdef\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC045 - house_number - large characters",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC045 Passed - request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": {{large_characters_house_number}},\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC046 - house_number - special charcters",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC046 Passed - request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"!@#$%^&*()-_=+~:;\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												}
											]
										},
										{
											"name": "flat",
											"item": [
												{
													"name": "TC047 - Valid flat",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC047 Passed - request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC048 - flat - empty",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC048 Passed - request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC049 - flat -alphabets",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC049 Passed - request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"abcdef\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC050 - flat -large characters",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC050 Passed - request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": {{large_characters_flat}},\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC051 - flat - special characters",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC051 Passed - request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"!@#$%^&*()-_=+~:;\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												}
											]
										},
										{
											"name": "address1",
											"item": [
												{
													"name": "TC052 - Valid address1",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC052 Passed - request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"address\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC053 - Address1 - large characters",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC053 Passed - request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": {{large_characters_address1}},\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC054 - Address1 - special characters",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC054 Passed - request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"!@#$%^&*()-_=+~:;\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC055 - Address1 - alphabets",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC055 Passed - request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"abcdefgh\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC056 - Address1 - empty",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC056 Passed - request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												}
											]
										},
										{
											"name": "address2",
											"item": [
												{
													"name": "TC057 - Valid address2",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC057 Passed - request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC058 - Address2 - large characters",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC058 Passed - request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": {{large_characters_address2}},\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC059 - Address2 - special characters",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC059 Passed - request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"!@#$%^&*()-_=+~:;\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC060 - Address2 - empty",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC060 Passed - request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC061 - Address2 - alphabets",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC061 Passed - request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"abcdefgh\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												}
											]
										},
										{
											"name": "postcode",
											"item": [
												{
													"name": "TC062 - Valid postcode",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC062 Passed - request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC063 - Postcode - large characters",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC063 Passed - request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": {{large_characters_postcode}}\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC064 - Postcode - special characters",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC064 Passed - request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"!@#$%^&*()-_=+~:;\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC065 - Postcode - alphabets",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC065 Passed - request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"abcdef\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC066 - Postcode - empty",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC066 Passed - request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												}
											]
										}
									],
									"event": [
										{
											"listen": "prerequest",
											"script": {
												"type": "text/javascript",
												"exec": [
													"pm.collectionVariables.set(\"large_characters_house_number\", \"12345678901234567890\"); ",
													"",
													"",
													"pm.collectionVariables.set(\"large_characters_flat\", \"12345678901234567890\"); ",
													"",
													"",
													"pm.collectionVariables.set(\"large_characters_address1\", \"12345678901234567890\"); ",
													"",
													"",
													"pm.collectionVariables.set(\"large_characters_address2\", \"12345678901234567890\"); ",
													"",
													"",
													"pm.collectionVariables.set(\"large_characters_postcode\", \"12345678901234567890\"); "
												]
											}
										},
										{
											"listen": "test",
											"script": {
												"type": "text/javascript",
												"exec": [
													""
												]
											}
										}
									]
								},
								{
									"name": "avs scenarios",
									"item": [
										{
											"name": "house_number",
											"item": [
												{
													"name": "TC067 - Valid house_number",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC067 Passed - request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC068 -  house_number - alphabets",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC068 Passed - request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"abcdef\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC069 - house_number - special charcters",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC069 Passed - request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"!@#$%^&*()-_=+~:;\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC070 - house_number - large characters",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC070 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"12345678900123\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC071 - Invalid house_number - empty",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC071 Passed - empty house_number is not allowed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"failed\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												}
											]
										},
										{
											"name": "postcode",
											"item": [
												{
													"name": "TC072 - Valid postcode",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC072 Passed - request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC075 - Invalid postcode - empty",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC075 Passed - empty postcode is not allowed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"failed\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												}
											]
										}
									]
								},
								{
									"name": "AddressOnFile scenarios",
									"item": [
										{
											"name": "AvsHouseNumber",
											"item": [
												{
													"name": "TC077 - Valid AvsHouseNumber",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC077 Passed - request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC078 - Invalid AvsHouseNumber - special characters",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC078 Passed - request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC079 - Invalid AvsHouseNumber - large characters",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC079 Passed - request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC080 - Invalid AvsHouseNumber - empty",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC080 Passed - request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC081 - Invalid AvsHouseNumber - alphabets",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC081 Passed - request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												}
											]
										},
										{
											"name": "AvsPostcode",
											"item": [
												{
													"name": "TC082 - Valid AvsPostcode",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC082 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"    ",
																	"}",
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_rechargeV2"
																}
															]
														}
													},
													"response": []
												}
											]
										}
									]
								},
								{
									"name": "cvv scenarios",
									"item": [
										{
											"name": "TC087 - Valid cvv",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC087 Passed - request processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC088 - Invalid cvv - alphabets",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC088 Passed - CVV is required for order value greater than 1\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Verification required: Order value is greater than or equal to max value (1)\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": \"abcdef\",\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC089 - Invalid cvv - large characters",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC089 Passed - Invalid CVV is not allowed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Card Declined\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": \"123456789012345\",\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC090 - Invalid cvv - special characters",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC090 Passed - CVV is required for order value greater than 1\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Verification required: Order value is greater than or equal to max value (1)\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": \"!@#$%^&*()-_=+~:\",\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC091 - Invalid cvv - empty",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC091 Passed - CVV is required for order value greater than 1\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Verification required: Order value is greater than or equal to max value (1)\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": \"\",\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC092 - Invalid cvv for the card used",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC092 Passed - invalid CVV is not allowed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Card Declined\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": \"111\",\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										}
									]
								},
								{
									"name": "email scenarios",
									"item": [
										{
											"name": "TC093 - Valid email",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC093 Passed - request passed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC094 - Invalid email - alphabets",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC094 Passed - alphabets as email is not allowed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Card Declined\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"merchant_id\": \"{{cardstream_test_merchant_id}}\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"abcdef\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC095 - Invalid email - special characters",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC095 Passed - email is invalid\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"failed\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"@#$%^&*()-_=+~:;\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC096 - Invalid email - large characters",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC096 Passed - long character is not allowed as email\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Card Declined\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"Pseudopseudohypoparathyroidism@Pseudopseudohypoparathyroidism.Pseudopseudohypoparathyroidism\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC097 - Invalid email - empty",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC097 Passed - empty email is not allowed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"failed\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC098 - Invalid email - numbers",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC098 Passed - email is invalid \", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Card Declined\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"12345\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC099 - Invalid email - missing @",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC099 Passed - email is invalid\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Card Declined\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"omnipay.com\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC100 - Invalid email - missing domain",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC100 Passed - email is invalid\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Card Declined\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"omnipayuser@gmail\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC101 - Valid email - email with alias",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC101 Passed - request processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"omnipayuser+qa@gmail.com\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										}
									]
								}
							]
						},
						{
							"name": "Wallet Balance",
							"item": [
								{
									"name": "TC001 - Wallet balance update",
									"item": [
										{
											"name": "Wallet - Balance before recharge",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"Balance is visible\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"balance\");",
															"",
															"var jsonData = JSON.parse(responseBody);",
															"pm.collectionVariables.set(\"walletBalance1\", jsonData.balance);",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n\t\"shopper_id\" : {{test_shopper_id}}\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_balance",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_balance"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "Wallet recharge",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"Wallet recharge is completed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC001 - Wallet - Balance after recharge",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"Balance is visible\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"balance\");",
															"})",
															"",
															"    ",
															"var jsonData = JSON.parse(responseBody);",
															"pm.collectionVariables.set(\"walletBalance2\", jsonData.balance);",
															"walletBalance2 = jsonData.balance;",
															"pm.collectionVariables.get(\"walletBalance1\");",
															"walletBalance1 = pm.variables.replaceIn('{{walletBalance1}}');",
															"",
															"pm.test(\"TC001 Passed - Wallet balance has been updated\", function () {",
															"    pm.expect(walletBalance2).to.not.equal(walletBalance1);",
															"    var recharge = (walletBalance2 - walletBalance1).toFixed(2);",
															"    pm.test(\"Recharge amount is added to the balance\", function ()",
															"    {",
															"        pm.expect(recharge).to.equal(pm.variables.replaceIn('{{cardstream_test_t2sapi_amount}}'));",
															"        console.log(\"Wallet value is updated by\",recharge)",
															"    })",
															"    ",
															"",
															"});",
															";",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n\t\"shopper_id\" : {{test_shopper_id}}\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_balance",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_balance"
														}
													]
												}
											},
											"response": []
										}
									]
								},
								{
									"name": "shopper_id scenarios",
									"item": [
										{
											"name": "TC002 - Wallet balance - Valid shopper_id",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC002 Passed - Balance is visible\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"balance\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n\t\"shopper_id\" : {{test_shopper_id}}\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_balance",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_balance"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC003 - Wallet balance - Invalid shopper_id - nonexistent shopper_id",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC003 Passed - Balance is not found for non-existent shopper_id\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"0.00\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n\t\"shopper_id\" : \"000000000000\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_balance",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_balance"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC004 - Wallet balance - Invalid shopper_id - special characters",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([500])",
															"})",
															"",
															"if(pm.response.code==500)",
															"{",
															"pm.test(\"TC004 Passed: Request is not processed\", function () {",
															" ;",
															"});",
															"    ",
															"}"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n\t\"shopper_id\" : \" !@#$%^&*()-_=+~:;\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_balance",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_balance"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC005 - Wallet balance - Invalid shopper_id - alphabets",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([500])",
															"})",
															"",
															"if(pm.response.code==500)",
															"{",
															"pm.test(\"TC005 Passed: Request is not processed\", function () {",
															" ;",
															"});",
															"    ",
															"}"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n\t\"shopper_id\" : \" !@#$%^&*()-_=+~:;\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_balance",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_balance"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC006 - Wallet balance - Invalid shopper_id - empty",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC006 Passed- empty shopper id is not allowed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n\t\"shopper_id\" : \"\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_balance",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_balance"
														}
													]
												}
											},
											"response": []
										}
									]
								},
								{
									"name": "api_token scenarios",
									"item": [
										{
											"name": "TC007 - Wallet balance - valid api_token",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC007 Passed - Balance is visible\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"balance\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n\t\"shopper_id\" : {{test_shopper_id}}\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_balance",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_balance"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC008 - Wallet balance - invalid api_token Copy",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC008 Passed - API token is invalid\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Token is empty or Invalid token\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{invalid_api_token}}"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n\t\"shopper_id\" : {{test_shopper_id}}\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_balance",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_balance"
														}
													]
												}
											},
											"response": []
										}
									]
								}
							]
						},
						{
							"name": "Wallet history",
							"item": [
								{
									"name": "api_token scenarios",
									"item": [
										{
											"name": "TC001 - Valid api_token",
											"event": [
												{
													"listen": "test",
													"script": {
														"type": "text/javascript",
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"Wallet history is visible\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"    ",
															"}"
														]
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n\t\"shopper_id\" : {{test_shopper_id}},\n\t\"page\": 1\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_history",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_history"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC002 - Invalid api_token",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC002 Passed - request is not processed as the api token is invalid\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Token is empty or Invalid token\");",
															"});",
															"    ",
															"}"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{invalid_api_token}}"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n\t\"shopper_id\" : {{test_shopper_id}},\n\t\"page\": 1\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_history",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_history"
														}
													]
												}
											},
											"response": []
										}
									]
								},
								{
									"name": "shopper_id scenarios",
									"item": [
										{
											"name": "TC003 - Wallet history - Valid shopper_id",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC003 Passed - Wallet history is visible\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"balance\");",
															"});",
															"    ",
															"}"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n\t\"shopper_id\" : {{test_shopper_id}},\n\t\"page\": 1\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_history",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_history"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC004 - Wallet history - Invalid shopper_id - empty",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC004 Passed - empty shopper_id is not allowed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
															"});",
															"    ",
															"}"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n\t\"shopper_id\" : \"\",\n\t\"page\": 1\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_history",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_history"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC005 - Wallet history - Invalid shopper_id - alphabets",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([500])",
															"})",
															"",
															"if(pm.response.code==500)",
															"{",
															"pm.test(\"TC005 Passed: Request is not processed\", function () {",
															" ;",
															"});",
															"    ",
															"}"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n\t\"shopper_id\" : \"abcdefgh\",\n\t\"page\": 1\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_history",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_history"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC006 - Wallet history - Invalid shopper_id - special characters",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([500])",
															"})",
															"",
															"if(pm.response.code==500)",
															"{",
															"pm.test(\"TC006 Passed: Request is not processed\", function () {",
															" ;",
															"});",
															"    ",
															"}"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n\t\"shopper_id\" : \"!@#$%^&*()-_=+~:;\",\n\t\"page\": 1\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_history",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_history"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC007 - Wallet history - Invalid shopper_id - non-existent shopper_id",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC007 Passed - balance history is not found\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"0.00\");",
															"});",
															"    ",
															"}"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n\t\"shopper_id\" : \"000000000000\",\n\t\"page\": 1\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_history",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_history"
														}
													]
												}
											},
											"response": []
										}
									]
								},
								{
									"name": "page scenarios",
									"item": [
										{
											"name": "TC008 - first_page",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC008 Passed - First page of Wallet history is visible\", function () {",
															"    var jsonData = JSON.parse(responseBody);",
															"    pm.collectionVariables.set(\"walletHistoryPage\", jsonData.current_page);",
															"    walletHistoryPage = jsonData.current_page;",
															"    pm.expect(walletHistoryPage).to.equal(\"1\");",
															"});",
															"    ",
															"}"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n\t\"shopper_id\" : {{test_shopper_id}},\n\t\"page\": 1\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_history",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_history"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC009 - second_page",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC009 Passed - Second page of Wallet history is visible\", function () {",
															"    var jsonData = JSON.parse(responseBody);",
															"    pm.collectionVariables.set(\"walletHistoryPage\", jsonData.current_page);",
															"    walletHistoryPage = jsonData.current_page;",
															"    pm.expect(walletHistoryPage).to.equal(\"2\");",
															"});",
															"    ",
															"}"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n\t\"shopper_id\" : {{test_shopper_id}},\n\t\"page\": 2\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_history",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_history"
														}
													]
												}
											},
											"response": []
										}
									]
								},
								{
									"name": "Wallet history - update",
									"item": [
										{
											"name": "Wallet history before recharge",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"Wallet history is visible\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"",
															"    var jsonData = JSON.parse(responseBody);",
															"pm.collectionVariables.set(\"walletHistoryBalance1\", jsonData.balance);",
															"});",
															"    ",
															"}"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n\t\"shopper_id\" : {{test_shopper_id}},\n\t\"page\": 1\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_history",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_history"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "Wallet recharge",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_rechargeV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC010 - Wallet - history after recharge",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"History is visible\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"balance\");",
															"})",
															"",
															"    ",
															"var jsonData = JSON.parse(responseBody);",
															"pm.collectionVariables.set(\"walletHistoryBalance2\", jsonData.balance);",
															"walletHistoryBalance2 = jsonData.balance;",
															"pm.collectionVariables.get(\"walletHistoryBalance1\");",
															"walletHistoryBalance1 = pm.variables.replaceIn('{{walletHistoryBalance1}}');",
															"",
															"pm.test(\"TC010 Passed - Wallet history has been updated\", function () {",
															"    pm.expect(walletHistoryBalance2).to.not.equal(walletHistoryBalance1);",
															"    var recharge = (walletHistoryBalance2 - walletHistoryBalance1).toFixed(2);",
															"    pm.test(\"Recharge amount is added to the balance\", function ()",
															"    {",
															"        pm.expect(recharge).to.equal(pm.variables.replaceIn('{{cardstream_test_t2sapi_amount}}'));",
															"        console.log(\"Wallet history balance is updated by\",recharge)",
															"",
															"    console.log(walletHistoryBalance1,walletHistoryBalance2,recharge);",
															"    })",
															"    ",
															"",
															"});",
															";",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n\t\"shopper_id\" : {{test_shopper_id}},\n\t\"page\": 1\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_history",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_history"
														}
													]
												}
											},
											"response": []
										}
									]
								}
							]
						},
						{
							"name": "Wallet partial recharge and payment",
							"item": [
								{
									"name": "Wallet recharge",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"Wallet recharge is completed\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"success\");",
													"});",
													"",
													"}",
													""
												],
												"type": "text/javascript"
											}
										},
										{
											"listen": "prerequest",
											"script": {
												"exec": [
													"pm.collectionVariables.set (\"partial_payment_orderid\", _.random (100000,2000000));",
													"",
													"pm.collectionVariables.set (\"partial_payment_amount\", \"5.55\");"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"shopper_id\": {{test_shopper_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": {{partial_payment_amount}},\n  \"order_id\": {{partial_payment_orderid}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"11\",\n    \"address1\": \"10\",\n    \"address2\": \"11\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"11, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    {\n      \"AvsHouseNumber\": \"11, 10\",\n      \"AvsPostcode\": \"{{cardstream_test_postcode}}\"\n    }\n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=wallet_rechargeV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "wallet_rechargeV2"
												}
											]
										}
									},
									"response": []
								},
								{
									"name": "TC001 - Partial Wallet recharge and payment",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC001 Passed - Wallet payment is done with same order id and amount from recharge\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"success\");",
													"    ",
													"}",
													");",
													"}",
													""
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Content-Type",
												"value": "application/json"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{partial_payment_orderid}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": {{partial_payment_amount}},\n  \"host\": \"kosheffieldonline.co.uk\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "wallet_payment"
												}
											]
										}
									},
									"response": []
								}
							]
						},
						{
							"name": "Wallet Payment",
							"item": [
								{
									"name": "api_token scenarios",
									"item": [
										{
											"name": "TC001 - Wallet payment - valid api_token",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC001 Passed - Wallet payment is completed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"    ",
															"}"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC002 - Wallet payment - invalid api_token",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC002 Passed - Invalid api_token is not allowed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Token is empty or Invalid token\");",
															"});",
															"    ",
															"}"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{invalid_api_token}}"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										}
									]
								},
								{
									"name": "order_id scenarios",
									"item": [
										{
											"name": "TC003 - Wallet payment - Valid order_id",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC003 Passed - Wallet payment is completed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"var jsonData = JSON.parse(responseBody);",
															"pm.collectionVariables.set(\"paymentid1\", jsonData.payment_id);",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															"pm.collectionVariables.set(\"valid_order_id1\", _.random (100000,2000000));"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{valid_order_id1}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC004 - Wallet payment - invalid order_id - empty",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC004 Passed - empty order id is not allowed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
															"});",
															"    ",
															"}"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": \"\",\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"kosheffieldonline.co.uk\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC005 - Wallet payment - invalid order_id - alphabets",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC005 Passed - request processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"    ",
															"}"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": \"abcdefgh\",\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC007 - Wallet payment - repeated order_id",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"Wallet payment is completed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"var jsonData = JSON.parse(responseBody);",
															"pm.collectionVariables.set(\"paymentid2\", jsonData.payment_id);",
															"payment_id2 = jsonData.payment_id;",
															"pm.collectionVariables.get(\"paymentid1\");",
															"payment_id1 = pm.variables.replaceIn('{{paymentid1}}');",
															"",
															"pm.test(\"TC007 Passed - No new payment entry is added for repetaed order_id\", function () {",
															"    pm.expect(payment_id1).to.not.equal(payment_id2);",
															"      ",
															"",
															"});",
															";",
															"    ",
															"}"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{valid_order_id1}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC008 - Wallet payment - invalid characters of order_id",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC008 Passed - invalid order id not allowed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
															"});",
															"    ",
															"}"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{invalid_order_id}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										}
									]
								},
								{
									"name": "amount scenarios",
									"item": [
										{
											"name": "TC009 - Wallet payment - Valid amount",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC009 Passed - Request is processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															"pm.collectionVariables.set(\"valid_order_id1\", _.random (100000,2000000));"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC010 - Wallet payment - amount - cent values",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC010 Passed - Request is processed with cent amount value\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															"pm.collectionVariables.set(\"valid_order_id1\", _.random (100000,2000000));"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": {{cent_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC012 - Wallet payment - amount - special characters",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC012 Passed - special characters as amount is not allowed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Invalid amount\");",
															"});",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \" !@#$%^&*()-_=+~:\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC013 - Wallet payment - amount - alphabets",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC013 Passed - alphabets is not allowed as amount\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Invalid amount\");",
															"});",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"abcdefgh\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC014 - Wallet payment - amount - value as 0",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC014 Passed - Request is processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
															"});",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": {{0_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										}
									]
								},
								{
									"name": "shopper_id scenarios",
									"item": [
										{
											"name": "TC017 - Wallet payment - Valid shopper_id",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC017 Passed - Request is processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC018 - Wallet payment - Invalid shopper_id - alphabets",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([500])",
															"})",
															"",
															"if(pm.response.code==500)",
															"{",
															"pm.test(\"TC018 Passed - Request is not processed\", function () {",
															"});",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": \"abcdefgh\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC019 - Wallet payment - Invalid shopper_id - special characters",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([500])",
															"})",
															"",
															"if(pm.response.code==500)",
															"{",
															"pm.test(\"TC019 Passed - Request is not processed\", function () {",
															"});",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": \"abc\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC021 - Wallet payment - Invalid shopper_id - empty",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC021 Passed - empty shopper id is not allowed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
															"});",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": \"\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										}
									]
								},
								{
									"name": "host scenarios",
									"item": [
										{
											"name": "TC022 - Wallet payment - Valid host",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC022 Passed - Request processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC023 - Wallet payment - Host - empty",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC023 Passed - Request is processed with empty host\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC024 - Wallet payment - Host - special characters",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC024 Passed - Request is processed with host value as special characters\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \" !@#$%^&*()-_=+\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC025 - Wallet payment - Host - numbers",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC025 Passed - Request is processed with host value as numbers\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"12345\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										}
									]
								},
								{
									"name": "merchant_id scenarios",
									"item": [
										{
											"name": "TC026 - Wallet payment - Valid merchant_id",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC026 Passed - Request processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC027 - Wallet payment - Invalid merchant_id - alphabets",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC027 Passed - alphabets is not allowed as merchant_id\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"failed\");",
															"});",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": \"abcdefgh\",\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC028 - Wallet payment - Invalid merchant_id - empty",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC028 Passed - empty shopper_id is not allowed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
															"});",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": \"\",\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										}
									]
								},
								{
									"name": "first_name scenarios",
									"item": [
										{
											"name": "TC031 - Wallet payment - Valid first_name",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC031 Passed - Request processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC032 - Wallet payment - first_name - alphabets",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC032 Passed - Request processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"abcdefgh\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC033 - Wallet payment - first_name - special characters",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC033 Passed - Request processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \" !@#$%^&*()-_=+\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC034 - Wallet payment - first_name - numbers",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC034 Passed - Request processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": {{numbers_first_name}},\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC035 - Wallet payment - first_name - empty",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC035 Passed - Empty first_name is not allowed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
															"});",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										}
									]
								},
								{
									"name": "last_name scenarios",
									"item": [
										{
											"name": "TC036 - Wallet payment - Valid last_name",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC036 Passed - Request processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC037 - Wallet payment - last_name - empty",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC037 Passed - empty last_name is not allowed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
															"});",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC038 - Wallet payment - last_name - special characters",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC038 Passed - Request processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"!@#$%^&*()-_=+\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC039 - Wallet payment - last_name - alphabets",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC039 Passed - Request processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"abcdefgh\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC040 - Wallet payment - last_name - numbers",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC040 Passed - Request processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"123456\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										}
									]
								},
								{
									"name": "email scenarios",
									"item": [
										{
											"name": "TC041 - Wallet payment - Valid email",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC041 Passed - Request processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC042 - Wallet payment - invalid email - empty",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC042 Passed - Request processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC043 - Wallet payment - invalid email - special characters",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC043 Passed - Request processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"!@#$%^&*()-_=+\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC044 - Wallet payment - invalid email - numbers",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC044 Passed - Request processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"12345\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC045 - Wallet payment - invalid email - alphabets",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC045 Passed - Request processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"abcdefgh\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC046 - Wallet payment - email - alias value",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC046 Passed - Request processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"omnipayuser+qa@gmail.com\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										}
									]
								},
								{
									"name": "address scenarios",
									"item": [
										{
											"name": "house_number",
											"item": [
												{
													"name": "TC047 - Wallet payment - Valid house_number",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC041 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC048 - Wallet payment - house_number - empty",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC048 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC049 - Wallet payment - house_number - special characters",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC049 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"!@#$%^&*()-_=+\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC050 - Wallet payment - house_number - alphabets",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC050 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"abcdefgh\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC051 - Wallet payment - house_number - large characters",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC051 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"123456789012345\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												}
											]
										},
										{
											"name": "flat",
											"item": [
												{
													"name": "TC052 - Wallet payment - Valid flat",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC052 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC053 - Wallet payment - flat - empty",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC053 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC054 - Wallet payment - flat - alphabets",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC054 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"abcdefgh\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC055 - Wallet payment - flat - special characters",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC055 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"!@#$%^&*()-_=+\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC056 - Wallet payment - flat - large characters",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC056 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"123456789012345\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												}
											]
										},
										{
											"name": "address1",
											"item": [
												{
													"name": "TC057 - Wallet payment - Valid address1",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC057 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"12\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC058 - Wallet payment - address1 - alphabers",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC058 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"22\",\n    \"address1\": \"abcdefgh\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC059 - Wallet payment - address1 - special characters",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC059 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"12\",\n    \"address1\": \"!@#$%^&*()-_=+\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC060 - Wallet payment - address1 - empty",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC060 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"12\",\n    \"address1\": \"\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC061 - Wallet payment - address1 - large characters",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC061 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"12\",\n    \"address1\": \"1234567890123456\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												}
											]
										},
										{
											"name": "address2",
											"item": [
												{
													"name": "TC062 - Wallet payment - Valid address2",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC062 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"12\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC063 - Wallet payment - address2 - empty",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC062 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"12\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC064 - Wallet payment - address2 - alphabets",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC064 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"12\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"abcdefgh\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC065 - Wallet payment - address2 - special characters",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC065 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"12\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"!@#$%^&*()-_=+\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC066 - Wallet payment - address2 - large characters",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC066 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"12\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"123456789012345\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												}
											]
										},
										{
											"name": "postcode",
											"item": [
												{
													"name": "TC067 - Wallet payment - Valid postcode",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC067 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"12\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC068 - Wallet payment - postcode - empty",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC068 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"12\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC069 - Wallet payment - postcode - alphabets",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC069 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"12\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"abcdegh\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC070 - Wallet payment - postcode - special characters",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC069 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"12\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"!@#$%^&*()-_=+\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC071 - Wallet payment - postcode - large characters",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC071 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"12\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"123456789012345\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												}
											]
										}
									]
								},
								{
									"name": "avs scenarios",
									"item": [
										{
											"name": "house_number",
											"item": [
												{
													"name": "TC072 - Wallet payment - Valid avs house_number",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC072 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"12\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC073 - Wallet payment - avs house_number - empty",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC073 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"12\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC074 - Wallet payment - avs house_number - alphabets",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC074 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"12\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"abcdefgh\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC075 - Wallet payment - avs house_number - special characters",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC075 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"12\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"!@#$%^&*()-_=+\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC076 - Wallet payment - avs house_number - large characters",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC075 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"12\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"123456789012345\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												}
											]
										},
										{
											"name": "postcode",
											"item": [
												{
													"name": "TC077 - Wallet payment - Valid avs postcode",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC077 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"12\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC078 - Wallet payment - avs postcode - empty",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC078 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"12\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC079 - Wallet payment - avs postcode - alphabets",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC079 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"12\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"abcdefgh\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC080 - Wallet payment - avs postcode - special characters",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC079 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"12\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"!@#$%^&*()-_=+\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC081 - Wallet payment - avs postcode - large characters",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"pm.test(\"TC081 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\");",
																	"});",
																	"}"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"12\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"123456789012345\"\n  }\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												}
											]
										}
									]
								},
								{
									"name": "split fee scenarios",
									"item": [
										{
											"name": "Amount scenarios",
											"item": [
												{
													"name": "Amount_scenario",
													"item": [
														{
															"name": "TC093-splitFee-valid amount",
															"event": [
																{
																	"listen": "test",
																	"script": {
																		"exec": [
																			"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																			"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
																			"})",
																			"",
																			"if (pm.response.code == 200) {",
																			"    try {",
																			"        pm.test(\"TC093 Passed - Request processed\", function () {",
																			"            pm.expect(pm.response.text()).to.include(\"success\")",
																			"        })",
																			"        pm.test(\"TC093 Passed - value type validation - Request processed\", function () {",
																			"            let jsonData = pm.response.json();",
																			"            pm.expect(jsonData.SplitFeeStatus.outcome).to.eql(\"success\");",
																			"            pm.expect(pm.response.text()).to.include(\"value_type\") && pm.expect(pm.response.text()).to.include(\"amount\")",
																			"        })",
																			"        pm.test(\"TC093 Passed - amount value validation\", function () {",
																			"            pm.expect(pm.response.text()).to.include(\"10.00\")",
																			"        })",
																			"    } catch (e) {",
																			"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
																			"    }",
																			"}",
																			"else {",
																			"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
																			"}",
																			"// i1 = 0;",
																			"// let jsonData = pm.response.json();  ",
																			"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																			"// {",
																			"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																			"//         pm.collectionVariables.set(\"i1\",i1)",
																			"//     })",
																			"// }",
																			"// else",
																			"// {",
																			"//      pm.test(`${jsonData.message} is the response`, () => {",
																			"//      i1++;",
																			"//     pm.collectionVariables.set(\"i1\",i1)",
																			"//      })",
																			"// }",
																			"",
																			""
																		],
																		"type": "text/javascript"
																	}
																}
															],
															"request": {
																"method": "POST",
																"header": [
																	{
																		"key": "api_token",
																		"value": "{{test_php_key}}"
																	},
																	{
																		"key": "Content-Type",
																		"value": "application/json"
																	},
																	{
																		"key": "qa-auth",
																		"value": "{{test_qa_auth}}",
																		"type": "text"
																	}
																],
																"body": {
																	"mode": "raw",
																	"raw": "{\n  \"order_id\": {{test_gateway_order_id}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"Flat 6\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Flat 6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"SplitFee\":[ {\n    \"type_id\": \"{{test_split_type_1}}\",\n    \"value\": \"{{test_split_amount_1}}\",\n    \"partner_merchant_id\":{{test_partner_merchant_id_1}},\n    \"value_type\": \"{{test_split_fee_amount_value_type}}\"\n  },\n  {\n      \"type_id\":\"{{test_split_type_2}}\",\n      \"value\":\"{{test_split_amount_2}}\",\n      \"partner_merchant_id\":{{test_partner_merchant_id_2}},\n      \"value_type\":\"{{test_split_fee_amount_value_type}}\"\n  }\n  ]\n  \n}"
																},
																"url": {
																	"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
																	"host": [
																		"{{test_php_endpoint}}"
																	],
																	"path": [
																		"api2.php"
																	],
																	"query": [
																		{
																			"key": "action",
																			"value": "wallet_payment"
																		}
																	]
																}
															},
															"response": []
														},
														{
															"name": "TC094-splitFee-invalid amount negative amount & special charcater",
															"event": [
																{
																	"listen": "test",
																	"script": {
																		"exec": [
																			"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																			"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
																			"})",
																			"",
																			"if (pm.response.code == 200) {",
																			"    try {",
																			"        pm.test(\"TC094 Passed - Request processed\", function () {",
																			"            pm.expect(pm.response.text()).to.include(\"failed\")",
																			"        })",
																			"        pm.test(\"TC094 Passed - negative amount validation - Request processed\", function () {1",
																			"            pm.expect(pm.response.text()).to.include(\"value cannot be 0 or lesser\")",
																			"        })",
																			"    } catch (e) {",
																			"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
																			"    }",
																			"}",
																			"else {",
																			"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
																			"}",
																			"//     i1a = 0;",
																			"// let jsonData = pm.response.json();  ",
																			"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																			"// {",
																			"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																			"//         pm.collectionVariables.set(\"i1\",i1a)",
																			"//     })",
																			"// }",
																			"// else",
																			"// {",
																			"//      pm.test(`${jsonData.message} is the response`, () => {",
																			"//      i1a++;",
																			"//     pm.collectionVariables.set(\"i1\",i1a)",
																			"//      })",
																			"// }",
																			""
																		],
																		"type": "text/javascript"
																	}
																}
															],
															"request": {
																"method": "POST",
																"header": [
																	{
																		"key": "api_token",
																		"value": "{{test_php_key}}"
																	},
																	{
																		"key": "Content-Type",
																		"value": "application/json"
																	},
																	{
																		"key": "qa-auth",
																		"value": "{{test_qa_auth}}",
																		"type": "text"
																	}
																],
																"body": {
																	"mode": "raw",
																	"raw": "{\n  \"order_id\": {{test_gateway_order_id}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": {{cardstream_test_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"Flat 6\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Flat 6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"SplitFee\":[ {\n    \"type_id\": \"{{test_split_type_1}}\",\n    \"value\": \"-5\",\n    \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n    \"value_type\": \"{{test_split_fee_percentage_value_type}}\"\n  },\n  {\n      \"type_id\":\"{{test_split_type_2}}\",\n      \"value\":\"-9\",\n      \"partner_merchant_id\":{{test_partner_merchant_id_2}},\n      \"value_type\":\"{{test_split_fee_amount_value_type}}\"\n  }\n  ]\n  \n}"
																},
																"url": {
																	"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
																	"host": [
																		"{{test_php_endpoint}}"
																	],
																	"path": [
																		"api2.php"
																	],
																	"query": [
																		{
																			"key": "action",
																			"value": "wallet_payment"
																		}
																	]
																}
															},
															"response": []
														},
														{
															"name": "TC096-splitFee-invalid amount with alphabet & empty space",
															"event": [
																{
																	"listen": "test",
																	"script": {
																		"exec": [
																			"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																			"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202,500])",
																			"})",
																			"",
																			"// if (pm.response.code == 200) {",
																			"//     try {",
																			"//         pm.test(\"TC096 Passed - Request processed\", function () {",
																			"//             pm.expect(pm.response.text()).to.include(\"failed\")",
																			"//         })",
																			"//         pm.test(\"TC096 Passed - validating with alphabet characters - Request processed\", function () {",
																			"//             pm.expect(pm.response.text()).to.include(\"value cannot be 0 or lesser\")",
																			"//         })",
																			"//     } catch (e) {",
																			"//         pm.test(\"fail\", () => { throw new Error(\"error\") });",
																			"//     }",
																			"// }",
																			"// else {",
																			"//     pm.test(\"fail\", () => { throw new Error(\"error\") });",
																			"// }",
																			"// i1 = 0;",
																			"// let jsonData = pm.response.json();  ",
																			"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																			"// {",
																			"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																			"//         pm.collectionVariables.set(\"i1\",i1)",
																			"//     })",
																			"// }",
																			"// else",
																			"// {",
																			"//      pm.test(`${jsonData.message} is the response`, () => {",
																			"//      i1++;",
																			"//     pm.collectionVariables.set(\"i1\",i1)",
																			"//      })",
																			"// }"
																		],
																		"type": "text/javascript"
																	}
																}
															],
															"request": {
																"method": "POST",
																"header": [
																	{
																		"key": "api_token",
																		"value": "{{test_php_key}}"
																	},
																	{
																		"key": "Content-Type",
																		"value": "application/json"
																	},
																	{
																		"key": "qa-auth",
																		"value": "{{test_qa_auth}}",
																		"type": "text"
																	}
																],
																"body": {
																	"mode": "raw",
																	"raw": "{\n  \"order_id\": {{test_gateway_order_id}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": {{cardstream_test_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"Flat 6\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Flat 6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"SplitFee\":[ {\n    \"type_id\": \"{{test_split_type_1}}\",\n    \"value\": \"a\",\n    \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n    \"value_type\": \"{{test_split_fee_amount_value_type}}\"\n  },\n  {\n      \"type_id\":\"{{test_split_type_2}}\",\n      \"value\":\" \",\n      \"partner_merchant_id\":{{test_partner_merchant_id_2}},\n      \"value_type\":\"{{test_split_fee_percentage_value_type}}\"\n  }\n  ]\n  \n}"
																},
																"url": {
																	"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
																	"host": [
																		"{{test_php_endpoint}}"
																	],
																	"path": [
																		"api2.php"
																	],
																	"query": [
																		{
																			"key": "action",
																			"value": "wallet_payment"
																		}
																	]
																}
															},
															"response": []
														},
														{
															"name": "TC098-splitFee-invalid amount with amount greater than sale value",
															"event": [
																{
																	"listen": "test",
																	"script": {
																		"exec": [
																			"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																			"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
																			"})",
																			"",
																			"if (pm.response.code == 200) {",
																			"    try {",
																			"        pm.test(\"TC098 Passed - Request processed\", function () {",
																			"            pm.expect(pm.response.text()).to.include(\"failed\")",
																			"        })",
																			"        pm.test(\"TC098 Passed - validating amount with more than sale value - Request processed\", function () {",
																			"            pm.expect(pm.response.text()).to.include(\"Total split cannot be greater than order value\")",
																			"        })",
																			"    } catch (e) {",
																			"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
																			"    }",
																			"}",
																			"else {",
																			"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
																			"}",
																			"// i1 = 0;",
																			"// let jsonData = pm.response.json();  ",
																			"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																			"// {",
																			"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																			"//         pm.collectionVariables.set(\"i1\",i1)",
																			"//     })",
																			"// }",
																			"// else",
																			"// {",
																			"//      pm.test(`${jsonData.message} is the response`, () => {",
																			"//      i1++;",
																			"//     pm.collectionVariables.set(\"i1\",i1)",
																			"//      })",
																			"// }",
																			""
																		],
																		"type": "text/javascript"
																	}
																}
															],
															"request": {
																"method": "POST",
																"header": [
																	{
																		"key": "api_token",
																		"value": "{{test_php_key}}"
																	},
																	{
																		"key": "Content-Type",
																		"value": "application/json"
																	},
																	{
																		"key": "qa-auth",
																		"value": "{{test_qa_auth}}",
																		"type": "text"
																	}
																],
																"body": {
																	"mode": "raw",
																	"raw": "{\n  \"order_id\": {{test_gateway_order_id}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": {{cardstream_test_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"Flat 6\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Flat 6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"SplitFee\":[ {\n    \"type_id\": \"{{test_split_type_1}}\",\n    \"value\": \"30\",\n    \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n    \"value_type\": \"{{test_split_fee_amount_value_type}}\"\n  },\n  {\n      \"type_id\":\"{{test_split_type_2}}\",\n      \"value\":\"20\",\n      \"partner_merchant_id\":{{test_partner_merchant_id_2}},\n      \"value_type\":\"{{test_split_fee_amount_value_type}}\"\n  }\n  ]\n  \n}"
																},
																"url": {
																	"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
																	"host": [
																		"{{test_php_endpoint}}"
																	],
																	"path": [
																		"api2.php"
																	],
																	"query": [
																		{
																			"key": "action",
																			"value": "wallet_payment"
																		}
																	]
																}
															},
															"response": []
														},
														{
															"name": "TC099-splitFee-valid amount with decimal value",
															"event": [
																{
																	"listen": "test",
																	"script": {
																		"exec": [
																			"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																			"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
																			"})",
																			"",
																			"if (pm.response.code == 200) {",
																			"    try {",
																			"        pm.test(\"TC099 Passed - Request processed\", function () {",
																			"            pm.expect(pm.response.text()).to.include(\"success\")",
																			"        })",
																			"        pm.test(\"TC099 Passed - validating amount with deciaml value - Request processed\", function () {",
																			"            let jsonData = pm.response.json();",
																			"            pm.expect(jsonData.SplitFeeStatus.outcome).to.eql(\"success\");",
																			"            pm.expect(pm.response.text()).to.include(\"value_type\") && pm.expect(pm.response.text()).to.include(\"amount\")",
																			"",
																			"        })",
																			"",
																			"    } catch (e) {",
																			"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
																			"    }",
																			"}",
																			"else {",
																			"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
																			"}",
																			"// i1 = 0;",
																			"// let jsonData = pm.response.json();  ",
																			"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																			"// {",
																			"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																			"//         pm.collectionVariables.set(\"i1\",i1)",
																			"//     })",
																			"// }",
																			"// else",
																			"// {",
																			"//      pm.test(`${jsonData.message} is the response`, () => {",
																			"//      i1++;",
																			"//     pm.collectionVariables.set(\"i1\",i1)",
																			"//      })",
																			"// }"
																		],
																		"type": "text/javascript"
																	}
																}
															],
															"request": {
																"method": "POST",
																"header": [
																	{
																		"key": "api_token",
																		"value": "{{test_php_key}}"
																	},
																	{
																		"key": "Content-Type",
																		"value": "application/json"
																	},
																	{
																		"key": "qa-auth",
																		"value": "{{test_qa_auth}}",
																		"type": "text"
																	}
																],
																"body": {
																	"mode": "raw",
																	"raw": "{\n  \"order_id\": {{test_gateway_order_id}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": {{cardstream_test_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"Flat 6\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Flat 6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"SplitFee\":[ {\n    \"type_id\": \"{{test_split_type_1}}\",\n    \"value\": \"1.1\",\n    \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n    \"value_type\": \"{{test_split_fee_amount_value_type}}\"\n  },\n  {\n      \"type_id\":\"{{test_split_type_2}}\",\n      \"value\":\"10.5\",\n      \"partner_merchant_id\":{{test_partner_merchant_id_2}},\n      \"value_type\":\"{{test_split_fee_amount_value_type}}\"\n  }\n  ]\n  \n}"
																},
																"url": {
																	"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
																	"host": [
																		"{{test_php_endpoint}}"
																	],
																	"path": [
																		"api2.php"
																	],
																	"query": [
																		{
																			"key": "action",
																			"value": "wallet_payment"
																		}
																	]
																}
															},
															"response": []
														},
														{
															"name": "TC100-splitFee-invalid amount with decimal value",
															"event": [
																{
																	"listen": "test",
																	"script": {
																		"exec": [
																			"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																			"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																			"})",
																			"",
																			"if(pm.response.code==200)",
																			"{",
																			"    try{",
																			"pm.test(\"TC100 Passed - Request processed\", function () {",
																			"    pm.expect(pm.response.text()).to.include(\"failed\")",
																			"})",
																			"    pm.test(\"TC100 Passed - validating amount value\", function () {",
																			"        pm.expect(pm.response.text()).to.include(\"Total split cannot be greater than order value\")",
																			"})",
																			"}catch(e){",
																			"        pm.test(\"fail\", ()=>{throw new Error(\"error\")});",
																			"    }",
																			"// i1 = 0;",
																			"// let jsonData = pm.response.json();  ",
																			"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																			"// {",
																			"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																			"//         pm.collectionVariables.set(\"i1\",i1)",
																			"//     })",
																			"// }",
																			"// else",
																			"// {",
																			"//      pm.test(`${jsonData.message} is the response`, () => {",
																			"//      i1++;",
																			"//     pm.collectionVariables.set(\"i1\",i1)",
																			"//      })",
																			"// }",
																			"",
																			"}"
																		],
																		"type": "text/javascript"
																	}
																}
															],
															"request": {
																"method": "POST",
																"header": [
																	{
																		"key": "api_token",
																		"value": "{{test_php_key}}"
																	},
																	{
																		"key": "Content-Type",
																		"value": "application/json"
																	},
																	{
																		"key": "qa-auth",
																		"value": "{{test_qa_auth}}",
																		"type": "text"
																	}
																],
																"body": {
																	"mode": "raw",
																	"raw": "{\n  \"order_id\": {{test_gateway_order_id}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": {{cardstream_test_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"Flat 6\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Flat 6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"SplitFee\":[ {\n    \"type_id\": \"{{test_split_type_1}}\",\n    \"value\": \"1.3\",\n    \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n    \"value_type\": \"{{test_split_fee_amount_value_type}}\"\n  },\n  {\n      \"type_id\":\"{{test_split_type_2}}\",\n      \"value\":\"40.00\",\n      \"partner_merchant_id\":{{test_partner_merchant_id_2}},\n      \"value_type\":\"{{test_split_fee_amount_value_type}}\"\n  }\n  ]\n  \n}"
																},
																"url": {
																	"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
																	"host": [
																		"{{test_php_endpoint}}"
																	],
																	"path": [
																		"api2.php"
																	],
																	"query": [
																		{
																			"key": "action",
																			"value": "wallet_payment"
																		}
																	]
																}
															},
															"response": []
														}
													]
												},
												{
													"name": "Percentage_scenario",
													"item": [
														{
															"name": "TC102-splitFee-valid percentage",
															"event": [
																{
																	"listen": "test",
																	"script": {
																		"exec": [
																			"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																			"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																			"})",
																			"",
																			"if(pm.response.code==200)",
																			"{",
																			"    try{",
																			"pm.test(\"TC102 Passed - Request processed\", function () {",
																			"    pm.expect(pm.response.text()).to.include(\"success\")",
																			"})",
																			"    pm.test(\"TC102 Passed - validating percentage type\", function () {",
																			"        pm.expect(pm.response.text()).to.include(\"percentage\")",
																			"    })",
																			"    pm.test(\"TC102 validating the value type and amount\",function(){",
																			"         let jsonData= pm.response.json();",
																			"pm.expect(jsonData.SplitFeeStatus.outcome).to.eql(\"success\");",
																			"pm.expect(pm.response.text()).to.include(\"value_type\") && pm.expect(pm.response.text()).to.include(\"amount\")",
																			"})",
																			"}catch(e){",
																			"        pm.test(\"fail\", ()=>{throw new Error(\"error\")});",
																			"    }",
																			"// i1 = 0;",
																			"// let jsonData = pm.response.json();  ",
																			"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																			"// {",
																			"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																			"//         pm.collectionVariables.set(\"i1\",i1)",
																			"//     })",
																			"// }",
																			"// else",
																			"// {",
																			"//      pm.test(`${jsonData.message} is the response`, () => {",
																			"//      i1++;",
																			"//     pm.collectionVariables.set(\"i1\",i1)",
																			"//      })",
																			"// }",
																			"}"
																		],
																		"type": "text/javascript"
																	}
																}
															],
															"request": {
																"method": "POST",
																"header": [
																	{
																		"key": "api_token",
																		"value": "{{test_php_key}}"
																	},
																	{
																		"key": "Content-Type",
																		"value": "application/json"
																	},
																	{
																		"key": "qa-auth",
																		"value": "{{test_qa_auth}}",
																		"type": "text"
																	}
																],
																"body": {
																	"mode": "raw",
																	"raw": "{\n  \"order_id\": {{test_gateway_order_id}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": {{cardstream_test_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"Flat 6\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Flat 6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"SplitFee\":[ {\n    \"type_id\": \"{{test_split_type_1}}\",\n    \"value\": \"{{test_split_amount_1}}\",\n    \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n    \"value_type\": \"{{test_split_fee_percentage_value_type}}\"\n  },\n  {\n      \"type_id\":\"{{test_split_type_2}}\",\n      \"value\":\"{{test_split_amount_2}}\",\n      \"partner_merchant_id\":{{test_partner_merchant_id_2}},\n      \"value_type\":\"{{test_split_fee_percentage_value_type}}\"\n  }\n  ]\n  \n}"
																},
																"url": {
																	"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
																	"host": [
																		"{{test_php_endpoint}}"
																	],
																	"path": [
																		"api2.php"
																	],
																	"query": [
																		{
																			"key": "action",
																			"value": "wallet_payment"
																		}
																	]
																}
															},
															"response": []
														},
														{
															"name": "TC103-splitFee-invalid percentage with amount greater than sale",
															"event": [
																{
																	"listen": "test",
																	"script": {
																		"exec": [
																			"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																			"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
																			"})",
																			"",
																			"if (pm.response.code == 200) {",
																			"    try {",
																			"        pm.test(\"TC103 Passed - Request processed\", function () {",
																			"            pm.expect(pm.response.text()).to.include(\"failed\")",
																			"        })",
																			"        pm.test(\"TC103 Passed - validating percentage with greater sale\", function () {",
																			"            pm.expect(pm.response.text()).to.include(\"Total split cannot be greater than order value\")",
																			"        })",
																			"    } catch (e) {",
																			"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
																			"    }",
																			"}",
																			"else {",
																			"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
																			"}",
																			"// i1 = 0;",
																			"// let jsonData = pm.response.json();  ",
																			"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																			"// {",
																			"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																			"//         pm.collectionVariables.set(\"i1\",i1)",
																			"//     })",
																			"// }",
																			"// else",
																			"// {",
																			"//      pm.test(`${jsonData.message} is the response`, () => {",
																			"//      i1++;",
																			"//     pm.collectionVariables.set(\"i1\",i1)",
																			"//      })",
																			"// }",
																			""
																		],
																		"type": "text/javascript"
																	}
																}
															],
															"request": {
																"method": "POST",
																"header": [
																	{
																		"key": "api_token",
																		"value": "{{test_php_key}}"
																	},
																	{
																		"key": "Content-Type",
																		"value": "application/json"
																	},
																	{
																		"key": "qa-auth",
																		"value": "{{test_qa_auth}}",
																		"type": "text"
																	}
																],
																"body": {
																	"mode": "raw",
																	"raw": "{\n  \"order_id\": {{test_gateway_order_id}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": {{cardstream_test_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"Flat 6\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Flat 6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"SplitFee\":[ {\n    \"type_id\": \"{{test_split_type_1}}\",\n    \"value\": \"{{test_split_amount_1}}\",\n    \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n    \"value_type\": \"{{test_split_fee_percentage_value_type}}\"\n  },\n  {\n      \"type_id\":\"{{test_split_type_2}}\",\n      \"value\":\"100\",\n      \"partner_merchant_id\":{{test_partner_merchant_id_2}},\n      \"value_type\":\"{{test_split_fee_percentage_value_type}}\"\n  }\n  ]\n  \n}"
																},
																"url": {
																	"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
																	"host": [
																		"{{test_php_endpoint}}"
																	],
																	"path": [
																		"api2.php"
																	],
																	"query": [
																		{
																			"key": "action",
																			"value": "wallet_payment"
																		}
																	]
																}
															},
															"response": []
														},
														{
															"name": "TC104-splitFee-invalid percentage",
															"event": [
																{
																	"listen": "test",
																	"script": {
																		"exec": [
																			"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																			"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
																			"})",
																			"",
																			"if (pm.response.code == 200) {",
																			"    try {",
																			"        pm.test(\"TC104 Passed - Request processed\", function () {",
																			"            pm.expect(pm.response.text()).to.include(\"failed\")",
																			"        })",
																			"        pm.test(\"TC104 Passed - validating invalid percentages values\", function () {",
																			"            pm.expect(pm.response.text()).to.include(\"value cannot be out of 0-99 range\")",
																			"        })",
																			"    } catch (e) {",
																			"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
																			"    }",
																			"}",
																			"else {",
																			"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
																			"}",
																			"// i1 = 0;",
																			"// let jsonData = pm.response.json();  ",
																			"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																			"// {",
																			"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																			"//         pm.collectionVariables.set(\"i1\",i1)",
																			"//     })",
																			"// }",
																			"// else",
																			"// {",
																			"//      pm.test(`${jsonData.message} is the response`, () => {",
																			"//      i1++;",
																			"//     pm.collectionVariables.set(\"i1\",i1)",
																			"//      })",
																			"// }"
																		],
																		"type": "text/javascript"
																	}
																}
															],
															"request": {
																"method": "POST",
																"header": [
																	{
																		"key": "api_token",
																		"value": "{{test_php_key}}"
																	},
																	{
																		"key": "Content-Type",
																		"value": "application/json"
																	},
																	{
																		"key": "qa-auth",
																		"value": "{{test_qa_auth}}",
																		"type": "text"
																	}
																],
																"body": {
																	"mode": "raw",
																	"raw": "{\n  \"order_id\": {{test_gateway_order_id}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": {{cardstream_test_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"Flat 6\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Flat 6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"SplitFee\":[ {\n    \"type_id\": \"{{test_split_type_1}}\",\n    \"value\": \"-5\",\n    \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n    \"value_type\": \"{{test_split_fee_percentage_value_type}}\"\n  },\n  {\n      \"type_id\":\"{{test_split_type_2}}\",\n      \"value\":\"3/4\",\n      \"partner_merchant_id\":{{test_partner_merchant_id_2}},\n      \"value_type\":\"{{test_split_fee_percentage_value_type}}\"\n  }\n  ]\n  \n}"
																},
																"url": {
																	"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
																	"host": [
																		"{{test_php_endpoint}}"
																	],
																	"path": [
																		"api2.php"
																	],
																	"query": [
																		{
																			"key": "action",
																			"value": "wallet_payment"
																		}
																	]
																}
															},
															"response": []
														},
														{
															"name": "TC105-splitFee-invalid percentage with decimal point sale value",
															"event": [
																{
																	"listen": "test",
																	"script": {
																		"exec": [
																			"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																			"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
																			"})",
																			"",
																			"if (pm.response.code == 200) {",
																			"    try {",
																			"        pm.test(\"TC105 Passed - Request processed\", function () {",
																			"            pm.expect(pm.response.text()).to.include(\"success\")",
																			"        })",
																			"        pm.test(\"TC102 Passed - validating percentage type\", function () {",
																			"        pm.expect(pm.response.text()).to.include(\"percentage\")",
																			"    })",
																			"    } catch (e) {",
																			"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
																			"    }",
																			"}",
																			"else {",
																			"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
																			"}",
																			"// i1 = 0;",
																			"// let jsonData = pm.response.json();  ",
																			"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																			"// {",
																			"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																			"//         pm.collectionVariables.set(\"i1\",i1)",
																			"//     })",
																			"// }",
																			"// else",
																			"// {",
																			"//      pm.test(`${jsonData.message} is the response`, () => {",
																			"//      i1++;",
																			"//     pm.collectionVariables.set(\"i1\",i1)",
																			"//      })",
																			"// }"
																		],
																		"type": "text/javascript"
																	}
																}
															],
															"request": {
																"method": "POST",
																"header": [
																	{
																		"key": "api_token",
																		"value": "{{test_php_key}}"
																	},
																	{
																		"key": "Content-Type",
																		"value": "application/json"
																	},
																	{
																		"key": "qa-auth",
																		"value": "{{test_qa_auth}}",
																		"type": "text"
																	}
																],
																"body": {
																	"mode": "raw",
																	"raw": "{\n  \"order_id\": {{test_gateway_order_id}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": {{cardstream_test_amount}},\n  \"host\": \"{{cardstream_test_amount}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"Flat 6\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Flat 6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"SplitFee\":[ {\n    \"type_id\": \"{{test_split_type_1}}\",\n    \"value\": \"1\",\n    \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n    \"value_type\": \"{{test_split_fee_percentage_value_type}}\"\n  },\n  {\n      \"type_id\":\"{{test_split_type_2}}\",\n      \"value\":\"0.50\",\n      \"partner_merchant_id\":{{test_partner_merchant_id_1}},\n      \"value_type\":\"{{test_split_fee_percentage_value_type}}\"\n  }\n  ]\n  \n}"
																},
																"url": {
																	"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
																	"host": [
																		"{{test_php_endpoint}}"
																	],
																	"path": [
																		"api2.php"
																	],
																	"query": [
																		{
																			"key": "action",
																			"value": "wallet_payment"
																		}
																	]
																}
															},
															"response": []
														},
														{
															"name": "TC107-splitFee-valid percentage and amount",
															"event": [
																{
																	"listen": "test",
																	"script": {
																		"exec": [
																			"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																			"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
																			"})",
																			"",
																			"if (pm.response.code == 200) {",
																			"    try {",
																			"        pm.test(\"TC107 Passed - Request processed\", function () {",
																			"            pm.expect(pm.response.text()).to.include(\"success\")",
																			"        })",
																			"        pm.test(\"TC107 Passed - validating amount value type\", function () {",
																			"            pm.expect(pm.response.text()).to.include(\"amount\")",
																			"        })",
																			"",
																			"        pm.test(\"TC107 Passed - validating amount value\", function () {",
																			"            pm.expect(pm.response.text()).to.include(\"5.00\")",
																			"        })",
																			"        pm.test(\"TC107 Passed - validating percentage value type\", function () {",
																			"            pm.expect(pm.response.text()).to.include(\"percentage\")",
																			"        })",
																			"        pm.test(\"TC107 Passed - validating percentage value \", function () {",
																			"            pm.expect(pm.response.text()).to.include(\"10\")",
																			"        })",
																			"",
																			"",
																			"    } catch (e) {",
																			"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
																			"    }",
																			"}",
																			"else {",
																			"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
																			"}",
																			"// i1 = 0;",
																			"// let jsonData = pm.response.json();  ",
																			"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																			"// {",
																			"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																			"//         pm.collectionVariables.set(\"i1\",i1)",
																			"//     })",
																			"// }",
																			"// else",
																			"// {",
																			"//      pm.test(`${jsonData.message} is the response`, () => {",
																			"//      i1++;",
																			"//     pm.collectionVariables.set(\"i1\",i1)",
																			"//      })",
																			"// }"
																		],
																		"type": "text/javascript"
																	}
																}
															],
															"request": {
																"method": "POST",
																"header": [
																	{
																		"key": "api_token",
																		"value": "{{test_php_key}}"
																	},
																	{
																		"key": "Content-Type",
																		"value": "application/json"
																	},
																	{
																		"key": "qa-auth",
																		"value": "{{test_qa_auth}}",
																		"type": "text"
																	}
																],
																"body": {
																	"mode": "raw",
																	"raw": "{\n  \"order_id\": {{test_gateway_order_id}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": {{cardstream_test_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"Flat 6\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Flat 6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"SplitFee\":[ {\n    \"type_id\": \"{{test_split_type_1}}\",\n    \"value\": \"{{test_split_amount_1}}\",\n    \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n    \"value_type\": \"{{test_split_fee_amount_value_type}}\"\n  },\n  {\n      \"type_id\":\"{{test_split_type_2}}\",\n      \"value\":\"{{test_split_amount_2}}\",\n      \"partner_merchant_id\":{{test_partner_merchant_id_2}},\n      \"value_type\":\"{{test_split_fee_percentage_value_type}}\"\n  }\n  ]\n  \n}"
																},
																"url": {
																	"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
																	"host": [
																		"{{test_php_endpoint}}"
																	],
																	"path": [
																		"api2.php"
																	],
																	"query": [
																		{
																			"key": "action",
																			"value": "wallet_payment"
																		}
																	]
																}
															},
															"response": []
														},
														{
															"name": "TC108-splitFee-invalid percentage and amount",
															"event": [
																{
																	"listen": "test",
																	"script": {
																		"exec": [
																			"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																			"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
																			"})",
																			"",
																			"if (pm.response.code == 200) {",
																			"    try {",
																			"        pm.test(\"TC108 Passed - Request processed\", function () {",
																			"            pm.expect(pm.response.text()).to.include(\"failed\")",
																			"        })",
																			"        pm.test(\"TC108 Passed - validating amount value type\", function () {",
																			"            pm.expect(pm.response.text()).to.include(\"Total split cannot be greater than order value\")",
																			"        })",
																			"    } catch (e) {",
																			"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
																			"    }",
																			"}",
																			"else {",
																			"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
																			"}",
																			"// i1 = 0;",
																			"// let jsonData = pm.response.json();  ",
																			"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																			"// {",
																			"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																			"//         pm.collectionVariables.set(\"i1\",i1)",
																			"//     })",
																			"// }",
																			"// else",
																			"// {",
																			"//      pm.test(`${jsonData.message} is the response`, () => {",
																			"//      i1++;",
																			"//     pm.collectionVariables.set(\"i1\",i1)",
																			"//      })",
																			"// }"
																		],
																		"type": "text/javascript"
																	}
																}
															],
															"request": {
																"method": "POST",
																"header": [
																	{
																		"key": "api_token",
																		"value": "{{test_php_key}}"
																	},
																	{
																		"key": "Content-Type",
																		"value": "application/json"
																	},
																	{
																		"key": "qa-auth",
																		"value": "{{test_qa_auth}}",
																		"type": "text"
																	}
																],
																"body": {
																	"mode": "raw",
																	"raw": "{\n  \"order_id\": {{test_gateway_order_id}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": {{cardstream_test_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"Flat 6\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Flat 6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"SplitFee\":[ {\n    \"type_id\": \"{{test_split_type_1}}\",\n    \"value\": \"{{test_split_amount_1}}\",\n    \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n    \"value_type\": \"{{test_split_fee_amount_value_type}}\"\n  },\n  {\n      \"type_id\":\"{{test_split_type_2}}\",\n      \"value\":\"100\",\n      \"partner_merchant_id\":{{test_partner_merchant_id_2}},\n      \"value_type\":\"{{test_split_fee_percentage_value_type}}\"\n  }\n  ]\n  \n}"
																},
																"url": {
																	"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
																	"host": [
																		"{{test_php_endpoint}}"
																	],
																	"path": [
																		"api2.php"
																	],
																	"query": [
																		{
																			"key": "action",
																			"value": "wallet_payment"
																		}
																	]
																}
															},
															"response": []
														}
													]
												}
											]
										},
										{
											"name": "type_id scenarios",
											"item": [
												{
													"name": "TC082- Split Fee- valid type id 1",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
																	"})",
																	"",
																	"if (pm.response.code == 200) {",
																	"    try {",
																	"        pm.test(\"TC082 Passed - Request processed\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"success\")",
																	"        })",
																	"        pm.test(\"TC082 Passed - validating amount in split fee - \", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"10\")",
																	"        })",
																	"        pm.test(\"TC082 validating the value type\", function () {",
																	"            let jsonData = pm.response.json();",
																	"            pm.expect(jsonData.SplitFeeStatus.outcome).to.eql(\"success\");",
																	"            pm.expect(pm.response.text()).to.include(\"value_type\") && pm.expect(pm.response.text()).to.include(\"amount\")",
																	"        })",
																	"    } catch (e) {",
																	"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"    }",
																	"}",
																	"else {",
																	"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"}",
																	"// i1 = 0;",
																	"// let jsonData = pm.response.json();  ",
																	"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																	"// {",
																	"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																	"//         pm.collectionVariables.set(\"i1\",i1)",
																	"//     })",
																	"// }",
																	"// else",
																	"// {",
																	"//      pm.test(`${jsonData.message} is the response`, () => {",
																	"//      i1++;",
																	"//     pm.collectionVariables.set(\"i1\",i1)",
																	"//      })",
																	"// }"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_gateway_order_id}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": {{cardstream_test_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"Flat 6\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Flat 6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"SplitFee\":[ {\n    \"type_id\": \"{{test_split_type_1}}\",\n    \"value\": \"{{test_split_amount_1}}\",\n    \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n    \"value_type\": \"{{test_split_fee_percentage_value_type}}\"\n  },\n  {\n      \"type_id\":\"{{test_split_type_2}}\",\n      \"value\":\"{{test_split_amount_2}}\",\n      \"partner_merchant_id\":{{test_partner_merchant_id_2}},\n      \"value_type\":\"{{test_split_fee_amount_value_type}}\"\n  }\n  ]\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC083- Split Fee- valid type id 2",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
																	"})",
																	"",
																	"if (pm.response.code == 200) {",
																	"    try {",
																	"        pm.test(\"TC083 Passed - Request processed\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"success\")",
																	"        })",
																	"        pm.test(\"TC083 Passed - Validating second type id\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"10.00\")",
																	"        })",
																	"        pm.test(\"TC083 validating the value type & amount \", function () {",
																	"            let jsonData = pm.response.json();",
																	"            pm.expect(jsonData.SplitFeeStatus.outcome).to.eql(\"success\");",
																	"            pm.expect(pm.response.text()).to.include(\"value_type\") && pm.expect(pm.response.text()).to.include(\"amount\")",
																	"        })",
																	"    } catch (e) {",
																	"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"    }",
																	"}",
																	"else {",
																	"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"}",
																	"// i1 = 0;",
																	"// let jsonData = pm.response.json();  ",
																	"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																	"// {",
																	"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																	"//         pm.collectionVariables.set(\"i1\",i1)",
																	"//     })",
																	"// }",
																	"// else",
																	"// {",
																	"//      pm.test(`${jsonData.message} is the response`, () => {",
																	"//      i1++;",
																	"//     pm.collectionVariables.set(\"i1\",i1)",
																	"//      })",
																	"// }",
																	""
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_gateway_order_id}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": {{cardstream_test_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"Flat 6\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Flat 6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"SplitFee\":[ {\n    \"type_id\": \"{{test_split_type_4}}\",\n    \"value\": \"{{test_split_amount_1}}\",\n    \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n    \"value_type\": \"{{test_split_fee_percentage_value_type}}\"\n  },\n  {\n      \"type_id\":\"{{test_split_type_3}}\",\n      \"value\":\"{{test_split_amount_2}}\",\n      \"partner_merchant_id\":{{test_partner_merchant_id_2}},\n      \"value_type\":\"{{test_split_fee_amount_value_type}}\"\n  }\n  ]\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC084- Split Fee- valid type id 3",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
																	"})",
																	"",
																	"if (pm.response.code == 200) {",
																	"    try {",
																	"        pm.test(\"TC084 Passed - Request processed\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"success\")",
																	"        })",
																	"        pm.test(\"TC084 Passed - validating the type id passed\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"amount\")",
																	"        })",
																	"        pm.test(\"TC084 validating the value type & amount\", function () {",
																	"            let jsonData = pm.response.json();",
																	"            pm.expect(jsonData.SplitFeeStatus.outcome).to.eql(\"success\");",
																	"            pm.expect(pm.response.text()).to.include(\"value_type\") && pm.expect(pm.response.text()).to.include(\"amount\")",
																	"        })",
																	"    } catch (e) {",
																	"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"    }",
																	"}",
																	"else {",
																	"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"}",
																	"// i1 = 0;",
																	"// let jsonData = pm.response.json();  ",
																	"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																	"// {",
																	"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																	"//         pm.collectionVariables.set(\"i1\",i1)",
																	"//     })",
																	"// }",
																	"// else",
																	"// {",
																	"//      pm.test(`${jsonData.message} is the response`, () => {",
																	"//      i1++;",
																	"//     pm.collectionVariables.set(\"i1\",i1)",
																	"//      })",
																	"// }"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_gateway_order_id}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": {{cardstream_test_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"Flat 6\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Flat 6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"SplitFee\":[ {\n    \"type_id\": \"{{test_split_type_5}}\",\n    \"value\": \"{{test_split_amount_1}}\",\n    \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n    \"value_type\": \"{{test_split_fee_amount_value_type}}\"\n  },\n  {\n      \"type_id\":\"{{test_split_type_6}}\",\n      \"value\":\"{{test_split_amount_2}}\",\n      \"partner_merchant_id\":{{test_partner_merchant_id_2}},\n      \"value_type\":\"{{test_split_fee_percentage_value_type}}\"\n  }\n  ]\n  \n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC087- Split Fee- valid all type id",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
																	"})",
																	"",
																	"if (pm.response.code == 200) {",
																	"    try {",
																	"        pm.test(\"TC087 Passed - Request processed\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"success\")",
																	"        })",
																	"        pm.test(\"TC087 Passed - validating th etype id Passed\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"amount\")",
																	"        })",
																	"        pm.test(\"TC087 validating the value type \", function () {",
																	"            let jsonData = pm.response.json();",
																	"            pm.expect(jsonData.SplitFeeStatus.outcome).to.eql(\"success\");",
																	"            pm.expect(pm.response.text()).to.include(\"value_type\") && pm.expect(pm.response.text()).to.include(\"amount\")",
																	"        })",
																	"          pm.test(\"TC087 validating the value type \", function () {",
																	"            let jsonData = pm.response.json();",
																	"            pm.expect(jsonData.SplitFeeStatus.outcome).to.eql(\"success\");",
																	"            pm.expect(pm.response.text()).to.include(\"value_type\") && pm.expect(pm.response.text()).to.include(\"percentage\")",
																	"        })",
																	"    } catch (e) {",
																	"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"    }",
																	"}",
																	"else {",
																	"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"}",
																	"// i1 = 0;",
																	"// let jsonData = pm.response.json();  ",
																	"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																	"// {",
																	"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																	"//         pm.collectionVariables.set(\"i1\",i1)",
																	"//     })",
																	"// }",
																	"// else",
																	"// {",
																	"//      pm.test(`${jsonData.message} is the response`, () => {",
																	"//      i1++;",
																	"//     pm.collectionVariables.set(\"i1\",i1)",
																	"//      })",
																	"// }"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_gateway_order_id}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": 65.00,\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"Flat 6\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Flat 6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"SplitFee\":[ {\n    \"type_id\": \"{{test_split_type_1}}\",\n    \"value\": \"{{test_split_amount_2}}\",\n    \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n    \"value_type\": \"{{test_split_fee_amount_value_type}}\"\n  },\n  {\n      \"type_id\":\"{{test_split_type_2}}\",\n      \"value\":\"{{test_split_amount_2}}\",\n      \"partner_merchant_id\":{{test_partner_merchant_id_2}},\n      \"value_type\":\"{{test_split_fee_amount_value_type}}\"\n  },\n   {\n      \"type_id\":\"{{test_split_type_3}}\",\n      \"value\":\"{{test_split_amount_2}}\",\n      \"partner_merchant_id\":{{test_partner_merchant_id_2}},\n      \"value_type\":\"{{test_split_fee_percentage_value_type}}\"\n  },\n   {\n      \"type_id\":\"{{test_split_type_4}}\",\n      \"value\":\"{{test_split_amount_2}}\",\n      \"partner_merchant_id\":{{test_partner_merchant_id_2}},\n      \"value_type\":\"{{test_split_fee_amount_value_type}}\"\n  },\n   {\n      \"type_id\":\"{{test_split_type_5}}\",\n      \"value\":\"{{test_split_amount_2}}\",\n      \"partner_merchant_id\":{{test_partner_merchant_id_2}},\n      \"value_type\":\"{{test_split_fee_amount_value_type}}\"\n  },\n   {\n      \"type_id\":\"{{test_split_type_6}}\",\n      \"value\":\"{{test_split_amount_1}}\",\n      \"partner_merchant_id\":{{test_partner_merchant_id_2}},\n      \"value_type\":\"{{test_split_fee_amount_value_type}}\"\n  }\n  ]\n  \n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC090- Split Fee- invalid splitfee type-id",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
																	"})",
																	"",
																	"if (pm.response.code == 200) {",
																	"    try {",
																	"        pm.test(\"TC090 Passed - Request processed\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"failed\")",
																	"        })",
																	"        pm.test(\"TC090 Passed - validating invalid  type id \", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"Invalid type_id\")",
																	"        })",
																	"    } catch (e) {",
																	"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"    }",
																	"}",
																	"else {",
																	"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"}",
																	"// i1 = 0;",
																	"// let jsonData = pm.response.json();  ",
																	"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																	"// {",
																	"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																	"//         pm.collectionVariables.set(\"i1\",i1)",
																	"//     })",
																	"// }",
																	"// else",
																	"// {",
																	"//      pm.test(`${jsonData.message} is the response`, () => {",
																	"//      i1++;",
																	"//     pm.collectionVariables.set(\"i1\",i1)",
																	"//      })",
																	"// }"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_gateway_order_id}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": {{cardstream_test_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"Flat 6\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Flat 6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"SplitFee\":[ {\n    \"type_id\": \"7\",\n    \"value\": \"{{test_split_amount_1}}\",\n    \"partner_merchant_id\": \"{{test_partner_merchant_id_1}}\",\n    \"value_type\": \"{{test_split_fee_amount_value_type}}\"\n  },\n  {\n      \"type_id\":\"9\",\n      \"value\":\"{{test_split_amount_2}}\",\n      \"partner_merchant_id\":\"{{test_partner_merchant_id_2}}\",\n      \"value_type\":\"{{test_split_fee_amount_value_type}}\"\n  }\n  ]\n  \n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC091- Split Fee- invalid splitfee type-id special charcter & empty space",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
																	"})",
																	"",
																	"if (pm.response.code == 200) {",
																	"    try {",
																	"        pm.test(\"TC091 Passed - Request processed\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"failed\")",
																	"        })",
																	"        pm.test(\"TC091 Passed - validating splity fee with special charcters\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"Invalid type_id\")",
																	"        })",
																	"    } catch (e) {",
																	"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"    }",
																	"}",
																	"else {",
																	"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"}",
																	"// i1 = 0;",
																	"// let jsonData = pm.response.json();  ",
																	"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																	"// {",
																	"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																	"//         pm.collectionVariables.set(\"i1\",i1)",
																	"//     })",
																	"// }",
																	"// else",
																	"// {",
																	"//      pm.test(`${jsonData.message} is the response`, () => {",
																	"//      i1++;",
																	"//     pm.collectionVariables.set(\"i1\",i1)",
																	"//      })",
																	"// }"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_gateway_order_id}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": {{cardstream_test_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"Flat 6\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Flat 6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"SplitFee\":[ {\n    \"type_id\": \"*\",\n    \"value\": \"{{test_split_amount_1}}\",\n    \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n    \"value_type\": \"{{test_split_fee_amount_value_type}}\"\n  },\n  {\n      \"type_id\":\" \",\n      \"value\":\"{{test_split_amount_2}}\",\n      \"partner_merchant_id\":{{test_partner_merchant_id_2}},\n      \"value_type\":\"{{test_split_fee_amount_value_type}}\"\n  }\n  ]\n  \n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC092- Split Fee- invalid splitfee type-id alphabet & numeric charcter",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
																	"})",
																	"",
																	"if (pm.response.code == 200) {",
																	"    try {",
																	"        pm.test(\"TC091 Passed - Request processed\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"failed\")",
																	"        })",
																	"        pm.test(\"TC091 Passed - validating splity fee with special charcters\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"Invalid type_id\")",
																	"        })",
																	"    } catch (e) {",
																	"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"    }",
																	"}",
																	"else {",
																	"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"}",
																	"// i1 = 0;",
																	"// let jsonData = pm.response.json();  ",
																	"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																	"// {",
																	"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																	"//         pm.collectionVariables.set(\"i1\",i1)",
																	"//     })",
																	"// }",
																	"// else",
																	"// {",
																	"//      pm.test(`${jsonData.message} is the response`, () => {",
																	"//      i1++;",
																	"//     pm.collectionVariables.set(\"i1\",i1)",
																	"//      })",
																	"// }"
																],
																"type": "text/javascript"
															}
														},
														{
															"listen": "prerequest",
															"script": {
																"exec": [
																	""
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_gateway_order_id}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": {{cardstream_test_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"Flat 6\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Flat 6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"SplitFee\":[ {\n    \"type_id\": \"a\",\n    \"value\": \"{{test_split_amount_1}}\",\n    \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n    \"value_type\": \"{{test_split_fee_percentage_value_type}}\"\n  },\n  {\n      \"type_id\":\"10\",\n      \"value\":\"{{test_split_amount_2}}\",\n      \"partner_merchant_id\":{{test_partner_merchant_id_2}},\n      \"value_type\":\"{{test_split_fee_amount_value_type}}\"\n  }\n  ]\n  \n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												}
											]
										},
										{
											"name": "Partner_merchant_id scenarios",
											"item": [
												{
													"name": "TC110-splitFee-negative merchant id & invalid merchant id",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
																	"})",
																	"",
																	"if (pm.response.code == 200) {",
																	"    try {",
																	"        pm.test(\"TC110 Request processed\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"failed\")",
																	"        })",
																	"        pm.test(\"TC110 Passed - validating amount value type\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"is not a valid partner merchant id\")",
																	"        })",
																	"    } catch (e) {",
																	"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"    }",
																	"}",
																	"else {",
																	"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"}",
																	"// i1 = 0;",
																	"// let jsonData = pm.response.json();  ",
																	"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																	"// {",
																	"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																	"//         pm.collectionVariables.set(\"i1\",i1)",
																	"//     })",
																	"// }",
																	"// else",
																	"// {",
																	"//      pm.test(`${jsonData.message} is the response`, () => {",
																	"//      i1++;",
																	"//     pm.collectionVariables.set(\"i1\",i1)",
																	"//      })",
																	"// }"
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_gateway_order_id}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": {{cardstream_test_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"Flat 6\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Flat 6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"SplitFee\":[ {\n    \"type_id\": \"{{test_split_type_1}}\",\n    \"value\": \"{{test_split_amount_1}}\",\n    \"partner_merchant_id\": \"-2\",\n    \"value_type\": \"{{test_split_fee_percentage_value_type}}\"\n  },\n  {\n      \"type_id\":\"{{test_split_type_2}}\",\n      \"value\":\"{{test_split_amount_2}}\",\n      \"partner_merchant_id\":\"8967786\",\n      \"value_type\":\"{{test_split_fee_amount_value_type}}\"\n  }\n  ]\n  \n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC112-splitFee-invalid partner merchant id & empty space",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
																	"})",
																	"",
																	"if (pm.response.code == 200) {",
																	"    try {",
																	"        pm.test(\"TC112 Passed - Request processed\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"failed\")",
																	"        })",
																	"        pm.test(\"TC112 Passed - validating partner merchant id which was passed\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"is not a valid partner merchant id\")",
																	"        })",
																	"    } catch (e) {",
																	"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"    }",
																	"}",
																	"else {",
																	"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"}",
																	"// i1 = 0;",
																	"// let jsonData = pm.response.json();  ",
																	"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																	"// {",
																	"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																	"//         pm.collectionVariables.set(\"i1\",i1)",
																	"//     })",
																	"// }",
																	"// else",
																	"// {",
																	"//      pm.test(`${jsonData.message} is the response`, () => {",
																	"//      i1++;",
																	"//     pm.collectionVariables.set(\"i1\",i1)",
																	"//      })",
																	"// }"
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_gateway_order_id}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": {{cardstream_test_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"Flat 6\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Flat 6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"SplitFee\":[ {\n    \"type_id\": \"{{test_split_type_1}}\",\n    \"value\": \"{{test_split_amount_1}}\",\n    \"partner_merchant_id\":\"%\",\n    \"value_type\": \"{{test_split_fee_amount_value_type}}\"\n  },\n  {\n      \"type_id\":\"{{test_split_type_2}}\",\n      \"value\":\"{{test_split_amount_2}}\",\n      \"partner_merchant_id\":\" \",\n      \"value_type\":\"{{test_split_fee_percentage_value_type}}\"\n  }\n  ]\n  \n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC115-splitFee-invalid partner merchant id alphabet",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
																	"})",
																	"",
																	"if (pm.response.code == 200) {",
																	"    try {",
																	"        pm.test(\"TC115 Passed - Request processed\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"failed\")",
																	"        })",
																	"        pm.test(\"TC115 Passed - validating partner merchant id which was passed\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"is not a valid partner merchant id\")",
																	"        })",
																	"    } catch (e) {",
																	"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"    }",
																	"}",
																	"else {",
																	"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"}",
																	"// i1 = 0;",
																	"// let jsonData = pm.response.json();  ",
																	"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																	"// {",
																	"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																	"//         pm.collectionVariables.set(\"i1\",i1)",
																	"//     })",
																	"// }",
																	"// else",
																	"// {",
																	"//      pm.test(`${jsonData.message} is the response`, () => {",
																	"//      i1++;",
																	"//     pm.collectionVariables.set(\"i1\",i1)",
																	"//      })",
																	"// }",
																	"  "
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_gateway_order_id}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": {{cardstream_test_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"Flat 6\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Flat 6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"SplitFee\":[ {\n    \"type_id\": \"{{test_split_type_1}}\",\n    \"value\": \"{{test_split_amount_1}}\",\n    \"partner_merchant_id\":\"a\",\n    \"value_type\": \"{{test_split_fee_amount_value_type}}\"\n  },\n  {\n      \"type_id\":\"{{test_split_type_2}}\",\n      \"value\":\"{{test_split_amount_2}}\",\n      \"partner_merchant_id\":\"b\",\n      \"value_type\":\"{{test_split_fee_percentage_value_type}}\"\n  }\n  ]\n  \n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												}
											]
										},
										{
											"name": "value_type scenarios",
											"item": [
												{
													"name": "TC116-splitFee-valid value type",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"    try{",
																	"pm.test(\"TC116 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"success\")",
																	"})",
																	"    pm.test(\"TC116 Passed - validating details passed\", function () {",
																	"        pm.expect(pm.response.text()).to.include(\"payment_id\")",
																	"        })",
																	"        pm.test(\"TC116 validating the value type\", function(){",
																	"     let jsonData= pm.response.json();",
																	"pm.expect(jsonData.SplitFeeStatus.outcome).to.eql(\"success\");",
																	"pm.expect(pm.response.text()).to.include(\"value_type\") && pm.expect(pm.response.text()).to.include(\"amount\")",
																	"pm.expect(pm.response.text()).to.include(\"value_type\") && pm.expect(pm.response.text()).to.include(\"percentage\")",
																	"})",
																	"}catch(e){",
																	"        pm.test(\"fail\", ()=>{throw new Error(\"error\")});",
																	"    }",
																	"}",
																	"else {",
																	"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"}",
																	"// i1 = 0;",
																	"// let jsonData = pm.response.json();  ",
																	"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																	"// {",
																	"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																	"//         pm.collectionVariables.set(\"i1\",i1)",
																	"//     })",
																	"// }",
																	"// else",
																	"// {",
																	"//      pm.test(`${jsonData.message} is the response`, () => {",
																	"//      i1++;",
																	"//     pm.collectionVariables.set(\"i1\",i1)",
																	"//      })",
																	"// }"
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_gateway_order_id}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": {{cardstream_test_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"Flat 6\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Flat 6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"SplitFee\":[ {\n    \"type_id\": \"{{test_split_type_1}}\",\n    \"value\": \"{{test_split_amount_1}}\",\n    \"partner_merchant_id\":{{test_partner_merchant_id_1}},\n    \"value_type\": \"{{test_split_fee_amount_value_type}}\"\n  },\n  {\n      \"type_id\":\"{{test_split_type_2}}\",\n      \"value\":\"{{test_split_amount_2}}\",\n      \"partner_merchant_id\":{{test_partner_merchant_id_2}},\n      \"value_type\":\"{{test_split_fee_percentage_value_type}}\"\n  }\n  ]\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC117-splitFee-invalid value type negative number & special character",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
																	"})",
																	"",
																	"if (pm.response.code == 200) {",
																	"    try {",
																	"        pm.test(\"TC117 Passed - Request processed\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"failed\")",
																	"        })",
																	"        pm.test(\"TC117 Passed - validating value type  which was passed\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"Invalid value_type\")",
																	"        })",
																	"    } catch (e) {",
																	"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"    }",
																	"}",
																	"else {",
																	"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"}",
																	"",
																	"// i1 = 0;",
																	"// let jsonData = pm.response.json();  ",
																	"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																	"// {",
																	"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																	"//         pm.collectionVariables.set(\"i1\",i1)",
																	"//     })",
																	"// }",
																	"// else",
																	"// {",
																	"//      pm.test(`${jsonData.message} is the response`, () => {",
																	"//      i1++;",
																	"//     pm.collectionVariables.set(\"i1\",i1)",
																	"//      })",
																	"// }"
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_gateway_order_id}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": {{cardstream_test_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"Flat 6\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Flat 6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"SplitFee\":[ {\n    \"type_id\": \"{{test_split_type_1}}\",\n    \"value\": \"{{test_split_amount_1}}\",\n    \"partner_merchant_id\":{{test_partner_merchant_id_1}},\n    \"value_type\": \"-2\"\n  },\n  {\n      \"type_id\":\"{{test_split_type_2}}\",\n      \"value\":\"{{test_split_amount_2}}\",\n      \"partner_merchant_id\":{{test_partner_merchant_id_2}},\n      \"value_type\":\"*\"\n  }\n  ]\n  \n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC119-splitFee-invalid value type alphabet & empty space",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"    try{",
																	"pm.test(\"TC119 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"failed\")",
																	"})",
																	"    pm.test(\"TC119 Passed - validating value type passed\", function () {",
																	"        pm.expect(pm.response.text()).to.include(\"Invalid value_type\")",
																	"        })",
																	"}catch(e){",
																	"        pm.test(\"fail\", ()=>{throw new Error(\"error\")});",
																	"    }",
																	"}",
																	"    else {",
																	"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"}",
																	"// i1 = 0;",
																	"// let jsonData = pm.response.json();  ",
																	"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																	"// {",
																	"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																	"//         pm.collectionVariables.set(\"i1\",i1)",
																	"//     })",
																	"// }",
																	"// else",
																	"// {",
																	"//      pm.test(`${jsonData.message} is the response`, () => {",
																	"//      i1++;",
																	"//     pm.collectionVariables.set(\"i1\",i1)",
																	"//      })",
																	"// }"
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_gateway_order_id}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": {{cardstream_test_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"Flat 6\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Flat 6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"SplitFee\":[ {\n    \"type_id\": \"{{test_split_type_1}}\",\n    \"value\": \"{{test_split_amount_1}}\",\n    \"partner_merchant_id\":{{test_partner_merchant_id_1}},\n    \"value_type\": \"ba\"\n  },\n  {\n      \"type_id\":\"{{test_split_type_2}}\",\n      \"value\":\"{{test_split_amount_2}}\",\n      \"partner_merchant_id\":{{test_partner_merchant_id_2}},\n      \"value_type\":\"  \"\n  }\n  ]\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC120-splitFee-invalid value type decimal number",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"    try{",
																	"pm.test(\"TC120 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"failed\")",
																	"})",
																	"    pm.test(\"TC120 Passed - validating value type which was passed\", function () {",
																	"        pm.expect(pm.response.text()).to.include(\"Invalid value_type\")",
																	"        })",
																	"}catch(e){",
																	"        pm.test(\"fail\", ()=>{throw new Error(\"error\")});",
																	"    }",
																	"i1 = 0;",
																	"let jsonData = pm.response.json();  ",
																	"if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																	"{",
																	"        pm.test(`${jsonData.outcome} is the response`, () => {",
																	"        pm.collectionVariables.set(\"i1\",i1)",
																	"    })",
																	"}",
																	"else",
																	"{",
																	"     pm.test(`${jsonData.message} is the response`, () => {",
																	"     i1++;",
																	"    pm.collectionVariables.set(\"i1\",i1)",
																	"     })",
																	"}",
																	"  ",
																	"    ",
																	"",
																	"}"
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_gateway_order_id}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": {{cardstream_test_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"Flat 6\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Flat 6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"SplitFee\":[ {\n    \"type_id\": \"{{test_split_type_1}}\",\n    \"value\": \"{{test_split_amount_1}}\",\n    \"partner_merchant_id\":{{test_partner_merchant_id_1}},\n    \"value_type\": \"1.3\"\n  },\n  {\n      \"type_id\":\"{{test_split_type_2}}\",\n      \"value\":\"{{test_split_amount_2}}\",\n      \"partner_merchant_id\":{{test_partner_merchant_id_1}},\n      \"value_type\":\"4.5\"\n  }\n  ]\n  \n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC121-splitFee-invalid value type fraction number",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
																	"})",
																	"",
																	"if(pm.response.code==200)",
																	"{",
																	"    try{",
																	"pm.test(\"TC121 Passed - Request processed\", function () {",
																	"    pm.expect(pm.response.text()).to.include(\"failed\")",
																	"})",
																	"    pm.test(\"TC121 Passed - validating value type which was passed\", function () {",
																	"        pm.expect(pm.response.text()).to.include(\"Invalid value_type\")",
																	"        })",
																	"}catch(e){",
																	"        pm.test(\"fail\", ()=>{throw new Error(\"error\")});",
																	"    }",
																	"}",
																	"else {",
																	"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"}",
																	"// i1 = 0;",
																	"// let jsonData = pm.response.json();  ",
																	"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																	"// {",
																	"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																	"//         pm.collectionVariables.set(\"i1\",i1)",
																	"//     })",
																	"// }",
																	"// else",
																	"// {",
																	"//      pm.test(`${jsonData.message} is the response`, () => {",
																	"//      i1++;",
																	"//     pm.collectionVariables.set(\"i1\",i1)",
																	"//      })",
																	"// }"
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Content-Type",
																"value": "application/json"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n  \"order_id\": {{test_gateway_order_id}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": {{cardstream_test_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"Flat 6\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Flat 6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"SplitFee\":[ {\n    \"type_id\": \"{{test_split_type_1}}\",\n    \"value\": \"{{test_split_amount_1}}\",\n    \"partner_merchant_id\":{{test_partner_merchant_id_1}},\n    \"value_type\": \"2/4\"\n  },\n  {\n      \"type_id\":\"{{test_split_type_2}}\",\n      \"value\":\"{{test_split_amount_2}}\",\n      \"partner_merchant_id\":{{test_partner_merchant_id_2}},\n      \"value_type\":\"1/4\"\n  }\n  ]\n  \n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "wallet_payment"
																}
															]
														}
													},
													"response": []
												}
											]
										}
									]
								},
								{
									"name": "webhook_url scenarios",
									"item": [
										{
											"name": "TC122 - Wallet payment - empty webhook_url",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC122 Passed - Wallet payment is completed with empty webhookurl\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"    ",
															"}"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC123 - Wallet payment - invalid webhook_url",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC123 Passed - Wallet payment is completed with invalid WebhookUrl\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"",
															"       var jsonData = JSON.parse(responseBody);",
															"pm.expect(jsonData.message).contains(\"Invalid WebhookUrl provided\")",
															"});",
															"    ",
															"}"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"shopper_id\": {{test_shopper_id}},\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"abc\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"email\": \"{{cardstream_test_email}}\",\n  \"address\": {\n    \"house_number\": \"10\",\n    \"flat\": \"Make It Mobile\",\n    \"address1\": \"Sanderson Street\",\n    \"address2\": \"Sheffield\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"Make It Mobile, 10\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  }\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_payment",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_payment"
														}
													]
												}
											},
											"response": []
										}
									]
								}
							]
						}
					]
				},
				{
					"name": "Foodhub voucher APIs",
					"item": [
						{
							"name": "api_token scenarios",
							"item": [
								{
									"name": "TC001 - Foohub voucher Crediting - Valid api_token",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC001 Passed - Voucher is created\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"success\");",
													"});",
													"var reqBody = JSON.parse(request.data);",
													"pm.collectionVariables.set(\"coupon_id\", reqBody.coupon_id);",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										},
										{
											"listen": "prerequest",
											"script": {
												"exec": [
													"pm.collectionVariables.set (\"fv_order_id\", _.random (100000,2000000));",
													"",
													"pm.collectionVariables.set (\"refund_amount\", _.random(50, true).toFixed(2));"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{fv_order_id}},\n  \"value\": {{refund_amount}},\n  \"coupon_id\": {{test_order_id1_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"shopper\": {\n    \"email\": \"{{cardstream_test_email}}\",\n    \"firstname\": \"QA\",\n    \"lastname\": \"Testing\",\n    \"address\": \"Manchester\"\n  }\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=fh_coupon_log",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "fh_coupon_log"
												}
											]
										}
									},
									"response": []
								},
								{
									"name": "TC002 - Foohub voucher Crediting - invalid api_token",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC002 Passed - invalid api_token is not allowed\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Token is empty or Invalid token\");",
													"});",
													"var reqBody = JSON.parse(request.data);",
													"pm.collectionVariables.set(\"coupon_id\", reqBody.coupon_id);",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										},
										{
											"listen": "prerequest",
											"script": {
												"exec": [
													"pm.collectionVariables.set (\"fv_order_id\", _.random (100000,2000000));",
													""
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{invalid_api_token}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{fv_order_id}},\n  \"value\": {{refund_amount}},\n  \"coupon_id\": {{test_order_id1_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"shopper\": {\n    \"email\": \"{{cardstream_test_email}}\",\n    \"firstname\": \"QA\",\n    \"lastname\": \"Testing\",\n    \"address\": \"Manchester\"\n  }\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=fh_coupon_log",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "fh_coupon_log"
												}
											]
										}
									},
									"response": []
								}
							]
						},
						{
							"name": "order_id scenarios",
							"item": [
								{
									"name": "TC003 - Foohub voucher Crediting - valid order_id",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC003 Passed - request processed\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"success\");",
													"});",
													"var reqBody = JSON.parse(request.data);",
													"pm.collectionVariables.set(\"coupon_id\", reqBody.coupon_id);",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										},
										{
											"listen": "prerequest",
											"script": {
												"exec": [
													"pm.collectionVariables.set (\"fv_order_id\", _.random (100000,2000000));",
													""
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{fv_order_id}},\n  \"value\": {{refund_amount}},\n  \"coupon_id\": {{test_order_id1_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"shopper\": {\n    \"email\": \"{{cardstream_test_email}}\",\n    \"firstname\": \"QA\",\n    \"lastname\": \"Testing\",\n    \"address\": \"Manchester\"\n  }\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=fh_coupon_log",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "fh_coupon_log"
												}
											]
										}
									},
									"response": []
								},
								{
									"name": "TC004 - Foohub voucher Crediting - order_id - empty",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC004 Passed - order id should not be empty\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
													"});",
													"var reqBody = JSON.parse(request.data);",
													"pm.collectionVariables.set(\"coupon_id\", reqBody.coupon_id);",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										},
										{
											"listen": "prerequest",
											"script": {
												"exec": [
													"pm.collectionVariables.set (\"fv_order_id\", _.random (100000,2000000));",
													""
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\":\"\",\n  \"value\": {{refund_amount}},\n  \"coupon_id\": {{test_order_id1_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"shopper\": {\n    \"email\": \"{{cardstream_test_email}}\",\n    \"firstname\": \"QA\",\n    \"lastname\": \"Testing\",\n    \"address\": \"Manchester\"\n  }\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=fh_coupon_log",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "fh_coupon_log"
												}
											]
										}
									},
									"response": []
								}
							]
						},
						{
							"name": "value scenarios",
							"item": [
								{
									"name": "TC007 - Foohub voucher Crediting - value - empty",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC007 Passed - request processed\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
													"});",
													"var reqBody = JSON.parse(request.data);",
													"pm.collectionVariables.set(\"coupon_id\", reqBody.coupon_id);",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										},
										{
											"listen": "prerequest",
											"script": {
												"exec": [
													"pm.collectionVariables.set (\"fv_order_id\", _.random (100000,2000000));",
													""
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{fv_order_id}},\n  \"value\": \"\",\n  \"coupon_id\": {{test_order_id1_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"shopper\": {\n    \"email\": \"{{cardstream_test_email}}\",\n    \"firstname\": \"QA\",\n    \"lastname\": \"Testing\",\n    \"address\": \"Manchester\"\n  }\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=fh_coupon_log",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "fh_coupon_log"
												}
											]
										}
									},
									"response": []
								},
								{
									"name": "TC011 - Foohub voucher Crediting - value - amount as 0",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC011 Passed - amount should not be empty\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"failed\");",
													"});",
													"var reqBody = JSON.parse(request.data);",
													"pm.collectionVariables.set(\"coupon_id\", reqBody.coupon_id);",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										},
										{
											"listen": "prerequest",
											"script": {
												"exec": [
													"pm.collectionVariables.set (\"fv_order_id\", _.random (100000,2000000));",
													""
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{fv_order_id}},\n  \"value\": \"0\",\n  \"coupon_id\": {{test_order_id1_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"shopper\": {\n    \"email\": \"{{cardstream_test_email}}\",\n    \"firstname\": \"QA\",\n    \"lastname\": \"Testing\",\n    \"address\": \"Manchester\"\n  }\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=fh_coupon_log",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "fh_coupon_log"
												}
											]
										}
									},
									"response": []
								}
							]
						},
						{
							"name": "coupon_id scenarios",
							"item": [
								{
									"name": "TC012 - Foohub voucher Crediting - coupon_id - empty",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC012 Passed - coupon_id should not be empty\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
													"});",
													"var reqBody = JSON.parse(request.data);",
													"pm.collectionVariables.set(\"coupon_id\", reqBody.coupon_id);",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										},
										{
											"listen": "prerequest",
											"script": {
												"exec": [
													"pm.collectionVariables.set (\"fv_order_id\", _.random (100000,2000000));",
													""
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{fv_order_id}},\n  \"value\": {{refund_amount}},\n  \"coupon_id\": \"\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"shopper\": {\n    \"email\": \"{{cardstream_test_email}}\",\n    \"firstname\": \"QA\",\n    \"lastname\": \"Testing\",\n    \"address\": \"Manchester\"\n  }\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=fh_coupon_log",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "fh_coupon_log"
												}
											]
										}
									},
									"response": []
								}
							]
						},
						{
							"name": "merchant_id scenarios",
							"item": [
								{
									"name": "TC015 - Foohub voucher Crediting - coupon_id - merchant_id - empty",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC012 Passed - merchant_id should not be empty\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
													"});",
													"var reqBody = JSON.parse(request.data);",
													"pm.collectionVariables.set(\"coupon_id\", reqBody.coupon_id);",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										},
										{
											"listen": "prerequest",
											"script": {
												"exec": [
													"pm.collectionVariables.set (\"fv_order_id\", _.random (100000,2000000));",
													""
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{fv_order_id}},\n  \"value\": {{refund_amount}},\n  \"coupon_id\": {{test_order_id1_t2sapi}},\n  \"merchant_id\": \"\",\n  \"shopper\": {\n    \"email\": \"{{cardstream_test_email}}\",\n    \"firstname\": \"QA\",\n    \"lastname\": \"Testing\",\n    \"address\": \"Manchester\"\n  }\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=fh_coupon_log",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "fh_coupon_log"
												}
											]
										}
									},
									"response": []
								}
							]
						},
						{
							"name": "email scenarios",
							"item": [
								{
									"name": "TC018 - Foohub voucher Crediting - email - empty",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC018 Passed - email should not be empty\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
													"});",
													"var reqBody = JSON.parse(request.data);",
													"pm.collectionVariables.set(\"coupon_id\", reqBody.coupon_id);",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										},
										{
											"listen": "prerequest",
											"script": {
												"exec": [
													"pm.collectionVariables.set (\"fv_order_id\", _.random (100000,2000000));",
													"",
													"pm.collectionVariables.set (\"refund_amount\", _.random(50, true).toFixed(2));"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{fv_order_id}},\n  \"value\": {{refund_amount}},\n  \"coupon_id\": {{test_order_id1_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"shopper\": {\n    \"email\": \"\",\n    \"firstname\": \"QA\",\n    \"lastname\": \"Testing\",\n    \"address\": \"Manchester\"\n  }\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=fh_coupon_log",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "fh_coupon_log"
												}
											]
										}
									},
									"response": []
								}
							]
						},
						{
							"name": "firstname scenarios",
							"item": [
								{
									"name": "TC019 - Foohub voucher Crediting - firstname - empty",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC019 Passed - firstname should not be empty\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
													"});",
													"var reqBody = JSON.parse(request.data);",
													"pm.collectionVariables.set(\"coupon_id\", reqBody.coupon_id);",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										},
										{
											"listen": "prerequest",
											"script": {
												"exec": [
													"pm.collectionVariables.set (\"fv_order_id\", _.random (100000,2000000));",
													"",
													"pm.collectionVariables.set (\"refund_amount\", _.random(50, true).toFixed(2));"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{fv_order_id}},\n  \"value\": {{refund_amount}},\n  \"coupon_id\": {{test_order_id1_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"shopper\": {\n    \"email\": \"{{cardstream_test_email}}\",\n    \"firstname\": \"\",\n    \"lastname\": \"Testing\",\n    \"address\": \"Manchester\"\n  }\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=fh_coupon_log",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "fh_coupon_log"
												}
											]
										}
									},
									"response": []
								}
							]
						},
						{
							"name": "lastname scenarios",
							"item": [
								{
									"name": "TC020 - Foohub voucher Crediting - lastname - empty",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC020 Passed - lastname should not be empty\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
													"});",
													"var reqBody = JSON.parse(request.data);",
													"pm.collectionVariables.set(\"coupon_id\", reqBody.coupon_id);",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										},
										{
											"listen": "prerequest",
											"script": {
												"exec": [
													"pm.collectionVariables.set (\"fv_order_id\", _.random (100000,2000000));",
													"",
													"pm.collectionVariables.set (\"refund_amount\", _.random(50, true).toFixed(2));"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{fv_order_id}},\n  \"value\": {{refund_amount}},\n  \"coupon_id\": {{test_order_id1_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"shopper\": {\n    \"email\": \"{{cardstream_test_email}}\",\n    \"firstname\": \"QA\",\n    \"lastname\": \"\",\n    \"address\": \"Manchester\"\n  }\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=fh_coupon_log",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "fh_coupon_log"
												}
											]
										}
									},
									"response": []
								}
							]
						},
						{
							"name": "address scenarios",
							"item": [
								{
									"name": "TC021 - Foohub voucher Crediting - address - empty",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC021 Passed - address should not be empty\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
													"});",
													"var reqBody = JSON.parse(request.data);",
													"pm.collectionVariables.set(\"coupon_id\", reqBody.coupon_id);",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										},
										{
											"listen": "prerequest",
											"script": {
												"exec": [
													"pm.collectionVariables.set (\"fv_order_id\", _.random (100000,2000000));",
													"",
													"pm.collectionVariables.set (\"refund_amount\", _.random(50, true).toFixed(2));"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{fv_order_id}},\n  \"value\": {{refund_amount}},\n  \"coupon_id\": {{test_order_id1_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"shopper\": {\n    \"email\": \"{{cardstream_test_email}}\",\n    \"firstname\": \"QA\",\n    \"lastname\": \"Testing\",\n    \"address\": \"\"\n  }\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=fh_coupon_log",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "fh_coupon_log"
												}
											]
										}
									},
									"response": []
								}
							]
						},
						{
							"name": "Voucher cancel",
							"item": [
								{
									"name": "TC022 - Foodhub voucher cancel - orderId - empty",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC023 Passed - order_id should not be empty\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
													"});",
													"    ",
													"}",
													""
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\"order_id\": \"\" }",
											"options": {
												"raw": {
													"language": "json"
												}
											}
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=fh_coupon_log_cancel",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "fh_coupon_log_cancel"
												}
											]
										}
									},
									"response": []
								}
							]
						},
						{
							"name": "Voucher crediting and cancel",
							"item": [
								{
									"name": "Foohub voucher Crediting",
									"event": [
										{
											"listen": "test",
											"script": {
												"type": "text/javascript",
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"Voucher is created\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"success\");",
													"});",
													"var reqBody = JSON.parse(request.data);",
													"pm.collectionVariables.set(\"coupon_id\", reqBody.coupon_id);",
													"    ",
													"}"
												]
											}
										},
										{
											"listen": "prerequest",
											"script": {
												"type": "text/javascript",
												"exec": [
													"pm.collectionVariables.set (\"fv_order_id\", _.random (100000,2000000));",
													""
												]
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{fv_order_id}},\n  \"value\": {{refund_amount}},\n  \"coupon_id\": {{test_order_id1_t2sapi}},\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"shopper\": {\n    \"email\": \"{{cardstream_test_email}}\",\n    \"firstname\": \"QA\",\n    \"lastname\": \"Testing\",\n    \"address\": \"Manchester\"\n  }\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=fh_coupon_log",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "fh_coupon_log"
												}
											]
										}
									},
									"response": []
								},
								{
									"name": "TC025 - Foodhub voucher - cancel",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC025 Passed - Credited Voucher is cancelled\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Coupon value was reverted\");",
													"});",
													"    ",
													"}",
													""
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\"order_id\": {{fv_order_id}} }",
											"options": {
												"raw": {
													"language": "json"
												}
											}
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=fh_coupon_log_cancel",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "fh_coupon_log_cancel"
												}
											]
										}
									},
									"response": []
								}
							]
						}
					]
				},
				{
					"name": "Refund APIs",
					"item": [
						{
							"name": "T2S Refund",
							"item": [
								{
									"name": "Payment and refund - card",
									"item": [
										{
											"name": "Payment for refund",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"Payment is completed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"  ",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															"pm.collectionVariables.set (\"refund_orderid2\", _.random (100000,2000000));",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{refund_orderid2}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{refund_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "paymentV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC001 - Refund - T2S - Card",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC001 Passed - refund is processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															"setTimeout(function(){}, [4000]);"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{refund_orderid2}},\n  \"amount\": \"{{refund_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"provider\": \"FH\",\n  \"reason\": \"{{test_refund_reason}}\",\n  \"shopper_id\": {{test_shopper_id}},\n  \"destination\": \"CARD\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=refund",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "refund"
														}
													]
												}
											},
											"response": []
										}
									]
								},
								{
									"name": "Payment and refund - wallet",
									"item": [
										{
											"name": "Payment for refund",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"Payment is completed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"    ",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															"pm.collectionVariables.set (\"refund_orderid2\", _.random (100000,2000000));",
															"",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{refund_orderid2}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{refund_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "paymentV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "Wallet - Balance before recharge",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"Balance is visible\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"balance\");",
															"",
															"var jsonData = JSON.parse(responseBody);",
															"pm.collectionVariables.set(\"walletBalance1\", jsonData.balance);",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n\t\"shopper_id\" : {{test_shopper_id}}\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_balance",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_balance"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "Refund - T2S - Wallet",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"Refund is processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{refund_orderid2}},\n  \"amount\": {{refund_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"provider\": \"FH\",\n  \"reason\": \"{{test_refund_reason}}\",\n  \"shopper_id\": {{test_shopper_id}},\n  \"destination\": \"WALLET\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=refund",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "refund"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC001 - Wallet - Balance after refund",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"Balance is visible\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"balance\");",
															"})",
															"",
															"",
															"var jsonData = JSON.parse(responseBody);",
															"pm.collectionVariables.set(\"walletBalance2\", jsonData.balance);",
															"walletBalance2 = jsonData.balance;",
															"",
															"pm.collectionVariables.get(\"refund_amount\");",
															"refund_amount = pm.variables.replaceIn('{{refund_amount}}');",
															"pm.collectionVariables.get(\"walletBalance1\");",
															"walletBalance1 = pm.variables.replaceIn('{{walletBalance1}}');",
															"",
															"console.log(walletBalance1);",
															"console.log(walletBalance2);",
															"",
															"pm.test(\"TC001 Passed - Wallet balance has been updated with refund\", function () {",
															"    ",
															"    pm.test(\"Refund amount is added to the balance\", function ()",
															"    {",
															"        var amount_after_refund = (+refund_amount + +walletBalance1).toFixed(2);",
															"        pm.expect(walletBalance2).to.not.equal(walletBalance1);",
															"        pm.expect(amount_after_refund).to.equal(pm.variables.replaceIn('{{walletBalance2}}'));",
															"        console.log(\"Wallet value is updated by\",refund_amount)",
															"    })",
															"    ",
															"",
															"});",
															";",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n\t\"shopper_id\" : {{test_shopper_id}}\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=wallet_balance",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "wallet_balance"
														}
													]
												}
											},
											"response": []
										}
									]
								},
								{
									"name": "api_token scenarios",
									"item": [
										{
											"name": "TC002 - Refund - T2S - invalid api_token",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC002 Passed - api_token is invalid\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Token is empty or Invalid token\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{invalid_api_token}}"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{refund_orderid2}},\n  \"amount\": {{refund_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"provider\": \"FH\",\n  \"reason\": \"{{test_refund_reason}}\",\n  \"shopper_id\": {{test_shopper_id}},\n  \"destination\": \"CARD\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=refund",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "refund"
														}
													]
												}
											},
											"response": []
										}
									]
								},
								{
									"name": "amount scenarios",
									"item": [
										{
											"name": "TC002 - Refund - T2S - amount - empty",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC003 Passed - amount is empty\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Invalid amount\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{refund_orderid2}},\n  \"amount\": \"\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"provider\": \"FH\",\n  \"reason\": \"{{test_refund_reason}}\",\n  \"shopper_id\": {{test_shopper_id}},\n  \"destination\": \"CARD\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=refund",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "refund"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC003 - Refund - T2S - amount - alphabets",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC003 Passed - amount is invalid\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Invalid amount\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{refund_orderid2}},\n  \"amount\": \"abcdefgh\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"provider\": \"FH\",\n  \"reason\": \"{{test_refund_reason}}\",\n  \"shopper_id\": {{test_shopper_id}},\n  \"destination\": \"CARD\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=refund",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "refund"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC004 - Refund - T2S - amount - special characters",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC004 Passed - amount is invalid\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Invalid amount\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{refund_orderid2}},\n  \"amount\": \"!@#$%^&*()_+\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"provider\": \"FH\",\n  \"reason\": \"{{test_refund_reason}}\",\n  \"shopper_id\": {{test_shopper_id}},\n  \"destination\": \"CARD\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=refund",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "refund"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC005 - Refund - T2S - amount - more than refund amount",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC005 Passed - refund amount is invalid\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"cannot be greater than the original transaction amount\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{refund_orderid2}},\n  \"amount\": \"123456\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"provider\": \"FH\",\n  \"reason\": \"{{test_refund_reason}}\",\n  \"shopper_id\": {{test_shopper_id}},\n  \"destination\": \"CARD\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=refund",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "refund"
														}
													]
												}
											},
											"response": []
										}
									]
								},
								{
									"name": "merchant id scenarios",
									"item": [
										{
											"name": "TC006 - Refund - T2S - merchant_id - empty",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC006 Passed - merchant id is empty\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"failed\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{refund_orderid2}},\n  \"amount\": {{refund_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": \"\",\n  \"provider\": \"FH\",\n  \"reason\": \"{{test_refund_reason}}\",\n  \"shopper_id\": {{test_shopper_id}},\n  \"destination\": \"CARD\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=refund",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "refund"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC007 - Refund - T2S - merchant_id - alphabets",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC007 Passed - merchant id is invalid\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"failed\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{refund_orderid2}},\n  \"amount\": {{refund_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": \"abcdefgh\",\n  \"provider\": \"FH\",\n  \"reason\": \"{{test_refund_reason}}\",\n  \"shopper_id\": {{test_shopper_id}},\n  \"destination\": \"CARD\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=refund",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "refund"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC008 - Refund - T2S - merchant_id - special characters",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC008 Passed - merchant id is invalid\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"failed\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{refund_orderid2}},\n  \"amount\": {{refund_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": \"!@#$%^&*()_+\",\n  \"provider\": \"FH\",\n  \"reason\": \"{{test_refund_reason}}\",\n  \"shopper_id\": {{test_shopper_id}},\n  \"destination\": \"CARD\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=refund",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "refund"
														}
													]
												}
											},
											"response": []
										}
									]
								},
								{
									"name": "shopper_id scenarios",
									"item": [
										{
											"name": "TC013 - Refund - T2S - shopper_id - empty",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC013 Passed - shopper_id is empty\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Request missing required params(shopper_id)\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															"setTimeout(function(){}, [10000]);"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{refund_orderid2}},\n  \"amount\": {{refund_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"provider\": \"FH\",\n  \"reason\": \"{{test_refund_reason}}\",\n  \"shopper_id\": \"\",\n  \"destination\": \"WALLET\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=refund",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "refund"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC014 - Refund - T2S - shopper_id - alphabets",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC014 Passed - shopper_id is invalid\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Request missing required params(shopper_id)\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															"setTimeout(function(){}, [10000]);"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{refund_orderid2}},\n  \"amount\": {{refund_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"provider\": \"FH\",\n  \"reason\": \"{{test_refund_reason}}\",\n  \"shopper_id\": \"abcdefgh\",\n  \"destination\": \"WALLET\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=refund",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "refund"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC015 - Refund - T2S - shopper_id - special characters",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC015 Passed - shopper_id is invalid\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Request missing required params(shopper_id)\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															"setTimeout(function(){}, [10000]);"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{refund_orderid2}},\n  \"amount\": {{refund_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"provider\": \"FH\",\n  \"reason\": \"{{test_refund_reason}}\",\n  \"shopper_id\": \"!@#$%^&*()_+\",\n  \"destination\": \"WALLET\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=refund",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "refund"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC016 - Refund - T2S - shopper_id - invalid shopper_id",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC016 Passed - shopper_id is invalid\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"failed\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{refund_orderid2}},\n  \"amount\": {{refund_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"provider\": \"FH\",\n  \"reason\": \"{{test_refund_reason}}\",\n  \"shopper_id\": {{invalid_shopper_id}},\n  \"destination\": \"WALLET\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=refund",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "refund"
														}
													]
												}
											},
											"response": []
										}
									]
								},
								{
									"name": "refund already processed",
									"item": [
										{
											"name": "Payment for refund",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"Payment is completed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"  ",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															"pm.collectionVariables.set (\"refund_orderid2\", _.random (100000,2000000));",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{refund_orderid2}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": {{refund_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "paymentV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "Refund - T2S",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC001 Passed - refund is processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															"setTimeout(function(){}, [10000]);"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{refund_orderid2}},\n  \"amount\": {{refund_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"provider\": \"FH\",\n  \"reason\": \"{{test_refund_reason}}\",\n  \"shopper_id\": {{test_shopper_id}},\n  \"destination\": \"CARD\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=refund",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "refund"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC017 - Refund - T2S - processing again",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC017 Passed - refund is already processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Transaction already refunded\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															"setTimeout(function(){}, [10000]);"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{refund_orderid2}},\n  \"amount\": {{refund_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"provider\": \"FH\",\n  \"reason\": \"{{test_refund_reason}}\",\n  \"shopper_id\": {{test_shopper_id}},\n  \"destination\": \"CARD\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=refund",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "refund"
														}
													]
												}
											},
											"response": []
										}
									]
								},
								{
									"name": "partial refund",
									"item": [
										{
											"name": "Payment for refund",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"Payment is completed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"",
															"pm.collectionVariables.get(\"refund_amount\");",
															"refund_amount = pm.variables.replaceIn('{{refund_amount}}');",
															"var partial_refund_amount = refund_amount/2;",
															"pm.collectionVariables.set(\"partial_refund_amount\",partial_refund_amount.toFixed(2))",
															"    ",
															"}"
														],
														"type": "text/javascript"
													}
												},
												{
													"listen": "prerequest",
													"script": {
														"exec": [
															"pm.collectionVariables.set (\"refund_orderid2\", _.random (100000,2000000));",
															"",
															"pm.collectionVariables.set (\"refund_amount\", \"10.00\");",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{refund_orderid2}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{refund_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "paymentV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC018 - Refund - T2S  - partial refund1",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC018 Passed - partial refund is processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{refund_orderid2}},\n  \"amount\": {{partial_refund_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"provider\": \"FH\",\n  \"reason\": \"{{test_refund_reason}}\",\n  \"shopper_id\": {{test_shopper_id}},\n  \"destination\": \"CARD\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=refund",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "refund"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC018 - Refund - T2S  - partial refund2",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC018 Passed - partial refund is processed\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"success\");",
															"});",
															"    ",
															"}",
															""
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{refund_orderid2}},\n  \"amount\": {{partial_refund_amount}},\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"provider\": \"FH\",\n  \"reason\": \"{{test_refund_reason}}\",\n  \"shopper_id\": {{test_shopper_id}},\n  \"destination\": \"CARD\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=refund",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "refund"
														}
													]
												}
											},
											"response": []
										}
									]
								}
							]
						}
					]
				},
				{
					"name": "Express checkout",
					"item": [
						{
							"name": "api_token scenarios",
							"item": [
								{
									"name": "TC001 - Express checkout payment - Valid api_token",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC001 passed - API token is valid\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"success\");",
													"",
													"    var jsonData = JSON.parse(responseBody);",
													"pm.collectionVariables.set(\"paymentid1\", jsonData.payment_id);",
													"",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										},
										{
											"listen": "prerequest",
											"script": {
												"exec": [
													"pm.collectionVariables.set(\"valid_order_id\", _.random (100000,2000000));"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{valid_order_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_amount}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": \"{{cardstream_test_cvv}}\",\n  \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								},
								{
									"name": "TC002 - Express checkout payment - invalid api_token",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC002 passed - request not processed as the API token is invalid\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"success\");",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n    \"order_id\": {{test_order_id_t2sapi}},\n    \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n    \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n    \"host\": \"{{test_host}}\",\n    \"merchant_id\": {{cardstream_test_merchant_id}},\n    \"WebhookUrl\": \"{{test_webhook_url}}\",\n    \"customer_id\": \"{{test_shopper_id}}\",\n    \"provider\": \"FH\",\n    \"first_name\": \"QA\",\n    \"last_name\": \"Testing\",\n    \"sending\": \"to\",\n    \"address\": {\n        \"house_number\": \"6\",\n        \"flat\": \"asdf\",\n        \"address1\": \"6\",\n        \"address2\": \"asd\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"avs\": {\n        \"house_number\": \"6\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"AddressOnFile\": [],\n    \"cvv\": {{cardstream_test_cvv}},\n    \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								}
							]
						},
						{
							"name": "orderId scenarios",
							"item": [
								{
									"name": "TC003 - Express checkout payment - order_id - alphabets",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC003 passed - request not processed as the order id is invalid\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"order_id is invalid or empty\");",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n    \"order_id\": \"abcdefgh\",\n    \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n    \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n    \"host\": \"{{test_host}}\",\n    \"merchant_id\": {{cardstream_test_merchant_id}},\n    \"WebhookUrl\": \"{{test_webhook_url}}\",\n    \"customer_id\": \"{{test_shopper_id}}\",\n    \"provider\": \"FH\",\n    \"first_name\": \"QA\",\n    \"last_name\": \"Testing\",\n    \"sending\": \"to\",\n    \"address\": {\n        \"house_number\": \"6\",\n        \"flat\": \"asdf\",\n        \"address1\": \"6\",\n        \"address2\": \"asd\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"avs\": {\n        \"house_number\": \"6\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"AddressOnFile\": [],\n    \"cvv\": {{cardstream_test_cvv}},\n    \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								},
								{
									"name": "TC004 - Express checkout payment - order_id - empty",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC004 passed - request not processed as the order id is empty\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n    \"order_id\": \"\",\n    \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n    \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n    \"host\": \"{{test_host}}\",\n    \"merchant_id\": {{cardstream_test_merchant_id}},\n    \"WebhookUrl\": \"{{test_webhook_url}}\",\n    \"customer_id\": \"{{test_shopper_id}}\",\n    \"provider\": \"FH\",\n    \"first_name\": \"QA\",\n    \"last_name\": \"Testing\",\n    \"sending\": \"to\",\n    \"address\": {\n        \"house_number\": \"6\",\n        \"flat\": \"asdf\",\n        \"address1\": \"6\",\n        \"address2\": \"asd\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"avs\": {\n        \"house_number\": \"6\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"AddressOnFile\": [],\n    \"cvv\": {{cardstream_test_cvv}},\n    \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								},
								{
									"name": "TC005 - Express checkout payment - order_id - special characters",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC005 passed - request not processed as the order id is invalid\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"order_id is invalid or empty\");",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n    \"order_id\": \"!@#$%^&*()-_=+~\",\n    \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n    \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n    \"host\": \"{{test_host}}\",\n    \"merchant_id\": {{cardstream_test_merchant_id}},\n    \"WebhookUrl\": \"{{test_webhook_url}}\",\n    \"customer_id\": \"{{test_shopper_id}}\",\n    \"provider\": \"FH\",\n    \"first_name\": \"QA\",\n    \"last_name\": \"Testing\",\n    \"sending\": \"to\",\n    \"address\": {\n        \"house_number\": \"6\",\n        \"flat\": \"asdf\",\n        \"address1\": \"6\",\n        \"address2\": \"asd\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"avs\": {\n        \"house_number\": \"6\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"AddressOnFile\": [],\n    \"cvv\": {{cardstream_test_cvv}},\n    \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								},
								{
									"name": "TC006 - Express checkout payment - order_id - invalid characters",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC006 passed - request not processed as the order id is invalid\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": \"0\",\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								},
								{
									"name": "TC007 - Express checkout payment - order_id - repeated order_id",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC007 passed - repeated order id has not added a new entry\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"success\");",
													"});",
													"",
													"var jsonData = JSON.parse(responseBody);",
													"pm.collectionVariables.set(\"paymentid2\", jsonData.payment_id);",
													"payment_id2 = jsonData.payment_id;",
													"pm.collectionVariables.get(\"paymentid1\");",
													"payment_id1 = pm.variables.replaceIn('{{paymentid1}}');",
													"",
													"pm.test(\"TC007 Passed - No new payment entry is added for repetaed order_id\", function () {",
													"    pm.expect(payment_id1).to.not.equal(payment_id2);",
													"    pm.expect(jsonData.message).contains(\"Transaction already paid\");",
													"      ",
													"",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{valid_order_id}} ,\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n    \"customer_id\": \"{{test_shopper_id}}\",\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								}
							]
						},
						{
							"name": "merchantTokenId scenarios",
							"item": [
								{
									"name": "TC008 - Express checkout payment - merchantTokenId - empty",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC008 passed - merchantTokenId is empty\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										},
										{
											"listen": "prerequest",
											"script": {
												"exec": [
													"pm.collectionVariables.set(\"valid_order_id\", _.random (100000,2000000));"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchantTokenId\": \"\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								},
								{
									"name": "TC009 - Express checkout payment - merchantTokenId - alphabets",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC009 passed - merchantTokenId is invalid\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Rejected\");",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										},
										{
											"listen": "prerequest",
											"script": {
												"exec": [
													"pm.collectionVariables.set(\"valid_order_id\", _.random (100000,2000000));"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchantTokenId\": \"abcdefgh\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								},
								{
									"name": "TC010 - Express checkout payment - merchantTokenId - special characters",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC010 passed - merchantTokenId is invalid\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Rejected\");",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										},
										{
											"listen": "prerequest",
											"script": {
												"exec": [
													"pm.collectionVariables.set(\"valid_order_id\", _.random (100000,2000000));"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchantTokenId\": \"!@#$%^&*()-_=+\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								},
								{
									"name": "TC011 - Express checkout payment - merchantTokenId - numbers",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC011 passed - merchantTokenId is invalid\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Rejected\");",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										},
										{
											"listen": "prerequest",
											"script": {
												"exec": [
													"pm.collectionVariables.set(\"valid_order_id\", _.random (100000,2000000));"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchantTokenId\": \"1234567\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								}
							]
						},
						{
							"name": "amount scenarios",
							"item": [
								{
									"name": "TC008 - Express checkout payment - amount - empty",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC008 passed - request not processed as the amount is invalid\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								},
								{
									"name": "TC009 - Express checkout payment - amount - alphabets",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC009 passed - request not processed as the amount is invalid\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Invalid amount\");",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"abcdefgh\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								},
								{
									"name": "TC010 - Express checkout payment - amount - special characters",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC010 passed - request not processed as the amount is invalid\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Invalid amount\");",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"!@#$%^&*()-_=+\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								},
								{
									"name": "TC011 - Express checkout payment - amount - invalid amount",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC011 passed - request not processed as the amount is invalid\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Amount exceeds the limit\");",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"1234567890.00\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								},
								{
									"name": "TC012 - Express checkout payment - amount - amount as 0",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC012 passed - request not processed as the amount is invalid\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Invalid amount\");",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"0.00\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								},
								{
									"name": "TC012a- Express checkout payment - amount - large amount",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC012a passed - request not processed as the amount is invalid\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Amount exceeds the limit\");",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"500.00\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								}
							]
						},
						{
							"name": "merchant_id scenarios",
							"item": [
								{
									"name": "TC013 - Express checkout payment - merchant_id - empty",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC013 passed - merchant id is empty\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
													"",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										},
										{
											"listen": "prerequest",
											"script": {
												"exec": [
													""
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"merchant_id\": \"\",\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								},
								{
									"name": "TC014 - Express checkout payment - merchant_id - alphabets",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC014 passed - merchant id is invalid\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"merchant_id is invalid or empty\");",
													"",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										},
										{
											"listen": "prerequest",
											"script": {
												"exec": [
													""
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{valid_order_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"merchant_id\": \"abcdefgh\",\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								},
								{
									"name": "TC015 - Express checkout payment - merchant_id - special characters",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC015 passed - merchant id is invalid\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"merchant_id is invalid or empty\");",
													"",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										},
										{
											"listen": "prerequest",
											"script": {
												"exec": [
													""
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{valid_order_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"merchant_id\": \"!@#$%^&*()-_=+\",\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								}
							]
						},
						{
							"name": "Provider scenarios",
							"item": [
								{
									"name": "TC016 - Express checkout payment - provider empty",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC016 passed - provider value should not be empty\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"failed\");",
													"",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										},
										{
											"listen": "prerequest",
											"script": {
												"exec": [
													""
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"provider\": \"\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								},
								{
									"name": "TC017 - Express checkout payment - provider - alphabets",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC017 passed - provider value is invalid\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Invalid provider\");",
													"",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										},
										{
											"listen": "prerequest",
											"script": {
												"exec": [
													""
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"provider\": \"fh\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								},
								{
									"name": "TC018 - Express checkout payment - provider - special characters",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC018 passed - provider value is invalid\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Invalid provider\");",
													"",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										},
										{
											"listen": "prerequest",
											"script": {
												"exec": [
													""
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"provider\": \"!@#$%^&*()-_=+\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								},
								{
									"name": "TC019 - Express checkout payment - provider - numbers",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC019 passed - provider value is invalid\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Invalid provider\");",
													"",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										},
										{
											"listen": "prerequest",
											"script": {
												"exec": [
													""
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"provider\": \"1234567\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								}
							]
						},
						{
							"name": "first_name scenarios",
							"item": [
								{
									"name": "TC020 - Express checkout payment - first_name - empty",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC020 passed - request not processed as the first name is empty\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"provider\": \"FH\",\n  \"first_name\": \"\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								}
							]
						},
						{
							"name": "last_name scenarios",
							"item": [
								{
									"name": "TC021 - Express checkout payment - last_name - empty",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC021 passed - request not processed as the last name is empty\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								}
							]
						},
						{
							"name": "sending scenarios",
							"item": [
								{
									"name": "TC022 - Express checkout payment - sending - empty",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC022 passed - request not processed as the sending is empty\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								}
							]
						},
						{
							"name": "AVS scenarios",
							"item": [
								{
									"name": "house_number",
									"item": [
										{
											"name": "TC026 - Express checkout payment - house_number",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC026 passed - request not processed as the house_number is empty\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
															"});",
															"    ",
															"}"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "paymentV2"
														}
													]
												}
											},
											"response": []
										}
									]
								},
								{
									"name": "postcode",
									"item": [
										{
											"name": "TC027 - Express checkout payment - postcode - empty",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"pm.test(\"TC027 passed - request not processed as the postcode is empty\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
															"});",
															"    ",
															"}"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "paymentV2"
														}
													]
												}
											},
											"response": []
										}
									]
								}
							]
						},
						{
							"name": "cvv scenarios",
							"item": [
								{
									"name": "TC028 - Express checkout payment - cvv - empty",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC028 passed - request not processed as the cvv is empty\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Verification required: Order value is greater than or equal to max value (1), Order is type is not delivery\");",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"12345\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": \"\",\n  \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								},
								{
									"name": "TC029 - Express checkout payment - cvv - alphabets",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC029 passed - request not processed as the cvv is invalid\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Verification required: Order value is greater than or equal to max value (1), Order is type is not delivery\");",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"12345\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": \"abcdefgh\",\n  \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								},
								{
									"name": "TC030 - Express checkout payment - cvv - special characters",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC030 passed - request not processed as the cvv is invalid\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Verification required: Order value is greater than or equal to max value (1), Order is type is not delivery\");",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"12345\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": \"!@#$%^&*()_+\",\n  \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								},
								{
									"name": "TC031 - Express checkout payment - cvv - invalid CVV",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC031 passed - request not processed as the cvv is invalid\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Card Declined\");",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"12345\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": \"000\",\n  \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								}
							]
						},
						{
							"name": "email scenarios",
							"item": [
								{
									"name": "TC032 - Express checkout payment - email - empty",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC032 passed - request not processed as the email is empty\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Request missing required params\");",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"12345\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								},
								{
									"name": "TC033 - Express checkout payment - email - alphabets",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC033 passed - request not processed as the email is invalid\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Card Declined\");",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"12345\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"abcdefgh\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								},
								{
									"name": "TC034 - Express checkout payment - email - numbers",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC034 passed - request not processed as the email is invalid\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Card Declined\");",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"12345\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"12345\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								},
								{
									"name": "TC035 - Express checkout payment - email - special characters",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC035 passed - request not processed as the email is invalid\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Card Declined\");",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"12345\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"!@#$%^&*()-_=+\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								},
								{
									"name": "TC036 - Express checkout payment - email - invalid email",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC036 passed - request not processed as the email is invalid\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"Card Declined\");",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{test_order_id_t2sapi}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"host\": \"{{test_host}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"12345\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"!@#$%^&*()-_=+\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								}
							]
						},
						{
							"name": "split scenarios",
							"item": [
								{
									"name": "Splitfee_amount_scenario",
									"item": [
										{
											"name": "Percentage scenario",
											"item": [
												{
													"name": "TC047 - Express checkout payment -  splitfee- valid percentage",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
																	"})",
																	"",
																	"if (pm.response.code == 200) {",
																	"    try {",
																	"        pm.test(\"TC046 validate the Status of sale\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"success\");",
																	"        });",
																	"        pm.test(\"TC046 validate the value type\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"value_type\")",
																	"        })",
																	"        pm.test(\"TC046 validate the amount value \", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"percentage\")",
																	"        })",
																	"         pm.test(\"TC046 validate the amount value \", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"percentage\")",
																	"        })",
																	"    } catch (e) {",
																	"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"    }",
																	"}",
																	"else {",
																	"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"}",
																	"// i46 = 0;",
																	"// let jsonData = pm.response.json();  ",
																	"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																	"// {",
																	"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																	"//         pm.collectionVariables.set(\"i46\",i46)",
																	"//     })",
																	"// }",
																	"// else",
																	"// {",
																	"//      pm.test(`${jsonData.message} is the response`, () => {",
																	"//      i46++;",
																	"//     pm.collectionVariables.set(\"i46\",i46)",
																	"//      })",
																	"// }"
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Cookie",
																"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n    \"order_id\": {{test_gateway_order_id}},\n    \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n    \"amount\": \"{{cardstream_test_amount}}\",\n    \"host\": \"{{test_host}}\",\n    \"merchant_id\": {{cardstream_test_merchant_id}},\n    \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n    \"provider\": \"FH\",\n    \"first_name\": \"QA\",\n    \"last_name\": \"Testing\",\n    \"sending\": \"to\",\n    \"address\": {\n        \"house_number\": \"6\",\n        \"flat\": \"asdf\",\n        \"address1\": \"6\",\n        \"address2\": \"asd\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"avs\": {\n        \"house_number\": \"6\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"AddressOnFile\": [],\n    \"cvv\": {{cardstream_test_cvv}},\n    \"email\": \"{{cardstream_test_email}}\",\n    \"SplitFee\": [\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n            \"type_id\": \"{{test_split_type_1}}\",\n            \"value\": \"{{test_split_amount_1}}\",\n            \"value_type\": \"{{test_split_fee_percentage_value_type}}\"\n        },\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_2}},\n            \"type_id\": \"{{test_split_type_2}}\",\n            \"value\": \"{{test_split_amount_2}}\",\n            \"value_type\": \"{{test_split_fee_percentage_value_type}}\"\n        }\n    ]\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "paymentV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC048 - Express checkout payment -  splitfee- invalid percentage value",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
																	"})",
																	"",
																	"if (pm.response.code == 200) {",
																	"    try {",
																	"        pm.test(\"TC047 validate the outcome\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"failed\");",
																	"        });",
																	"        pm.test(\"TC047 validate the message\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"value cannot be out of 0-99 range\")",
																	"        })",
																	"    } catch (e) {",
																	"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"    }",
																	"}",
																	"else {",
																	"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"}",
																	"// i47 = 0;",
																	"// let jsonData = pm.response.json();  ",
																	"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																	"// {",
																	"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																	"//         pm.collectionVariables.set(\"i47\",i47)",
																	"//     })",
																	"// }",
																	"// else",
																	"// {",
																	"//      pm.test(`${jsonData.message} is the response`, () => {",
																	"//      i47++;",
																	"//     pm.collectionVariables.set(\"i47\",i47)",
																	"//      })",
																	"// }"
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Cookie",
																"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n    \"order_id\": {{test_gateway_order_id}},\n    \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n    \"amount\": \"{{cardstream_test_amount}}\",\n    \"host\": \"{{test_host}}\",\n    \"merchant_id\": {{cardstream_test_merchant_id}},\n    \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n    \"provider\": \"FH\",\n    \"first_name\": \"QA\",\n    \"last_name\": \"Testing\",\n    \"sending\": \"to\",\n    \"address\": {\n        \"house_number\": \"6\",\n        \"flat\": \"asdf\",\n        \"address1\": \"6\",\n        \"address2\": \"asd\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"avs\": {\n        \"house_number\": \"6\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"AddressOnFile\": [],\n    \"cvv\": {{cardstream_test_cvv}},\n    \"email\": \"{{cardstream_test_email}}\",\n    \"SplitFee\": [\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n            \"type_id\": \"{{test_split_type_1}}\",\n            \"value\": \"{{test_split_amount_1}}\",\n            \"value_type\": \"{{test_split_fee_percentage_value_type}}\"\n        },\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_2}},\n            \"type_id\": \"{{test_split_type_2}}\",\n            \"value\": \"-10\",\n            \"value_type\": \"{{test_split_fee_percentage_value_type}}\"\n        }\n    ]\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "paymentV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC049 - Express checkout payment - splitfee special character",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202,500])",
																	"})",
																	"",
																	"// if (pm.response.code == 200) {",
																	"//     try {",
																	"//         pm.test(\"TC049 validate status \", function () {",
																	"//             pm.expect(pm.response.text()).to.include(\"failed\");",
																	"//         });",
																	"//         pm.test(\"TC049 validate the message\", function () {",
																	"//             pm.expect(pm.response.text()).to.include(\"value cannot be out of 0-99 range\")",
																	"//         })",
																	"//     } catch (e) {",
																	"//         pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"//     }",
																	"// }",
																	"// else {",
																	"//     pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"// }",
																	"// i49 = 0;",
																	"// let jsonData = pm.response.json();  ",
																	"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																	"// {",
																	"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																	"//         pm.collectionVariables.set(\"i49\",i49)",
																	"//     })",
																	"// }",
																	"// else",
																	"// {",
																	"//      pm.test(`${jsonData.message} is the response`, () => {",
																	"//      i49++;",
																	"//     pm.collectionVariables.set(\"i49\",i49)",
																	"//      })",
																	"// } "
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Cookie",
																"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n    \"order_id\": {{test_gateway_order_id}},\n    \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n    \"amount\": \"{{cardstream_test_amount}}\",\n    \"host\": \"{{test_host}}\",\n    \"merchant_id\": {{cardstream_test_merchant_id}},\n    \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n    \"provider\": \"FH\",\n    \"first_name\": \"QA\",\n    \"last_name\": \"Testing\",\n    \"sending\": \"to\",\n    \"address\": {\n        \"house_number\": \"6\",\n        \"flat\": \"asdf\",\n        \"address1\": \"6\",\n        \"address2\": \"asd\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"avs\": {\n        \"house_number\": \"6\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"AddressOnFile\": [],\n    \"cvv\": {{cardstream_test_cvv}},\n    \"email\": \"{{cardstream_test_email}}\",\n    \"SplitFee\": [\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n            \"type_id\": \"{{test_split_type_1}}\",\n            \"value\": \"*\",\n            \"value_type\": \"{{test_split_fee_percentage_value_type}}\"\n        },\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_2}},\n            \"type_id\": \"{{test_split_type_2}}\",\n            \"value\": \"(\",\n            \"value_type\": \"{{test_split_fee_percentage_value_type}}\"\n        }\n    ]\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "paymentV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC050 - Express checkout payment -  splitfee- with amount greater than sale",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
																	"})",
																	"",
																	"if (pm.response.code == 200) {",
																	"    try {",
																	"        pm.test(\"TC050 validate the Status of sale\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"failed\");",
																	"        });",
																	"         pm.test(\"TC050 validate the amount value \", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"Total split cannot be greater than order value\")",
																	"        })",
																	"    } catch (e) {",
																	"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"    }",
																	"}",
																	"else {",
																	"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"}",
																	"// i46 = 0;",
																	"// let jsonData = pm.response.json();  ",
																	"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																	"// {",
																	"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																	"//         pm.collectionVariables.set(\"i46\",i46)",
																	"//     })",
																	"// }",
																	"// else",
																	"// {",
																	"//      pm.test(`${jsonData.message} is the response`, () => {",
																	"//      i46++;",
																	"//     pm.collectionVariables.set(\"i46\",i46)",
																	"//      })",
																	"// }"
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Cookie",
																"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n    \"order_id\": {{test_gateway_order_id}},\n    \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n    \"amount\": \"{{cardstream_test_amount}}\",\n    \"host\": \"{{test_host}}\",\n    \"merchant_id\": {{cardstream_test_merchant_id}},\n    \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n    \"provider\": \"FH\",\n    \"first_name\": \"QA\",\n    \"last_name\": \"Testing\",\n    \"sending\": \"to\",\n    \"address\": {\n        \"house_number\": \"6\",\n        \"flat\": \"asdf\",\n        \"address1\": \"6\",\n        \"address2\": \"asd\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"avs\": {\n        \"house_number\": \"6\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"AddressOnFile\": [],\n    \"cvv\": {{cardstream_test_cvv}},\n    \"email\": \"{{cardstream_test_email}}\",\n    \"SplitFee\": [\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n            \"type_id\": \"{{test_split_type_1}}\",\n            \"value\": \"{{test_split_amount_1}}\",\n            \"value_type\": \"{{test_split_fee_percentage_value_type}}\"\n        },\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_2}},\n            \"type_id\": \"{{test_split_type_2}}\",\n            \"value\": \"100\",\n            \"value_type\": \"{{test_split_fee_percentage_value_type}}\"\n        }\n    ]\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "paymentV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC053 - Express checkout payment - decimal value splitfee",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
																	"})",
																	"",
																	"if (pm.response.code == 200) {",
																	"    try {",
																	"        pm.test(\"TC053 validate status \", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"success\");",
																	"        });",
																	"        pm.test(\"TC053 validate the message\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"value_type\")",
																	"        })",
																	"        pm.test(\"TC053 validate the amount value\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"amount\")",
																	"        })",
																	"        pm.test(\"TC053 validate the amount value\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"amount\")",
																	"        })",
																	"    } catch (e) {",
																	"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"    }",
																	"}",
																	"else {",
																	"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"}",
																	"// i53 = 0;",
																	"// let jsonData = pm.response.json();  ",
																	"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																	"// {",
																	"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																	"//         pm.collectionVariables.set(\"i53\",i53)",
																	"//     })",
																	"// }",
																	"// else",
																	"// {",
																	"//      pm.test(`${jsonData.message} is the response`, () => {",
																	"//      i53++;",
																	"//     pm.collectionVariables.set(\"i53\",i53)",
																	"//      })",
																	"// }"
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Cookie",
																"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n    \"order_id\": {{test_gateway_order_id}},\n    \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n    \"amount\": \"{{cardstream_test_amount}}\",\n    \"host\": \"{{test_host}}\",\n    \"merchant_id\": {{cardstream_test_merchant_id}},\n    \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n    \"provider\": \"FH\",\n    \"first_name\": \"QA\",\n    \"last_name\": \"Testing\",\n    \"sending\": \"to\",\n    \"address\": {\n        \"house_number\": \"6\",\n        \"flat\": \"asdf\",\n        \"address1\": \"6\",\n        \"address2\": \"asd\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"avs\": {\n        \"house_number\": \"6\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"AddressOnFile\": [],\n    \"cvv\": {{cardstream_test_cvv}},\n    \"email\": \"{{cardstream_test_email}}\",\n    \"SplitFee\": [\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n            \"type_id\": \"{{test_split_type_1}}\",\n            \"value\": \"1.05\",\n            \"value_type\": \"{{test_split_fee_percentage_value_type}}\"\n        },\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_2}},\n            \"type_id\": \"{{test_split_type_2}}\",\n            \"value\": \"12.00\",\n            \"value_type\": \"{{test_split_fee_percentage_value_type}}\"\n        }\n    ]\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "paymentV2"
																}
															]
														}
													},
													"response": []
												}
											]
										},
										{
											"name": "Amount scenario",
											"item": [
												{
													"name": "TC046 - Express checkout payment -  splitfee- valid amount",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
																	"})",
																	"",
																	"if (pm.response.code == 200) {",
																	"    try {",
																	"        pm.test(\"TC046 validate the Status of sale\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"success\");",
																	"        });",
																	"        pm.test(\"TC046 validate the value type\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"value_type\")",
																	"        })",
																	"        pm.test(\"TC046 validate the amount value \", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"amount\")",
																	"        })",
																	"         pm.test(\"TC046 validate the amount value \", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"amount\")",
																	"        })",
																	"    } catch (e) {",
																	"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"    }",
																	"}",
																	"else {",
																	"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"}",
																	"// i46 = 0;",
																	"// let jsonData = pm.response.json();  ",
																	"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																	"// {",
																	"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																	"//         pm.collectionVariables.set(\"i46\",i46)",
																	"//     })",
																	"// }",
																	"// else",
																	"// {",
																	"//      pm.test(`${jsonData.message} is the response`, () => {",
																	"//      i46++;",
																	"//     pm.collectionVariables.set(\"i46\",i46)",
																	"//      })",
																	"// }"
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Cookie",
																"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n    \"order_id\": {{test_gateway_order_id}},\n    \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n    \"amount\": \"{{cardstream_test_amount}}\",\n    \"host\": \"{{test_host}}\",\n    \"merchant_id\": {{cardstream_test_merchant_id}},\n    \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n    \"provider\": \"FH\",\n    \"first_name\": \"QA\",\n    \"last_name\": \"Testing\",\n    \"sending\": \"to\",\n    \"address\": {\n        \"house_number\": \"6\",\n        \"flat\": \"asdf\",\n        \"address1\": \"6\",\n        \"address2\": \"asd\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"avs\": {\n        \"house_number\": \"6\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"AddressOnFile\": [],\n    \"cvv\": {{cardstream_test_cvv}},\n    \"email\": \"{{cardstream_test_email}}\",\n    \"SplitFee\": [\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n            \"type_id\": \"{{test_split_type_1}}\",\n            \"value\": \"{{test_split_amount_1}}\",\n            \"value_type\": \"{{test_split_fee_amount_value_type}}\"\n        }\n    ]\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "paymentV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC047 - Express checkout payment -  splitfee- invalid amount",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
																	"})",
																	"",
																	"if (pm.response.code == 200) {",
																	"    try {",
																	"        pm.test(\"TC047 validate the outcome\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"failed\");",
																	"        });",
																	"        pm.test(\"TC047 validate the message\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"value cannot be out of 0-99 range\")",
																	"        })",
																	"    } catch (e) {",
																	"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"    }",
																	"}",
																	"else {",
																	"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"}",
																	"// i47 = 0;",
																	"// let jsonData = pm.response.json();  ",
																	"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																	"// {",
																	"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																	"//         pm.collectionVariables.set(\"i47\",i47)",
																	"//     })",
																	"// }",
																	"// else",
																	"// {",
																	"//      pm.test(`${jsonData.message} is the response`, () => {",
																	"//      i47++;",
																	"//     pm.collectionVariables.set(\"i47\",i47)",
																	"//      })",
																	"// }"
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Cookie",
																"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n    \"order_id\": {{test_gateway_order_id}},\n    \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n    \"amount\": \"{{cardstream_test_amount}}\",\n    \"host\": \"{{test_host}}\",\n    \"merchant_id\": {{cardstream_test_merchant_id}},\n    \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n    \"provider\": \"FH\",\n    \"first_name\": \"QA\",\n    \"last_name\": \"Testing\",\n    \"sending\": \"to\",\n    \"address\": {\n        \"house_number\": \"6\",\n        \"flat\": \"asdf\",\n        \"address1\": \"6\",\n        \"address2\": \"asd\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"avs\": {\n        \"house_number\": \"6\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"AddressOnFile\": [],\n    \"cvv\": {{cardstream_test_cvv}},\n    \"email\": \"{{cardstream_test_email}}\",\n    \"SplitFee\": [\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n            \"type_id\": \"{{test_split_type_1}}\",\n            \"value\": \"1\",\n            \"value_type\": \"{{test_split_fee_amount_value_type}}\"\n        },\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_2}},\n            \"type_id\": \"{{test_split_type_2}}\",\n            \"value\": \"-10.00\",\n            \"value_type\": \"{{test_split_fee_percentage_value_type}}\"\n        }\n    ]\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "paymentV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC049 - Express checkout payment - splitfee special character",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202,500])",
																	"})",
																	"",
																	"// if (pm.response.code == 200) {",
																	"//     try {",
																	"//         pm.test(\"TC049 validate status \", function () {",
																	"//             pm.expect(pm.response.text()).to.include(\"failed\");",
																	"//         });",
																	"//         pm.test(\"TC049 validate the message\", function () {",
																	"//             pm.expect(pm.response.text()).to.include(\"value cannot be 0 or lesser\")",
																	"//         })",
																	"//     } catch (e) {",
																	"//         pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"//     }",
																	"// }",
																	"// else {",
																	"//     pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"// }",
																	"// i49 = 0;",
																	"// let jsonData = pm.response.json();  ",
																	"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																	"// {",
																	"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																	"//         pm.collectionVariables.set(\"i49\",i49)",
																	"//     })",
																	"// }",
																	"// else",
																	"// {",
																	"//      pm.test(`${jsonData.message} is the response`, () => {",
																	"//      i49++;",
																	"//     pm.collectionVariables.set(\"i49\",i49)",
																	"//      })",
																	"// } "
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Cookie",
																"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n    \"order_id\": {{test_gateway_order_id}},\n    \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n    \"amount\": \"{{cardstream_test_amount}}\",\n    \"host\": \"{{test_host}}\",\n    \"merchant_id\": {{cardstream_test_merchant_id}},\n    \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n    \"provider\": \"FH\",\n    \"first_name\": \"QA\",\n    \"last_name\": \"Testing\",\n    \"sending\": \"to\",\n    \"address\": {\n        \"house_number\": \"6\",\n        \"flat\": \"asdf\",\n        \"address1\": \"6\",\n        \"address2\": \"asd\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"avs\": {\n        \"house_number\": \"6\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"AddressOnFile\": [],\n    \"cvv\": {{cardstream_test_cvv}},\n    \"email\": \"{{cardstream_test_email}}\",\n    \"SplitFee\": [\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n            \"type_id\": \"{{test_split_type_1}}\",\n            \"value\": \"(\",\n            \"value_type\": \"{{test_split_fee_amount_value_type}}\"\n        },\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_2}},\n            \"type_id\": \"{{test_split_type_2}}\",\n            \"value\": \"&\",\n            \"value_type\": \"{{test_split_fee_percentage_value_type}}\"\n        }\n    ]\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "paymentV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC050 - Express checkout payment -  splitfee- with amount greater than sale",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
																	"})",
																	"",
																	"if (pm.response.code == 200) {",
																	"    try {",
																	"        pm.test(\"TC050 validate the Status of sale\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"failed\");",
																	"        });",
																	"         pm.test(\"TC050 validate the amount value \", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"Total split cannot be greater than order value\")",
																	"        })",
																	"    } catch (e) {",
																	"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"    }",
																	"}",
																	"else {",
																	"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"}",
																	"// i46 = 0;",
																	"// let jsonData = pm.response.json();  ",
																	"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																	"// {",
																	"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																	"//         pm.collectionVariables.set(\"i46\",i46)",
																	"//     })",
																	"// }",
																	"// else",
																	"// {",
																	"//      pm.test(`${jsonData.message} is the response`, () => {",
																	"//      i46++;",
																	"//     pm.collectionVariables.set(\"i46\",i46)",
																	"//      })",
																	"// }"
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Cookie",
																"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n    \"order_id\": {{test_gateway_order_id}},\n    \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n    \"amount\": \"{{cardstream_test_amount}}\",\n    \"host\": \"{{test_host}}\",\n    \"merchant_id\": {{cardstream_test_merchant_id}},\n    \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n    \"provider\": \"FH\",\n    \"first_name\": \"QA\",\n    \"last_name\": \"Testing\",\n    \"sending\": \"to\",\n    \"address\": {\n        \"house_number\": \"6\",\n        \"flat\": \"asdf\",\n        \"address1\": \"6\",\n        \"address2\": \"asd\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"avs\": {\n        \"house_number\": \"6\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"AddressOnFile\": [],\n    \"cvv\": {{cardstream_test_cvv}},\n    \"email\": \"{{cardstream_test_email}}\",\n    \"SplitFee\": [\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n            \"type_id\": \"{{test_split_type_1}}\",\n            \"value\": \"10\",\n            \"value_type\": \"{{test_split_fee_amount_value_type}}\"\n        },\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_2}},\n            \"type_id\": \"{{test_split_type_2}}\",\n            \"value\": \"100.00\",\n            \"value_type\": \"{{test_split_fee_amount_value_type}}\"\n        }\n    ]\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "paymentV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC053 - Express checkout payment - splitfee - decimal value",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
																	"})",
																	"",
																	"if (pm.response.code == 200) {",
																	"    try {",
																	"        pm.test(\"TC053 validate status \", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"success\");",
																	"        });",
																	"        pm.test(\"TC053 validate the message\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"value_type\")",
																	"        })",
																	"        pm.test(\"TC053 validate the amount value\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"amount\")",
																	"        })",
																	"        pm.test(\"TC053 validate the amount value\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"amount\")",
																	"        })",
																	"    } catch (e) {",
																	"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"    }",
																	"}",
																	"else {",
																	"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"}",
																	"// i53 = 0;",
																	"// let jsonData = pm.response.json();  ",
																	"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																	"// {",
																	"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																	"//         pm.collectionVariables.set(\"i53\",i53)",
																	"//     })",
																	"// }",
																	"// else",
																	"// {",
																	"//      pm.test(`${jsonData.message} is the response`, () => {",
																	"//      i53++;",
																	"//     pm.collectionVariables.set(\"i53\",i53)",
																	"//      })",
																	"// }"
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Cookie",
																"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n    \"order_id\": {{test_gateway_order_id}},\n    \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n    \"amount\": \"{{cardstream_test_amount}}\",\n    \"host\": \"{{test_host}}\",\n    \"merchant_id\": {{cardstream_test_merchant_id}},\n    \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n    \"provider\": \"FH\",\n    \"first_name\": \"QA\",\n    \"last_name\": \"Testing\",\n    \"sending\": \"to\",\n    \"address\": {\n        \"house_number\": \"6\",\n        \"flat\": \"asdf\",\n        \"address1\": \"6\",\n        \"address2\": \"asd\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"avs\": {\n        \"house_number\": \"6\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"AddressOnFile\": [],\n    \"cvv\": {{cardstream_test_cvv}},\n    \"email\": \"{{cardstream_test_email}}\",\n    \"SplitFee\": [\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n            \"type_id\": \"{{test_split_type_1}}\",\n            \"value\": \"1.05\",\n            \"value_type\": \"{{test_split_fee_amount_value_type}}\"\n        },\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_2}},\n            \"type_id\": \"{{test_split_type_2}}\",\n            \"value\": \"10.00\",\n            \"value_type\": \"{{test_split_fee_amount_value_type}}\"\n        }\n    ]\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "paymentV2"
																}
															]
														}
													},
													"response": []
												},
												{
													"name": "TC054 - Express checkout payment - valid splitfee - amount and percentage",
													"event": [
														{
															"listen": "test",
															"script": {
																"exec": [
																	"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
																	"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
																	"})",
																	"",
																	"if (pm.response.code == 200) {",
																	"    try {",
																	"        pm.test(\"TC054 validate status \", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"success\");",
																	"        });",
																	"        pm.test(\"TC054 validate the message\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"value_type\")",
																	"        })",
																	"        pm.test(\"TC054 validate the amount\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"amount\")",
																	"        })",
																	"        pm.test(\"TC054 validate the amount\", function () {",
																	"            pm.expect(pm.response.text()).to.include(\"percentage\")",
																	"        })",
																	"    } catch (e) {",
																	"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"    }",
																	"} else {",
																	"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
																	"}",
																	"// i54 = 0;",
																	"// let jsonData = pm.response.json();  ",
																	"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
																	"// {",
																	"//         pm.test(`${jsonData.outcome} is the response`, () => {",
																	"//         pm.collectionVariables.set(\"i54\",i54)",
																	"//     })",
																	"// }",
																	"// else",
																	"// {",
																	"//      pm.test(`${jsonData.message} is the response`, () => {",
																	"//      i54++;",
																	"//     pm.collectionVariables.set(\"i54\",i54)",
																	"//      })",
																	"// }"
																],
																"type": "text/javascript"
															}
														}
													],
													"request": {
														"method": "POST",
														"header": [
															{
																"key": "Content-Type",
																"value": "application/json"
															},
															{
																"key": "api_token",
																"value": "{{test_php_key}}"
															},
															{
																"key": "qa-auth",
																"value": "{{test_qa_auth}}",
																"type": "text"
															},
															{
																"key": "Cookie",
																"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
															}
														],
														"body": {
															"mode": "raw",
															"raw": "{\n    \"order_id\": {{test_gateway_order_id}},\n    \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n    \"amount\": \"{{cardstream_test_amount}}\",\n    \"host\": \"{{test_host}}\",\n    \"merchant_id\": {{cardstream_test_merchant_id}},\n    \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n    \"provider\": \"FH\",\n    \"first_name\": \"QA\",\n    \"last_name\": \"Testing\",\n    \"sending\": \"to\",\n    \"address\": {\n        \"house_number\": \"6\",\n        \"flat\": \"asdf\",\n        \"address1\": \"6\",\n        \"address2\": \"asd\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"avs\": {\n        \"house_number\": \"6\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"AddressOnFile\": [],\n    \"cvv\": {{cardstream_test_cvv}},\n    \"email\": \"{{cardstream_test_email}}\",\n    \"SplitFee\": [\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n            \"type_id\": \"{{test_split_type_1}}\",\n            \"value\": \"10.00\",\n            \"value_type\": \"{{test_split_fee_amount_value_type}}\"\n        },\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_2}},\n            \"type_id\": \"{{test_split_type_2}}\",\n            \"value\": \"60.00\",\n            \"value_type\": \"{{test_split_fee_percentage_value_type}}\"\n        }\n    ]\n}"
														},
														"url": {
															"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
															"host": [
																"{{test_php_endpoint}}"
															],
															"path": [
																"api2.php"
															],
															"query": [
																{
																	"key": "action",
																	"value": "paymentV2"
																}
															]
														}
													},
													"response": []
												}
											]
										}
									]
								},
								{
									"name": "Splitfee_value_type_scenario",
									"item": [
										{
											"name": "TC060- Express checkout payment - value_type - invalid value type",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
															"})",
															"",
															"if (pm.response.code == 200) {",
															"    try {",
															"        pm.test(\"TC060 validate the status of transaction\", function () {",
															"            pm.expect(pm.response.text()).to.include(\"failed\");",
															"        });",
															"        pm.test(\"TC059 validate the value type\", function () {",
															"            pm.expect(pm.response.text()).to.include(\"Invalid value_type\");",
															"        })",
															"    } catch (e) {",
															"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
															"    }",
															"}",
															"else {",
															"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
															"}",
															"// i60 = 0;",
															"// let jsonData = pm.response.json();  ",
															"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
															"// {",
															"//         pm.test(`${jsonData.outcome} is the response`, () => {",
															"//         pm.collectionVariables.set(\"i60\",i60)",
															"//     })",
															"// }",
															"// else",
															"// {",
															"//      pm.test(`${jsonData.message} is the response`, () => {",
															"//      i60++;",
															"//     pm.collectionVariables.set(\"i60\",i60)",
															"//      })",
															"// }"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n    \"order_id\": {{test_gateway_order_id}},\n    \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n    \"amount\": \"{{cardstream_test_amount}}\",\n    \"host\": \"{{test_host}}\",\n    \"merchant_id\": {{cardstream_test_merchant_id}},\n    \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n    \"provider\": \"FH\",\n    \"first_name\": \"QA\",\n    \"last_name\": \"Testing\",\n    \"sending\": \"to\",\n    \"address\": {\n        \"house_number\": \"6\",\n        \"flat\": \"asdf\",\n        \"address1\": \"6\",\n        \"address2\": \"asd\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"avs\": {\n        \"house_number\": \"6\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"AddressOnFile\": [],\n    \"cvv\": {{cardstream_test_cvv}},\n    \"email\": \"{{cardstream_test_email}}\",\n    \"SplitFee\": [\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n            \"type_id\": \"{{test_split_type_1}}\",\n            \"value\": {{test_split_amount_1}},\n            \"value_type\": \"a\"\n        },\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_2}},\n            \"type_id\": \"{{test_split_type_2}}\",\n            \"value\": {{test_split_amount_2}},\n            \"value_type\": \"b\"\n        }\n    ]\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "paymentV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC062-Express checkout payment-value_type-decimal invalid valuetype",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
															"})",
															"",
															"if (pm.response.code == 200) {",
															"    try {",
															"        pm.test(\"TC062 validate the status of transaction\", function () {",
															"            pm.expect(pm.response.text()).to.include(\"failed\");",
															"        });",
															"        pm.test(\"TC062 validate the value type\", function () {",
															"            pm.expect(pm.response.text()).to.include(\"Invalid value_type\");",
															"        })",
															"    } catch (e) {",
															"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
															"    }",
															"}",
															"else {",
															"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
															"}",
															"// i1 = 0;",
															"// let jsonData = pm.response.json();  ",
															"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
															"// {",
															"//         pm.test(`${jsonData.outcome} is the response`, () => {",
															"//         pm.collectionVariables.set(\"i1\",i1)",
															"//     })",
															"// }",
															"// else",
															"// {",
															"//      pm.test(`${jsonData.message} is the response`, () => {",
															"//      i1++;",
															"//     pm.collectionVariables.set(\"i1\",i1)",
															"//      })",
															"// }"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n    \"order_id\": {{test_gateway_order_id}},\n    \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n    \"amount\": \"{{cardstream_test_amount}}\",\n    \"host\": \"{{test_host}}\",\n    \"merchant_id\": {{cardstream_test_merchant_id}},\n    \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n    \"provider\": \"FH\",\n    \"first_name\": \"QA\",\n    \"last_name\": \"Testing\",\n    \"sending\": \"to\",\n    \"address\": {\n        \"house_number\": \"6\",\n        \"flat\": \"asdf\",\n        \"address1\": \"6\",\n        \"address2\": \"asd\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"avs\": {\n        \"house_number\": \"6\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"AddressOnFile\": [],\n    \"cvv\": {{cardstream_test_cvv}},\n    \"email\": \"{{cardstream_test_email}}\",\n    \"SplitFee\": [\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n            \"type_id\": \"{{test_split_type_1}}\",\n            \"value\": {{test_split_amount_1}},\n            \"value_type\": \"4.5\"\n        },\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_2}},\n            \"type_id\": \"{{test_split_type_2}}\",\n            \"value\": {{test_split_amount_2}},\n            \"value_type\": \"1.1\"\n        }\n    ]\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "paymentV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC066-Express checkout payment-value_type-empty space",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
															"})",
															"",
															"if (pm.response.code == 200) {",
															"    try {",
															"        pm.test(\"TC066 validate the status of transaction\", function () {",
															"            pm.expect(pm.response.text()).to.include(\"failed\");",
															"        });",
															"        pm.test(\"TC066 validate the value type\", function () {",
															"            pm.expect(pm.response.text()).to.include(\"Invalid value_type\");",
															"        })",
															"    } catch (e) {",
															"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
															"    }",
															"}",
															"else {",
															"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
															"}",
															"// i66 = 0;",
															"// let jsonData = pm.response.json();  ",
															"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
															"// {",
															"//         pm.test(`${jsonData.outcome} is the response`, () => {",
															"//         pm.collectionVariables.set(\"i66\",i66)",
															"//     })",
															"// }",
															"// else",
															"// {",
															"//      pm.test(`${jsonData.message} is the response`, () => {",
															"//      i66++;",
															"//     pm.collectionVariables.set(\"i66\",i66)",
															"//      })",
															"// }"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n    \"order_id\": {{test_gateway_order_id}},\n    \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n    \"amount\": \"{{cardstream_test_amount}}\",\n    \"host\": \"{{test_host}}\",\n    \"merchant_id\": {{cardstream_test_merchant_id}},\n    \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n    \"provider\": \"FH\",\n    \"first_name\": \"QA\",\n    \"last_name\": \"Testing\",\n    \"sending\": \"to\",\n    \"address\": {\n        \"house_number\": \"6\",\n        \"flat\": \"asdf\",\n        \"address1\": \"6\",\n        \"address2\": \"asd\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"avs\": {\n        \"house_number\": \"6\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"AddressOnFile\": [],\n    \"cvv\": {{cardstream_test_cvv}},\n    \"email\": \"{{cardstream_test_email}}\",\n    \"SplitFee\": [\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n            \"type_id\": \"{{test_split_type_1}}\",\n            \"value\": {{test_split_amount_1}},\n            \"value_type\": \"  \"\n        },\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_2}},\n            \"type_id\": \"{{test_split_type_2}}\",\n            \"value\": {{test_split_amount_2}},\n            \"value_type\": \"  \"\n        }\n    ]\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "paymentV2"
														}
													]
												}
											},
											"response": []
										}
									]
								},
								{
									"name": "Splitfee-partner_merchant_id_scenario",
									"item": [
										{
											"name": "TC069-Express checkout payment- valid partner_merchant_id",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
															"})",
															"",
															"if (pm.response.code == 200) {",
															"    try {",
															"        pm.test(\"TC069 validate the status of transaction\", function () {",
															"            pm.expect(pm.response.text()).to.include(\"success\");",
															"        });",
															"        pm.test(\"TC069 validate the first value type\", function () {",
															"            pm.expect(pm.response.text()).to.include(\"percentage\");",
															"        })",
															"        pm.test(\"TC069 validate the second value type\", function () {",
															"            pm.expect(pm.response.text()).to.include(\"amount\");",
															"        })",
															"        pm.test(\"TC06 validate the value of first type\", function () {",
															"            pm.expect(pm.response.text()).to.include(\"10\")",
															"        })",
															"        pm.test(\"TC069 validate the value of second type\", function () {",
															"            pm.expect(pm.response.text()).to.include(\"2\")",
															"        })",
															"    } catch (e) {",
															"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
															"    }",
															"}",
															"else {",
															"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
															"}",
															"// i1 = 0;",
															"// let jsonData = pm.response.json();  ",
															"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
															"// {",
															"//         pm.test(`${jsonData.outcome} is the response`, () => {",
															"//         pm.collectionVariables.set(\"i1\",i1)",
															"//     })",
															"// }",
															"// else",
															"// {",
															"//      pm.test(`${jsonData.message} is the response`, () => {",
															"//      i1++;",
															"//     pm.collectionVariables.set(\"i1\",i1)",
															"//      })",
															"// }"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n    \"order_id\": {{test_gateway_order_id}},\n    \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n    \"amount\": \"{{cardstream_test_amount}}\",\n    \"host\": \"{{test_host}}\",\n    \"merchant_id\": {{cardstream_test_merchant_id}},\n    \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n    \"provider\": \"FH\",\n    \"first_name\": \"QA\",\n    \"last_name\": \"Testing\",\n    \"sending\": \"to\",\n    \"address\": {\n        \"house_number\": \"6\",\n        \"flat\": \"asdf\",\n        \"address1\": \"6\",\n        \"address2\": \"asd\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"avs\": {\n        \"house_number\": \"6\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"AddressOnFile\": [],\n    \"cvv\": {{cardstream_test_cvv}},\n    \"email\": \"{{cardstream_test_email}}\",\n    \"SplitFee\": [\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n            \"type_id\": \"{{test_split_type_1}}\",\n            \"value\": {{test_split_amount_1}},\n            \"value_type\": \"{{test_split_fee_percentage_value_type}}\"\n        },\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_2}},\n            \"type_id\": \"{{test_split_type_2}}\",\n            \"value\": {{test_split_amount_2}},\n            \"value_type\": \"{{test_split_fee_amount_value_type}}\"\n        }\n    ]\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "paymentV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC070-Express checkout payment - invalid partner_merchant_id",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
															"})",
															"",
															"if(pm.response.code==200)",
															"{",
															"    try{",
															"pm.test(\"TC070 validate the status of transaction\", function () {",
															"    pm.expect(pm.response.text()).to.include(\"failed\");",
															"});",
															"    pm.test(\"TC070 validate partner merchant id\", function(){",
															"        pm.expect(pm.response.text()).to.include(\"is not a valid partner merchant id\");",
															"    })",
															"    }catch(e){",
															"        pm.test(\"fail\", ()=>{throw new Error(\"error\")});",
															"    }",
															"}",
															"// i1 = 0;",
															"// let jsonData = pm.response.json();  ",
															"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
															"// {",
															"//         pm.test(`${jsonData.outcome} is the response`, () => {",
															"//         pm.collectionVariables.set(\"i1\",i1)",
															"//     })",
															"// }",
															"// else",
															"// {",
															"//      pm.test(`${jsonData.message} is the response`, () => {",
															"//      i1++;",
															"//     pm.collectionVariables.set(\"i1\",i1)",
															"//      })",
															"// }",
															"// }"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n    \"order_id\": {{test_gateway_order_id}},\n    \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n    \"amount\": \"{{cardstream_test_amount}}\",\n    \"host\": \"{{test_host}}\",\n    \"merchant_id\": {{cardstream_test_merchant_id}},\n    \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n    \"provider\": \"FH\",\n    \"first_name\": \"QA\",\n    \"last_name\": \"Testing\",\n    \"sending\": \"to\",\n    \"address\": {\n        \"house_number\": \"6\",\n        \"flat\": \"asdf\",\n        \"address1\": \"6\",\n        \"address2\": \"asd\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"avs\": {\n        \"house_number\": \"6\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"AddressOnFile\": [],\n    \"cvv\": {{cardstream_test_cvv}},\n    \"email\": \"{{cardstream_test_email}}\",\n    \"SplitFee\": [\n        {\n            \"partner_merchant_id\": 1234567890,\n            \"type_id\": \"{{test_split_type_1}}\",\n            \"value\": {{test_split_amount_1}},\n            \"value_type\": \"{{test_split_fee_percentage_value_type}}\"\n        },\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_2}},\n            \"type_id\": \"{{test_split_type_2}}\",\n            \"value\": {{test_split_amount_2}},\n            \"value_type\": \"{{test_split_fee_amount_value_type}}\"\n        }\n    ]\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "paymentV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC072-Express checkout payment- special-character - partner_merchant_id",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
															"})",
															"",
															"if (pm.response.code == 200) {",
															"    try {",
															"        pm.test(\"TC072 validate the status of transaction\", function () {",
															"            pm.expect(pm.response.text()).to.include(\"failed\");",
															"        });",
															"        pm.test(\"TC072 validate partner merchant id\", function () {",
															"            pm.expect(pm.response.text()).to.include(\"is not a valid partner merchant id\");",
															"        })",
															"    } catch (e) {",
															"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
															"    }",
															"}",
															"else {",
															"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
															"}",
															"// i1 = 0;",
															"// let jsonData = pm.response.json();  ",
															"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
															"// {",
															"//         pm.test(`${jsonData.outcome} is the response`, () => {",
															"//         pm.collectionVariables.set(\"i1\",i1)",
															"//     })",
															"// }",
															"// else",
															"// {",
															"//      pm.test(`${jsonData.message} is the response`, () => {",
															"//      i1++;",
															"//     pm.collectionVariables.set(\"i1\",i1)",
															"//      })",
															"// }"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n    \"order_id\": {{test_gateway_order_id}},\n    \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n    \"amount\": \"{{cardstream_test_amount}}\",\n    \"host\": \"{{test_host}}\",\n    \"merchant_id\": {{cardstream_test_merchant_id}},\n    \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n    \"provider\": \"FH\",\n    \"first_name\": \"QA\",\n    \"last_name\": \"Testing\",\n    \"sending\": \"to\",\n    \"address\": {\n        \"house_number\": \"6\",\n        \"flat\": \"asdf\",\n        \"address1\": \"6\",\n        \"address2\": \"asd\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"avs\": {\n        \"house_number\": \"6\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"AddressOnFile\": [],\n    \"cvv\": {{cardstream_test_cvv}},\n    \"email\": \"{{cardstream_test_email}}\",\n    \"SplitFee\": [\n        {\n            \"partner_merchant_id\": \"(\",\n            \"type_id\": \"{{test_split_type_1}}\",\n            \"value\": {{test_split_amount_1}},\n            \"value_type\": \"{{test_split_fee_percentage_value_type}}\"\n        },\n        {\n            \"partner_merchant_id\": \"*\",\n            \"type_id\": \"{{test_split_type_2}}\",\n            \"value\": {{test_split_amount_2}},\n            \"value_type\": \"{{test_split_fee_amount_value_type}}\"\n        }\n    ]\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "paymentV2"
														}
													]
												}
											},
											"response": []
										}
									]
								},
								{
									"name": "Splitfee_type_id_scenario",
									"item": [
										{
											"name": "TC038 - Express checkout payment - type_id - invalid",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
															"})",
															"",
															"if (pm.response.code == 200) {",
															"    try {",
															"        pm.test(\"TC038 passed - validating the status of test case\", function () {",
															"            pm.expect(pm.response.text()).to.include(\"failed\");",
															"        });",
															"        {",
															"            pm.test(\"TC038 validating text message\", function () {",
															"                pm.expect(pm.response.text()).to.include(\"Invalid type_id\")",
															"            })",
															"        }",
															"    } catch (e) {",
															"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
															"    }",
															"}",
															"else {",
															"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
															"}",
															"// i1 = 0;",
															"// let jsonData = pm.response.json();  ",
															"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
															"// {",
															"//         pm.test(`${jsonData.outcome} is the response`, () => {",
															"//         pm.collectionVariables.set(\"i1\",i1)",
															"//     })",
															"// }",
															"// else",
															"// {",
															"//      pm.test(`${jsonData.message} is the response`, () => {",
															"//      i1++;",
															"//     pm.collectionVariables.set(\"i1\",i1)",
															"//      })",
															"// }"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n    \"order_id\": {{test_gateway_order_id}},\n    \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n    \"amount\": \"{{cardstream_test_amount}}\",\n    \"host\": \"{{test_host}}\",\n    \"merchant_id\": {{cardstream_test_merchant_id}},\n    \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n    \"provider\": \"FH\",\n    \"first_name\": \"QA\",\n    \"last_name\": \"Testing\",\n    \"sending\": \"to\",\n    \"address\": {\n        \"house_number\": \"6\",\n        \"flat\": \"asdf\",\n        \"address1\": \"6\",\n        \"address2\": \"asd\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"avs\": {\n        \"house_number\": \"6\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"AddressOnFile\": [],\n    \"cvv\": {{cardstream_test_cvv}},\n    \"email\": \"{{cardstream_test_email}}\",\n    \"SplitFee\": [\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n            \"type_id\": \"7\",\n            \"value\": {{test_split_amount_1}},\n            \"value_type\": \"{{test_split_fee_percentage_value_type}}\"\n        },\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_2}},\n            \"type_id\": \"9\",\n            \"value\": {{test_split_amount_2}},\n            \"value_type\": \"{{test_split_fee_amount_value_type}}\"\n        }\n\n    ]\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "paymentV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC040 - Express checkout payment - type_id - special characters",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
															"})",
															"",
															"if (pm.response.code == 200) {",
															"    try {",
															"        pm.test(\"TC040 validating the status\", function () {",
															"            pm.expect(pm.response.text()).to.include(\"failed\");",
															"        });",
															"        pm.test(\"TC040 validating the split fee type id passed\", function () {",
															"            pm.expect(pm.response.text()).to.include(\"Invalid type_id\")",
															"        })",
															"    } catch (e) {",
															"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
															"    }",
															"} else {",
															"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
															"}",
															"// i1 = 0;",
															"// let jsonData = pm.response.json();  ",
															"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
															"// {",
															"//         pm.test(`${jsonData.outcome} is the response`, () => {",
															"//         pm.collectionVariables.set(\"i1\",i1)",
															"//     })",
															"// }",
															"// else",
															"// {",
															"//      pm.test(`${jsonData.message} is the response`, () => {",
															"//      i1++;",
															"//     pm.collectionVariables.set(\"i1\",i1)",
															"//      })",
															"// }"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n    \"order_id\": {{test_gateway_order_id}},\n    \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n    \"amount\": \"{{cardstream_test_amount}}\",\n    \"host\": \"{{test_host}}\",\n    \"merchant_id\": {{cardstream_test_merchant_id}},\n    \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n    \"provider\": \"FH\",\n    \"first_name\": \"QA\",\n    \"last_name\": \"Testing\",\n    \"sending\": \"to\",\n    \"address\": {\n        \"house_number\": \"6\",\n        \"flat\": \"asdf\",\n        \"address1\": \"6\",\n        \"address2\": \"asd\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"avs\": {\n        \"house_number\": \"6\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"AddressOnFile\": [],\n    \"cvv\": {{cardstream_test_cvv}},\n    \"email\": \"{{cardstream_test_email}}\",\n    \"SplitFee\": [\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n            \"type_id\": \"*\",\n            \"value\": {{test_split_amount_1}},\n            \"value_type\": \"{{test_split_fee_percentage_value_type}}\"\n        },\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_2}},\n            \"type_id\": \"a\",\n            \"value\": {{test_split_amount_2}},\n            \"value_type\": \"{{test_split_fee_amount_value_type}}\"\n        }\n\n    ]\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "paymentV2"
														}
													]
												}
											},
											"response": []
										},
										{
											"name": "TC042 - Express checkout payment - type_id - empty",
											"event": [
												{
													"listen": "test",
													"script": {
														"exec": [
															"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
															"    pm.expect(pm.response.code).to.be.oneOf([200, 201, 202])",
															"})",
															"",
															"if (pm.response.code == 200) {",
															"    try {",
															"        pm.test(\"TC042 validating the satus\", function () {",
															"            pm.expect(pm.response.text()).to.include(\"failed\");",
															"        });",
															"        pm.test(\"TC042 validating the type id passed\", function () {",
															"            pm.expect(pm.response.text()).to.include(\"Invalid type_id\");",
															"        });",
															"    } catch (e) {",
															"        pm.test(\"fail\", () => { throw new Error(\"error\") });",
															"    }",
															"} else {",
															"    pm.test(\"fail\", () => { throw new Error(\"error\") });",
															"}",
															"// i1 = 0;",
															"// let jsonData = pm.response.json();  ",
															"// if (jsonData.outcome === \"success\" && jsonData.SplitFeeStatus.outcome === \"success\") ",
															"// {",
															"//         pm.test(`${jsonData.outcome} is the response`, () => {",
															"//         pm.collectionVariables.set(\"i1\",i1)",
															"//     })",
															"// }",
															"// else",
															"// {",
															"//      pm.test(`${jsonData.message} is the response`, () => {",
															"//      i1++;",
															"//     pm.collectionVariables.set(\"i1\",i1)",
															"//      })",
															"// }"
														],
														"type": "text/javascript"
													}
												}
											],
											"request": {
												"method": "POST",
												"header": [
													{
														"key": "Content-Type",
														"value": "application/json"
													},
													{
														"key": "api_token",
														"value": "{{test_php_key}}"
													},
													{
														"key": "qa-auth",
														"value": "{{test_qa_auth}}",
														"type": "text"
													},
													{
														"key": "Cookie",
														"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
													}
												],
												"body": {
													"mode": "raw",
													"raw": "{\n    \"order_id\": {{test_gateway_order_id}},\n    \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n    \"amount\": \"{{cardstream_test_amount}}\",\n    \"host\": \"{{test_host}}\",\n    \"merchant_id\": {{cardstream_test_merchant_id}},\n    \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n    \"provider\": \"FH\",\n    \"first_name\": \"QA\",\n    \"last_name\": \"Testing\",\n    \"sending\": \"to\",\n    \"address\": {\n        \"house_number\": \"6\",\n        \"flat\": \"asdf\",\n        \"address1\": \"6\",\n        \"address2\": \"asd\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"avs\": {\n        \"house_number\": \"6\",\n        \"postcode\": \"{{cardstream_test_postcode}}\"\n    },\n    \"AddressOnFile\": [],\n    \"cvv\": {{cardstream_test_cvv}},\n    \"email\": \"{{cardstream_test_email}}\",\n    \"SplitFee\": [\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_1}},\n            \"type_id\": \"  \",\n            \"value\": {{test_split_amount_1}},\n            \"value_type\": \"{{test_split_fee_percentage_value_type}}\"\n        },\n        {\n            \"partner_merchant_id\": {{test_partner_merchant_id_2}},\n            \"type_id\": \" \",\n            \"value\": {{test_split_amount_2}},\n            \"value_type\": \"{{test_split_fee_amount_value_type}}\"\n        }\n\n    ]\n}"
												},
												"url": {
													"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
													"host": [
														"{{test_php_endpoint}}"
													],
													"path": [
														"api2.php"
													],
													"query": [
														{
															"key": "action",
															"value": "paymentV2"
														}
													]
												}
											},
											"response": []
										}
									]
								}
							]
						},
						{
							"name": "webhook_url scenarios",
							"item": [
								{
									"name": "TC046 - Express checkout payment - Empty webhook_url",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC046 passed - Sale is not failing when passing empty webhook url\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"success\");",
													"",
													"",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										},
										{
											"listen": "prerequest",
											"script": {
												"exec": [
													"pm.collectionVariables.set(\"valid_order_id\", _.random (100000,2000000));"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{valid_order_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								},
								{
									"name": "TC047 - Express checkout payment - invalid webhook_url",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC046 passed - Sale is not failing when passing invalid webhook url\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"success\");",
													"    ",
													"",
													"    var jsonData = JSON.parse(responseBody);",
													"pm.expect(jsonData.message).contains(\"Invalid WebhookUrl provided\")",
													"",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										},
										{
											"listen": "prerequest",
											"script": {
												"exec": [
													"pm.collectionVariables.set(\"valid_order_id\", _.random (100000,2000000));"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{valid_order_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"abc\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								}
							]
						},
						{
							"name": "customer_id scenarios",
							"item": [
								{
									"name": "TC048 - Express checkout payment - Empty customer_id",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC046 passed - Sale is not failing when passing empty customer_id\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"success\");",
													"",
													"",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										},
										{
											"listen": "prerequest",
											"script": {
												"exec": [
													"pm.collectionVariables.set(\"valid_order_id\", _.random (100000,2000000));"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{valid_order_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"{{test_shopper_id}}\",\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								},
								{
									"name": "TC047 - Express checkout payment - invalid customer_id",
									"event": [
										{
											"listen": "test",
											"script": {
												"exec": [
													"pm.test(`Status code check - Status Code was: ${pm.response.code}`, () => {",
													"    pm.expect(pm.response.code).to.be.oneOf([200,201,202])",
													"})",
													"",
													"if(pm.response.code==200)",
													"{",
													"pm.test(\"TC046 passed - Sale is not failing when passing invalid customer_id\", function () {",
													"    pm.expect(pm.response.text()).to.include(\"success\");",
													"",
													"",
													"});",
													"    ",
													"}"
												],
												"type": "text/javascript"
											}
										},
										{
											"listen": "prerequest",
											"script": {
												"exec": [
													"pm.collectionVariables.set(\"valid_order_id\", _.random (100000,2000000));"
												],
												"type": "text/javascript"
											}
										}
									],
									"request": {
										"method": "POST",
										"header": [
											{
												"key": "Content-Type",
												"value": "application/json"
											},
											{
												"key": "api_token",
												"value": "{{test_php_key}}"
											},
											{
												"key": "qa-auth",
												"value": "{{test_qa_auth}}",
												"type": "text"
											},
											{
												"key": "Cookie",
												"value": "__cfduid=d55a3661cb27d0c23bcd3b47ba6bca6251601221625"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n  \"order_id\": {{valid_order_id}},\n  \"merchantTokenId\": \"{{cardstream_test_master_token}}\",\n  \"amount\": \"{{cardstream_test_t2sapi_amount}}\",\n  \"merchant_id\": {{cardstream_test_merchant_id}},\n  \"WebhookUrl\": \"{{test_webhook_url}}\",\n  \"customer_id\": \"abc\",\n  \"provider\": \"FH\",\n  \"first_name\": \"QA\",\n  \"last_name\": \"Testing\",\n  \"sending\": \"to\",\n  \"address\": {\n    \"house_number\": \"6\",\n    \"flat\": \"asdf\",\n    \"address1\": \"6\",\n    \"address2\": \"asd\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"avs\": {\n    \"house_number\": \"6\",\n    \"postcode\": \"{{cardstream_test_postcode}}\"\n  },\n  \"AddressOnFile\": [\n    \n  ],\n  \"cvv\": {{cardstream_test_cvv}},\n  \"email\": \"{{cardstream_test_email}}\"\n}"
										},
										"url": {
											"raw": "{{test_php_endpoint}}/api2.php?action=paymentV2",
											"host": [
												"{{test_php_endpoint}}"
											],
											"path": [
												"api2.php"
											],
											"query": [
												{
													"key": "action",
													"value": "paymentV2"
												}
											]
										}
									},
									"response": []
								}
							]
						}
					]
				}
			]
		}
	]
}