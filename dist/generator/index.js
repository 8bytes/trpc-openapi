"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOpenApiDocument = exports.openApiVersion = void 0;
const zod_1 = require("zod");
const zod_to_json_schema_1 = __importDefault(require("zod-to-json-schema"));
const paths_1 = require("./paths");
const schema_1 = require("./schema");
exports.openApiVersion = '3.0.3';
const generateOpenApiDocument = (appRouter, opts) => {
    var _a, _b;
    const securitySchemes = opts.securitySchemes || {
        Authorization: {
            type: 'http',
            scheme: 'bearer',
        },
    };
    const jsonOut = (0, zod_to_json_schema_1.default)(zod_1.z.object({}), {
        $refStrategy: 'root',
        definitions: (_a = opts.defs) !== null && _a !== void 0 ? _a : {},
        definitionPath: 'components/schemas',
        target: 'openApi3'
    });
    const defsJson = jsonOut['components/schemas'];
    return {
        openapi: exports.openApiVersion,
        info: {
            title: opts.title,
            description: opts.description,
            version: opts.version,
        },
        servers: [
            {
                url: opts.baseUrl,
            },
        ],
        paths: (0, paths_1.getOpenApiPathsObject)(appRouter, Object.keys(securitySchemes), opts.defs),
        components: {
            securitySchemes,
            responses: {
                error: schema_1.errorResponseObject,
            },
            schemas: defsJson,
        },
        tags: (_b = opts.tags) === null || _b === void 0 ? void 0 : _b.map((tag) => ({ name: tag })),
        externalDocs: opts.docsUrl ? { url: opts.docsUrl } : undefined,
    };
};
exports.generateOpenApiDocument = generateOpenApiDocument;
//# sourceMappingURL=index.js.map