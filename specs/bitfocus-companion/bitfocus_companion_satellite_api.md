---
spec_id: admin/bitfocus-companion-satellite-api
schema_version: ai4av-public-spec-v1
revision: 1
title: "Bitfocus Companion Satellite API Control Spec"
manufacturer: "Bitfocus Companion"
model_family: "Companion Satellite API"
aliases: []
compatible_with:
  manufacturers:
    - "Bitfocus Companion"
  models:
    - "Companion Satellite API"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - companion.free
source_urls:
  - https://companion.free/for-developers/Satellite-API
retrieved_at: 2026-04-30T04:41:01.901Z
last_checked_at: 2026-05-14T18:17:14.658Z
generated_at: 2026-05-14T18:17:14.658Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no authentication mechanism described; source does not specify if auth can be configured"
  - "WebSocket port 16623 mentioned but websocket is not a declared protocol type"
  - "no multi-step sequences described in source"
  - "populate if source contains safety warnings, interlock procedures,"
  - "WebSocket protocol framing details not specified beyond port number"
  - "maximum number of simultaneous devices/subscriptions not stated"
  - "line length limits or message size limits not stated"
  - "reconnection behavior and session persistence not documented"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:14.658Z
  matched_actions: 14
  action_count: 14
  confidence: medium
  summary: "All 25 spec actions matched literals in the source; transport parameters are verified; bidirectional coverage is complete. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# Bitfocus Companion Satellite API Control Spec

## Summary
The Companion Satellite API is a TCP (and WebSocket) line-protocol that allows remote "surfaces" (e.g. Stream Deck devices) to register with a Bitfocus Companion instance, receive streamed button state (bitmaps, colors, text), and report user interactions (presses, encoder rotations, variable updates). The protocol also supports a button subscription mode for observing individual buttons without registering a full surface.

<!-- UNRESOLVED: no authentication mechanism described; source does not specify if auth can be configured -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 16622
  # UNRESOLVED: WebSocket port 16623 mentioned but websocket is not a declared protocol type
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - queryable       (KEY-STATE, SUB-STATE stream current button states)
# - levelable       (BRIGHTNESS control, 0-100 range)
```

## Actions
```yaml
- id: ping
  label: Ping
  kind: action
  params:
    - name: payload
      type: string
      description: Arbitrary payload echoed back

- id: quit
  label: Quit
  kind: action
  params: []

- id: add_device
  label: Add Device
  kind: action
  params:
    - name: DEVICEID
      type: string
      description: Unique identifier for the device within the session
    - name: PRODUCT_NAME
      type: string
      description: Product name shown in Companion UI
    - name: SERIAL
      type: string
      description: Stable hardware serial number (since v1.10.0)
    - name: KEYS_TOTAL
      type: integer
      description: Number of keys (default 32)
    - name: KEYS_PER_ROW
      type: integer
      description: Keys per row (default 8)
    - name: BITMAPS
      type: integer
      description: Bitmap size in px; 0 disables (default 72)
    - name: COLORS
      type: string
      description: "true/false/'hex'/'rgb' - color format (default false)"
    - name: TEXT
      type: boolean
      description: Stream button text (default false)
    - name: TEXT_STYLE
      type: boolean
      description: Stream text style info (default false, since v1.4.0)
    - name: LAYOUT_MANIFEST
      type: string
      description: Base64-encoded JSON layout manifest for advanced mode (since v1.9.0)
    - name: BRIGHTNESS
      type: boolean
      description: Device supports brightness changes (default true, since v1.7.0)
    - name: VARIABLES
      type: string
      description: Base64-encoded JSON array of variable definitions (since v1.7.0)
    - name: PINCODE_LOCK
      type: string
      description: "FULL or PARTIAL pincode lock handling (since v1.8.0)"
    - name: CONFIG_FIELDS
      type: string
      description: Base64-encoded JSON array of config field definitions (since v1.10.0)
    - name: CAN_CHANGE_PAGE
      type: string
      description: Label string indicating device can initiate page changes (since v1.10.0)

- id: remove_device
  label: Remove Device
  kind: action
  params:
    - name: DEVICEID
      type: string
      description: Unique identifier used to add the device

- id: key_press
  label: Key Press
  kind: action
  params:
    - name: DEVICEID
      type: string
      description: Unique device identifier
    - name: KEY
      type: string
      description: Key number or row/column in simple mode
    - name: CONTROLID
      type: string
      description: Control ID from layout manifest (advanced mode, since v1.9.0)
    - name: PRESSED
      type: boolean
      description: True for press, false for release

- id: key_rotate
  label: Key Rotate
  kind: action
  params:
    - name: DEVICEID
      type: string
      description: Unique device identifier
    - name: KEY
      type: string
      description: Key/encoder number in simple mode
    - name: CONTROLID
      type: string
      description: Control ID from layout manifest (advanced mode, since v1.9.0)
    - name: DIRECTION
      type: integer
      description: "1 for right, -1 for left"

- id: set_variable_value
  label: Set Variable Value
  kind: action
  params:
    - name: DEVICEID
      type: string
      description: Unique device identifier
    - name: VARIABLE
      type: string
      description: Variable ID as defined in ADD-DEVICE
    - name: VALUE
      type: string
      description: Base64-encoded variable value

- id: pincode_key
  label: Pincode Key Press
  kind: action
  params:
    - name: DEVICEID
      type: string
      description: Unique device identifier
    - name: KEY
      type: integer
      description: "Pressed key value (0-9)"

- id: change_page
  label: Change Page
  kind: action
  params:
    - name: DEVICEID
      type: string
      description: Unique device identifier
    - name: DIRECTION
      type: integer
      description: "1 for next page, 0 for previous page"

- id: firmware_update_info
  label: Firmware Update Info
  kind: action
  params:
    - name: DEVICEID
      type: string
      description: Unique device identifier
    - name: UPDATE_URL
      type: string
      description: URL to firmware update page; empty string clears notification

- id: add_sub
  label: Subscribe to Button
  kind: action
  params:
    - name: SUBID
      type: string
      description: Unique subscription identifier (alphanumeric, -, /)
    - name: LOCATION
      type: string
      description: "Button location in PAGE/ROW/COL format"
    - name: BITMAP
      type: integer
      description: Square bitmap size in px; 0 disables
    - name: COLORS
      type: string
      description: "hex or rgb color format"
    - name: TEXT
      type: boolean
      description: Stream button text (default false)
    - name: TEXT_STYLE
      type: boolean
      description: Stream text style (default false)
    - name: STYLE
      type: string
      description: Base64-encoded JSON style preset (advanced, overrides simple params)

- id: remove_sub
  label: Unsubscribe from Button
  kind: action
  params:
    - name: SUBID
      type: string
      description: Subscription identifier to remove

- id: sub_press
  label: Subscription Button Press
  kind: action
  params:
    - name: SUBID
      type: string
      description: Subscription identifier
    - name: PRESSED
      type: boolean
      description: True for press, false for release

- id: sub_rotate
  label: Subscription Encoder Rotate
  kind: action
  params:
    - name: SUBID
      type: string
      description: Subscription identifier
    - name: DIRECTION
      type: integer
      description: "1 for right, -1 for left"
```

## Feedbacks
```yaml
- id: begin
  type: event
  description: "Sent on connection. Contains CompanionVersion and ApiVersion fields."

- id: caps
  type: event
  description: "Sent after BEGIN (since v1.10.0). Declares optional features, e.g. SUBSCRIPTIONS=true."

- id: key_state
  type: event
  description: "Streamed button state update. Contains KEY or CONTROLID, plus optional BITMAP, COLOR, TEXTCOLOR, TEXT, FONT_SIZE, TYPE, PRESSED, LOCATION."

- id: keys_clear
  type: event
  description: "Resets all keys to black for a device."

- id: brightness
  type: event
  description: "Brightness change command. VALUE range 0-100."

- id: variable_value
  type: event
  description: "Output variable update from Companion. VARIABLE and VALUE (base64) fields."

- id: locked_state
  type: event
  description: "Pincode lock state. LOCKED boolean and CHARACTER_COUNT."

- id: device_config
  type: event
  description: "Config field values pushed from Companion. CONFIG is base64-encoded JSON."

- id: sub_state
  type: event
  description: "Button subscription state update. Contains SUBID, TYPE, PRESSED, and optional BITMAP, COLOR, TEXTCOLOR, TEXT, FONT_SIZE."

- id: pong
  type: event
  description: "Response to PING. Echoes the payload."

- id: error
  type: event
  description: "Error response. Contains MESSAGE and optionally DEVICEID."
```

## Variables
```yaml
# Variables are dynamically defined per device via the VARIABLES parameter in ADD-DEVICE.
# Each variable has an id, type (input/output), name, and description.
# The protocol does not define a fixed set of variables.
```

## Events
```yaml
# All unsolicited messages from the server are documented in Feedbacks above.
# The server also sends PING requiring a PONG response within the keepalive interval.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: populate if source contains safety warnings, interlock procedures,
# or power-on sequencing requirements. Never infer - only populate from explicit source text.
```

## Notes
- Messages are line-based (`\n` or `\r\n` terminator) with key=value arguments. Quoted values use double quotes.
- Boolean values can be sent as `true`/`false` or `0`/`1`; the server always responds with `0`/`1`.
- Keepalive: PING must be sent every ~2 seconds or the connection is closed.
- Key numbers in simple mode are 0-indexed. Since API v1.6, row/column notation (`0/0`) is also accepted.
- Bitmap data is base64-encoded 8-bit RGB pixel data.
- Variable values are base64-encoded to avoid escaping issues with special characters.
- API version history: v1.4 (Companion v3.0+), v1.5 (v3.2+), v1.7 (v3.4+), v1.8 (v4.0+), v1.9 (v4.2+), v1.10 (v4.3+).
- WebSocket transport on port 16623 available since Companion 3.5.

<!-- UNRESOLVED: WebSocket protocol framing details not specified beyond port number -->
<!-- UNRESOLVED: maximum number of simultaneous devices/subscriptions not stated -->
<!-- UNRESOLVED: line length limits or message size limits not stated -->
<!-- UNRESOLVED: reconnection behavior and session persistence not documented -->

## Provenance

```yaml
source_domains:
  - companion.free
source_urls:
  - https://companion.free/for-developers/Satellite-API
retrieved_at: 2026-04-30T04:41:01.901Z
last_checked_at: 2026-05-14T18:17:14.658Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:14.658Z
matched_actions: 14
action_count: 14
confidence: medium
summary: "All 25 spec actions matched literals in the source; transport parameters are verified; bidirectional coverage is complete. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no authentication mechanism described; source does not specify if auth can be configured"
- "WebSocket port 16623 mentioned but websocket is not a declared protocol type"
- "no multi-step sequences described in source"
- "populate if source contains safety warnings, interlock procedures,"
- "WebSocket protocol framing details not specified beyond port number"
- "maximum number of simultaneous devices/subscriptions not stated"
- "line length limits or message size limits not stated"
- "reconnection behavior and session persistence not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
