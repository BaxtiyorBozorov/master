export const swaggerUploadPicture = {
    description: 'Profile picture upload',
    required: true,
    schema: {
        type: 'object',
        properties: {
            picture: {
                type: 'string',
                format: 'binary', // Indicates a file upload
            },
        },
    },
};
