// MCP resources builder. Pure/testable — returns { list, read } over the
// loaded design + tokens. No transport concerns here.

const URIS = {
  'designlang://tokens/primitive': {
    name: 'Primitive tokens',
    description: 'DTCG primitive tier (raw colors, spacing, fonts, etc.)',
  },
  'designlang://tokens/semantic': {
    name: 'Semantic tokens',
    description: 'DTCG semantic tier (aliases like action.primary, surface.default)',
  },
  'designlang://regions': {
    name: 'Semantic regions',
    description: 'Detected page regions (hero, nav, footer, etc.) with bounds',
  },
  'designlang://components': {
    name: 'Component clusters',
    description: 'Clustered component instances with variant CSS',
  },
  'designlang://health': {
    name: 'CSS health',
    description: 'Coverage, dead-rule, and z-index-stack diagnostics',
  },
};

function rpcError(code, message) {
  const e = new Error(message);
  e.code = code;
  return e;
}

export function buildResources({ design, tokens }) {
  function payloadFor(uri) {
    switch (uri) {
      case 'designlang://tokens/primitive': return tokens?.primitive ?? null;
      case 'designlang://tokens/semantic':  return tokens?.semantic ?? null;
      case 'designlang://regions':          return design?.regions ?? [];
      case 'designlang://components':       return design?.componentClusters ?? [];
      case 'designlang://health':           return design?.cssHealth ?? null;
      default: return undefined;
    }
  }

  return {
    list() {
      return Object.keys(URIS).map((uri) => ({
        uri,
        name: URIS[uri].name,
        description: URIS[uri].description,
        mimeType: 'application/json',
      }));
    },
    read(uri) {
      const payload = payloadFor(uri);
      if (payload === undefined) throw rpcError(-32602, `Unknown resource URI: ${uri}`);
      return {
        uri,
        mimeType: 'application/json',
        text: JSON.stringify(payload),
      };
    },
  };
}
