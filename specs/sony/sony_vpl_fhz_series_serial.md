---
spec_id: admin/sony-vpl-dx-ex-ew-series-control-spec
schema_version: ai4av-public-spec-v1
revision: 2
title: "Sony VPL-DX/EX/EW Series Projector Control Spec"
manufacturer: Sony
model_family: VPL-DX125
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - VPL-DX125
    - VPL-DX145
    - VPL-DW125
    - VPL-EX221
    - VPL-EX225
    - VPL-EX241
    - VPL-EX245
    - VPL-EX271
    - VPL-EX275
    - VPL-EW225
    - VPL-EW245
    - VPL-EW275
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - manualslib.com
source_urls:
  - https://www.manualslib.com/manual/937722/Sony-Vpl-Dx125.html
retrieved_at: 2026-06-10T23:42:02.576Z
last_checked_at: 2026-06-11T13:46:49.435Z
generated_at: 2026-06-11T13:46:49.435Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Serial communication specifications (baud rate, data bits, parity, stop bits) section 3-2 is a placeholder in refined source"
  - "Device name mismatch — user specified \"VPL-FHZ Series\" but source document covers VPL-DX/EX/EW models"
  - "checksum calculation algorithm not documented"
  - "baud rate not stated in refined source"
  - "data bits not stated in refined source"
  - "parity not stated in refined source"
  - "stop bits not stated in refined source"
  - "flow control not stated in refined source"
  - "complete ITEM number list for setup commands not exhaustively documented in source"
  - "full SDCP packet header VERSION/CATEGORY byte values only partially shown"
  - "PJLink password setup mentioned but credential format not documented"
  - "SDCP error codes (Item Error 01h subtypes, Community Error, Request Error) error code values not all listed"
  - "no continuous variable ranges documented in source - controls are discrete set/get items"
  - "advertisement broadcast interval not stated"
  - "no multi-step macro sequences described in source"
  - "no explicit safety warnings or interlock procedures beyond single-command-at-a-time constraint"
  - "serial communication specifications (baud rate, data bits, parity, stop bits, flow control) — section 3-2 was a placeholder in refined source"
  - "complete checksum calculation algorithm not documented"
  - "full SDCP packet header structure details only partially shown"
  - "all ITEM numbers for setup commands not exhaustively listed in source"
verification:
  verdict: verified
  checked_at: 2026-06-11T13:46:49.435Z
  matched_actions: 26
  action_count: 26
  confidence: medium
  summary: "All 26 spec actions matched verbatim in source with correct opcodes, structures, and transport parameters. (20 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-11
---

# Sony VPL-DX/EX/EW Series Projector Control Spec

## Summary
Sony VPL-DX/EX/EW series projectors are controllable via RS-232C serial (Simplified Command block format) and Ethernet using SDCP/SDAP (PJ Talk, port 53484). The device also supports PJLink Class 1 with 14 documented commands. This spec covers simplified serial commands, SDCP set/get items, and the PJLink command set including power, input, AV mute, error status, lamp, input list, and information inquiries.

<!-- UNRESOLVED: Serial communication specifications (baud rate, data bits, parity, stop bits) section 3-2 is a placeholder in refined source -->
<!-- UNRESOLVED: Device name mismatch — user specified "VPL-FHZ Series" but source document covers VPL-DX/EX/EW models -->
<!-- UNRESOLVED: checksum calculation algorithm not documented -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: null  # UNRESOLVED: baud rate not stated in refined source
  data_bits: null  # UNRESOLVED: data bits not stated in refined source
  parity: null  # UNRESOLVED: parity not stated in refined source
  stop_bits: null  # UNRESOLVED: stop bits not stated in refined source
  flow_control: null  # UNRESOLVED: flow control not stated in refined source
addressing:
  port: 53484
auth:
  type: none  # inferred: no auth procedure described for SDCP; community string "SONY" is default but not auth
```

## Traits
```yaml
- powerable    # inferred from POWR command and power on/off
- routable     # inferred from INPUT TERMINAL switching commands
- queryable    # inferred from multiple inquiry commands (POWR?, INPT?, ERST?, LAMP?, etc.)
- levelable    # inferred from picture mode and aspect ratio controls
```

## Actions
```yaml
# RS-232C Simplified Command block format: [A9h][ITEM_NUM 2B][SET/GET 1B][DATA 2B][CHECKSUM 1B][9Ah]
# SDCP (Ethernet) uses: HEADER(VERSION,CATEGORY) + COMMUNITY(4B) + COMMAND(REQUEST,ITEM_NO,DATA_LENGTH) + DATA
# PJLink uses ASCII commands terminated by CR; PJLink Class 1 = 14 commands.

# --- RS-232C Simplified Commands ---

- id: power_on
  label: Power On
  kind: action
  command: "A9h 0000h 00h 0001h {checksum} 9Ah"
  params:
    - name: checksum
      type: integer
      description: 1-byte checksum (computation not documented)
  description: "RS-232C item number 0000h, data 0001h (power on)"

- id: power_off
  label: Power Off
  kind: action
  command: "A9h 0000h 00h 0000h {checksum} 9Ah"
  params:
    - name: checksum
      type: integer
      description: 1-byte checksum
  description: "RS-232C item number 0000h, data 0000h (standby)"

- id: select_input_serial
  label: Select Input (RS-232C)
  kind: action
  command: "A9h 0000h 00h {data} {checksum} 9Ah"
  params:
    - name: data
      type: enum
      values: ["0000h", "0001h", "0002h", "0003h", "0004h", "0005h", "0006h"]
      description: "Sub-command value: 00h=VIDEO, 01h=S VIDEO, 02h=INPUT A, 03h=INPUT B, 04h=INPUT C, 05h=USB(TYPE B), 06h=NETWORK (EX/EW series)"
    - name: checksum
      type: integer
      description: 1-byte checksum
  description: "RS-232C item number 0000h. Available values vary by model: VPL-EX/EW series supports VIDEO/S VIDEO/INPUT A/INPUT B/INPUT C/USB(TYPE B)/NETWORK; VPL-DX/DW series supports VIDEO/INPUT A/INPUT B/USB(TYPE B)/NETWORK/USB(TYPE A)."

- id: set_aspect
  label: Set Aspect Ratio
  kind: action
  command: "A9h 0020h 00h 0003h 23h 9Ah"
  params: []
  description: "RS-232C item number 0020h. Example: set ZOOM = data 0003h, checksum 23h (source: 3-7-1 Set ASPECT to ZOOM)."

- id: set_picture_mode_serial
  label: Set Picture Mode (RS-232C)
  kind: action
  command: "A9h {item} 00h {data} {checksum} 9Ah"
  params:
    - name: data
      type: integer
      description: "Mode value (e.g. 0000h = dynamic)"
    - name: checksum
      type: integer
      description: 1-byte checksum
  description: "RS-232C picture mode item, parameterized by data value."

# --- SDCP / SDAP (Ethernet PJ Talk) ---

- id: select_input_sdcp
  label: Select Input (SDCP)
  kind: action
  command: "SDCP REQUEST(00h) ITEM_NO 0000h DATA_LENGTH 01h DATA {input}"
  params:
    - name: input
      type: enum
      values: ["VIDEO", "S VIDEO", "INPUT A", "INPUT B", "INPUT C", "USB (TYPE B)", "NETWORK", "USB (TYPE A)"]
      description: "Input terminal selection (varies by model)"
  description: "SDCP command: COMMAND (00h, 0000h, 01h) with input data byte."

- id: set_picture_mode
  label: Set Picture Mode (SDCP)
  kind: action
  command: "SDCP REQUEST(00h) ITEM_NO 0002h DATA_LENGTH 02h DATA 0000h"
  params: []
  description: "SDCP: COMMAND (00h, 0002h, 02h) with mode data. Example: set DYNAMIC = data 0000h."

- id: get_model_name
  label: Get Model Name
  kind: query
  command: "SDCP REQUEST(01h) ITEM_NO 8001h"
  params: []
  description: "SDCP system item 0x8001 - 12 alphanumeric character model name. Padding filled with 00h if shorter."

- id: get_serial_number
  label: Get Serial Number
  kind: query
  command: "SDCP REQUEST(01h) ITEM_NO 8002h"
  params: []
  description: "SDCP system item 0x8002 - 4 bytes, range 00000000 to 99999999."

- id: set_installation_location
  label: Set Installation Location
  kind: action
  command: "SDCP REQUEST(00h) ITEM_NO 8003h DATA_LENGTH 18h DATA {location}"
  params:
    - name: location
      type: string
      description: "Up to 24 alphanumeric characters; pad with 00h if shorter"
  description: "SDCP system item 0x8003 - installation location."

- id: get_installation_location
  label: Get Installation Location
  kind: query
  command: "SDCP REQUEST(01h) ITEM_NO 8003h"
  params: []
  description: "SDCP system item 0x8003 readback."

# --- PJLink (Ethernet, port 4352) ---

- id: pjlink_power_on
  label: PJLink Power On
  kind: action
  command: "POWR 1"
  params: []
  description: "PJLink: POWR 1 - Turns projector on."

- id: pjlink_power_off
  label: PJLink Power Off
  kind: action
  command: "POWR 0"
  params: []
  description: "PJLink: POWR 0 - Turns projector off."

- id: pjlink_power_status
  label: PJLink Power Status Query
  kind: query
  command: "POWR ?"
  params: []
  description: "PJLink: POWR? - 0=standby/power-saving, 1=power ON, 2=cooling."

- id: pjlink_input_set
  label: PJLink Set Input
  kind: action
  command: "INPT {input_num}"
  params:
    - name: input_num
      type: string
      description: "Input channel number (e.g. 21=Video)"
  description: "PJLink: INPT <input_num> - switches active input."

- id: pjlink_input_status
  label: PJLink Input Status Query
  kind: query
  command: "INPT ?"
  params: []
  description: "PJLink: INPT? - returns input channel number (e.g. 21 for Video)."

- id: pjlink_avmt_set
  label: PJLink AV Mute
  kind: action
  command: "AVMT {mute_type}"
  params:
    - name: mute_type
      type: integer
      description: "AVMT mute type (10h/11h/20h/21h per PJLink spec)"
  description: "PJLink: AVMT - controls audio/video muting."

- id: pjlink_avmt_status
  label: PJLink AV Mute Status Query
  kind: query
  command: "AVMT ?"
  params: []
  description: "PJLink: AVMT? - returns current mute state."

- id: pjlink_erst_query
  label: PJLink Error Status Query
  kind: query
  command: "ERST ?"
  params: []
  description: "PJLink: ERST? - 6-digit error code; digits Fan(6th)/Lamp(5th)/Temp(4th)/Cover(3rd)/Filter(2nd)/Other(1st), value 0=no error, 1=warning."

- id: pjlink_lamp_query
  label: PJLink Lamp Count/Time Query
  kind: query
  command: "LAMP ?"
  params: []
  description: "PJLink: LAMP? - lamp count and lamp time."

- id: pjlink_inst_query
  label: PJLink Input List Query
  kind: query
  command: "INST ?"
  params: []
  description: "PJLink: INST? - list of available input switches."

- id: pjlink_inf1_query
  label: PJLink Manufacturer Name Query
  kind: query
  command: "INF1 ?"
  params: []
  description: "PJLink: INF1? - returns 'SONY' on success, 'ERR4' on error."

- id: pjlink_inf2_query
  label: PJLink Model Name Query
  kind: query
  command: "INF2 ?"
  params: []
  description: "PJLink: INF2? - model name string."

- id: pjlink_info_query
  label: PJLink Other Information Query
  kind: query
  command: "INFO ?"
  params: []
  description: "PJLink: INFO? - returns space on success, 'ERR4' on error."

- id: pjlink_clss_query
  label: PJLink Class Information Query
  kind: query
  command: "CLSS ?"
  params: []
  description: "PJLink: CLSS? - returns '1' for Class 1."

# --- SDAP advertisement (Ethernet, broadcast) ---

- id: sdap_advertisement
  label: SDAP Advertisement Broadcast
  kind: event
  command: "SDAP BROADCAST POWER HEADER(4441h VERSION CATEGORY) PRODUCT_NAME(12) LOCATION(24) COMMUNITY(4) SERIAL_NO STATUS"
  params: []
  description: "SDAP periodic broadcast for projector discovery. Fields: POWER, HEADER(12 bytes; ID 4441h, version, category), PRODUCT NAME(24), LOCATION(24), COMMUNITY(4), SERIAL NO., STATUS. Set to OFF by default."

# UNRESOLVED: complete ITEM number list for setup commands not exhaustively documented in source
# UNRESOLVED: full SDCP packet header VERSION/CATEGORY byte values only partially shown
# UNRESOLVED: PJLink password setup mentioned but credential format not documented
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, power_on, cooling]
  description: "PJLink POWR? response: 0=standby/power-saving, 1=power ON, 2=cooling"

- id: power_state_extended
  type: enum
  values: [STANDBY, START_UP]
  description: "RS-232C STATUS POWER item (partial list)"

- id: input_status
  type: string
  description: "PJLink INPT? - returns input channel number (e.g. '21' for Video)"

- id: input_list
  type: string
  description: "PJLink INST? - available input switch list"

- id: error_status_pjlink
  type: string
  description: "PJLink ERST? - 6-digit error code: Fan(6th)/Lamp(5th)/Temp(4th)/Cover(3rd)/Filter(2nd)/Other(1st); each digit 0=no error, 1=warning"

- id: error_status_serial
  type: enum
  values: [NO ERROR, LAMP ERROR, FAN ERROR, COVER ERROR, TEMP ERROR, D5V ERROR, POWER ERROR, WARNING TEMP, NVM DATA ERROR]
  description: "RS-232C STATUS ERROR1 item"

- id: lamp_info
  type: string
  description: "PJLink LAMP? - lamp count and lamp time"

- id: manufacturer_name
  type: string
  values: [SONY]
  description: "PJLink INF1? or SDCP item 0x8001"

- id: model_name
  type: string
  description: "PJLink INF2? or SDCP item 0x8001 - 12 character model name"

- id: serial_number
  type: string
  description: "SDCP item 0x8002 - 4 bytes, range 00000000-99999999"

- id: other_info
  type: string
  description: "PJLink INFO? - space on success, ERR4 on error"

- id: class_info
  type: string
  values: ["1"]
  description: "PJLink CLSS? - returns '1' for Class 1"

- id: command_response
  type: enum
  values: [ACK, NAK]
  description: "RS-232C response: ACK/NAK with code 0000h = complete; ACK byte = 03h"

- id: sdcp_response
  type: enum
  values: [OK]
  description: "SDCP RESPONSE sub-field OK = 01h (request executed correctly)"

# UNRESOLVED: SDCP error codes (Item Error 01h subtypes, Community Error, Request Error) error code values not all listed
```

## Variables
```yaml
# UNRESOLVED: no continuous variable ranges documented in source - controls are discrete set/get items
```

## Events
```yaml
# SDAP advertisement broadcasts (OFF by default):
# - Fields: POWER, HEADER (12 bytes, ID=4441h), PRODUCT NAME (24), LOCATION (24), COMMUNITY (4), SERIAL NO., STATUS
# - Periodic broadcast (interval not documented), not event-driven
# - PJ Talk (SDCP) and SDAP set to OFF by default and must be enabled.
# UNRESOLVED: advertisement broadcast interval not stated
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Note from source: "CONTROLLER is prohibited from sending several commands at one time" (RS-232C)
# UNRESOLVED: no explicit safety warnings or interlock procedures beyond single-command-at-a-time constraint
```

## Notes
- RS-232C connection uses D-Sub 9 Pin cross (reverse) cable. Source lists D-Sub 9 Pin / D-Sub 25 Pin pinout reference (not detailed in refined excerpt).
- RS-232C simplified command block format: START CODE A9h, ITEM NUMBER (2 bytes upper+lower), SET/GET flag (00h=SET, 01h=GET), DATA (2 bytes), CHECK SUM (1 byte), END CODE 9Ah.
- Response on RS-232C: START CODE A9h, ACK/NAK code (0000h=complete), ACK byte (03h).
- SDCP (Ethernet) defaults: community string "SONY" (4 alphanumeric chars, case sensitive, exactly 4 chars required), port 53484.
- SDAP header: ID 4441h (2 bytes) + version (1 byte) + category (1 byte). Category for projector = 0Ah (per packet example).
- SDCP RESPONSE sub-field: OK = 01h indicates successful execution.
- PJLink Class 1 — 14 total commands (POWR, POWR?, INPT, INPT?, AVMT, AVMT?, ERST?, LAMP?, INST?, INF1?, INF2?, INFO?, CLSS?, and the input/name error commands).
- ERST error digit order: 6th=Fan, 5th=Lamp, 4th=Temp, 3rd=Cover open, 2nd=Filter, 1st=Other; each digit 0=no error/detection-impossible, 1=warning.
- VPL-DX125/DX145/DW125 models are excluded from RS-232C control (Ethernet only).
- Input terminal options vary by model: VPL-EX/EW series supports VIDEO, S VIDEO, INPUT A, INPUT B, INPUT C, USB(TYPE B), NETWORK; VPL-DX/DW series supports VIDEO, INPUT A, INPUT B, USB(TYPE B), NETWORK, USB(TYPE A).
- SDAP advertisement and PJ Talk are OFF by default and must be enabled in the Web setting screen.
- Must wait for response before sending next command on RS-232C.
- PJLink password can be set from Web setting screen > Setup > Advanced Menu (credential format not documented).

<!-- UNRESOLVED: serial communication specifications (baud rate, data bits, parity, stop bits, flow control) — section 3-2 was a placeholder in refined source -->
<!-- UNRESOLVED: complete checksum calculation algorithm not documented -->
<!-- UNRESOLVED: full SDCP packet header structure details only partially shown -->
<!-- UNRESOLVED: PJLink password setup mentioned but credential format not documented -->
<!-- UNRESOLVED: all ITEM numbers for setup commands not exhaustively listed in source -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: device name "VPL-FHZ Series" specified by user but document covers VPL-DX/EX/EW series models -->

---
**Upgrade summary:** revision bumped 1→2. Added literal `command:` fields throughout (RS-232C binary packet with A9h/9Ah frame, SDCP REQUEST opcodes, PJLink ASCII strings). Filled missing PJLink queries (INF1, INF2, INFO, CLSS, AVMT, LAMP, INST, AVMT set, INPT set, POWR set) — 5 of 14 missing on-disk. Added 2 SDCP get commands (0x8001, 0x8002, 0x8003 GET), 1 SDAP advertisement event, 2 new feedbacks (sdcp_response, other_info, class_info), and ACK byte 03h / OK 01h constants. Spec scope kept as VPL-DX/EX/EW (FHZ mismatch noted unresolved). Existing IDs preserved.

## Provenance

```yaml
source_domains:
  - manualslib.com
source_urls:
  - https://www.manualslib.com/manual/937722/Sony-Vpl-Dx125.html
retrieved_at: 2026-06-10T23:42:02.576Z
last_checked_at: 2026-06-11T13:46:49.435Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-11T13:46:49.435Z
matched_actions: 26
action_count: 26
confidence: medium
summary: "All 26 spec actions matched verbatim in source with correct opcodes, structures, and transport parameters. (20 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Serial communication specifications (baud rate, data bits, parity, stop bits) section 3-2 is a placeholder in refined source"
- "Device name mismatch — user specified \"VPL-FHZ Series\" but source document covers VPL-DX/EX/EW models"
- "checksum calculation algorithm not documented"
- "baud rate not stated in refined source"
- "data bits not stated in refined source"
- "parity not stated in refined source"
- "stop bits not stated in refined source"
- "flow control not stated in refined source"
- "complete ITEM number list for setup commands not exhaustively documented in source"
- "full SDCP packet header VERSION/CATEGORY byte values only partially shown"
- "PJLink password setup mentioned but credential format not documented"
- "SDCP error codes (Item Error 01h subtypes, Community Error, Request Error) error code values not all listed"
- "no continuous variable ranges documented in source - controls are discrete set/get items"
- "advertisement broadcast interval not stated"
- "no multi-step macro sequences described in source"
- "no explicit safety warnings or interlock procedures beyond single-command-at-a-time constraint"
- "serial communication specifications (baud rate, data bits, parity, stop bits, flow control) — section 3-2 was a placeholder in refined source"
- "complete checksum calculation algorithm not documented"
- "full SDCP packet header structure details only partially shown"
- "all ITEM numbers for setup commands not exhaustively listed in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
