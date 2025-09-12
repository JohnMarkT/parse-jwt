# parse-jwt

A command line tool to parse and decode JWT (JSON Web Token) payloads with human-readable date formatting and expiration information.

## Installation

### Global Installation (Recommended)

```bash
npm install -g .
```

### Local Installation

```bash
npm install
```

## Usage

### Global Installation

```bash
parse-jwt <JWT_TOKEN>
```

### Local Installation

```bash
node index.js <JWT_TOKEN>
```

## Examples

```bash
# Parse a JWT token
parse-jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

# Output will show:
# - Decoded payload with formatted dates
# - Token expiration time remaining
```

## Features

- Decodes JWT payload from base64
- Converts Unix timestamps to human-readable ISO dates
- Shows original timestamp values alongside formatted dates
- Displays time remaining until token expiration
- Colorized output for better readability
- Error handling for invalid tokens

## Requirements

- Node.js (version with ES modules support)

## Error Handling

The tool will exit with an error message if:
- No JWT token is provided
- The provided token is invalid or malformed
- The token cannot be decoded

## License

ISC