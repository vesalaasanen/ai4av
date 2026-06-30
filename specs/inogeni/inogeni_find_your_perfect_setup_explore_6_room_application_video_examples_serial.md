---
spec_id: admin/inogeni-camtrack
schema_version: ai4av-public-spec-v1
revision: 1
title: "INOGENI CAMTRACK Control Spec"
manufacturer: INOGENI
model_family: CAMTRACK
aliases: []
compatible_with:
  manufacturers:
    - INOGENI
  models:
    - CAMTRACK
  firmware: v3.4.0
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - inogeni.com
source_urls:
  - https://inogeni.com/camtrack-api-documentation
  - "https://inogeni.com/camtrack-user.*guide"
  - https://inogeni.com/support/software-tools/
retrieved_at: 2026-06-29T22:54:06.727Z
last_checked_at: 2026-06-30T07:10:04.615Z
generated_at: 2026-06-30T07:10:04.615Z
firmware_coverage: v3.4.0
protocol_coverage: []
known_gaps:
  - "Known protocol was supplied as RS-232 but source document describes only HTTP, TCP, and WebSocket APIs. Hardware serial/RS-232 not documented in this source."
  - "device-specific observed reply fields as separate Feedbacks entries not enumerated here; responses covered under Actions feedback bodies. Empty list OK below."
  - "Device model \"CAMTRACK\" is the application name from source title \"INOGENI CAMTRACK API Documentation\". Slug `camtrack` used; physical hardware product name not stated in source."
  - "HTTP and WebSocket both use port 1881; TCP uses port 11881. Source explicitly states both ports and protocol separations. Auth: source includes Web GUI credential storage/deletion but API commands themselves require no login; inferred `type: none`."
  - "Original operator-supplied \"Known protocol: RS-232C\" not supported by this source — protocol replaced with HTTP/TCP/WebSocket per source evidence."
  - "GET SWITCH_DEVICE_DATA mentioned in Appendix B but no dedicated section in source body; payload shape UNRESOLVED."
  - "WebSocket frames do not require terminating newline (unlike TCP). Implementers must strip \\n for WS."
verification:
  verdict: verified
  checked_at: 2026-06-30T07:10:04.615Z
  matched_actions: 26
  action_count: 26
  confidence: medium
  summary: "All 26 spec actions matched literally in source; HTTP (port 1881), TCP (port 11881), and WebSocket (port 1881) transports verified. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# INOGENI CAMTRACK Control Spec

## Summary
Control spec for INOGENI CAMTRACK software application (documented firmware v3.4.0). Document covers HTTP, TCP/IP, and WebSocket command interfaces for audio channel simulation, input/output data enablement, preset recall, switcher input routing/naming, and system standby.

<!-- UNRESOLVED: Known protocol was supplied as RS-232 but source document describes only HTTP, TCP, and WebSocket APIs. Hardware serial/RS-232 not documented in this source. -->

## Transport
```yaml
protocols:
  - tcp
  - http
addressing:
  port: 1881
auth:
  type: none  # inferred: no login/password/auth procedure in source
```

## Traits
```yaml
# - powerable       (system standby commands present)
# - routable        (switcher input routing commands present)
# - queryable       (GET commands returning state present)
```

## Actions
```yaml
- id: http_set_channel_id_audio
  label: HTTP SET CHANNEL_ID_AUDIO
  kind: action
  command: "GET http://<IP-Address>:1881/control?command=SET%20CHANNEL_ID_AUDIO&value1={value1}&value2={value2}"
  params:
    - name: value1
      type: integer
      description: Channel number (0 resets all, 1 fixed, 101-999 valid channels)
    - name: value2
      type: enum
      description: ENABLE or DISABLE
      values: [ENABLE, DISABLE]

- id: http_set_input_device_data
  label: HTTP SET INPUT_DEVICE_DATA
  kind: action
  command: "GET http://<IP-Address>:1881/control?command=SET%20INPUT_DEVICE_DATA&value1={value1}&value2={value2}"
  params:
    - name: value1
      type: integer
      description: Input device number (0 affects all, 1..12)
    - name: value2
      type: enum
      description: ENABLE or DISABLE
      values: [ENABLE, DISABLE]

- id: http_set_output_device_data
  label: HTTP SET OUTPUT_DEVICE_DATA
  kind: action
  command: "GET http://<IP-Address>:1881/control?command=SET%20OUTPUT_DEVICE_DATA&value1={value1}&value2={value2}"
  params:
    - name: value1
      type: integer
      description: Output device number (0 affects all, 1..8)
    - name: value2
      type: enum
      description: ENABLE or DISABLE
      values: [ENABLE, DISABLE]

- id: http_set_preset
  label: HTTP SET PRESET
  kind: action
  command: "GET http://<IP-Address>:1881/control?command=SET%20PRESET&value1={value1}"
  params:
    - name: value1
      type: integer
      description: Global preset number 1..10

- id: http_set_switch_device_data
  label: HTTP SET SWITCH_DEVICE_DATA
  kind: action
  command: "GET http://<IP-Address>:1881/control?command=SET%20SWITCH_DEVICE_DATA&value1={value1}&value2={value2}"
  params:
    - name: value1
      type: integer
      description: Switch device number (0 affects all, 1)
    - name: value2
      type: enum
      description: ENABLE or DISABLE
      values: [ENABLE, DISABLE]

- id: http_set_switcher_input
  label: HTTP SET SWITCHER_INPUT
  kind: action
  command: "GET http://<IP-Address>:1881/control?command=SET%20SWITCHER_INPUT&value1={value1}"
  params:
    - name: value1
      type: integer
      description: Switcher input number 1..12

- id: http_set_switcher_input_name
  label: HTTP SET SWITCHER_INPUT_NAME
  kind: action
  command: "GET http://<IP-Address>:1881/control?command=SET%20SWITCHER_INPUT_NAME&value1={value1}&value2={value2}"
  params:
    - name: value1
      type: integer
      description: Switcher input number 1..12
    - name: value2
      type: string
      description: Name to assign to the input

- id: http_set_system_standby
  label: HTTP SET SYSTEM_STANDBY
  kind: action
  command: "GET http://<IP-Address>:1881/control?command=SET%20SYSTEM_STANDBY&value1={value1}"
  params:
    - name: value1
      type: enum
      description: SYSTEM_ON or SYSTEM_OFF
      values: [SYSTEM_ON, SYSTEM_OFF]

- id: http_delete_credentials
  label: HTTP DELETE CREDENTIALS
  kind: action
  command: "GET http://<IP-Address>:1881/control?command=DELETE%20CREDENTIALS"
  params: []

- id: http_get_input_device_data
  label: HTTP GET INPUT_DEVICE_DATA
  kind: query
  command: "GET http://<IP-Address>:1881/control?command=GET%20INPUT_DEVICE_DATA"
  params: []

- id: http_get_output_device_data
  label: HTTP GET OUTPUT_DEVICE_DATA
  kind: query
  command: "GET http://<IP-Address>:1881/control?command=GET%20OUTPUT_DEVICE_DATA"
  params: []

- id: http_get_preset
  label: HTTP GET PRESET
  kind: query
  command: "GET http://<IP-Address>:1881/control?command=GET%20PRESET"
  params: []

- id: http_get_system_standby
  label: HTTP GET SYSTEM_STANDBY
  kind: query
  command: "GET http://<IP-Address>:1881/control?command=GET%20SYSTEM_STANDBY"
  params: []

- id: tcp_set_channel_id_audio
  label: TCP SET CHANNEL_ID_AUDIO
  kind: action
  command: '{\n  "command": "SET CHANNEL_ID_AUDIO",\n  "value1": {value1},\n  "value2": "{value2}"\n}'
  transport: tcp
  endpoint: "<IP-Address>:11881"
  params:
    - name: value1
      type: integer
      description: Channel number (0 resets all, 1 fixed, 101..999 valid channels)
    - name: value2
      type: enum
      description: ENABLE or DISABLE
      values: [ENABLE, DISABLE]

- id: tcp_set_input_device_data
  label: TCP SET INPUT_DEVICE_DATA
  kind: action
  command: '{\n  "command": "SET INPUT_DEVICE_DATA",\n  "value1": {value1},\n  "value2": "{value2}"\n}'
  transport: tcp
  endpoint: "<IP-Address>:11881"
  params:
    - name: value1
      type: integer
      description: Input device number (0 affects all, 1..12)
    - name: value2
      type: enum
      description: ENABLE or DISABLE
      values: [ENABLE, DISABLE]

- id: tcp_set_output_device_data
  label: TCP SET OUTPUT_DEVICE_DATA
  kind: action
  command: '{\n  "command": "SET OUTPUT_DEVICE_DATA",\n  "value1": {value1},\n  "value2": "{value2}"\n}'
  transport: tcp
  endpoint: "<IP-Address>:11881"
  params:
    - name: value1
      type: integer
      description: Output device number (0 affects all, 1..8)
    - name: value2
      type: enum
      description: ENABLE or DISABLE
      values: [ENABLE, DISABLE]

- id: tcp_set_preset
  label: TCP SET PRESET
  kind: action
  command: '{\n  "command": "SET PRESET",\n  "value1": {value1}\n}'
  transport: tcp
  endpoint: "<IP-Address>:11881"
  params:
    - name: value1
      type: integer
      description: Global preset number 1..10

- id: tcp_set_switch_device_data
  label: TCP SET SWITCH_DEVICE_DATA
  kind: action
  command: '{\n  "command": "SET SWITCH_DEVICE_DATA",\n  "value1": {value1},\n  "value2": "{value2}"\n}'
  transport: tcp
  endpoint: "<IP-Address>:11881"
  params:
    - name: value1
      type: integer
      description: Switch device number (0 affects all, 1)
    - name: value2
      type: enum
      description: ENABLE or DISABLE
      values: [ENABLE, DISABLE]

- id: tcp_set_switcher_input
  label: TCP SET SWITCHER_INPUT
  kind: action
  command: '{\n  "command": "SET SWITCHER_INPUT",\n  "value1": {value1}\n}'
  transport: tcp
  endpoint: "<IP-Address>:11881"
  params:
    - name: value1
      type: integer
      description: Switcher input number 1..12

- id: tcp_set_switcher_input_name
  label: TCP SET SWITCHER_INPUT_NAME
  kind: action
  command: '{\n  "command": "SET SWITCHER_INPUT_NAME",\n  "value1": {value1},\n  "value2": "{value2}"\n}'
  transport: tcp
  endpoint: "<IP-Address>:11881"
  params:
    - name: value1
      type: integer
      description: Switcher input number 1..12
    - name: value2
      type: string
      description: Name to assign

- id: tcp_set_system_standby
  label: TCP SET SYSTEM_STANDBY
  kind: action
  command: '{\n  "command": "SET SYSTEM_STANDBY",\n  "value1": "{value1}"\n}'
  transport: tcp
  endpoint: "<IP-Address>:11881"
  params:
    - name: value1
      type: enum
      description: SYSTEM_ON or SYSTEM_OFF
      values: [SYSTEM_ON, SYSTEM_OFF]

- id: tcp_delete_credentials
  label: TCP DELETE CREDENTIALS
  kind: action
  command: '{"command": "DELETE CREDENTIALS"}'
  transport: tcp
  endpoint: "<IP-Address>:11881"
  params: []

- id: tcp_get_input_device_data
  label: TCP GET INPUT_DEVICE_DATA
  kind: query
  command: '{"command": "GET INPUT_DEVICE_DATA"}'
  transport: tcp
  endpoint: "<IP-Address>:11881"
  params: []

- id: tcp_get_output_device_data
  label: TCP GET OUTPUT_DEVICE_DATA
  kind: query
  command: '{"command": "GET OUTPUT_DEVICE_DATA"}'
  transport: tcp
  endpoint: "<IP-Address>:11881"
  params: []

- id: tcp_get_preset
  label: TCP GET PRESET
  kind: query
  command: '{"command": "GET PRESET"}'
  transport: tcp
  endpoint: "<IP-Address>:11881"
  params: []

- id: tcp_get_system_standby
  label: TCP GET SYSTEM_STANDBY
  kind: query
  command: '{"command": "GET SYSTEM_STANDBY"}'
  transport: tcp
  endpoint: "<IP-Address>:11881"
  params: []
```

## Feedbacks
```yaml
# Feedback replies are JSON objects from device. Document these as envelope responses.
# Format: { "application": "CAMTRACK", "version": "v3.4.0", "command": "...", "status": "SUCCESS|FAILED|DEFINED|INFO|ERROR", "message": "...", "value1": ..., "value2": ..., "compactValues": "...", "_msgid": "..." }

# UNRESOLVED: device-specific observed reply fields as separate Feedbacks entries not enumerated here; responses covered under Actions feedback bodies. Empty list OK below.
```

## Variables
```yaml
# No standalone variable setters documented beyond command parameters.
```

## Events
```yaml
# Source notes responses are unsolicited-style (TCP echoes command result with REP prefix) but only follow issued commands.
# Multi-message responses may arrive out of order for SET INPUT_DEVICE_DATA, SET OUTPUT_DEVICE_DATA, SET PRESET, SET SYSTEM_STANDBY, SET SWITCH_DEVICE_DATA.
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source contains no safety warnings, interlocks, or power-on sequencing requirements.
```

## Notes
<!-- UNRESOLVED: Device model "CAMTRACK" is the application name from source title "INOGENI CAMTRACK API Documentation". Slug `camtrack` used; physical hardware product name not stated in source. -->

<!-- UNRESOLVED: HTTP and WebSocket both use port 1881; TCP uses port 11881. Source explicitly states both ports and protocol separations. Auth: source includes Web GUI credential storage/deletion but API commands themselves require no login; inferred `type: none`. -->
<!-- UNRESOLVED: Original operator-supplied "Known protocol: RS-232C" not supported by this source — protocol replaced with HTTP/TCP/WebSocket per source evidence. -->
<!-- UNRESOLVED: GET SWITCH_DEVICE_DATA mentioned in Appendix B but no dedicated section in source body; payload shape UNRESOLVED. -->
<!-- UNRESOLVED: WebSocket frames do not require terminating newline (unlike TCP). Implementers must strip \n for WS. -->
<!-- NOTE: Commands and values case-sensitive per source. -->

## Provenance

```yaml
source_domains:
  - inogeni.com
source_urls:
  - https://inogeni.com/camtrack-api-documentation
  - "https://inogeni.com/camtrack-user.*guide"
  - https://inogeni.com/support/software-tools/
retrieved_at: 2026-06-29T22:54:06.727Z
last_checked_at: 2026-06-30T07:10:04.615Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T07:10:04.615Z
matched_actions: 26
action_count: 26
confidence: medium
summary: "All 26 spec actions matched literally in source; HTTP (port 1881), TCP (port 11881), and WebSocket (port 1881) transports verified. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Known protocol was supplied as RS-232 but source document describes only HTTP, TCP, and WebSocket APIs. Hardware serial/RS-232 not documented in this source."
- "device-specific observed reply fields as separate Feedbacks entries not enumerated here; responses covered under Actions feedback bodies. Empty list OK below."
- "Device model \"CAMTRACK\" is the application name from source title \"INOGENI CAMTRACK API Documentation\". Slug `camtrack` used; physical hardware product name not stated in source."
- "HTTP and WebSocket both use port 1881; TCP uses port 11881. Source explicitly states both ports and protocol separations. Auth: source includes Web GUI credential storage/deletion but API commands themselves require no login; inferred `type: none`."
- "Original operator-supplied \"Known protocol: RS-232C\" not supported by this source — protocol replaced with HTTP/TCP/WebSocket per source evidence."
- "GET SWITCH_DEVICE_DATA mentioned in Appendix B but no dedicated section in source body; payload shape UNRESOLVED."
- "WebSocket frames do not require terminating newline (unlike TCP). Implementers must strip \\n for WS."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
