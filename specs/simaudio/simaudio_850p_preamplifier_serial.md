---
spec_id: admin/simaudio-850p-preamplifier
schema_version: ai4av-public-spec-v1
revision: 1
title: "SimAudio 850P Preamplifier Control Spec"
manufacturer: SimAudio
model_family: 850P
aliases: []
compatible_with:
  manufacturers:
    - SimAudio
  models:
    - 850P
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - simaudio.com
source_urls:
  - https://simaudio.com/wp-content/uploads/2018/04/MOON_850P_RS232IRcodes_rev2.pdf
retrieved_at: 2026-09-17T03:54:32.969Z
last_checked_at: 2026-09-21T22:17:00.935Z
generated_at: 2026-09-21T22:17:00.935Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware/software version compatibility not stated in source (only protocol revision 2 / document revision 2 stated)"
  - "source contains no safety warnings or interlock procedures."
  - "command timing/latency values not stated in source."
  - "power draw, voltage, current specifications not stated in source."
verification:
  verdict: verified
  checked_at: 2026-09-21T22:17:00.935Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions match source commands 0x20-0x2B (setup), 0x01-0x08 (status), 0x60-0x67 (user); transport (9600 baud, 8N1, no flow control) is documented verbatim. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-17
---

# SimAudio 850P Preamplifier Control Spec

## Summary
SimAudio (MOON) 850P stereo preamplifier with an RS-232C control port for bidirectional communication with a HOST (PC, touch panel, or custom install controller). The protocol uses printable-ASCII packets: `#` header, 2-hex-digit byte count, 2-hex-digit command/response code, command-dependent parameters, and `<CR>` (0x0d) end delimiter. The unit also has an infrared receiver using Philips RC5 frames (RC5 system 16); IR is documented in the source but is not part of the serial transport.

<!-- UNRESOLVED: firmware/software version compatibility not stated in source (only protocol revision 2 / document revision 2 stated) -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # default; settable 1200-38400 via command 0x20
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable       inferred from Set power state command (0x60)
# - queryable       inferred from status commands 0x01-0x08
# - routable        inferred from Set input selection command (0x63)
# - levelable       inferred from master volume (0x64), balance (0x66), display intensity (0x62) commands
```

## Actions
```yaml
# Packet format: "#"+byte count (2 hex ASCII chars)+command code (2 hex ASCII chars)+parameters+"<CR>" (0x0d).
# Setup commands: 0x20-0x5f. Status commands: 0x01-0x1f. User commands: 0x60-0x9f.
- id: set_communication_parameters
  label: Set Communication Parameters
  kind: action
  command: "#0620{baud}{unsolicited_feedback}{display_feedback}<CR>"
  params:
    - name: baud
      type: enum
      values: ["01", "02", "03", "04", "05", "06"]
      description: "01=38400, 02=19200, 03=9600 (default), 04=4800, 05=2400, 06=1200"
    - name: unsolicited_feedback
      type: boolean
      description: "0=OFF, 1=ON (default)"
    - name: display_feedback
      type: boolean
      description: "0=OFF (default), 1=ON"
  notes: "Baud rate changes after the UNIT's response, which is sent at the previous baud rate."

- id: reset_unit
  label: Reset UNIT
  kind: action
  command: "#0221<CR>"
  params: []
  notes: "Resets as if mains rocker toggled OFF/ON. Baud resets to 9600, unsolicited feedback ON, display feedback OFF."

- id: set_factory_defaults
  label: Set Factory Defaults
  kind: action
  command: "#0222<CR>"
  params: []
  notes: "Does not affect RS232 communication parameters."

- id: set_input_label
  label: Set Input Label
  kind: action
  command: "#0D23{input_id}{label}<CR>"
  params:
    - name: input_id
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06"]
      description: "00=B1, 01=B2, 02=B3, 03=S1, 04=S2, 05=S3, 06=S4"
    - name: label
      type: string
      description: "NULL terminated label string (8 characters + NULL)"
  notes: "Stored in non-volatile memory. Example: #0D2302ANDRMEDA<NULL><CR>"

- id: enable_disable_input
  label: Enable/Disable Input
  kind: action
  command: "#0524{input_id}{enable}<CR>"
  params:
    - name: input_id
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06"]
      description: "00=B1, 01=B2, 02=B3, 03=S1, 04=S2, 05=S3, 06=S4"
    - name: enable
      type: boolean
      description: "0=disabled, 1=enabled (default)"

- id: set_input_offset
  label: Set Input Offset
  kind: action
  command: "#0625{input_id}{offset}<CR>"
  params:
    - name: input_id
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06"]
      description: "00=B1, 01=B2, 02=B3, 03=S1, 04=S2, 05=S3, 06=S4"
    - name: offset
      type: string
      description: "00=-10.0, 64=00.0, A0=+6.0 (default), C8=+10.0 (range 00 to C8)"

- id: set_input_bypass
  label: Set Input Bypass
  kind: action
  command: "#0526{input_id}{bypass}<CR>"
  params:
    - name: input_id
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06"]
      description: "00=B1, 01=B2, 02=B3, 03=S1, 04=S2, 05=S3, 06=S4"
    - name: bypass
      type: boolean
      description: "0=disabled (default), 1=enabled"

- id: set_input_maximum_volume
  label: Set Input Maximum Volume
  kind: action
  command: "#0827{input_id}{msb}{lsb}<CR>"
  params:
    - name: input_id
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06"]
      description: "00=B1, 01=B2, 02=B3, 03=S1, 04=S2, 05=S3, 06=S4"
    - name: msb
      type: string
      description: "Maximum volume MSB (01 to 03)"
    - name: lsb
      type: string
      description: "Maximum volume LSB (00 to FF). Range 400-800 = 40.0-80.0 display"

- id: set_trigger_1
  label: Set Trigger 1
  kind: action
  command: "#0528{input_id}{enable}<CR>"
  params:
    - name: input_id
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06", "07"]
      description: "00=B1, 01=B2, 02=B3, 03=S1, 04=S2, 05=S3, 06=S4, 07=infrared control for Trigger 1"
    - name: enable
      type: boolean
      description: "0=disabled (default for IR control), 1=enabled (default for input selection)"

- id: set_trigger_2
  label: Set Trigger 2
  kind: action
  command: "#0529{input_id}{enable}<CR>"
  params:
    - name: input_id
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06", "07"]
      description: "00=B1, 01=B2, 02=B3, 03=S1, 04=S2, 05=S3, 06=S4, 07=infrared control for Trigger 2"
    - name: enable
      type: boolean
      description: "0=disabled (default for IR control), 1=enabled (default for input selection)"

- id: set_ir
  label: Set IR (Infrared Receiver)
  kind: action
  command: "#052A{rc5_system}{front_ir_disable}<CR>"
  params:
    - name: rc5_system
      type: enum
      values: ["00", "01", "02", "03", "04"]
      description: "00=default IR system 16, 01=system 11, 02=system 14, 03=system 15, 04=system 19"
    - name: front_ir_disable
      type: boolean
      description: "0=front IR enabled (default), 1=front IR disabled"

- id: set_mind
  label: Set MiND
  kind: action
  command: "#042B{input_id}<CR>"
  params:
    - name: input_id
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06"]
      description: "00=B1 (default), 01=B2, 02=B3, 03=S1, 04=S2, 05=S3, 06=S4"
  notes: "Selects input connected to a MiND streamer. Error if an input is labeled MiND (label takes precedence)."

- id: get_unit_status
  label: Get UNIT Status
  kind: query
  command: "#0201<CR>"
  params: []

- id: get_product_information
  label: Get Product Information
  kind: query
  command: "#0202<CR>"
  params: []

- id: get_communication_setup
  label: Get Communication Setup
  kind: query
  command: "#0203<CR>"
  params: []

- id: get_unit_display_string
  label: Get UNIT Display String
  kind: query
  command: "#0204<CR>"
  params: []

- id: get_input_setup
  label: Get Input Setup
  kind: query
  command: "#0405{input_id}<CR>"
  params:
    - name: input_id
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06"]
      description: "00=B1, 01=B2, 02=B3, 03=S1, 04=S2, 05=S3, 06=S4"

- id: get_triggers_setup
  label: Get Triggers Setup
  kind: query
  command: "#0206<CR>"
  params: []

- id: get_ir_setup
  label: Get IR Setup
  kind: query
  command: "#0207<CR>"
  params: []

- id: get_mind_setup
  label: Get MiND Setup
  kind: query
  command: "#0208<CR>"
  params: []

- id: set_power_state
  label: Set Power State
  kind: action
  command: "#0460{state}<CR>"
  params:
    - name: state
      type: enum
      values: ["01", "02", "03", "04"]
      description: "01=toggle, 02=ON with setup menu available, 03=OFF, 04=ON with setup menu not available"
  notes: "Controls standby only, not the back panel mains switch. Parameter 04 lockout persists until parameter 02, Reset UNIT, or mains disconnect."

- id: set_display_state
  label: Set Display State
  kind: action
  command: "#0461{state}<CR>"
  params:
    - name: state
      type: enum
      values: ["01", "02", "03"]
      description: "01=toggle, 02=ON, 03=OFF"

- id: set_display_intensity
  label: Set Display Intensity
  kind: action
  command: "#0462{intensity}<CR>"
  params:
    - name: intensity
      type: enum
      values: ["01", "02", "03", "04"]
      description: "01=scroll to next, 02=low, 03=medium (default), 04=high"

- id: set_input_selection
  label: Set Input Selection
  kind: action
  command: "#0463{input_id}<CR>"
  params:
    - name: input_id
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06", "07", "08"]
      description: "00=B1, 01=B2, 02=B3, 03=S1, 04=S2, 05=S3, 06=S4, 07=next enabled input, 08=previous enabled input"

- id: set_master_volume
  label: Set Master Volume
  kind: action
  command: "#0864{action_type}{msb}{lsb}<CR>"
  params:
    - name: action_type
      type: enum
      values: ["01", "02", "03", "04", "05", "06", "07"]
      description: "01=decrement small step (1), 02=decrement medium step (10), 03=decrement large step (20), 04=increment small step (1), 05=increment medium step (10), 06=increment large step (20), 07=set specified value"
    - name: msb
      type: string
      description: "Value MSB (00 to 03), used in specified value only"
    - name: lsb
      type: string
      description: "Value LSB (00 to FF), used in specified value only. Range 000-800 = 0.0-80.0 display"
  notes: "Below 30.0 volume, increment of 1 is treated as 10. Sending a new volume deactivates MUTE."

- id: set_mute
  label: Set Mute
  kind: action
  command: "#0465{state}<CR>"
  params:
    - name: state
      type: enum
      values: ["01", "02", "03"]
      description: "01=toggle, 02=ON, 03=OFF"

- id: set_balance
  label: Set Balance Value
  kind: action
  command: "#0666{action_type}{value}<CR>"
  params:
    - name: action_type
      type: enum
      values: ["01", "02", "03"]
      description: "01=decrement 1% (go left), 02=increment 1% (go right), 03=set specified value"
    - name: value
      type: string
      description: "00 to C8; 0-200 decimal, 100=center (64 hex), 0=100% left, 200=100% right"

- id: set_tape_monitor
  label: Set Tape Monitor
  kind: action
  command: "#0467{state}<CR>"
  params:
    - name: state
      type: enum
      values: ["01", "02", "03"]
      description: "01=toggle, 02=ON, 03=OFF"
```

## Feedbacks
```yaml
# UNIT responses, code range 0xa0-0xfe. All packets share the "#"+count+code+params+"<CR>" format.
- id: acknowledge
  response_code: "A0"
  command: "#04A0{command_code}<CR>"
  description: "Acknowledges command with no specific response. Parameter: acknowledged command code (01 to 9F)."

- id: error
  response_code: "A1"
  command: "#06A1{command_code}{error_code}<CR>"
  description: "Error in command field, parameter field, or execution. Error codes: 01=unknown command, 02=hardware interface error, 03=invalid parameter, 04=invalid or corrupted packet, 05=only 1 input enabled, 06=setup menu in use, 07=label already used, 08=UNIT in standby, 09=input disabled, 0A=bypass enabled on input, 0B=power supply or communication cable unplugged, 0C=MiND label takes precedence."

- id: communication_setup
  response_code: "A2"
  command: "#06A2{baud}{unsolicited_feedback}{display_feedback}<CR>"
  description: "Baud rate (01=38400..06=1200), unsolicited feedback status, unsolicited display feedback status."

- id: unit_status
  response_code: "A3"
  command: "#0EA3{vol_msb}{vol_lsb}{balance}{input_id}{display_intensity}{state_byte}<CR>"
  description: "Master volume MSB/LSB, balance (00=100% left, 64=center, C8=100% right), selected input (00=B1..06=S4), display intensity (01=low, 02=medium, 03=high), state byte: BIT0=standby, BIT1=mute, BIT2=tape monitor, BIT3=display OFF, BIT4=setup menu in use, BIT5=power/comm cables detected, BIT6=reserved, BIT7=setup menu not available."

- id: volume_status
  response_code: "A4"
  command: "#06A4{vol_msb}{vol_lsb}<CR>"
  description: "Actual master volume MSB/LSB."

- id: product_information
  response_code: "A5"
  command: "#0AA5{product_id}{sw_rev}{comm_rev}{boot_rev}<CR>"
  description: "Product ID 57=Moon 850P, software revision, RS232 communication software revision, boot code revision."

- id: display_string
  response_code: "A6"
  command: "#0BA6{display_string}<CR>"
  description: "NULL terminated display string (8 characters + NULL), reflecting exact front panel character positions."

- id: input_setup
  response_code: "A7"
  command: "#15A7{input_id}{label}{max_vol_msb}{max_vol_lsb}{offset}{bypass}{enable}<CR>"
  description: "Input ID (00=B1..06=S4), label string, maximum volume MSB/LSB, offset (00=-10.0, 64=0.0, C8=+10.0), bypass (0/1), enable (0/1)."

- id: triggers_setup
  response_code: "A8"
  command: "#06A8{trigger1}{trigger2}<CR>"
  description: "Per-trigger byte: BIT0-6=trigger active when B1,B2,B3,S1,S2,S3,S4 selected, BIT7=trigger controlled by infrared (input selection no longer controls it)."

- id: factory_defaults_loaded
  response_code: "A9"
  command: "#02A9<CR>"
  description: "Factory defaults have been loaded in the UNIT."

- id: unit_wakeup
  response_code: "AA"
  command: "#02AA<CR>"
  description: "UNIT rocker switch turned on; sent once and after every Reset UNIT command."

- id: ir_setup
  response_code: "AB"
  command: "#05AB{rc5_system}{front_ir_disable}<CR>"
  description: "RC5 system (00=default 16, 01=11, 02=14, 03=15, 04=19) and front IR disable flag (0/1)."

- id: mind_setup
  response_code: "AC"
  command: "#04AC{input_id}<CR>"
  description: "MiND input ID (00=B1..06=S4)."
```

## Events
```yaml
# Unsolicited feedback (when unsolicited feedback is ON, default):
- id: unsolicited_unit_status
  description: "A3 UNIT status response sent when UNIT state changes (user action on front panel or remote)."
- id: unsolicited_volume_status
  description: "A4 Volume status response sent when master volume changes."
- id: unsolicited_factory_defaults
  description: "A9 Factory defaults response sent when factory defaults are loaded."
- id: unsolicited_display_string
  description: "A5 Display string response sent when display string changes (unsolicited display feedback ON, non-default), even if display is OFF."
- id: startup_status
  description: "A3 UNIT status response sent at initial startup regardless of unsolicited feedback setup."
- id: wakeup
  description: "AA Wake-up response sent once when rocker switch turned on, and after every Reset UNIT command."
```

## Variables
```yaml
# All settable parameters are covered by discrete Actions above; source documents no additional settable variables.
```

## Macros
```yaml
# No multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings or interlock procedures.
```

## Notes
- Protocol revision 2 (document revision 2); revision 2 added MiND functionality.
- Physical layer: 9-pin DSUB straight-through cable, HOST pin 2 (RXD) to UNIT TXD, HOST pin 3 (TXD) to UNIT RXD, GND pin 5.
- One-to-one command buffer: HOST must wait for the UNIT's response before sending the next command; no queueing.
- Framing, noise, or overrun errors cause the UNIT to reject the complete packet and wait for a new header.
- Backspace character cancels the last transmitted byte (unless it was the end-of-packet delimiter).
- HEX data type is sent as two ASCII hex characters; uppercase and lowercase both valid; BOOLEAN sent as ASCII 0 or 1.
- Set power state parameter 04 (setup menu unavailable) is an installer lockout; cleared by parameter 02, Reset UNIT, or mains disconnect.
- When integrated in a complete custom automation system, avoid the SimLink connection to prevent control conflicts.
- Infrared: unit responds only to RC5 system 16; RC5 command table (00-06 input select, 12 power toggle, 13/88/89 mute, 15/93/94/105 display, 16/17 volume, 26/27 balance, 35/39/120/121 12V triggers, 55 tape monitor, 61 SimLink power toggle, 62/63 input prev/next, 123/124 UNIT ON/OFF) documented in source but outside the serial transport. RC5 frame definition referenced to Philips Semiconductor.
- UNRESOLVED: command timing/latency values not stated in source.
- UNRESOLVED: power draw, voltage, current specifications not stated in source.

## Provenance

```yaml
source_domains:
  - simaudio.com
source_urls:
  - https://simaudio.com/wp-content/uploads/2018/04/MOON_850P_RS232IRcodes_rev2.pdf
retrieved_at: 2026-09-17T03:54:32.969Z
last_checked_at: 2026-09-21T22:17:00.935Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-21T22:17:00.935Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions match source commands 0x20-0x2B (setup), 0x01-0x08 (status), 0x60-0x67 (user); transport (9600 baud, 8N1, no flow control) is documented verbatim. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware/software version compatibility not stated in source (only protocol revision 2 / document revision 2 stated)"
- "source contains no safety warnings or interlock procedures."
- "command timing/latency values not stated in source."
- "power draw, voltage, current specifications not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
