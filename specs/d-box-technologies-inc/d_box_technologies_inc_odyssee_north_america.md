---
spec_id: admin/d-box-odyssee
schema_version: ai4av-public-spec-v1
revision: 1
title: "D-BOX Odyssee Control Spec"
manufacturer: "D-BOX Technologies Inc."
model_family: "Odyssee (North America)"
aliases: []
compatible_with:
  manufacturers:
    - "D-BOX Technologies Inc."
  models:
    - "Odyssee (North America)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.d-box.com
  - applicationmarket.crestron.com
source_urls:
  - "https://support.d-box.com/hubfs/198-914-0016-EN6%20Motion%20Engine_Remote%20Protocol%20(RS-232_TCP_UDP).pdf"
  - https://applicationmarket.crestron.com/d-box-technologies-inc-odyssee-north-america/
retrieved_at: 2026-04-29T17:31:52.762Z
last_checked_at: 2026-06-02T00:05:12.929Z
generated_at: 2026-06-02T00:05:12.929Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware compatibility range not stated. Status codes 100/101/102/103/104/200 documented for REXPM only — fault recovery sequencing not specified."
  - "source does not document unsolicited notifications. All responses are reactive to remote-control requests."
  - "source does not document multi-step macro sequences."
  - "source does not document interlock procedures, power-on sequencing requirements,"
  - "firmware version compatibility not stated. Protocol version not stated. Maximum platform count N (target range) not stated. Exact NAK byte stream count not documented for malformed framing (source says \"ignore the command and not respond at all\" for bad framing vs single NAK for unknown mnemonic)."
verification:
  verdict: verified
  checked_at: 2026-06-02T00:05:12.929Z
  matched_actions: 21
  action_count: 21
  confidence: medium
  summary: "All 21 spec actions matched literally in source; shapes confirmed; all transport parameters verified; bidirectional coverage complete. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# D-BOX Technologies Inc. Odyssee Control Spec

## Summary
D-BOX Odyssee is a haptic motion engine (HEMC / HaptiSync Hub / Motion Engine PC). Spec covers the Motion Engine Remote Control Communication Protocol over RS-232, TCP/IP and UDP. Same command set on all three transports. Commands are STX/ETX-framed ASCII mnemonics (5 chars, R=read, W=write) with RS-separated parameters; optional leading target byte addresses individual motion platforms (0 = unit itself, 1..N = platform).

<!-- UNRESOLVED: firmware compatibility range not stated. Status codes 100/101/102/103/104/200 documented for REXPM only — fault recovery sequencing not specified. -->

## Transport
```yaml
protocols:
  - tcp
  - udp
  - serial
addressing:
  tcp_port: 61555
  udp_port: 61556
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  electrical: EIA-232
  connector: DB-9
  cable: null-modem  # source: "connecting the unit from a standard PC requires a Null-Modem cable"
auth:
  type: none  # inferred: no auth procedure in source
framing:
  start_of_block: "0x02"  # STX
  end_of_block: "0x03"    # ETX
  record_separator: "0x1E"  # RS
  empty_record: "0x19"    # EM
  enquiry: "0x05"         # ENQ - when present, response echoes original request prefixed by GS (0x1D)
  request_separator: "0x1D"  # GS
  nak: "0x15"             # returned on unrecognized mnemonic or unavailable target
target_addressing:
  description: "Optional ASCII target byte after STX. 0 = unit itself (default if absent), 1..N = motion platform index."
wake_on_lan:
  supported: true
  transport: ethernet  # source: Wi-Fi not supported for WoL
  payload: "standard Magic Packet - 6 bytes of 0xFF followed by 16 repetitions of unit MAC (102 bytes total)"
  precondition: "unit must have been powered at least once without losing power"
```

## Traits
```yaml
- powerable    # inferred from WSTOP shutdown + Wake-on-LAN power-on
- queryable    # inferred from RPCNT/RFILM/RMOTL/RVIBL/RMUTE/RNAME/RDLAY/RTOLR/RCAPD/REXPM/RFLNB query commands
- levelable    # inferred from WMOTL motion intensity dB and WVIBL vibration level dB
```

## Actions
```yaml
- id: set_motion_intensity
  label: Set Motion Intensity Level
  kind: action
  command: "<STX>{target}WMOTL<RS>{level_db}<ETX>"
  params:
    - name: target
      type: integer
      description: "Target platform number. 0 = unit, 1..N = motion platform. Optional; defaults to 0."
    - name: level_db
      type: number
      description: "Motion intensity in dB. Range -20 (min) to 0 (max). Examples: 0, -5.5, -20."

- id: set_vibration_level
  label: Set Vibration Level
  kind: action
  command: "<STX>{target}WVIBL<RS>{level_db}<ETX>"
  params:
    - name: target
      type: integer
      description: "Target platform number. 0 = unit, 1..N = motion platform."
    - name: level_db
      type: number
      description: "Vibration level in dB. Range -20 to 0. Examples: 0, -5.5, -20."

- id: set_mute
  label: Set Mute
  kind: action
  command: "<STX>{target}WMUTE<RS>{mute}<ETX>"
  params:
    - name: target
      type: integer
      description: "Target platform number. 0 = unit, 1..N = motion platform."
    - name: mute
      type: enum
      values: [0, 1]
      description: "0 = mute deactivated, 1 = mute activated."

- id: set_unit_name
  label: Set Unit Name
  kind: action
  command: "<STX>WNAME<RS>{name}<ETX>"
  params:
    - name: name
      type: string
      description: "Name of the unit."

- id: set_motion_delay
  label: Set Motion Delay
  kind: action
  command: "<STX>WDLAY<RS>{delay_ms}<ETX>"
  params:
    - name: delay_ms
      type: integer
      description: "Motion delay in milliseconds."

- id: set_recognition_tolerance
  label: Set Recognition Tolerance
  kind: action
  command: "<STX>WTOLR<RS>{seconds}<ETX>"
  params:
    - name: seconds
      type: number
      description: "Recognition tolerance in seconds."

- id: shutdown
  label: Shut Down Unit
  kind: action
  command: "<STX>WSTOP<ETX>"
  params: []

- id: set_capture_device
  label: Set Capture Device
  kind: action
  command: "<STX>WCAPD<RS>{mode}<RS>{device_id}<ETX>"
  params:
    - name: mode
      type: enum
      values: [0, 1, 2]
      description: "0 = Manual (use device_id), 1 = OS Default, 2 = USB Preferred."
    - name: device_id
      type: string
      description: "Capture device identification (as returned by RCAPD). Use <EM> (0x19) empty record when mode != 0."

- id: set_experience_mode
  label: Set Experience Mode
  kind: action
  command: "<STX>WEXPM<RS>{mode}<ETX>"
  params:
    - name: mode
      type: enum
      values: [0, 1, 2, 3]
      description: "0 = D-BOX Coded Video, 1 = D-BOX Coded Gaming, 2 = Adaptive Audio, 3 = Adaptive Gaming."

- id: wake_on_lan
  label: Wake On LAN
  kind: action
  command: "Magic Packet: 6 bytes 0xFF followed by 16 × unit MAC (48-bit) - 102 bytes total, broadcast over Ethernet"
  params:
    - name: mac
      type: string
      description: "48-bit MAC address of the HEMC unit."

- id: query_platform_count
  label: Query Motion Platform Count
  kind: query
  command: "<STX>RPCNT<ETX>"
  params: []

- id: query_media_status
  label: Query Media Status
  kind: query
  command: "<STX>RFILM<ETX>"
  params: []

- id: query_motion_intensity
  label: Query Motion Intensity Level
  kind: query
  command: "<STX>{target}RMOTL<ETX>"
  params:
    - name: target
      type: integer
      description: "Target platform number. 0 = unit, 1..N = motion platform."

- id: query_vibration_level
  label: Query Vibration Level
  kind: query
  command: "<STX>{target}RVIBL<ETX>"
  params:
    - name: target
      type: integer
      description: "Target platform number."

- id: query_mute
  label: Query Mute State
  kind: query
  command: "<STX>{target}RMUTE<ETX>"
  params:
    - name: target
      type: integer
      description: "Target platform number."

- id: query_film_count
  label: Query Film Count By Letter
  kind: query
  command: "<STX>RFLNB<RS>{filter}<ETX>"
  params:
    - name: filter
      type: string
      description: "'*' all titles, '#' titles beginning with a number, 'A'..'Z' titles starting with a letter. Defaults to '*' when absent."

- id: query_unit_name
  label: Query Unit Name
  kind: query
  command: "<STX>RNAME<ETX>"
  params: []

- id: query_motion_delay
  label: Query Motion Delay
  kind: query
  command: "<STX>RDLAY<ETX>"
  params: []

- id: query_recognition_tolerance
  label: Query Recognition Tolerance
  kind: query
  command: "<STX>RTOLR<ETX>"
  params: []

- id: query_capture_devices
  label: Query Capture Devices
  kind: query
  command: "<STX>RCAPD<ETX>"
  params: []

- id: query_experience_mode
  label: Query Experience Mode
  kind: query
  command: "<STX>REXPM<ETX>"
  params: []
```

## Feedbacks
```yaml
- id: ack
  type: literal
  description: "Successful WRITE acknowledgement."
  payload: "<ETX>"

- id: nak
  type: literal
  description: "Unrecognized command mnemonic, malformed framing, or unavailable target/parameters."
  payload: "0x15 (NAK)"

- id: platform_count
  type: integer
  description: "Number of motion platforms connected to the unit. Response to RPCNT."
  payload: "<STX><count><ETX>"

- id: media_status
  type: structured
  description: "Response to RFILM. Seven RS-separated fields."
  fields:
    - name: source_status
      type: enum
      values: [0, 1, 2, 3]
      description: "0 = Off LED, 1 = Green, 2 = Yellow, 3 = Red."
    - name: source_status_description
      type: string
    - name: motion_code_status
      type: enum
      values: [0, 1, 2, 3]
      description: "0 = Off LED, 1 = Green, 2 = Yellow, 3 = Red."
    - name: motion_code_status_description
      type: string
    - name: media_title
      type: string
      description: "Blank if no media detected."
    - name: media_timecode_sec
      type: integer
      description: "0 if no media detected."
    - name: media_duration_sec
      type: integer
      description: "0 if no media detected."

- id: motion_intensity_value
  type: number
  description: "Motion intensity in dB, -20..0. Response to RMOTL."
  payload: "<STX><level><ETX>"

- id: vibration_level_value
  type: number
  description: "Vibration level in dB, -20..0. Response to RVIBL."
  payload: "<STX><level><ETX>"

- id: mute_state
  type: enum
  values: [0, 1]
  description: "Response to RMUTE. Source states: 1 = deactivated, 0 = activated. (Note: source text inverts the WMUTE convention - quoted verbatim.)"
  payload: "<STX><value><ETX>"

- id: film_count_value
  type: integer
  description: "Number of titles matching the RFLNB filter."
  payload: "<STX><count><ETX>"

- id: unit_name_value
  type: string
  description: "Response to RNAME."
  payload: "<STX><name><ETX>"

- id: motion_delay_value
  type: integer
  description: "Motion delay in ms. Response to RDLAY."
  payload: "<STX><delay><ETX>"

- id: recognition_tolerance_value
  type: number
  description: "Tolerance in seconds. Response to RTOLR."
  payload: "<STX><tolerance><ETX>"

- id: capture_devices_list
  type: structured
  description: "Response to RCAPD. One or more device records, each with six RS-separated fields."
  fields:
    - name: device_name
      type: string
    - name: device_description
      type: string
    - name: device_identification
      type: string
    - name: interface_type
      type: enum
      values: [0, 1]
      description: "0 = Internal, 1 = External (e.g. USB)."
    - name: in_use
      type: enum
      values: [0, 1]
      description: "Only one device may be in use at a time."
    - name: available
      type: enum
      values: [0, 1]
      description: "0 = Not available (e.g. disconnected), 1 = Available."

- id: experience_mode_status
  type: structured
  description: "Response to REXPM."
  fields:
    - name: mode
      type: enum
      values: [0, 1, 2, 3]
      description: "0 = D-BOX Coded Video, 1 = D-BOX Coded Gaming, 2 = Adaptive Audio, 3 = Adaptive Gaming."
    - name: mode_state
      type: enum
      values: [0, 1, 2]
      description: "0 = On (functional), 1 = Off (not functional), 2 = Transitioning."
    - name: status_code
      type: enum
      values: [0, 100, 101, 102, 103, 104, 200]
      description: "0 = Ok; 100 = Mode init failure; 101 = Motion init failure; 102 = HaptiSync Agent not connected (required for Adaptive Gaming); 103 = HaptiSync Agent response timeout; 104 = Unknown experience mode; 200 = Exception."

- id: enq_echo
  type: structured
  description: "When ENQ (0x05) is included before ETX in the request, the response is prefixed with the original request followed by GS (0x1D) before the normal response body."
  payload: "<STX>{original_request}<GS>{response_body}<ETX>"
```

## Variables
```yaml
- id: motion_intensity_db
  type: number
  range: [-20, 0]
  unit: dB
  read: query_motion_intensity
  write: set_motion_intensity

- id: vibration_level_db
  type: number
  range: [-20, 0]
  unit: dB
  read: query_vibration_level
  write: set_vibration_level

- id: mute
  type: enum
  values: [0, 1]
  read: query_mute
  write: set_mute

- id: unit_name
  type: string
  read: query_unit_name
  write: set_unit_name

- id: motion_delay_ms
  type: integer
  unit: ms
  read: query_motion_delay
  write: set_motion_delay

- id: recognition_tolerance_sec
  type: number
  unit: s
  read: query_recognition_tolerance
  write: set_recognition_tolerance

- id: capture_device
  type: structured
  read: query_capture_devices
  write: set_capture_device

- id: experience_mode
  type: enum
  values: [0, 1, 2, 3]
  read: query_experience_mode
  write: set_experience_mode
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications. All responses are reactive to remote-control requests.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for:
  - shutdown  # WSTOP shuts the unit down; physical motion platform under control
interlocks: []
# UNRESOLVED: source does not document interlock procedures, power-on sequencing requirements,
# or safety warnings for the haptic motion platforms beyond shutdown semantics.
```

## Notes
- All three transports (RS-232, TCP/IP, UDP) share the same command set and ASCII framing.
- TCP port 61555 and UDP port 61556 are stated explicitly; do not assume bidirectional same-port use.
- Target prefix immediately follows STX and is in ASCII (e.g. `<STX>1WMUTE...` targets platform 1). Omitting the target defaults to 0 (the unit itself).
- ENQ (0x05) may be inserted before ETX in the request; the response will then echo the original request, separated from the response body by GS (0x1D).
- Malformed framing → silent drop (no response). Unknown mnemonic → single NAK byte. Unavailable target / bad params → NAK.
- Extra parameters beyond what a command expects are silently ignored.
- Wake-on-LAN requires Ethernet (Wi-Fi not supported) and the unit must have been powered at least once previously without losing mains power.
- RMUTE response semantics in the source contradict WMUTE: source states "mute value is 1 when the platform is deactivated and 0 when it is activated" — opposite of WMUTE's 0/1 convention. Documented verbatim; verify with hardware before relying on it.
<!-- UNRESOLVED: firmware version compatibility not stated. Protocol version not stated. Maximum platform count N (target range) not stated. Exact NAK byte stream count not documented for malformed framing (source says "ignore the command and not respond at all" for bad framing vs single NAK for unknown mnemonic). -->

## Provenance

```yaml
source_domains:
  - support.d-box.com
  - applicationmarket.crestron.com
source_urls:
  - "https://support.d-box.com/hubfs/198-914-0016-EN6%20Motion%20Engine_Remote%20Protocol%20(RS-232_TCP_UDP).pdf"
  - https://applicationmarket.crestron.com/d-box-technologies-inc-odyssee-north-america/
retrieved_at: 2026-04-29T17:31:52.762Z
last_checked_at: 2026-06-02T00:05:12.929Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T00:05:12.929Z
matched_actions: 21
action_count: 21
confidence: medium
summary: "All 21 spec actions matched literally in source; shapes confirmed; all transport parameters verified; bidirectional coverage complete. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware compatibility range not stated. Status codes 100/101/102/103/104/200 documented for REXPM only — fault recovery sequencing not specified."
- "source does not document unsolicited notifications. All responses are reactive to remote-control requests."
- "source does not document multi-step macro sequences."
- "source does not document interlock procedures, power-on sequencing requirements,"
- "firmware version compatibility not stated. Protocol version not stated. Maximum platform count N (target range) not stated. Exact NAK byte stream count not documented for malformed framing (source says \"ignore the command and not respond at all\" for bad framing vs single NAK for unknown mnemonic)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
