---
spec_id: admin/dbox-digital-satellite
schema_version: ai4av-public-spec-v1
revision: 1
title: "D-BOX Digital Satellite Control Spec"
manufacturer: D-BOX
model_family: "Digital Satellite"
aliases: []
compatible_with:
  manufacturers:
    - D-BOX
  models:
    - "Digital Satellite"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.d-box.com
source_urls:
  - "https://support.d-box.com/hubfs/198-914-0016-EN6%20Motion%20Engine_Remote%20Protocol%20(RS-232_TCP_UDP).pdf"
retrieved_at: 2026-05-13T16:00:00.000Z
last_checked_at: 2026-06-02T21:41:22.017Z
generated_at: 2026-06-02T21:41:22.017Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "source document covers the HEMC / HaptiSync Hub / Motion Engine product family; mapping to the specific \"Digital Satellite\" SKU is not stated in source."
  - "source documents request/response semantics only - no unsolicited"
  - "no multi-step macro sequences described in source."
  - "source does not describe motion-platform safety interlocks,"
  - "maximum number of motion platforms N supported per unit is not stated in source."
  - "command response timing / inter-command delay requirements not stated in source."
  - "behavior when ENQ is combined with an unrecognized mnemonic not stated explicitly."
verification:
  verdict: verified
  checked_at: 2026-06-02T21:41:22.017Z
  matched_actions: 21
  action_count: 21
  confidence: medium
  summary: "All 21 spec actions matched to source command mnemonics; all transport parameters verified against source; complete coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# D-BOX Digital Satellite Control Spec

## Summary
D-BOX Motion Engine remote-control protocol for HEMC, HaptiSync Hub, and Motion Engine (Windows PC) products. Spec covers RS-232, UDP, and TCP/IP control of motion platforms — motion intensity, vibration level, mute, experience mode, capture device selection, and queryable platform/media state. Commands use STX/ETX-framed 5-character mnemonics with RS-separated parameters.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: source document covers the HEMC / HaptiSync Hub / Motion Engine product family; mapping to the specific "Digital Satellite" SKU is not stated in source. -->

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
  electrical_interface: EIA-232
  connector: DB-9
  cable: null-modem
auth:
  type: none  # inferred: no auth procedure in source
framing:
  start_of_block: "STX (0x02)"
  end_of_block: "ETX (0x03)"
  record_separator: "RS (0x1E)"
  empty_record_value: "EM (0x19)"
  enquiry: "ENQ (0x05)"
  request_separator: "GS (0x1D)"
  negative_ack: "NAK (0x15)"
  target_prefix: "ASCII digit between STX and mnemonic; 0 = unit itself, 1..N = motion platform; defaults to 0 if omitted"
wake_on_lan:
  supported: true
  notes: "Ethernet only (not Wi-Fi); standard Magic Packet: 6 bytes 0xFF followed by 16 repetitions of the unit's 48-bit MAC, total 102 bytes."
```

## Traits
```yaml
- powerable    # inferred from WSTOP shutdown + Wake-on-LAN power-on
- queryable    # inferred from R-prefixed query commands (RPCNT, RFILM, RMOTL, etc.)
- levelable    # inferred from motion intensity (WMOTL) and vibration level (WVIBL) commands
- mutable      # inferred from WMUTE mute command
```

## Actions
```yaml
- id: set_motion_intensity
  label: Set Motion Intensity Level
  kind: action
  command: "<STX>#WMOTL<RS>{level}<ETX>"
  description: Changes the motion intensity level of the targeted platform.
  params:
    - name: target
      type: integer
      description: Target platform number (0 = unit itself, 1..N = motion platform). Substituted for '#' in command.
    - name: level
      type: number
      unit: dB
      min: -20
      max: 0
      description: Motion intensity in decibels. Valid examples "0", "-5.5", "-20".

- id: set_vibration_level
  label: Set Vibration Level
  kind: action
  command: "<STX>#WVIBL<RS>{level}<ETX>"
  description: Changes the vibration level of the targeted platform.
  params:
    - name: target
      type: integer
      description: Target platform number. Substituted for '#'.
    - name: level
      type: number
      unit: dB
      min: -20
      max: 0
      description: Vibration level in decibels. Valid examples "0", "-5.5", "-20".

- id: set_mute
  label: Set Mute
  kind: action
  command: "<STX>#WMUTE<RS>{state}<ETX>"
  description: Activates or deactivates the mute function of the targeted platform.
  params:
    - name: target
      type: integer
      description: Target platform number. Substituted for '#'.
    - name: state
      type: enum
      values: [0, 1]
      description: "0 = mute deactivated, 1 = mute activated"

- id: set_unit_name
  label: Set Unit Name
  kind: action
  command: "<STX>WNAME<RS>{name}<ETX>"
  description: Sets the name of the unit.
  params:
    - name: name
      type: string
      description: Name of the unit.

- id: set_motion_delay
  label: Set Motion Delay
  kind: action
  command: "<STX>WDLAY<RS>{delay}<ETX>"
  description: Sets the motion delay in ms.
  params:
    - name: delay
      type: integer
      unit: ms
      description: Motion delay in milliseconds.

- id: set_recognition_tolerance
  label: Set Recognition Tolerance
  kind: action
  command: "<STX>WTOLR<RS>{tolerance}<ETX>"
  description: Sets the recognition tolerance in seconds.
  params:
    - name: tolerance
      type: number
      unit: seconds
      description: Recognition tolerance in seconds.

- id: shutdown_unit
  label: Shutdown Unit
  kind: action
  command: "<STX>WSTOP<ETX>"
  description: Shuts down the unit.
  params: []

- id: set_capture_device
  label: Set Capture Device
  kind: action
  command: "<STX>WCAPD<RS>{mode}<RS>{device_id}<ETX>"
  description: Sets the capture device.
  params:
    - name: mode
      type: enum
      values: [0, 1, 2]
      description: "0 = Manual (use device_id), 1 = OS Default, 2 = USB Preferred"
    - name: device_id
      type: string
      description: "Capture device identification (from RCAPD response) when mode=0; <EM> (empty record, 0x19) for other modes."

- id: set_experience_mode
  label: Set Experience Mode
  kind: action
  command: "<STX>WEXPM<RS>{mode}<ETX>"
  description: Requests to change the experience mode.
  params:
    - name: mode
      type: enum
      values: [0, 1, 2, 3]
      description: "0 = D-BOX Coded Video, 1 = D-BOX Coded Gaming, 2 = Adaptive Audio, 3 = Adaptive Gaming"

- id: wake_on_lan
  label: Wake on LAN
  kind: action
  command: "MAGIC_PACKET(6x 0xFF + 16x MAC)"
  description: Powers on the unit via standard Wake-on-LAN Magic Packet over Ethernet. Unit must have been powered at least once without losing power. Not supported over Wi-Fi.
  params:
    - name: mac_address
      type: string
      description: 48-bit MAC address of the unit, repeated 16 times after the 6-byte 0xFF preamble (102-byte payload).

- id: query_platform_count
  label: Query Platform Count
  kind: query
  command: "<STX>RPCNT<ETX>"
  description: Requests the number of motion platforms connected to the unit.
  params: []
  response: "<platform count><ETX>"

- id: query_media_status
  label: Query Media Status
  kind: query
  command: "<STX>RFILM<ETX>"
  description: Requests the current media status of the unit (source LED, motion code LED, media title, timecode, duration).
  params: []
  response: "<source_status><RS><source_status_desc><RS><motion_code_status><RS><motion_code_status_desc><RS><media_title><RS><timecode_seconds><RS><duration_seconds><ETX>"

- id: query_motion_intensity
  label: Query Motion Intensity Level
  kind: query
  command: "<STX>#RMOTL<ETX>"
  description: Requests the motion intensity level of the targeted platform.
  params:
    - name: target
      type: integer
      description: Target platform number. Substituted for '#'.
  response: "<level><ETX>  (dB, -20..0)"

- id: query_vibration_level
  label: Query Vibration Level
  kind: query
  command: "<STX>#RVIBL<ETX>"
  description: Requests the vibration level of the targeted motion platform.
  params:
    - name: target
      type: integer
      description: Target platform number. Substituted for '#'.
  response: "<vibration_level><ETX>  (dB, -20..0)"

- id: query_mute
  label: Query Mute State
  kind: query
  command: "<STX>#RMUTE<ETX>"
  description: Requests the mute setting of the targeted platform.
  params:
    - name: target
      type: integer
      description: Target platform number. Substituted for '#'.
  response: "<mute><ETX>  (1 = deactivated, 0 = activated - per source)"

- id: query_film_count
  label: Query Film Count
  kind: query
  command: "<STX>RFLNB<RS>{filter}<ETX>"
  description: Requests the number of films in the database starting with the specified character. Parameter defaults to '*' (all titles) when absent.
  params:
    - name: filter
      type: string
      description: "'*' = all titles, '#' = titles beginning with a number, 'A'..'Z' = titles beginning with that letter"
  response: "<count><ETX>"

- id: query_unit_name
  label: Query Unit Name
  kind: query
  command: "<STX>RNAME<ETX>"
  description: Requests the name of the unit.
  params: []
  response: "<name><ETX>"

- id: query_motion_delay
  label: Query Motion Delay
  kind: query
  command: "<STX>RDLAY<ETX>"
  description: Requests the motion delay in ms.
  params: []
  response: "<delay><ETX>"

- id: query_recognition_tolerance
  label: Query Recognition Tolerance
  kind: query
  command: "<STX>RTOLR<ETX>"
  description: Requests the recognition tolerance in seconds.
  params: []
  response: "<tolerance><ETX>"

- id: query_capture_devices
  label: Query Capture Devices
  kind: query
  command: "<STX>RCAPD<ETX>"
  description: Requests the list of available capture devices (name, description, identification, interface type, use, availability).
  params: []
  response: "<name><RS><description><RS><id><RS><interface_type><RS><use><RS><availability><ETX>  (repeated per device)"

- id: query_experience_mode
  label: Query Experience Mode
  kind: query
  command: "<STX>REXPM<ETX>"
  description: Requests the experience mode, mode state, and status code.
  params: []
  response: "<mode><RS><state><RS><status_code><ETX>"
```

## Feedbacks
```yaml
- id: platform_count
  type: integer
  description: Number of motion platforms connected to the unit (from RPCNT).

- id: source_status_led
  type: enum
  values: [0, 1, 2, 3]
  description: "Source status LED from RFILM: 0=Off, 1=Green, 2=Yellow, 3=Red"

- id: source_status_description
  type: string
  description: Human-readable source status description (from RFILM Parameter B).

- id: motion_code_status_led
  type: enum
  values: [0, 1, 2, 3]
  description: "Motion code status LED from RFILM: 0=Off, 1=Green, 2=Yellow, 3=Red"

- id: motion_code_status_description
  type: string
  description: Human-readable motion code status description (from RFILM Parameter D).

- id: media_title
  type: string
  description: Current media title (blank if no media detected).

- id: media_timecode_seconds
  type: integer
  unit: seconds
  description: Current media timecode in seconds (0 if no media detected).

- id: media_duration_seconds
  type: integer
  unit: seconds
  description: Total media duration in seconds (0 if no media detected).

- id: motion_intensity_level
  type: number
  unit: dB
  min: -20
  max: 0
  description: Motion intensity level of the targeted platform (from RMOTL).

- id: vibration_level
  type: number
  unit: dB
  min: -20
  max: 0
  description: Vibration level of the targeted platform (from RVIBL).

- id: mute_state
  type: enum
  values: [0, 1]
  description: "Mute state of the targeted platform (from RMUTE). Per source: 1 = deactivated, 0 = activated."

- id: film_count
  type: integer
  description: Number of films in the database matching the RFLNB filter.

- id: unit_name
  type: string
  description: Name of the unit (from RNAME).

- id: motion_delay_ms
  type: integer
  unit: ms
  description: Motion delay in milliseconds (from RDLAY).

- id: recognition_tolerance_seconds
  type: number
  unit: seconds
  description: Recognition tolerance in seconds (from RTOLR).

- id: capture_device_interface_type
  type: enum
  values: [0, 1]
  description: "Capture device interface type (from RCAPD Parameter D): 0 = Internal, 1 = External (e.g. USB)"

- id: capture_device_use
  type: enum
  values: [0, 1]
  description: "Capture device use (from RCAPD Parameter E): 0 = Not in use, 1 = In use (only 1 device can be used at any given time)"

- id: capture_device_availability
  type: enum
  values: [0, 1]
  description: "Capture device availability (from RCAPD Parameter F): 0 = Not available (e.g. disconnected), 1 = Available"

- id: experience_mode
  type: enum
  values: [0, 1, 2, 3]
  description: "Experience mode (from REXPM Parameter A): 0 = D-BOX Coded Video, 1 = D-BOX Coded Gaming, 2 = Adaptive Audio, 3 = Adaptive Gaming"

- id: experience_mode_state
  type: enum
  values: [0, 1, 2]
  description: "Mode state (from REXPM Parameter B): 0 = On (functional), 1 = Off (not functional), 2 = Transitioning"

- id: experience_mode_status_code
  type: enum
  values: [0, 100, 101, 102, 103, 104, 200]
  description: "Experience mode status code (from REXPM Parameter C): 0 = Ok, 100 = Mode initialization failure, 101 = Motion initialization failure, 102 = D-BOX HaptiSync Agent not connected, 103 = D-BOX HaptiSync Agent response timeout, 104 = Unknown experience mode, 200 = Exception"

- id: nak_response
  type: signal
  description: "Negative acknowledge (NAK 0x15) returned when command mnemonic is unrecognized, target unavailable, or parameters invalid. A malformed command receives no response at all."
```

## Variables
```yaml
- id: motion_intensity
  type: number
  unit: dB
  min: -20
  max: 0
  read: query_motion_intensity
  write: set_motion_intensity
  description: Per-platform motion intensity level.

- id: vibration
  type: number
  unit: dB
  min: -20
  max: 0
  read: query_vibration_level
  write: set_vibration_level
  description: Per-platform vibration level.

- id: mute
  type: enum
  values: [0, 1]
  read: query_mute
  write: set_mute
  description: Per-platform mute state.

- id: unit_name
  type: string
  read: query_unit_name
  write: set_unit_name
  description: Name of the unit.

- id: motion_delay
  type: integer
  unit: ms
  read: query_motion_delay
  write: set_motion_delay
  description: Motion delay applied by the unit.

- id: recognition_tolerance
  type: number
  unit: seconds
  read: query_recognition_tolerance
  write: set_recognition_tolerance
  description: Recognition tolerance applied by the unit.

- id: experience_mode
  type: enum
  values: [0, 1, 2, 3]
  read: query_experience_mode
  write: set_experience_mode
  description: Current experience mode (Coded Video / Coded Gaming / Adaptive Audio / Adaptive Gaming).

- id: capture_device
  type: composite
  write: set_capture_device
  read: query_capture_devices
  description: Selected capture device and capture mode (Manual / OS Default / USB Preferred).
```

## Events
```yaml
# UNRESOLVED: source documents request/response semantics only - no unsolicited
# push events are described.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for:
  - shutdown_unit  # WSTOP shuts down the unit; recommended to confirm before issuing.
interlocks: []
# UNRESOLVED: source does not describe motion-platform safety interlocks,
# power-on sequencing requirements, or fault-recovery procedures beyond the
# REXPM status codes.
```

## Notes
- Source document title: "Motion Engine Remote Control Communication Protocol" — covers HEMC, HaptiSync Hub, and Motion Engine (Windows PC). Mapping to the specific "Digital Satellite" SKU is asserted by the operator, not by the source document.
- Command framing uses non-printable ASCII control characters: STX (0x02), ETX (0x03), RS (0x1E), GS (0x1D), EM (0x19), ENQ (0x05), NAK (0x15). Implementations must emit these as raw bytes, not as the literal `<STX>` etc. shown in the `command:` fields.
- Target prefix: a single ASCII digit immediately after STX selects the destination (0 = unit itself, 1..N = motion platform). Omitted target defaults to 0. The `#` placeholder in command templates represents this digit.
- Adding `<ENQ>` (0x05) before `<ETX>` causes the response to include the original request, separated from the response payload by `<GS>` (0x1D).
- A well-formed but unrecognized mnemonic returns a single `<NAK>` (0x15). A malformed command (bad framing / missing separators) receives no response at all — clients should implement a timeout.
- RS-232 connector is DB-9 EIA-232 with the same pinout as a PC; connection to a PC requires a null-modem cable. Pins 1, 4, 6, 7, 8, 9 are unused.
- TCP and UDP carry the same command set as RS-232 on ports 61555 (TCP) and 61556 (UDP).
- Wake-on-LAN is only available over Ethernet, not Wi-Fi, and requires the unit to have been powered at least once without losing power.
- `RMUTE` response semantics in the source read "The mute value is 1 when the platform is deactivated and 0 when it is activated" — this is the inverse of the `WMUTE` parameter convention; transcribed verbatim from source.
<!-- UNRESOLVED: maximum number of motion platforms N supported per unit is not stated in source. -->
<!-- UNRESOLVED: command response timing / inter-command delay requirements not stated in source. -->
<!-- UNRESOLVED: behavior when ENQ is combined with an unrecognized mnemonic not stated explicitly. -->

## Provenance

```yaml
source_domains:
  - support.d-box.com
source_urls:
  - "https://support.d-box.com/hubfs/198-914-0016-EN6%20Motion%20Engine_Remote%20Protocol%20(RS-232_TCP_UDP).pdf"
retrieved_at: 2026-05-13T16:00:00.000Z
last_checked_at: 2026-06-02T21:41:22.017Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:41:22.017Z
matched_actions: 21
action_count: 21
confidence: medium
summary: "All 21 spec actions matched to source command mnemonics; all transport parameters verified against source; complete coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "source document covers the HEMC / HaptiSync Hub / Motion Engine product family; mapping to the specific \"Digital Satellite\" SKU is not stated in source."
- "source documents request/response semantics only - no unsolicited"
- "no multi-step macro sequences described in source."
- "source does not describe motion-platform safety interlocks,"
- "maximum number of motion platforms N supported per unit is not stated in source."
- "command response timing / inter-command delay requirements not stated in source."
- "behavior when ENQ is combined with an unrecognized mnemonic not stated explicitly."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
