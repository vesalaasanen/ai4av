---
spec_id: admin/christie-dhd400s-duw350s
schema_version: ai4av-public-spec-v1
revision: 1
title: "Christie Captiva DHD400S / DUW350S Control Spec"
manufacturer: Christie
model_family: "Christie Captiva DHD400S"
aliases: []
compatible_with:
  manufacturers:
    - Christie
  models:
    - "Christie Captiva DHD400S"
    - "Christie Captiva DUW350S"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - christiedigital.com
  - qed-productions.com
  - manualslib.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-000816-02-christie-lit-man-usr-captiva.pdf
  - http://www.qed-productions.com/downloads/christie/serial-communications.pdf
  - https://www.manualslib.com/manual/1804825/Christie-Captiva-Dhd400s.html
  - https://www.christiedigital.com/globalassets/resources/public/020-000219-02-christie-dhd700-serial-communications.pdf
  - https://www.manualslib.com/manual/2301065/Christie-Rs232.html
retrieved_at: 2026-06-19T01:54:07.243Z
last_checked_at: 2026-06-19T07:42:18.828Z
generated_at: 2026-06-19T07:42:18.828Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "web/HTTP command payloads not documented (only UI described); Crestron RoomView protocol details not specified; TCP control port for projector not stated (only LAN management via browser at IP 192.168.0.100 implied); auth credentials configurable via web UI but no default or RS-232 auth mentioned"
  - "TCP control port not stated in source (only web browser management implied)"
  - "HTTP base URL not stated (manual references IP 192.168.0.100 as a direct-connection example, not a fixed value)"
  - "source contains no explicit safety warnings, interlock procedures,"
  - "TCP control port for projector (LAN/RoomView) not stated"
  - "HTTP/REST command payloads not documented (only web UI described)"
  - "Crestron RoomView command protocol/payloads not in this source"
  - "default network credentials (if any) not stated"
  - "firmware version compatibility range not stated"
  - "protocol version not stated"
verification:
  verdict: verified
  checked_at: 2026-06-19T07:42:18.828Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions matched literally to source command table; transport parameters (19200 baud, 8N1) verified. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-19
---

# Christie Captiva DHD400S / DUW350S Control Spec

## Summary
Christie Captiva DHD400S and DUW350S ultra-short-throw projectors. External control via RS-232 (D-Sub 9-pin, 19200 baud) and LAN/web browser management. Also supports Crestron RoomView monitoring. This spec covers the RS-232 command set listed in §6.3 of the user manual.

<!-- UNRESOLVED: web/HTTP command payloads not documented (only UI described); Crestron RoomView protocol details not specified; TCP control port for projector not stated (only LAN management via browser at IP 192.168.0.100 implied); auth credentials configurable via web UI but no default or RS-232 auth mentioned -->

## Transport
```yaml
protocols:
  - serial
  - http        # web management UI on LAN (browser to projector IP); no REST command set documented
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none    # inferred: no auth procedure in RS-232 source; web UI supports User/Admin passwords (configurable, no default stated)
# UNRESOLVED: TCP control port not stated in source (only web browser management implied)
# UNRESOLVED: HTTP base URL not stated (manual references IP 192.168.0.100 as a direct-connection example, not a fixed value)
```

## Traits
```yaml
traits:
  - powerable   # PWR n command
  - queryable   # PST?/ASP?/SIN?/VER?/SST? queries
  - levelable   # BRT/CON/VOL/MIC/KST continuous-value params
```

## Actions
```yaml
# RS-232 command set from §6.3.3. Format: "(MNEMONIC n)" with parameter n,
# or "(MNEMONIC ?)" for queries. Return: Pass = "P", Fail = "F";
# queries return "Ok<value>".
# All commands wrapped in parentheses per source.

- id: power_set
  label: Power
  kind: action
  command: "(PWR {n})"
  params:
    - name: n
      type: integer
      enum: [0, 1]
      description: "0: Off, 1: On"

- id: keypad
  label: Keypad
  kind: action
  command: "(KEY {n})"
  params:
    - name: n
      type: integer
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      description: "1: Up, 2: Left, 3: Right, 4: Down, 5: Menu, 6: Source, 7: Keystone+, 8: Keystone-, 9: Volume+, 10: Volume-"

- id: resync
  label: Resync
  kind: action
  command: "(RSC {n})"
  params:
    - name: n
      type: integer
      enum: [1]
      description: "1: VGA only"

- id: av_mute_set
  label: AV Mute (Blank)
  kind: action
  command: "(AVM {n})"
  params:
    - name: n
      type: integer
      enum: [0, 1]
      description: "0: Off, 1: On"

- id: freeze_set
  label: Freeze
  kind: action
  command: "(FRZ {n})"
  params:
    - name: n
      type: integer
      enum: [0, 1]
      description: "0: Unfreeze, 1: Freeze"

- id: input_source_set
  label: Input Source
  kind: action
  command: "(SIN {n})"
  params:
    - name: n
      type: integer
      enum: [1, 2, 3, 4, 5, 6]
      description: "1: VGA 1, 2: VGA 2, 3: HDMI 1, 4: HDMI 2, 5: Video, 6: Multimedia"

- id: color_mode_set
  label: Color Mode
  kind: action
  command: "(PST {n})"
  params:
    - name: n
      type: integer
      enum: [1, 2, 3, 4, 5]
      description: "1: Bright, 2: PC, 3: Movie, 4: Game, 5: User"

- id: brightness_set
  label: Brightness
  kind: action
  command: "(BRT {n})"
  params:
    - name: n
      type: integer
      range: [0, 100]
      description: "Brightness value 0-100"

- id: contrast_set
  label: Contrast
  kind: action
  command: "(CON {n})"
  params:
    - name: n
      type: integer
      range: [0, 100]
      description: "Contrast value 0-100"

- id: sharpness_set
  label: Sharpness
  kind: action
  command: "(SHA {n})"
  params:
    - name: n
      type: integer
      description: "Sharpness value (video only)"

- id: aspect_ratio_set
  label: Aspect Ratio
  kind: action
  command: "(ASP {n})"
  params:
    - name: n
      type: integer
      enum: [1, 2, 3, 4]
      description: "1: Auto, 2: 4:3, 3: 16:9, 4: 16:10 / Ultra Wide"

- id: digital_zoom
  label: Digital Zoom
  kind: action
  command: "(DZM {n})"
  params:
    - name: n
      type: integer
      enum: [0, 1]
      description: "0: Zoom-, 1: Zoom+"

- id: keystone_set
  label: Keystone
  kind: action
  command: "(KST {n})"
  params:
    - name: n
      type: integer
      range: [-40, 40]
      description: "Keystone value -40 to +40"

- id: orientation_set
  label: Orientation
  kind: action
  command: "(SOR {n})"
  params:
    - name: n
      type: integer
      enum: [1, 2, 3, 4]
      description: "1: Front, 2: Rear, 3: Front Ceiling, 4: Rear Ceiling"

- id: language_set
  label: Language
  kind: action
  command: "(LOC {n})"
  params:
    - name: n
      type: integer
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
      description: "1: English, 2: German, 3: Swedish, 4: French, 5: Arabic, 6: Dutch, 7: Norwegian, 8: Danish, 9: Simplified Chinese, 10: Polish, 11: Korean, 12: Russian, 13: Spanish, 14: Traditional Chinese, 15: Italian, 16: Portuguese, 17: Turkish, 18: Japanese"

- id: menu_location_set
  label: Menu Location
  kind: action
  command: "(MSP {n})"
  params:
    - name: n
      type: integer
      enum: [1, 2, 3, 4, 5]
      description: "1: Top Left, 2: Top Right, 3: Center, 4: Bottom Left, 5: Bottom Right"

- id: reset
  label: Reset
  kind: action
  command: "(RST {n})"
  params:
    - name: n
      type: integer
      description: "Reset (parameter n value not enumerated in source)"

- id: mute_set
  label: Mute
  kind: action
  command: "(MUT {n})"
  params:
    - name: n
      type: integer
      enum: [0, 1]
      description: "0: Off, 1: On"

- id: volume_set
  label: Volume
  kind: action
  command: "(VOL {n})"
  params:
    - name: n
      type: integer
      range: [0, 30]
      description: "Volume value 0-30"

- id: microphone_volume_set
  label: Microphone Volume
  kind: action
  command: "(MIC {n})"
  params:
    - name: n
      type: integer
      range: [0, 30]
      description: "Microphone volume value 0-30"

- id: auto_power_off_set
  label: Auto Power Off (min)
  kind: action
  command: "(ASH {n})"
  params:
    - name: n
      type: integer
      description: "Step = 5 (0, 5, 10, 15, 20, … 95, 100, 105, 110, 115, 120)"

- id: high_altitude_set
  label: High Altitude
  kind: action
  command: "(HAT {n})"
  params:
    - name: n
      type: integer
      enum: [0, 1]
      description: "0: Off, 1: On"

# --- Queries ---

- id: color_mode_query
  label: Color Mode Read
  kind: query
  command: "(PST ?)"
  params: []

- id: aspect_ratio_query
  label: Aspect Ratio Read
  kind: query
  command: "(ASP ?)"
  params: []

- id: input_source_query
  label: Input Source (current) Read
  kind: query
  command: "(SIN ?)"
  params: []

- id: software_version_query
  label: Software Version Read
  kind: query
  command: "(VER ?)"
  params: []

- id: status_query
  label: Status Read
  kind: query
  command: "(SST ?)"
  params: []
```

## Feedbacks
```yaml
# Return values documented in source §6.3.3

- id: command_ack
  type: enum
  values: ["P", "F"]
  description: "Per-command acknowledgement. Pass = 'P', Fail = 'F'."

- id: query_response
  type: string
  description: "Query commands return 'Ok<value>' on pass, 'F' on fail."

- id: color_mode_value
  type: enum
  values: [1, 2, 3, 4, 5]
  description: "1=Bright, 2=PC, 3=Movie, 4=Game, 5=User (PST ? response)"

- id: aspect_ratio_value
  type: enum
  values: [1, 2, 3, 4]
  description: "1=Auto, 2=4:3, 3=16:9, 4=16:10 (Ultra Wide) (ASP ? response)"

- id: input_source_value
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6]
  description: "0=None, 1=VGA1, 2=VGA2, 3=HDMI1, 4=HDMI2, 5=Video, 6=Multimedia (SIN ? response)"

- id: firmware_version_value
  type: string
  description: "FW version (VER ? returns 'Ok<ddd ddd>')"

- id: status_payload
  type: string
  description: "SST ? returns 'Ok<abbbbbccdddee>' where a=Power Status, b=LD Hour, c=Input Source, d=Firmware Version, e=Color mode"
```

## Variables
```yaml
# Settable continuous/enum parameters already enumerated as Actions above.
# No additional settable variables documented outside the command set.
```

## Events
```yaml
# Source documents no unsolicited notifications.
```

## Macros
```yaml
# Source documents no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements for external control.
```

## Notes
- Source: USER MANUAL 020-000816-02 (Christie Captiva DUW350S/DHD400S), §6.3 RS232 Commands.
- RS-232 connector: 9-pin DCE type D-Sub. Shell grounded.
- Command format: ASCII, wrapped in parentheses — `(MNEMONIC n)` for set, `(MNEMONIC ?)` for query. Space between mnemonic and parameter/query char.
- Acknowledgement: `P` = Pass, `F` = Fail. Queries return `Ok<value>` on pass.
- LAN/web: browser-based management UI at projector IP. Source shows a direct-connection example using `192.168.0.100`, subnet `255.255.255.0`, gateway `192.168.0.254` — these are example values, not device defaults. DHCP supported.
- Web UI supports configurable User Password and Admin Password (max 15 chars each); no RS-232 auth mechanism documented.
- Crestron RoomView supported for monitoring (online status, power, light-source life, network, hardware faults). RoomView IP ID configurable via web UI (max 2 chars). Crestron protocol payloads not documented in this source.
- `RST n` parameter value not enumerated in source.

<!-- UNRESOLVED: TCP control port for projector (LAN/RoomView) not stated -->
<!-- UNRESOLVED: HTTP/REST command payloads not documented (only web UI described) -->
<!-- UNRESOLVED: Crestron RoomView command protocol/payloads not in this source -->
<!-- UNRESOLVED: default network credentials (if any) not stated -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: protocol version not stated -->

## Provenance

```yaml
source_domains:
  - christiedigital.com
  - qed-productions.com
  - manualslib.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-000816-02-christie-lit-man-usr-captiva.pdf
  - http://www.qed-productions.com/downloads/christie/serial-communications.pdf
  - https://www.manualslib.com/manual/1804825/Christie-Captiva-Dhd400s.html
  - https://www.christiedigital.com/globalassets/resources/public/020-000219-02-christie-dhd700-serial-communications.pdf
  - https://www.manualslib.com/manual/2301065/Christie-Rs232.html
retrieved_at: 2026-06-19T01:54:07.243Z
last_checked_at: 2026-06-19T07:42:18.828Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:42:18.828Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions matched literally to source command table; transport parameters (19200 baud, 8N1) verified. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "web/HTTP command payloads not documented (only UI described); Crestron RoomView protocol details not specified; TCP control port for projector not stated (only LAN management via browser at IP 192.168.0.100 implied); auth credentials configurable via web UI but no default or RS-232 auth mentioned"
- "TCP control port not stated in source (only web browser management implied)"
- "HTTP base URL not stated (manual references IP 192.168.0.100 as a direct-connection example, not a fixed value)"
- "source contains no explicit safety warnings, interlock procedures,"
- "TCP control port for projector (LAN/RoomView) not stated"
- "HTTP/REST command payloads not documented (only web UI described)"
- "Crestron RoomView command protocol/payloads not in this source"
- "default network credentials (if any) not stated"
- "firmware version compatibility range not stated"
- "protocol version not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
