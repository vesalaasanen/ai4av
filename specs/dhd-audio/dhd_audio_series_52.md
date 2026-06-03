---
spec_id: admin/dhd_audio-series_52
schema_version: ai4av-public-spec-v1
revision: 1
title: "DHD Audio Series 52 External Control Protocol (ECP) Control Spec"
manufacturer: "DHD Audio"
model_family: "RM4200D DSP Frame (with RM420-850/852/853 Communication Controller)"
aliases: []
compatible_with:
  manufacturers:
    - "DHD Audio"
  models:
    - "RM4200D DSP Frame (with RM420-850/852/853 Communication Controller)"
    - "52/XR Router DSP Frame (with 52-6850/52-6851 Communication Controller)"
    - "52/XS Core"
    - "52/XC Core"
    - "52/XD Core (with 52-7450 Controller)"
    - "52/XS2 Core"
    - "52/XC2 Core"
    - "52/XD2 Core (with 52-7456 Controller)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - developer.dhd.audio
source_urls:
  - https://developer.dhd.audio/docs/API/ECP/
retrieved_at: 2026-04-30T04:41:08.337Z
last_checked_at: 2026-06-03T06:39:10.190Z
generated_at: 2026-06-03T06:39:10.190Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "port 2008 stated for IP; serial port assignments (RS-232/RS-422) not specified per controller beyond presence"
  - "source does not explicitly document acknowledgement block formats for each command."
  - "source does not document unsolicited event formats except:"
  - "no safety warnings or interlock procedures in source"
  - "RS-232/RS-422 port pin assignments not stated in source; module documentation reference only"
  - "TCP keepalive / session management not described"
  - "LogicID format not documented in this excerpt"
verification:
  verdict: verified
  checked_at: 2026-06-03T06:39:10.190Z
  matched_actions: 20
  action_count: 20
  confidence: medium
  summary: "All 20 spec actions verified (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# DHD Audio Series 52 External Control Protocol (ECP) Control Spec

## Summary

DHD Audio Series 52 is a professional audio DSP system supporting routing, mixing, fader control, and monitoring. The External Control Protocol (ECP) operates over TCP/IP (port 2008) or RS-232 serial (38400 8N1) and uses a proprietary CAN-bus-derived binary message format with 28-bit command IDs and up to 8 data bytes per block. ECP is deprecated for 3rd generation devices (XS3/XC3/XD3); the Control API is recommended for new integrations.

<!-- UNRESOLVED: port 2008 stated for IP; serial port assignments (RS-232/RS-422) not specified per controller beyond presence -->

## Transport

```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 2008  # TCP port stated in source
auth:
  type: none  # inferred: no auth procedure in source
serial:
  baud_rate: 38400  # stated in source
  data_bits: 8      # stated in source
  parity: none      # stated in source
  stop_bits: 1      # stated in source
  flow_control: none
```

## Traits

```yaml
# inferred from command set:
# - powerable: not explicitly present - no power on/off commands
# - routable: ROUTE OUTPUT (0x01F5) command present
# - queryable: Request variants of most commands present
# - levelable: SET FADER LEVEL (0x11030000), SET MONITOR LEVEL (0x11100000), SET IO GAIN (0x112D0000) present
```

## Actions

```yaml
# ROUTE OUTPUT - 0x01F5xxxx
- id: route_output_16bit
  label: Set Output Routing (16-bit)
  kind: action
  params:
    - name: output
      type: integer
      description: "Output address: 0x0180-0x1EFF (analog), 0x4000-0x7FFF (summation), 0xFFFF (mute)"
    - name: input
      type: integer
      description: "Input address: 0x0100-0x1E7F, 0x4000-0x7FFF, or 0xFFFF (mute)"
    - name: controller_module
      type: integer
      description: Controller module number (xxxx in ID, can be 0)
  notes: "16-bit variant; 32-bit (0x01F5xxxx-32bit) recommended for 52/XS/XC/XD devices"

- id: route_output_32bit_set
  label: Set Output Routing (32-bit)
  kind: action
  params:
    - name: output_id
      type: integer
      description: 32-bit Output AudioID
    - name: input_id
      type: integer
      description: 32-bit Input AudioID (0x00000000 = mute)
    - name: controller_module
      type: integer
      description: Controller module number (can be 0)
  notes: "Available 06.07.15+ / 07.01.16+; crosspoint notification activatable via length=1,D0=0x01 (TCP only)"

- id: route_output_32bit_request
  label: Request Crosspoint (32-bit)
  kind: action
  params:
    - name: output_id
      type: integer
      description: 32-bit Output AudioID
    - name: controller_module
      type: integer

# ARBITRATION - 0x01F90000
- id: set_arbitration
  label: Set Arbitration
  kind: action
  params:
    - name: audio_id
      type: integer
      description: 32-bit AudioID (output or input)
    - name: owner_device_id
      type: integer
      description: "0x00 = free; 0x40-0x60 = owner device ID"
  notes: "Available 07.02.32+; no confirmation sent on set"

- id: request_arbitration
  label: Request Arbitration
  kind: action
  params:
    - name: audio_id
      type: integer

# SET MONITOR CHANNEL - 0x11000000
- id: set_monitor_channel
  label: Set Monitor Channel
  kind: action
  params:
    - name: input_left
      type: integer
      description: "16-bit Audio address; 0x0000-0x0027 = PreFader, 0x0100-0x1E7F = Mixer input, 0x4000-0x7FFF = Summation"
    - name: input_right
      type: integer
    - name: monitor_number
      type: integer
      description: "0-5 (fw 05.xx), 0-199 (fw 06.xx+)"

# SWITCH FADER/CHANNEL ON/OFF - 0x11020000
- id: set_fader_on_off
  label: Set Fader/Channel On/Off
  kind: action
  params:
    - name: fader_hi
      type: integer
      description: "Firmware 05.xx: 0x00; firmware 06.xx+: 0x00-0x03 = Virtual Mixer 1-4, 0x10 = Fader Channel Number"
    - name: fader_lo
      type: integer
      description: "Fader number or channel number depending on fader_hi"
    - name: on
      type: integer
      description: "1 = on, 0 = off"

# SET FADER LEVEL - 0x11030000
- id: set_fader_level
  label: Set Fader Level
  kind: action
  params:
    - name: fader_hi
      type: integer
      description: "Virtual mixer (0x00-0x03) or 0x10 for channel number"
    - name: fader_lo
      type: integer
      description: "Fader/logic fader number or channel number"
    - name: level
      type: integer
      description: "0x8000-0x7FFF (-327.68 dB to +327.67 dB)"
    - name: time
      type: integer
      description: "Fade time in ms (0x0000-0x2000); only used with length=7"
    - name: type
      type: integer
      description: "0 = level linear fade, 1 = fader linear fade"

# SET FADER ACCESS - 0x11040000
- id: set_fader_access
  label: Set Fader Access
  kind: action
  params:
    - name: fader_hi
      type: integer
    - name: fader_lo
      type: integer
    - name: on
      type: integer
      description: "1 = on, 0 = off"
    - name: type
      type: integer
      description: "0 = GAIN, 1 = PAN/BAL, 2 = INPUTSELECT"
    - name: acc_group
      type: integer
      description: "0-5 (Acc-Group 1-6)"

# SET CHANNEL INPUT NUMBER - 0x110D0000
- id: set_channel_input_number
  label: Set Channel Input Number (Input Select)
  kind: action
  params:
    - name: fader_hi
      type: integer
    - name: fader_lo
      type: integer
    - name: channel
      type: integer
      description: "0x0001-0x00BA (channel number 1-250)"

# SET INTERNAL LOGIC STATES - 0x110E0000
- id: set_logic_state
  label: Set Internal Logic State
  kind: action
  params:
    - name: logic_id
      type: integer
      description: LogicID (see LogicID description in source)
    - name: on
      type: integer
      description: "1 = on, 0 = off"

# SET MONITOR LEVEL - 0x11100000
- id: set_monitor_level
  label: Set Monitor Level
  kind: action
  params:
    - name: level_left
      type: integer
      description: "0x8000-0x7FFF (-327.68 dB to +327.67 dB)"
    - name: level_right
      type: integer
    - name: monitor_number
      type: integer

# SET DISPLAY OR CHANNEL LABEL - 0x11140000 (deprecated)
- id: set_display_or_channel_label
  label: Set Display or Channel Label
  kind: action
  params:
    - name: type
      type: integer
      description: "0 = Display, 1 = Channel Label"
    - name: number
      type: integer
    - name: label_id
      type: integer
      description: "0x00-0xFF (label number)"
  notes: "Marked for imminent removal in future firmware"

# SET PFL - 0x11160000
- id: set_pfl
  label: Set PFL (Pre-Fader Listen)
  kind: action
  params:
    - name: on
      type: integer
      description: "0 = off, 1 = on, 2 = auto mute"
    - name: number
      type: integer
    - name: state
      type: integer
      description: "0 = off, 1 = on"
    - name: mode
      type: integer
      description: "0 = PFL, 1 = AFL, 2 = LB"

# LOAD/SAVE SETUPS - 0x111C0000 (deprecated)
- id: load_save_setup
  label: Load or Save Setup
  kind: action
  params:
    - name: mode
      type: integer
      description: "0 = Save, 1 = Load"
    - name: setup_number
      type: integer
      description: "0x00-0x0F (setup 0-15)"
  notes: "Marked for imminent removal in future firmware"

# SET IO GAIN - 0x112D0000
- id: set_io_gain
  label: Set IO Gain
  kind: action
  params:
    - name: module
      type: integer
      description: "Slot number 0x01-0x1E"
    - name: channel
      type: integer
      description: "Channel within slot 0x00-0x07"
    - name: gain
      type: integer
      description: "0x8000-0x7FFF (-327.68 dB to +327.67 dB)"

# FADER TOUCH - 0x11820000,2
- id: set_fader_touch
  label: Set Fader Touch State
  kind: action
  params:
    - name: fader_hi
      type: integer
    - name: fader_lo
      type: integer
    - name: touch
      type: integer
      description: "0 = released, 1 = touched"

# METERING - 0x111D0000,2
- id: request_metering
  label: Request Metering Values
  kind: action
  params:
    - name: meter_id
      type: integer
      description: "0x0001-0x003F (meter block number)"
  notes: "Available 08.01.18+ / 09.00.xx; device returns 64 metering values"

# CF IN/OUT PARAMETERS - 0x11810000
- id: set_cf_parameter
  label: Set CleanFeed Parameter
  kind: action
  params:
    - name: parameter
      type: integer
      description: "0x0001 = CleanFeed Input, 0x0002 = CleanFeed Output"
    - name: value
      type: integer
      description: "0x0000-0x7FFF"
    - name: instance
      type: integer
      description: "0x00-0x0F (CleanFeed instance number)"
  notes: "Available 09.00.05+"

- id: request_cf_parameter
  label: Request CleanFeed Parameter
  kind: action
  params:
    - name: parameter
      type: integer
      description: "0x0001 = CleanFeed Input, 0x0002 = CleanFeed Output"
    - name: instance
      type: integer
```

## Feedbacks

```yaml
# UNRESOLVED: source does not explicitly document acknowledgement block formats for each command.
# Known: serial blocks answered with ACK (0x06) or NAK (0x05) within 80ms.
# IP blocks: no explicit ack framing described beyond the CAN-bus-derived structure.
```

## Variables

```yaml
# The following are settable via commands but have explicit request/response pairs:
- id: fader_level
  label: Fader Level
  type: integer
  range: [0x8000, 0x7FFF]
  unit: dB
  notes: Requested via 0x11030000, length=2; firmware 07.02.09+ supports notifications via length=1

- id: monitor_level
  label: Monitor Level
  type: integer
  range: [0x8000, 0x7FFF]
  unit: dB
  notes: Requested via 0x11100000, length=2 (firmware 07.04.11+)

- id: fader_access
  label: Fader Access
  type: object
  properties:
    - name: type
      type: enum
      values: [gain, pan_bal, input_select]
    - name: acc_group
      type: integer
  notes: Requested via 0x11040000, length=0

- id: channel_input_number
  label: Channel Input Number
  type: integer
  notes: Requested via 0x110D0000, length=2

- id: logic_state
  label: Internal Logic State
  type: boolean
  notes: Requested via 0x110E0000, length=2

- id: pfl_state
  label: PFL State
  type: object
  properties:
    - name: on
      type: integer
    - name: state
      type: enum
      values: [off, on]
    - name: mode
      type: enum
      values: [pfl, afl, lb]
  notes: Requested via 0x11160000, length=2 (firmware 07.04.11+)

- id: io_gain
  label: IO Gain
  type: integer
  range: [0x8000, 0x7FFF]
  unit: dB
  notes: Requested via 0x112D0000, length=2 (firmware 05.02.04+)

- id: arbitration
  label: Audio ID Ownership
  type: object
  properties:
    - name: audio_id
      type: integer
    - name: owner_device_id
      type: integer
  notes: Requested via 0x01F90000, length=4; device responds with length=5

- id: crosspoint
  label: Routing Crosspoint
  type: object
  properties:
    - name: output_id
      type: integer
    - name: input_id
      type: integer
  notes: Requested via 0x01F5xxxx, length=5; device responds with length=8

- id: metering_values
  label: Metering Values
  type: array
  items:
    type: integer
  notes: Device responds to 0x111D0000 with 64 metering values

- id: cf_parameter
  label: CleanFeed Parameter
  type: object
  properties:
    - name: parameter
      type: enum
      values: [cleanfeed_input, cleanfeed_output]
    - name: value
      type: integer
    - name: instance
      type: integer
  notes: Available 09.00.05+
```

## Events

```yaml
# UNRESOLVED: source does not document unsolicited event formats except:
# - Crosspoint notification (0x01F5, length=1,D0=0x01): device sends datagram length=8 on DHD internal routing changes
# - Fader value notification (0x11030000, length=1,D0=0x01): device sends datagram length=4 on fader value change
# These are opt-in via activation commands, not push events.
```

## Macros

```yaml
# No explicit multi-step macros described in source.
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
# Note: firmware 06.xx.xx+ sockets are nonblocking; if data not fetched fast enough socket is automatically closed
```

## Notes

DHD ECP is a legacy protocol predating the CAN-bus era and has been deprecated since firmware 10.2 / Series 52 generation. The source recommends using the Control API (developer.dhd.audio/docs/API/control-api) for new integrations with 3rd generation core devices (XC3/XD3/XS3).

Binary encoding: All multi-byte values use Motorola format (MSB first). Bytes in range 0x00–0x1F are DLE-escaped when sent serially (DLE, value+0x20). Serial blocks use STX (0x02) and EOT (0x08) framing with DLE (0x10) as byte-stuffing marker.

Command 0x01F5 (16-bit) is deprecated for 52/XS/XC/XD and 52/XS2/XC2/XD2 devices; 32-bit variant should be used. Commands 0x11140000, 0x111C0000, and 0x112D0000 are marked for imminent removal.

32-bit AudioID format differs between device generations: Version 1 (RM4200D, XR Router) uses DeviceID at bits 31–24 plus slot/channel fields; Version 2 (XS/XC/XD Core series) uses a flat 15-bit address field with I/O flag.

Firmware 07.02.32+ required for Arbitration (0x01F90000). Firmware 08.01.18+ required for Metering (0x111D0000). Firmware 09.00.05+ required for CleanFeed Parameters (0x11810000).

Serial: max 3 retries, 80ms timeout per block, 100-block receive buffer.

<!-- UNRESOLVED: RS-232/RS-422 port pin assignments not stated in source; module documentation reference only -->
<!-- UNRESOLVED: TCP keepalive / session management not described -->
<!-- UNRESOLVED: LogicID format not documented in this excerpt -->

## Provenance

```yaml
source_domains:
  - developer.dhd.audio
source_urls:
  - https://developer.dhd.audio/docs/API/ECP/
retrieved_at: 2026-04-30T04:41:08.337Z
last_checked_at: 2026-06-03T06:39:10.190Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-03T06:39:10.190Z
matched_actions: 20
action_count: 20
confidence: medium
summary: "All 20 spec actions verified (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "port 2008 stated for IP; serial port assignments (RS-232/RS-422) not specified per controller beyond presence"
- "source does not explicitly document acknowledgement block formats for each command."
- "source does not document unsolicited event formats except:"
- "no safety warnings or interlock procedures in source"
- "RS-232/RS-422 port pin assignments not stated in source; module documentation reference only"
- "TCP keepalive / session management not described"
- "LogicID format not documented in this excerpt"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
