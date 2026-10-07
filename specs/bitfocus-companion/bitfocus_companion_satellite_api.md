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
  - raw.githubusercontent.com
source_urls:
  - https://raw.githubusercontent.com/bitfocus/website/main/for-developers/Satellite-API.md
retrieved_at: 2026-09-26T14:23:19.600Z
last_checked_at: 2026-09-26T14:23:19.600Z
generated_at: 2026-09-26T14:23:19.600Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no authentication mechanism described; source does not specify if auth can be configured"
  - "populate if source contains safety warnings, interlock procedures,"
verification:
  verdict: verified
  checked_at: 2026-09-26T14:23:19.600Z
  matched_actions: 15
  action_count: 15
  confidence: medium
  summary: "Complete exact-publisher API1.14 guide independently reviewed:15 client commands including required PONG,all14 prior IDs,optional/mode-specific parameters,version/capability gates and13 feedbacks match after3 wording corrections;unsolicited messages are not counted as client commands;auth,quote escaping and external nested-schema details remain explicitly unresolved/unexpanded. (2 unresolved item(s) noted in Known Gaps.)"
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
auth:
  type: UNRESOLVED
framing:
  terminators:
    - LF
    - CRLF
  arguments: COMMAND-NAME NAME=value separated by spaces; double-quote values containing spaces
  booleans: Send true/false or0/1; receive0/1
notes: TCP default16622; alternate ports supported. WebSocket default16623 since Companion3.5; source does not specify URL path/TLS/auth. No authentication claim inferred.
```

## Traits
```yaml
[]
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
      required: true
  command: PING {payload}
  terminator: LF or CRLF
  description: Send periodically; source recommends every two seconds to avoid an idle disconnect. Server responds PONG with the same arbitrary payload.
- id: quit
  label: Quit
  kind: action
  params: []
  command: QUIT
  terminator: LF or CRLF
  description: Close connection and remove all registered devices.
- id: add_device
  label: Add Device
  kind: action
  params:
    - name: DEVICEID
      type: string
      description: Unique identifier for the device within the session
      required: true
    - name: PRODUCT_NAME
      type: string
      description: Product name shown in Companion UI
      required: true
    - name: SERIAL
      type: string
      description: Stable hardware serial number (since v1.10.0)
      required: false
    - name: KEYS_TOTAL
      type: integer
      description: "Simple mode only: default32. Before1.5.1 range1..32; since1.5.1 any integer>=1."
      required: false
      min: 1
      default: 32
    - name: KEYS_PER_ROW
      type: integer
      description: "Simple mode only: default8. Before1.5.1 range1..8; since1.5.1 any integer>=1."
      required: false
      min: 1
      default: 8
    - name: BITMAPS
      type: string
      description: "Simple mode only: before1.5 boolean defaulttrue; since1.5 bitmap size,0/false disables,1/true means72px,default72. Preserve selected version-specific wire spelling."
      required: false
    - name: COLORS
      type: string
      description: "Simple mode: before1.6 true/false; since1.6 true/false/hex/rgb. true and hex select hexadecimal; rgb selects CSS rgb without spaces; defaultfalse."
      required: false
      enum:
        - "true"
        - "false"
        - hex
        - rgb
    - name: TEXT
      type: boolean
      description: Simple mode; stream button text,defaultfalse.
      required: false
      default: false
    - name: TEXT_STYLE
      type: boolean
      description: Since1.4; simple mode text style properties,defaultfalse.
      required: false
      default: false
    - name: LAYOUT_MANIFEST
      type: string
      description: "Since1.9 base64 JSON object with required stylePresets.default and controls. Controls map alphanumeric/-/slash IDs to required zero-based row,column and optional stylePreset(default default). Style presets: bitmap {w,h},colors hex/rgb,text,textStyle; since1.13 leds {segments>=1,mode full-ring/simple}. Ignores KEYS_TOTAL,KEYS_PER_ROW,BITMAPS,COLORS,TEXT,TEXT_STYLE. Full vendor schema URL is in Notes."
      required: false
    - name: BRIGHTNESS
      type: boolean
      description: Since1.7; device supports brightness changes; defaulttrue.
      required: false
      default: true
    - name: VARIABLES
      type: string
      description: "Since1.7 base64 JSON array: each item id,type(input/output),name,description. Input is satellite-produced; output streams to satellite."
      required: false
    - name: PINCODE_LOCK
      type: string
      description: Since1.8 FULL handles display and input; PARTIAL handles display only (currently same behavior, future distinction possible).
      required: false
      enum:
        - FULL
        - PARTIAL
    - name: CONFIG_FIELDS
      type: string
      description: Since1.10 base64 JSON array of config field definitions; vendor schema in Notes. Values arrive in DEVICE-CONFIG immediately after registration and on UI change.
      required: false
    - name: CAN_CHANGE_PAGE
      type: string
      description: Label string indicating device can initiate page changes (since v1.10.0)
      required: false
    - name: SERIAL_IS_UNIQUE
      type: boolean
      description: Since API1.10; false for shared/nonunique hardware serials, disabling persistent unit identification from that serial. Default true.
      required: false
      default: true
    - name: BITMAP_FORMAT
      type: string
      description: Since1.12; request only a format in CAPS BITMAP_FORMATS. Omitted or unadvertised format falls back to rgb; older servers ignore this parameter and send rgb.
      required: false
      enum:
        - rgb
        - png
        - webp
      default: rgb
  command: ADD-DEVICE DEVICEID={DEVICEID} PRODUCT_NAME="{PRODUCT_NAME}"
  terminator: LF or CRLF
  description: Register simple or advanced surface. Append only supplied optional NAME=value arguments; quote values with spaces. LAYOUT_MANIFEST selects advanced mode and ignores all simple rendering parameters. Stream KEY-STATE updates after registration. DEVICEID is the session routing key; SERIAL supplies persistent identity on API1.10+.
- id: remove_device
  label: Remove Device
  kind: action
  params:
    - name: DEVICEID
      type: string
      description: Unique identifier used to add the device
      required: true
  command: REMOVE-DEVICE DEVICEID={DEVICEID}
  terminator: LF or CRLF
- id: key_press
  label: Key Press
  kind: action
  params:
    - name: DEVICEID
      type: string
      description: Unique device identifier
      required: true
    - name: KEY
      type: string
      description: Simple mode key number; since1.6 may instead use local zero-based row/column such as0/0. Version-dependent key limits follow ADD-DEVICE.
      required: false
    - name: CONTROLID
      type: string
      description: Advanced mode only,API1.9+; exact alphanumeric/-/slash control ID from LAYOUT_MANIFEST.
      required: false
    - name: PRESSED
      type: boolean
      description: True for press, false for release
      required: true
  command: KEY-PRESS DEVICEID={DEVICEID} KEY={KEY} PRESSED={PRESSED}
  terminator: LF or CRLF
  command_advanced: KEY-PRESS DEVICEID={DEVICEID} CONTROLID="{CONTROLID}" PRESSED={PRESSED}
  description: Use KEY only in simple mode, CONTROLID only in advanced mode(API1.9+); never send both.
- id: key_rotate
  label: Key Rotate
  kind: action
  params:
    - name: DEVICEID
      type: string
      description: Unique device identifier
      required: true
    - name: KEY
      type: string
      description: Simple mode key number; since1.6 may instead use local zero-based row/column such as0/0. Version-dependent key limits follow ADD-DEVICE.
      required: false
    - name: CONTROLID
      type: string
      description: Advanced mode only,API1.9+; exact alphanumeric/-/slash control ID from LAYOUT_MANIFEST.
      required: false
    - name: DIRECTION
      type: integer
      description: "Signed direction and step count: positive right/clockwise,negative left;1/-1 one step;0 is legacy one-step-left. Magnitudes>1 require API1.14+ and CAPS ROTARY_AMOUNT=1. Source also says older servers treat any nonzero value as one step; its direction wording is ambiguous,so legacy negative-value direction remains unresolved; the unambiguous legacy directions are1 right and0 left."
      required: true
  command: KEY-ROTATE DEVICEID={DEVICEID} KEY={KEY} DIRECTION={DIRECTION}
  terminator: LF or CRLF
  command_advanced: KEY-ROTATE DEVICEID={DEVICEID} CONTROLID="{CONTROLID}" DIRECTION={DIRECTION}
  description: Use KEY only in simple mode, CONTROLID only in advanced mode(API1.9+); never send both. Rotation also requires the per-bank checkbox to be enabled in Companion.
  since: 1.3.0
- id: set_variable_value
  label: Set Variable Value
  kind: action
  params:
    - name: DEVICEID
      type: string
      description: Unique device identifier
      required: true
    - name: VARIABLE
      type: string
      description: Variable ID as defined in ADD-DEVICE
      required: true
    - name: VALUE
      type: string
      description: Base64-encoded variable value
      required: true
  command: SET-VARIABLE-VALUE DEVICEID={DEVICEID} VARIABLE="{VARIABLE}" VALUE="{VALUE}"
  terminator: LF or CRLF
  since: 1.7.0
  description: 'For declared input variables; VALUE is base64 of the variable value. Since1.7.1 success echoes variable name: SET-VARIABLE-VALUE OK VARIABLE="{VARIABLE}".'
- id: pincode_key
  label: Pincode Key Press
  kind: action
  params:
    - name: DEVICEID
      type: string
      description: Unique device identifier
      required: true
    - name: KEY
      type: integer
      description: Pincode digit0..9.
      required: true
      min: 0
      max: 9
  command: PINCODE-KEY DEVICEID={DEVICEID} KEY={KEY}
  terminator: LF or CRLF
  since: 1.8.0
  description: Report a pincode digit while handling pincode lock input; device KEY need not map directly to a surface button.
- id: change_page
  label: Change Page
  kind: action
  params:
    - name: DEVICEID
      type: string
      description: Unique device identifier
      required: true
    - name: DIRECTION
      type: integer
      description: 1 next page,0 previous page.
      required: true
      enum:
        - 0
        - 1
  command: CHANGE-PAGE DEVICEID={DEVICEID} DIRECTION={DIRECTION}
  terminator: LF or CRLF
  since: 1.10.0
  description: Valid only if CAN_CHANGE_PAGE declared at registration. If user disables checkbox, request is ignored but OK still returned. Obeys surface-group page order/restrictions.
- id: firmware_update_info
  label: Firmware Update Info
  kind: action
  params:
    - name: DEVICEID
      type: string
      description: Unique device identifier
      required: true
    - name: UPDATE_URL
      type: string
      description: URL to firmware update page; empty string clears notification
      required: true
  command: FIRMWARE-UPDATE-INFO DEVICEID={DEVICEID} UPDATE_URL="{UPDATE_URL}"
  terminator: LF or CRLF
  since: 1.10.0
  description: Nonempty URL shows firmware update indicator; empty quoted string clears it.
- id: add_sub
  label: Subscribe to Button
  kind: action
  params:
    - name: SUBID
      type: string
      description: Unique within connection; alphanumeric,-,/ characters. Reuse registered SUBID for subsequent messages.
      required: true
    - name: LOCATION
      type: string
      description: Button location in PAGE/ROW/COL format
      required: true
    - name: BITMAP
      type: string
      description: Simple style square size in pixels;0/false disables. Preserve chosen wire representation.
      required: false
    - name: COLORS
      type: string
      description: Simple style hex or CSS rgb.
      required: false
      enum:
        - hex
        - rgb
    - name: TEXT
      type: boolean
      description: Stream button text (default false)
      required: false
    - name: TEXT_STYLE
      type: boolean
      description: Stream text style (default false)
      required: false
    - name: STYLE
      type: string
      description: "Base64 JSON SatelliteControlStylePreset: bitmap {w,h} allows nonsquare;colors hex/rgb;text boolean;textStyle boolean;since1.13 leds {segments>=1,mode full-ring/simple}. Overrides simple options. Full vendor schema in Notes."
      required: false
    - name: BITMAP_FORMAT
      type: string
      description: Since1.12; request only a format in CAPS BITMAP_FORMATS. Omitted or unadvertised format falls back to rgb; older servers ignore this parameter and send rgb.
      required: false
      enum:
        - rgb
        - png
        - webp
      default: rgb
  command: ADD-SUB SUBID={SUBID} LOCATION={LOCATION}
  terminator: LF or CRLF
  since: 1.10.0
  capability: Require CAPS SUBSCRIPTIONS=1
  description: "Observe absolute PAGE/ROW/COL location. A valid PAGE/ROW/COL location containing no button is valid: OK then empty SUB-STATE. Set at least one style option for useful output. Append supplied optional NAME=value arguments. STYLE overrides BITMAP,COLORS,TEXT,TEXT_STYLE. SUB-STATE arrives immediately then when changed."
- id: remove_sub
  label: Unsubscribe from Button
  kind: action
  params:
    - name: SUBID
      type: string
      description: Unique within connection; alphanumeric,-,/ characters. Reuse registered SUBID for subsequent messages.
      required: true
  command: REMOVE-SUB SUBID={SUBID}
  terminator: LF or CRLF
  since: 1.10.0
  capability: Require CAPS SUBSCRIPTIONS=1
  description: Remove subscription; no further SUB-STATE for its SUBID.
- id: sub_press
  label: Subscription Button Press
  kind: action
  params:
    - name: SUBID
      type: string
      description: Unique within connection; alphanumeric,-,/ characters. Reuse registered SUBID for subsequent messages.
      required: true
    - name: PRESSED
      type: boolean
      description: True for press, false for release
      required: true
  command: SUB-PRESS SUBID={SUBID} PRESSED={PRESSED}
  terminator: LF or CRLF
  since: 1.10.0
  capability: Require CAPS SUBSCRIPTIONS=1
- id: sub_rotate
  label: Subscription Encoder Rotate
  kind: action
  params:
    - name: SUBID
      type: string
      description: Unique within connection; alphanumeric,-,/ characters. Reuse registered SUBID for subsequent messages.
      required: true
    - name: DIRECTION
      type: integer
      description: "Signed direction and step count: positive right/clockwise,negative left;1/-1 one step;0 is legacy one-step-left. Magnitudes>1 require API1.14+ and CAPS ROTARY_AMOUNT=1. Source also says older servers treat any nonzero value as one step; its direction wording is ambiguous,so legacy negative-value direction remains unresolved; the unambiguous legacy directions are1 right and0 left."
      required: true
  command: SUB-ROTATE SUBID={SUBID} DIRECTION={DIRECTION}
  terminator: LF or CRLF
  since: 1.10.0
  capability: Require CAPS SUBSCRIPTIONS=1
  description: Rotation actions must be enabled for the button in Companion.
- id: pong
  label: Answer server keepalive
  kind: action
  command: PONG {payload}
  terminator: LF or CRLF
  params:
    - name: payload
      type: string
      required: true
      description: Echo the exact arbitrary payload from the server PING.
  description: Required response to server PING. Other unsolicited messages do not expect responses.
```

## Feedbacks
```yaml
- id: begin
  type: event
  description: First connection message. Use ApiVersion semver for compatibility; CompanionVersion is informational only. API1.10+ immediately sends CAPS next.
  pattern: BEGIN CompanionVersion={CompanionVersion} ApiVersion={ApiVersion}
  direction: server_to_client
- id: caps
  type: event
  description: "API1.10+ capability flags: SUBSCRIPTIONS;1.11+NONSQUARE;1.12+BITMAP_FORMATS comma-separated rgb,png,webp with rgb always;1.14+ROTARY_AMOUNT. Missing flags disabled. Availability changes close connection; reconnect/re-read. Before1.10 no CAPS; use ApiVersion for feature existence."
  pattern: CAPS {capabilities}
  direction: server_to_client
- id: key_state
  type: event
  description: Use KEY in simple mode or CONTROLID in advanced1.9+; DEVICEID routes surface. Optional LOCATION absolute page/row/column since1.10,not always present. TYPE and PRESSED since1.1. TYPE enum BUTTON/PAGEUP/PAGEDOWN/PAGENUM. Style-dependent optional BITMAP,COLOR,TEXTCOLOR,TEXT,FONT_SIZE,LEDS. BITMAP bare base64 raw RGB by default,or since1.12 negotiated png/webp self-describing data URL. COLOR/TEXTCOLOR hex or CSS RGB;TEXT base64 text;FONT_SIZE numeric. LEDS since1.13 always base64 raw RGB3bytes/segment,absent meansoff,independent of bitmap encoding. No response expected.
  pattern: KEY-STATE DEVICEID={DEVICEID} {state_fields}
  direction: server_to_client
- id: keys_clear
  type: event
  description: Resets all keys to black for a device.
  pattern: KEYS-CLEAR DEVICEID={DEVICEID}
  direction: server_to_client
- id: brightness
  type: event
  description: Set device brightness VALUE integer0..100.
  pattern: BRIGHTNESS DEVICEID={DEVICEID} VALUE={VALUE}
  direction: server_to_client
- id: variable_value
  type: event
  description: Since1.7; only declared output variables. VARIABLE is ID and VALUE is base64 encoded value.
  pattern: VARIABLE-VALUE DEVICEID={DEVICEID} VARIABLE="{VARIABLE}" VALUE="{VALUE}"
  direction: server_to_client
- id: locked_state
  type: event
  description: "PINCODE_LOCK declared: LOCKED and CHARACTER_COUNT;optional ROTATION since1.10.1 enum0,90,-90,180. While locked, drawing messages stop and input messages are ignored."
  pattern: LOCKED-STATE DEVICEID={DEVICEID} LOCKED={LOCKED} CHARACTER_COUNT={CHARACTER_COUNT}
  direction: server_to_client
- id: device_config
  type: event
  description: "When CONFIG_FIELDS declared: CONFIG is base64 JSON object keyed by field id; sent after ADD-DEVICE OK and on config change."
  pattern: DEVICE-CONFIG DEVICEID={DEVICEID} CONFIG="{CONFIG}"
  direction: server_to_client
- id: sub_state
  type: event
  description: Routes SUBID;TYPE and PRESSED. TYPE enum BUTTON/PAGEUP/PAGEDOWN/PAGENUM. Style-dependent optional BITMAP,COLOR,TEXTCOLOR,TEXT,FONT_SIZE,LEDS. BITMAP bare base64 raw RGB by default,or since1.12 negotiated png/webp self-describing data URL. COLOR/TEXTCOLOR hex or CSS RGB;TEXT base64 text;FONT_SIZE numeric. LEDS since1.13 always base64 raw RGB3bytes/segment,absent meansoff,independent of bitmap encoding. No response expected.
  pattern: SUB-STATE SUBID={SUBID} TYPE={TYPE}
  direction: server_to_client
- id: pong
  type: event
  description: Response to PING. Echoes the payload.
  pattern: PONG {payload}
  direction: server_to_client
- id: error
  type: event
  description: 'Unknown command uses ERROR MESSAGE="Unknown command: ..."; known-command error uses command prefix; DEVICEID included since1.2 when known.'
  pattern: ERROR MESSAGE="{MESSAGE}"
  direction: server_to_client
  patterns:
    - ERROR MESSAGE="{MESSAGE}"
    - '{COMMAND_NAME} ERROR MESSAGE="{MESSAGE}"'
    - '{COMMAND_NAME} ERROR DEVICEID={DEVICEID} MESSAGE="{MESSAGE}"'
- id: ping
  type: event
  pattern: PING {payload}
  description: Server keepalive requires client PONG with exact payload.
- id: command_ok
  type: event
  patterns:
    - "{COMMAND_NAME} OK"
    - "{COMMAND_NAME} OK {arguments}"
  description: Known-command success. Additional fields depend on command,including variable echo since1.7.1.
```

## Variables
```yaml
[]
```

## Events
```yaml
[]
```

## Macros
```yaml
[]
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: populate if source contains safety warnings, interlock procedures,
# or power-on sequencing requirements. Never infer - only populate from explicit source text.
```

## Notes
- Source: https://companion.free/for-developers/Satellite-API/ ; exact publisher Markdown snapshot fetched 2026-09-26, pinned by the author manifest. Covers API through1.14. Per-command/version/capability prerequisites apply; this does not assert all releases support all features.
- Client commands have LF or CRLF terminators. Templates show required fields; append optional parameters only when supplied,as space-separated NAME=value,quoting strings with spaces. KEY versus CONTROLID are mutually exclusive mode-specific variants. The document does not specify escaping embedded double quotes; that remains unresolved.
- Known commands return COMMAND-NAME OK (optional fields) or COMMAND-NAME ERROR MESSAGE=... (DEVICEID since1.2 ifknown); unknowncommands ERROR MESSAGE=... . PING/PONG is the keepalive exception. Do not acknowledge unsolicited state events except PING.
- Advanced surface schema: https://github.com/bitfocus/companion/blob/main/assets/satellite-surface.schema.json ; config fields schema: https://github.com/bitfocus/companion/blob/main/assets/satellite-config-fields.schema.json . Linked schemas are external and have not been independently expanded here; top-level shapes stated in the API document are preserved.
- API→Companion introduction:1.4→3.0;1.5→3.2;1.7→3.4;1.8→4.0;1.9→4.2;1.10→4.3;1.11/1.12→5.0;1.13/1.14→5.1. Negotiate ApiVersion from BEGIN,not CompanionVersion.
- Bitmap formats API1.12+:choose only CAPS BITMAP_FORMATS;rgb mandatoryfallback. rgb is bare base64 RGB;png/webp lossless data URLs. Check data: prefix on receipt. Older servers ignore BITMAP_FORMAT and returnrgb. Nonsquare capability is1.11; layouts may request nonsquare without it but receive black borders asneeded.
- LEDs API1.13+:no separate CAPS flag; only advanced LAYOUT_MANIFEST or STYLE,not simple mode. segments>=1; mode full-ring or simple. full-ring segment0 at6o'clock,increasingclockwise,deadzoneblack;non-ring gauge fallsbacksimple. simple orders0% atsegment0 to100% atlast;ignoresgaugeangles. Remap forphysicalwiring. LEDS always rawRGB3bytes/segment,neverdataURL;absence meansoff.
- API1.14 rotation magnitudes require CAPS ROTARY_AMOUNT=1. Preserve source's legacy wording explicitly; do not infer unsupported per-version direction behavior.
- No fixed variable list: ADD-DEVICE declares input/output variables; state/config events are documented in Feedbacks. No query actions invented for unsolicited messages.
- Source does not establish authentication,WebSocket path/TLS,message size limits,or maximum device/subscription counts. Hardware/application session not exercised.

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
source_urls:
  - https://raw.githubusercontent.com/bitfocus/website/main/for-developers/Satellite-API.md
retrieved_at: 2026-09-26T14:23:19.600Z
last_checked_at: 2026-09-26T14:23:19.600Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-26T14:23:19.600Z
matched_actions: 15
action_count: 15
confidence: medium
summary: "Complete exact-publisher API1.14 guide independently reviewed:15 client commands including required PONG,all14 prior IDs,optional/mode-specific parameters,version/capability gates and13 feedbacks match after3 wording corrections;unsolicited messages are not counted as client commands;auth,quote escaping and external nested-schema details remain explicitly unresolved/unexpanded. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no authentication mechanism described; source does not specify if auth can be configured"
- "populate if source contains safety warnings, interlock procedures,"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
