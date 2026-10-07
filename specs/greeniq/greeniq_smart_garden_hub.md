---
spec_id: admin/greeniq-gardenkit
schema_version: ai4av-public-spec-v1
revision: 2
title: "GreenIQ GardenKit Control Spec"
manufacturer: GreenIQ
model_family: GardenKit
aliases: []
compatible_with:
  manufacturers:
    - GreenIQ
  models:
    - GardenKit
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - web.archive.org
source_urls:
  - https://web.archive.org/web/20160122010755/http://greeniq.co/api.htm
retrieved_at: 2026-07-21T22:56:11.677Z
last_checked_at: 2026-10-01T06:40:04.313Z
generated_at: 2026-10-01T06:40:04.313Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no power-on sequencing, no fault recovery procedures, no binary protocol documentation in source"
  - "HTTP port not stated in source (default 443 for https implied but not declared)"
  - "no other discrete settable parameters documented in source"
  - "no server-push or webhook endpoints described in source"
  - "no multi-step sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "sensor reading schema not implemented; water savings not implemented; no local serial control; no firmware version range stated; HTTP port not declared"
verification:
  verdict: verified
  checked_at: 2026-10-01T06:40:04.313Z
  matched_actions: 10
  action_count: 10
  confidence: medium
  summary: "All 10 spec actions map to documented endpoints with matching methods and URLs; source documents exactly these 10 and the transport values are supported. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# GreenIQ GardenKit Control Spec

## Summary
Cloud-connected garden irrigation hub. Controls irrigation valves and lighting via REST API over HTTPS. Authentication via OAuth2 access token (grant_type=password). No local RS-232 or UDP control mentioned.

<!-- UNRESOLVED: no power-on sequencing, no fault recovery procedures, no binary protocol documentation in source -->

## Transport
```yaml
protocols:
  - https
addressing:
  base_url: https://greeniq.net
  scheme: https
auth:
  type: oauth2
  method: bearer_token
  token_endpoint: https://greeniq.net/oauth2/access_token
  grant_type: password
  token_type: Bearer
# port: UNRESOLVED: HTTP port not stated in source (default 443 for https implied but not declared)
```

## Traits
```yaml
- routable   # valve and light port routing commands present
- queryable  # state query endpoints present
```

## Actions
```yaml
- id: get_access_token
  label: Get OAuth2 Access Token
  kind: action
  command: "POST https://greeniq.net/oauth2/access_token"
  params:
    - name: username
      type: string
      description: GreenIQ account username
    - name: password
      type: string
      description: GreenIQ account password
    - name: client_id
      type: string
      description: OAuth2 client ID
    - name: client_secret
      type: string
      description: OAuth2 client secret
    - name: grant_type
      type: string
      enum: [password]
  note: Returns access_token, expires_in, scope, refresh_token, token_type

- id: get_valves_state_and_config
  label: Get Valves State and Config
  kind: query
  command: "POST https://greeniq.net/php/api/get_valves_state_and_config.php"
  params:
    - name: access_token
      type: string
      description: OAuth2 access token

- id: set_valves_config
  label: Set Valves Config
  kind: action
  command: "POST https://greeniq.net/php/api/set_valves_config.php"
  params:
    - name: access_token
      type: string
      description: OAuth2 access token
    - name: data
      type: string
      description: JSON string with master and ports array (configuration: true/false/"Auto", number, name)

- id: get_config
  label: Get Hub Configuration
  kind: query
  command: "GET https://greeniq.net/php/api/get_config.php"
  params:
    - name: access_token
      type: string
      description: OAuth2 access token
  note: Returns status + data XML string (full hub config)

- id: set_config
  label: Set Hub Configuration
  kind: action
  command: "GET https://greeniq.net/php/api/get_config.php"
  params:
    - name: access_token
      type: string
      description: OAuth2 access token
    - name: data
      type: string
      description: Quoted XML string with hub configuration
  note: Endpoint name in source is get_config.php; second variant takes a data parameter and writes config. Per source, this is the write-config endpoint.

- id: get_hub_status
  label: Get Hub Status
  kind: query
  command: "GET https://greeniq.net/php/api/get_hub_status.php"
  params:
    - name: access_token
      type: string
      description: OAuth2 access token

- id: get_light_state_and_config
  label: Get Light State and Config
  kind: query
  command: "GET https://greeniq.net/php/api/get_light_state_and_config.php"
  params:
    - name: access_token
      type: string
      description: OAuth2 access token

- id: set_light_config
  label: Set Light Config
  kind: action
  command: "POST https://greeniq.net/php/api/set_light_config.php"
  params:
    - name: access_token
      type: string
    - name: data
      type: string
      description: JSON string with master and ports array (configuration: true/false/"Auto"/"On"/"Off", number, name)

- id: get_sensors_reading
  label: Get Sensors Reading
  kind: query
  command: "GET https://greeniq.net/php/api/get_sensors_reading.php"
  params:
    - name: access_token
      type: string
  note: documented but not implemented per source; returns {sensor, value} where sensor is one of flowerpower/koubachi/netatmo/flowmeter/adc

- id: get_savings
  label: Get Water Savings
  kind: query
  command: "GET https://greeniq.net/php/api/get_savings.php"
  params:
    - name: access_token
      type: string
    - name: timeperiod
      type: string
      enum: [day, week, month]
  note: documented but not implemented per source; returns savings in liters
```

## Feedbacks
```yaml
- id: valves_state
  type: object
  description: |
    JSON object with master (bool) and ports array. Each port:
    number (int), name (string), configuration ("Auto"|"On"|"Off"),
    active (bool), progress (int 0-100), end_time (string or timestamp).

- id: light_state
  type: object
  description: |
    JSON object with master (bool) and ports array. Same port schema as valves.

- id: hub_config_xml
  type: string
  description: Full hub configuration as XML document.

- id: hub_status
  type: object
  description: |
    JSON with version (string), last_seen (unix epoch int), ssid (string), signal_strength (string).

- id: sensor_reading
  type: object
  description: |
    JSON with sensor (flowerpower|koubachi|netatmo|flowmeter|adc) and value (sensor-dependent string).

- id: water_savings
  type: object
  description: JSON with savings (string, liters).

- id: oauth2_token
  type: object
  description: |
    JSON with access_token (string), expires_in (int seconds), scope (string),
    refresh_token (string), token_type ("Bearer").

- id: api_status
  type: enum
  values: [true, false]
  description: Top-level status field returned by every endpoint.
```

## Variables
```yaml
# per-valve / per-light port configuration:
#   configuration: "Auto" | "On" | "Off" | true | false
#   master (overall enable)
# UNRESOLVED: no other discrete settable parameters documented in source
```

## Events
```yaml
# UNRESOLVED: no server-push or webhook endpoints described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
OAuth2 grant_type=password flow at https://greeniq.net/oauth2/access_token requires username, password, client_id, client_secret. Token response includes access_token, expires_in (315360000 = 10 years), scope, refresh_token, token_type=Bearer. All subsequent API calls pass access_token as POST or GET parameter. Per-port configuration accepts boolean or "Auto"/"On"/"Off" string; progress tracks active irrigation/lighting 0-100%. hub_status.version reflects hub firmware; no compatibility range stated.

get_config.php is overloaded: GET without data reads full XML config; GET with data parameter writes config back (despite endpoint name). Treat as separate read/write actions per source.

get_sensors_reading and get_savings are documented but not implemented server-side; calling them returns success but empty/passthrough data.

<!-- UNRESOLVED: sensor reading schema not implemented; water savings not implemented; no local serial control; no firmware version range stated; HTTP port not declared -->

## Provenance

```yaml
source_domains:
  - web.archive.org
source_urls:
  - https://web.archive.org/web/20160122010755/http://greeniq.co/api.htm
retrieved_at: 2026-07-21T22:56:11.677Z
last_checked_at: 2026-10-01T06:40:04.313Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T06:40:04.313Z
matched_actions: 10
action_count: 10
confidence: medium
summary: "All 10 spec actions map to documented endpoints with matching methods and URLs; source documents exactly these 10 and the transport values are supported. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no power-on sequencing, no fault recovery procedures, no binary protocol documentation in source"
- "HTTP port not stated in source (default 443 for https implied but not declared)"
- "no other discrete settable parameters documented in source"
- "no server-push or webhook endpoints described in source"
- "no multi-step sequences described in source"
- "no safety warnings or interlock procedures in source"
- "sensor reading schema not implemented; water savings not implemented; no local serial control; no firmware version range stated; HTTP port not declared"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
