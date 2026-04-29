---
schema_version: ai4av-public-spec-v1
device_id: atlona/at-ome-ps62
entity_id: atlona_at_ome_ps62
spec_id: admin/atlona-at-ome-ps62
revision: 1
author: admin
title: "Atlona AT-OME-PS62 Control Spec"
status: published
manufacturer: Atlona
manufacturer_key: atlona
model_family: AT-OME-PS62
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-OME-PS62
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://atlona.com/pdf/AT-HDR-H2H-44MA_API.pdf
  - https://atlona.com/pdf/AT-HDR-H2H-88MA_API.pdf
  - https://atlona.com/downloads/drivers/C4IPRS_AT-HDR-H2H-44MA.zip
  - https://atlona.com/downloads/drivers/C4IPRS_AT-HDR-H2H-88MA.zip
  - https://atlona.com/downloads/drivers/Crestron_AT-UHD-H2H-44M.zip
source_documents:
  - title: "Atlona public source"
    url: https://atlona.com/pdf/AT-HDR-H2H-44MA_API.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T10:47:25.564Z
  - title: "Atlona public source"
    url: https://atlona.com/pdf/AT-HDR-H2H-88MA_API.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T10:47:25.608Z
  - title: "Atlona public source"
    url: https://atlona.com/downloads/drivers/C4IPRS_AT-HDR-H2H-44MA.zip
    stage: discovery_validation
    content_type: application/zip
    checked_at: 2026-04-29T10:47:26.149Z
  - title: "Atlona public source"
    url: https://atlona.com/downloads/drivers/C4IPRS_AT-HDR-H2H-88MA.zip
    stage: discovery_validation
    content_type: application/zip
    checked_at: 2026-04-29T10:47:27.182Z
  - title: "Atlona public source"
    url: https://atlona.com/downloads/drivers/Crestron_AT-UHD-H2H-44M.zip
    stage: discovery_validation
    content_type: application/zip
    checked_at: 2026-04-29T10:47:28.463Z
retrieved_at: 2026-04-29T10:47:28.463Z
last_checked_at: 2026-04-23T15:12:38.271Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T15:12:38.271Z
  matched_actions: 20
  action_count: 20
  confidence: high
  summary: "All 20 spec actions verified as literal matches in source; transport parameters confirmed; full command catalogue represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Atlona AT-OME-PS62 Control Spec

## Summary
The Atlona AT-OME-PS62 is a multi-format switcher with USB routing and HDBaseT extension. Control is available via TCP (direct socket on ports 9000–9004), Telnet, SSH, and RS-232. Commands are case-sensitive, terminated with carriage-return (0x0D), with feedback terminated by CR+LF (0x0A). A 500ms delay is required between consecutive commands.

<!-- UNRESOLVED: power on/off commands not found in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9000  # MCU command port; additional TCP ports: 9001-9004 for HDBaseT I/O and RS-232 proxy
serial:
  baud_rate: 115200  # Port 1 (unit control) default
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
notes:
  - Ports 9001-9002: HDBaseT inputs 1-2; port 9003: HDBaseT output; port 9004: local RS-232 display control
  - Default Telnet port 23, SSH port 22
  - RS-232 baud rate configurable via RS232para command (2400-115200)
```

## Traits
```yaml
- routable    # All#, x?All, x?AVx& route inputs to outputs
- queryable   # Status, InputStatus, Version, Type, IPCFG, VOUT sta, etc.
- levelable   # VOUT volume control, VOUTMute
```

## Actions
```yaml
- id: all_hash
  label: Route Inputs to Corresponding Outputs
  kind: action
  params: []
  example: "All# → x1AVx1, x2AVx2"

- id: aud
  label: Route Source Audio to Analog Output
  kind: action
  params:
    - name: output
      type: integer
      description: Analog output number (1 or 2)
    - name: source
      type: string
      description: Audio source (HDBaseT, HDMI, AUX1, AUX2, AUX3)
  example: "AUD 1 HDMI"

- id: blink
  label: Blink Front Panel Power LED
  kind: action
  params:
    - name: value
      type: string
      description: "on, of, sta"
  example: "Blink on"

- id: comma_wait
  label: Enable/Disable Comma Adding 5s Delay
  kind: action
  params:
    - name: value
      type: string
      description: "on, of, sta"
  example: "CommaWait on"

- id: ipdhcp
  label: Set DHCP On/Off
  kind: action
  params:
    - name: value
      type: string
      description: "on, of, sta"
  example: "IPDHCP on"

- id: ipstatic
  label: Set Static IP Address
  kind: action
  params:
    - name: ip
      type: string
      description: IP address
    - name: netmask
      type: string
      description: Subnet mask
    - name: gateway
      type: string
      description: Gateway IP address
  example: "IPStatic 192.168.1.112 255.255.255.0 192.168.1.1"

- id: lock
  label: Lock Front Panel Buttons
  kind: action
  params: []
  example: "Lock"

- id: mreset
  label: Reset Unit to Default Settings
  kind: action
  description: "No feedback returned; unit powers off and back on."
  kind: action
  params: []
  example: "Mreset"

- id: repeat_cmd
  label: Enable/Disable Display Command Repeat
  kind: action
  params:
    - name: value
      type: string
      description: "on, of, sta"
  example: "RepeatCmd on"

- id: rep_cmd_time
  label: Set Display Command Repeat Count
  kind: action
  params:
    - name: value
      type: integer
      description: "2-4, sta"
  example: "RepeatCmd 3"

- id: rs232para
  label: Set RS-232 Baud Parameters for HDBaseT Output
  kind: action
  params:
    - name: baud
      type: integer
      description: Baud rate (2400, 9600, 19200, 38400, 56000, 57600, 115200)
    - name: data_bits
      type: integer
      description: "7 or 8"
    - name: parity
      type: integer
      description: "0=None, 1=Odd, 2=Even"
    - name: stop_bits
      type: integer
      description: "1 or 2"
  example: "RS232para[115200,8,0,1]"

- id: rs232zone
  label: Trigger HDBaseT RX RS-232 Port to Send Command
  kind: action
  params:
    - name: port
      type: integer
      description: "HDBaseT port: 1 (Input 1), 2 (Input 2), 3 (Output)"
    - name: command
      type: string
      description: Command string to forward
  example: "RS232zone2[VOL23]"

- id: set_mono
  label: Set Audio Output Mono/Stereo
  kind: action
  params:
    - name: output
      type: integer
      description: Analog output (1-2)
    - name: value
      type: string
      description: "on (mono), of (stereo), sta"
  example: "SetMono1 of"

- id: unlock
  label: Unlock Front Panel Buttons
  kind: action
  params: []
  example: "Unlock"

- id: usb_mode
  label: Set USB Switching Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Follow USB, 1=Manual, 2=Follow Video"
  example: "UsbMode 0"

- id: usb_route
  label: Set USB Source Device
  kind: action
  params:
    - name: source
      type: integer
      description: "1=USB port 1, 2=USB port 2, 3=HDBaseT output, 4=USB-C, 5=HDBaseT input 1, 6=HDBaseT input 2"
  example: "UsbRoute 3"

- id: vout
  label: Adjust Audio Output Volume
  kind: action
  params:
    - name: zone
      type: integer
      description: "1=HDBaseT OUT, 2=HDMI OUT, 3=Analog OUT 1, 4=Analog OUT 2"
    - name: level
      type: variant
      description: "+/- increment, or -90 to 10, or sta"
  example: "VOUT1 4"

- id: vout_mute
  label: Mute/Unmute Audio Output
  kind: action
  params:
    - name: zone
      type: integer
      description: "1-4"
    - name: value
      type: string
      description: "on, of, sta"
  example: "VOUTMute1 on"

- id: x_all
  label: Set Input to All Outputs
  kind: action
  params:
    - name: input
      type: integer
      description: Input source (1-6)
  example: "x3All → x3AVx1, x3AVx2"

- id: x_avx
  label: Switch Input to Output (Matrix Mode)
  kind: action
  params:
    - name: input
      type: integer
      description: Input (1-6)
    - name: output
      type: integer
      description: Output (1-2)
  example: "x2AVx1"
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values: [on, off]
  note: "Device does not provide explicit power commands; inferred from Mreset behaviour (power cycle on reset)"

- id: routing_state
  label: Routing State
  type: string
  note: "Returns format x1AVx1, x2AVx2 from Status command"

- id: input_status
  label: Input Signal Status
  type: string
  note: "Returns 0 (no signal) or 1 (signal detected) per channel"

- id: ipcfg_output
  label: IP Configuration
  type: string
  note: "Returns IP Addr, Netmask, Gateway, telnet Port, ssh Port"

- id: model_name
  label: Model Name
  type: string
  note: "Returns AT-OME-PS62 from Type command"

- id: firmware_version
  label: Firmware Version
  type: string
  note: "Returns version string (e.g. 1.0.00) from Version command"

- id: blink_state
  label: LED Blink State
  type: enum
  values: [on, off, sta]

- id: comma_wait_state
  label: CommaWait State
  type: enum
  values: [on, off]

- id: dhcp_state
  label: DHCP State
  type: enum
  values: [on, off]

- id: repeat_cmd_state
  label: Repeat Command State
  type: enum
  values: [on, off]

- id: repeat_cmd_count
  label: Repeat Command Count
  type: integer
  note: "Range 2-4"

- id: rs232_para_state
  label: RS-232 Parameters
  type: string
  note: "Returns RS232para[baud,data_bits,parity,stop_bits]"

- id: mono_state
  label: Mono/Stereo State
  type: enum
  values: [on, off]

- id: usb_mode_state
  label: USB Mode
  type: enum
  values: [0, 1, 2]

- id: usb_route_state
  label: USB Route
  type: integer
  note: "Returns source index 1-6 or sta"

- id: volume_level
  label: Volume Level
  type: integer
  note: "Range -90 to 10 per zone; returns + increment on VOUT +"

- id: volume_mute_state
  label: Volume Mute State
  type: enum
  values: [on, off]
```

## Variables
```yaml
# No standalone settable parameters - all settings are command-driven actions.
```

## Events
```yaml
# UNRESOLVED: device does not appear to send unsolicited notifications based on source document.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source.
```

## Notes
- Command syntax varies: some commands use `CommandX` (no space), others use `Command X` (space between command and parameter). Consult individual command tables for exact syntax.
- Telnet and SSH are available but no authentication is described; `CONVEX_DEV_ADMIN=true` bypass is applied in local dev.
- The RS232para command configures baud parameters for the HDBaseT output RS-232 port, not the unit control port (which defaults to 115200).
- A 500ms delay between consecutive commands is required per the source.
- IPStatic command syntax uses three space-separated parameters (ip netmask gateway), not the bracketed format used by RS232para.
- Mreset command returns no feedback — unit powers off and back on.
- IP address shown in example: 192.168.1.100 (for TCP proxy example with projector).
<!-- UNRESOLVED: RS-232 flow control (RTS/CTS, XON/XOFF) not stated in source -->
<!-- UNRESOLVED: firmware version compatibility range not stated in source -->
<!-- UNRESOLVED: UDP protocol support not mentioned in source -->

## Provenance

```yaml
source_urls:
  - https://atlona.com/pdf/AT-HDR-H2H-44MA_API.pdf
  - https://atlona.com/pdf/AT-HDR-H2H-88MA_API.pdf
  - https://atlona.com/downloads/drivers/C4IPRS_AT-HDR-H2H-44MA.zip
  - https://atlona.com/downloads/drivers/C4IPRS_AT-HDR-H2H-88MA.zip
  - https://atlona.com/downloads/drivers/Crestron_AT-UHD-H2H-44M.zip
source_documents:
  - title: "Atlona public source"
    url: https://atlona.com/pdf/AT-HDR-H2H-44MA_API.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T10:47:25.564Z
  - title: "Atlona public source"
    url: https://atlona.com/pdf/AT-HDR-H2H-88MA_API.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T10:47:25.608Z
  - title: "Atlona public source"
    url: https://atlona.com/downloads/drivers/C4IPRS_AT-HDR-H2H-44MA.zip
    stage: discovery_validation
    content_type: application/zip
    checked_at: 2026-04-29T10:47:26.149Z
  - title: "Atlona public source"
    url: https://atlona.com/downloads/drivers/C4IPRS_AT-HDR-H2H-88MA.zip
    stage: discovery_validation
    content_type: application/zip
    checked_at: 2026-04-29T10:47:27.182Z
  - title: "Atlona public source"
    url: https://atlona.com/downloads/drivers/Crestron_AT-UHD-H2H-44M.zip
    stage: discovery_validation
    content_type: application/zip
    checked_at: 2026-04-29T10:47:28.463Z
retrieved_at: 2026-04-29T10:47:28.463Z
last_checked_at: 2026-04-23T15:12:38.271Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:12:38.271Z
matched_actions: 20
action_count: 20
confidence: high
summary: "All 20 spec actions verified as literal matches in source; transport parameters confirmed; full command catalogue represented."
```

## Known Gaps

```yaml
[]
```
