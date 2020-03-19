# FacilityManagement
https://miu-facility-management.herokuapp.com/

## API Documentation
[API Documentation](https://github.com/endoedgar/FacilityManagement/tree/master/express)

## Enjoying the AWESOME!

To run this locally:
1. Make sure you create a JSON file inside express folder called `secrets.json` with the following properties:
```json
{
    "mongoDB": "MONGO_CONNECTION_URL",
    "accessTokenSecret": "JWT_ACCESS_TOKEN"
}
```
2. Run the following commands:
```bash
npm install
npm run build
npm start
```