import expect from "expect"
import { validate } from "plugins/validation/semantic-validators/validators/parameters"

describe("validation plugin - semantic - parameters", () => {
  it("should return an error when an array type parameter omits an `items` property", () => {
    const spec = {
      "paths": {
        "/pets": {
          "get": {
            "parameters": [
              {
                "name": "tags",
                "in": "query",
                "description": "tags to filter by",
                "type": "array"
              }
            ]
          }
        }
      }
    }

    let res = validate({ resolvedSpec: spec })
    expect(res.errors.length).toEqual(1)
    expect(res.errors[0].path).toEqual(["paths", "/pets", "get", "parameters", "0"])
    expect(res.errors[0].message).toEqual("Parameters with 'array' type require an 'items' property.")
    expect(res.warnings.length).toEqual(0)
  })
  it("should return an error when a non-body parameter omits an `type` property", () => {
    const spec = {
      "paths": {
        "/pets": {
          "get": {
            "parameters": [
              {
                "name": "tags",
                "in": "query",
                "description": "tags to filter by"
              }
            ]
          }
        }
      }
    }

    let res = validate({ resolvedSpec: spec })
    expect(res.errors.length).toEqual(1)
    expect(res.errors[0].path).toEqual(["paths", "/pets", "get", "parameters", "0"])
    expect(res.errors[0].message).toEqual("Non-body parameters require a 'type' property.")
    expect(res.warnings.length).toEqual(0)
  })
  it("should not return an error when a body parameter omits an `type` property", () => {
    const spec = {
      "paths": {
        "/pets": {
          "get": {
            "parameters": [
              {
                "name": "tags",
                "in": "body",
                "description": "tags to filter by"
              }
            ]
          }
        }
      }
    }

    let res = validate({ resolvedSpec: spec })
    expect(res.errors.length).toEqual(0)
  })
})
