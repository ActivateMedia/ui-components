# Spritz UI Components

This package provides shareable, small UI components designed for Spritz partners. These components aim to enhance user experience by offering easy-to-integrate, visually appealing elements for your applications. Use this package to streamline your development process, ensuring a consistent and polished interface across your projects.

### The Primary Benefits of This Package

1. **Enhanced User Experience:** The package offers visually appealing and user-friendly UI components, ensuring a better user interface for your applications.

2. **Easy Integration:** Designed for simplicity, these components can be seamlessly integrated into your projects, saving you time and effort.

3. **Consistency:** Achieve a uniform look and feel across your applications with standardized components, enhancing brand consistency.

4. **Efficiency:** Streamline your development process by utilizing pre-built components, allowing you to focus on core functionality.

5. **Customization:** Easily customizable components to fit the specific needs of your project, providing flexibility without compromising on quality.

## Compatibility

node: >= 18.x.x,  
next.js: >= 13.x.x,
react.js: >= 18.x.x

## Installation

To install this package use:

```bash
 npm install file:/path/to/your/package/ui-components
```

## Quick start

Read below section to know about how to use these components in your project.

```Javascript
const Hapi = require('@hapi/hapi');

(async () => {
    try{
        const server = await new Hapi.Server({
            host: 'localhost',
            port: 3000,
        });

        await server.register({
            plugin: require('hapi-query-builder'),
            options: {
                defaultSelectField: '_id', // (optional)- Pass field name for default select if $select is empty
            },
        });

        server.route({
            method: 'GET',
            path: '/query',
            handler: function (request, h) {
                return {
                    query: request.parsedQuery,
                };
            },
        });

        await server.start();
        console.log('Server running at:', server.info.uri);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
```

### Example

You just pass query in query params form Front-end in request.

## Documentation

### Alert

Custom alert component to display alert message

```
import {Alert} from "@spritz/ui-components"

Example - <Alert type="success"> I am success alter message </Alert>
```

#### Props

- type (required) = 'success' | 'warning' | 'error'
- message (required) = Display message
