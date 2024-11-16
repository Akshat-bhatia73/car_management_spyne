import { createSwaggerSpec } from 'next-swagger-doc';

export async function GET() {
  const spec = createSwaggerSpec({
    apiFolder: 'app/api',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Car Management API',
        version: '1.0.0',
        description: 'API documentation for the Car Management System using Clerk Authentication',
      },
      servers: [
        {
          url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
          description: 'API Server',
        },
      ],
      components: {
        schemas: {
          Car: {
            type: 'object',
            required: ['title', 'description', 'images', 'tags'],
            properties: {
              _id: {
                type: 'string',
                description: 'Auto-generated MongoDB ID',
              },
              title: {
                type: 'string',
                description: 'Car title',
                minLength: 3,
              },
              description: {
                type: 'string',
                description: 'Car description',
                minLength: 10,
              },
              images: {
                type: 'array',
                items: {
                  type: 'string',
                  format: 'uri',
                },
                description: 'Array of image URLs',
                minItems: 1,
                maxItems: 10,
              },
              tags: {
                type: 'object',
                required: ['car_type', 'company', 'dealer'],
                properties: {
                  car_type: {
                    type: 'string',
                    description: 'Type of car (e.g., SUV, Sedan)',
                  },
                  company: {
                    type: 'string',
                    description: 'Car manufacturer',
                  },
                  dealer: {
                    type: 'string',
                    description: 'Dealer name',
                  },
                },
              },
              userId: {
                type: 'string',
                description: 'Clerk user ID',
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
              },
              updatedAt: {
                type: 'string',
                format: 'date-time',
              },
            },
          },
          Error: {
            type: 'object',
            properties: {
              error: {
                type: 'string',
              },
            },
          },
        },
        securitySchemes: {
          clerkAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: 'Clerk session token',
          },
        },
      },
      security: [{ clerkAuth: [] }],
      paths: {
        '/api/cars': {
          get: {
            summary: 'Get all cars',
            description: 'Retrieve all cars for the authenticated user with optional search',
            parameters: [
              {
                name: 'search',
                in: 'query',
                description: 'Search term to filter cars',
                required: false,
                schema: {
                  type: 'string',
                },
              },
            ],
            responses: {
              200: {
                description: 'List of cars',
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Car',
                      },
                    },
                  },
                },
              },
              401: {
                description: 'Unauthorized',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Error',
                    },
                  },
                },
              },
              500: {
                description: 'Server error',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Error',
                    },
                  },
                },
              },
            },
          },
          post: {
            summary: 'Create a new car',
            description: 'Create a new car for the authenticated user',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Car',
                  },
                },
              },
            },
            responses: {
              201: {
                description: 'Car created successfully',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Car',
                    },
                  },
                },
              },
              400: {
                description: 'Validation error',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Error',
                    },
                  },
                },
              },
              401: {
                description: 'Unauthorized',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Error',
                    },
                  },
                },
              },
            },
          },
        },
        '/api/cars/{id}': {
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'Car ID',
              schema: {
                type: 'string',
              },
            },
          ],
          get: {
            summary: 'Get a car by ID',
            description: 'Retrieve a specific car by its ID',
            responses: {
              200: {
                description: 'Car details',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Car',
                    },
                  },
                },
              },
              404: {
                description: 'Car not found',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Error',
                    },
                  },
                },
              },
            },
          },
          patch: {
            summary: 'Update a car',
            description: 'Update an existing car',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Car',
                  },
                },
              },
            },
            responses: {
              200: {
                description: 'Car updated successfully',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Car',
                    },
                  },
                },
              },
              404: {
                description: 'Car not found',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Error',
                    },
                  },
                },
              },
            },
          },
          delete: {
            summary: 'Delete a car',
            description: 'Delete an existing car',
            responses: {
              200: {
                description: 'Car deleted successfully',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: {
                          type: 'boolean',
                        },
                      },
                    },
                  },
                },
              },
              404: {
                description: 'Car not found',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Error',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return Response.json(spec);
} 