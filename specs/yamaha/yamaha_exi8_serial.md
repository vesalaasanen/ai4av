---
spec_id: admin/yamaha-exi8
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yamaha EXi8 Control Spec"
manufacturer: Yamaha
model_family: EXi8
aliases: []
compatible_with:
  manufacturers:
    - Yamaha
  models:
    - EXi8
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - data.yamaha.com
source_urls:
  - https://data.yamaha.com/files/download/other_assets/3/331593/MTX3_MTX5-D_RemoteCtrlProtocolSpecs_v101_en.pdf
retrieved_at: 2026-06-01T23:54:23.696Z
last_checked_at: 2026-06-04T06:32:26.447Z
generated_at: 2026-06-04T06:32:26.447Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "All Section 7 parameter enumeration beyond EXi8 rows (other devices' parameters are out of scope). The source is a shared MTX/XMV/EXi8/EXo8 spec; only EXi8-applicable rows from the parameter/meter lists are captured here."
  - "no multi-step macro sequences defined for EXi8 in source."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "source does not state the EXi8-specific baud rate, data bits, parity, stop bits, or flow control — the serial parameters in Section 1.2 apply to MTX3/MTX5-D only. The EXi8 has no RS-232C connector. The \"Known protocol\" hint in the input was RS-232C, but the source explicitly contradicts this for the EXi8."
  - "per-parameter address range breakdown for EXi8: Section 7 lists one input-block row (MemNo=512, UniqueId=1, ElmNo=3, Xpos=0..7, Ypos=0, PrmNo=0) with 6 IndexNo entries. No other EXi8 parameter blocks are documented in the source."
  - "source contains no documentation of authentication, TLS, or session security. `auth.type: none` is inferred."
verification:
  verdict: verified
  checked_at: 2026-06-04T06:32:26.447Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 spec actions (devstatus 4, devmode 1, scpmode 5, get/getn/set/setn 4, mtrstart/mtrstop 2, devinfo 7, scpmode_encoding_utf8 1) match verbatim source commands; port 49280 confirmed; source command catalogue is fully represented by the spec. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Yamaha EXi8 Control Spec

## Summary
The Yamaha EXi8 is an 8-channel analog input expander for MTX-series processor systems. This spec covers remote control of the EXi8 over TCP/IP via the device's NETWORK (Ethernet) connector on port 49280 using the Yamaha MTX external control protocol (ASCII, LF-terminated). The EXi8 has no RS-232C connector — RS-232C applies only to MTX3 and MTX5-D.

<!-- UNRESOLVED: All Section 7 parameter enumeration beyond EXi8 rows (other devices' parameters are out of scope). The source is a shared MTX/XMV/EXi8/EXo8 spec; only EXi8-applicable rows from the parameter/meter lists are captured here. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 49280
  framing: ascii  # source: "Commands must be expressed using ASCII characters"; LF (0x0A) terminator per command
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- levelable       # GAIN parameter per input channel (-6 to +66 dB)
- queryable       # devstatus, devinfo, get, getn queries
- powerable       # inferred from "On" parameter per channel (IndexNo 3, OFF/ON)
```

## Actions
```yaml
- id: devstatus_runmode_query
  label: Device Run Mode Query
  kind: query
  command: "devstatus runmode"
  params: []
  # Response: OK devstatus runmode "emergency" | "update" | "normal"
  # Note: "emergency" invalid on EXi8 per source.

- id: devstatus_error_query
  label: Device Error Status Query
  kind: query
  command: "devstatus error"
  params: []
  # Response: OK devstatus error "none" | "flt/xxxx" | "err/xxxx" | "wrn/xxxx"

- id: devstatus_fs_query
  label: Sampling Frequency Status Query
  kind: query
  command: "devstatus fs"
  params: []
  # Response: OK devstatus fs "unknown" | "44.1kHz" | "48kHz"

- id: devstatus_lockstatus_query
  label: Word Clock Lock Status Query
  kind: query
  command: "devstatus lockstatus"
  params: []
  # Response: OK devstatus lockstatus "unlock" | "lock"

- id: devmode_normal
  label: Set Run Mode Normal
  kind: action
  command: "devmode normal"
  params: []
  # Response: OK devmode normal
  # Note: "devmode emergency" invalid on EXi8 per source.

- id: scpmode_encoding_ascii
  label: Set Encoding ASCII
  kind: action
  command: "scpmode encoding ascii"
  params: []
  # Response: OK scpmode encoding ascii (default)

- id: scpmode_encoding_utf8
  label: Set Encoding UTF-8
  kind: action
  command: "scpmode encoding utf8"
  params: []
  # Response: OK scpmode encoding utf8

- id: scpmode_valuetype_raw
  label: Set Value Notification Mode Raw
  kind: action
  command: "scpmode valuetype raw"
  params: []
  # Response: OK scpmode valuetype raw (default)

- id: scpmode_valuetype_normalized
  label: Set Value Notification Mode Normalized
  kind: action
  command: "scpmode valuetype normalized"
  params: []
  # Response: OK scpmode valuetype normalized

- id: scpmode_resolution
  label: Set Normalization Resolution
  kind: action
  command: "scpmode resolution {resolution}"
  params:
    - name: resolution
      type: integer
      description: Resolution for normalized value notifications (>= 100; default 1000)
  # Response: OK scpmode resolution xxxx

- id: scpmode_keepalive
  label: Set Keepalive Interval
  kind: action
  command: "scpmode keepalive {interval}"
  params:
    - name: interval
      type: integer
      description: Keepalive timeout in msec (>= 1000; effective timeout is interval + 1 sec)
  # Response: OK scpmode keepalive xxxx
  # Note: default is "disabled" per source.

- id: get_parameter_raw
  label: Parameter Query (Raw Value)
  kind: query
  command: "get MTX:mem_{MemNo}/{UniqueId}/{ElmNo}/{Xpos}/{Ypos}/{PrmNo}/{IndexNo} 0 0"
  params:
    - name: MemNo
      type: integer
      description: Memory number; 512 for EXi8 input section per Section 7
    - name: UniqueId
      type: integer
      description: Parameter UniqueId; 1 for EXi8 input section per Section 7
    - name: ElmNo
      type: integer
      description: Element number; 3 for EXi8 input section per Section 7
    - name: Xpos
      type: integer
      description: Channel/position index; 0 to 7 for EXi8 inputs 1-8
    - name: Ypos
      type: integer
      description: Y position; 0 for EXi8 input section
    - name: PrmNo
      type: integer
      description: Parameter number; 0 for EXi8 input section
    - name: IndexNo
      type: integer
      description: Parameter index (0=GAIN, 1=+V48, 2=Phase, 3=On, 4=HPFOn, 5=HPFFrequency)
  # Response: OK get MTX:mem_MemNo/UniqueId/ElmNo/Xpos/Ypos/PrmNo/IndexNo 0 0 (value)

- id: get_parameter_normalized
  label: Parameter Query (Normalized Value)
  kind: query
  command: "getn MTX:mem_{MemNo}/{UniqueId}/{ElmNo}/{Xpos}/{Ypos}/{PrmNo}/{IndexNo} 0 0"
  params:
    - name: MemNo
      type: integer
      description: Memory number; 512 for EXi8
    - name: UniqueId
      type: integer
      description: 1 for EXi8 input section
    - name: ElmNo
      type: integer
      description: 3 for EXi8 input section
    - name: Xpos
      type: integer
      description: Channel index 0-7
    - name: Ypos
      type: integer
      description: 0 for EXi8
    - name: PrmNo
      type: integer
      description: 0 for EXi8
    - name: IndexNo
      type: integer
      description: Parameter index (0=GAIN, 1=+V48, 2=Phase, 3=On, 4=HPFOn, 5=HPFFrequency)
  # Response: OK getn MTX:mem_MemNo/UniqueId/ElmNo/Xpos/Ypos/PrmNo/IndexNo 0 0 (value)

- id: set_parameter_raw
  label: Parameter Set (Raw Value)
  kind: action
  command: "set MTX:mem_{MemNo}/{UniqueId}/{ElmNo}/{Xpos}/{Ypos}/{PrmNo}/{IndexNo} 0 0 {value}"
  params:
    - name: MemNo
      type: integer
      description: 512 for EXi8
    - name: UniqueId
      type: integer
      description: 1 for EXi8 input section
    - name: ElmNo
      type: integer
      description: 3 for EXi8 input section
    - name: Xpos
      type: integer
      description: Channel index 0-7
    - name: Ypos
      type: integer
      description: 0 for EXi8
    - name: PrmNo
      type: integer
      description: 0 for EXi8
    - name: IndexNo
      type: integer
      description: Parameter index (0=GAIN, 1=+V48, 2=Phase, 3=On, 4=HPFOn, 5=HPFFrequency)
    - name: value
      type: string
      description: Raw value per Section 3.1; for GAIN: dB × 100 (e.g. -600..6600). For HPFFrequency: Hz × 1000000.
  # Response: OK set ... (value) "(string)"; OKm ... when value clamped to valid range.

- id: set_parameter_normalized
  label: Parameter Set (Normalized Value)
  kind: action
  command: "setn MTX:mem_{MemNo}/{UniqueId}/{ElmNo}/{Xpos}/{Ypos}/{PrmNo}/{IndexNo} 0 0 {value}"
  params:
    - name: MemNo
      type: integer
      description: 512 for EXi8
    - name: UniqueId
      type: integer
      description: 1 for EXi8 input section
    - name: ElmNo
      type: integer
      description: 3 for EXi8 input section
    - name: Xpos
      type: integer
      description: Channel index 0-7
    - name: Ypos
      type: integer
      description: 0 for EXi8
    - name: PrmNo
      type: integer
      description: 0 for EXi8
    - name: IndexNo
      type: integer
      description: Parameter index (0=GAIN, 1=+V48, 2=Phase, 3=On, 4=HPFOn, 5=HPFFrequency)
    - name: value
      type: integer
      description: Normalized integer; range depends on resolution (default 0-1000)
  # Response: OK setn ... (value) "(string)"; OKm ... when value clamped.

- id: mtrstart
  label: Start Meter Transmission
  kind: action
  command: "mtrstart MTX:mtr_{MemNo}/{UniqueId}/meter {interval}"
  params:
    - name: MemNo
      type: integer
      description: 512 for EXi8 meter
    - name: UniqueId
      type: integer
      description: 20000 for EXi8 input meter
    - name: interval
      type: integer
      description: Minimum transmission interval in msec
  # Note: source also accepts /hold variant but EXi8 meter list only documents level type.
  # Response: OK mtrstart MTX:mtr_MemNo/UniqueId/meter

- id: mtrstop
  label: Stop Meter Transmission
  kind: action
  command: "mtrstop MTX:mtr_{MemNo}/{UniqueId}/meter"
  params:
    - name: MemNo
      type: integer
      description: 512 for EXi8 meter
    - name: UniqueId
      type: integer
      description: 20000 for EXi8 input meter
  # Response: OK mtrstop MTX:mtr_MemNo/UniqueId/meter

- id: devinfo_protocolver
  label: Protocol Version Query
  kind: query
  command: "devinfo protocolver"
  params: []
  # Response: OK devinfo protocolver "xxxx"

- id: devinfo_paramsetver
  label: Parameter Set Version Query
  kind: query
  command: "devinfo paramsetver"
  params: []
  # Response: OK devinfo paramsetver "xxxx"

- id: devinfo_version
  label: Firmware Version Query
  kind: query
  command: "devinfo version"
  params: []
  # Response: OK devinfo version "xxxx"

- id: devinfo_productname
  label: Product Name Query
  kind: query
  command: "devinfo productname"
  params: []
  # Response: OK devinfo productname "xxxx"

- id: devinfo_serialno
  label: Serial Number Query
  kind: query
  command: "devinfo serialno"
  params: []
  # Response: OK devinfo serialno "xxxx"

- id: devinfo_deviceid
  label: Device ID Query
  kind: query
  command: "devinfo deviceid"
  params: []
  # Response: OK devinfo deviceid "xxxx" (3-digit hex; corresponds to UNIT ID)

- id: devinfo_devicename
  label: Device Name Query
  kind: query
  command: "devinfo devicename"
  params: []
  # Response: OK devinfo devicename "xxxx" (character encoding per scpmode encoding)
```

## Feedbacks
```yaml
- id: run_mode
  type: enum
  values: [normal, update, emergency]
  # Source: response to devstatus runmode. "emergency" invalid on EXi8.

- id: error_status
  type: string
  # Response to devstatus error; "none" | "flt/xxxx" | "err/xxxx" | "wrn/xxxx"
  # Format details in source section 3.3.1.

- id: sampling_frequency
  type: enum
  values: [unknown, "44.1kHz", "48kHz"]
  # Response to devstatus fs

- id: word_clock_lock
  type: enum
  values: [unlock, lock]
  # Response to devstatus lockstatus

- id: input_level_meter
  type: integer_array
  # NOTIFY mtr response: 8 values, 2-digit hex each, dBFS per Section 5 table
  # 00 = -126 dBFS or less; 7F = OVER
  # MemNo 512, UniqueId 20000
```

## Variables
```yaml
- id: input_gain_db
  type: number
  unit: dB
  min: -6
  max: 66
  step: 0.01
  # EXi8 Section 7: IndexNo 0 (raw = dB × 100, e.g. -600..6600)
  # Per channel: Xpos 0..7

- id: phantom_power_v48
  type: enum
  values: [off, on]
  # EXi8 Section 7: IndexNo 1
  # Per channel: Xpos 0..7

- id: input_phase_invert
  type: enum
  values: [off, on]
  # EXi8 Section 7: IndexNo 2
  # Per channel: Xpos 0..7

- id: input_on
  type: enum
  values: [off, on]
  # EXi8 Section 7: IndexNo 3 (input enable/mute)
  # Per channel: Xpos 0..7

- id: hpf_on
  type: enum
  values: [off, on]
  # EXi8 Section 7: IndexNo 4
  # Per channel: Xpos 0..7

- id: hpf_frequency_hz
  type: integer
  unit: Hz
  min: 20
  max: 20000
  # EXi8 Section 7: IndexNo 5
  # Raw encoding: Hz × 1000000 per source
  # Per channel: Xpos 0..7
```

## Events
```yaml
- id: notify_devstatus_runmode
  description: Device run mode change notification
  payload: 'NOTIFY devstatus runmode "<value>"'
  # Value: emergency | update | normal. "emergency" invalid on EXi8.

- id: notify_devstatus_error
  description: Device error status change notification
  payload: 'NOTIFY devstatus error "<value>"'
  # Value: flt/xxxx | err/xxxx | wrn/xxxx

- id: notify_devstatus_fs
  description: Sampling frequency change notification
  payload: 'NOTIFY devstatus fs "<value>"'
  # Value: unknown | 44.1kHz | 48kHz

- id: notify_devstatus_lockstatus
  description: Word clock lock status change notification
  payload: 'NOTIFY devstatus lockstatus "<value>"'
  # Value: unlock | lock

- id: notify_set_raw
  description: Parameter change notification (raw value)
  payload: 'NOTIFY set MTX:mem_{MemNo}/{UniqueId}/{ElmNo}/{Xpos}/{Ypos}/{PrmNo}/{IndexNo} 0 0 {value} "{string}"'
  # Emitted by device when a parameter changes (locally or via another controller).

- id: notify_setn
  description: Parameter change notification (normalized value)
  payload: 'NOTIFY setn MTX:mem_{MemNo}/{UniqueId}/{ElmNo}/{Xpos}/{Ypos}/{PrmNo}/{IndexNo} 0 0 {value} "{string}"'

- id: notify_mtr
  description: Meter value notification (after mtrstart)
  payload: 'NOTIFY mtr MTX:mtr_{MemNo}/{UniqueId}/meter level {v1} {v2} ... {v8}'
  # EXi8: 8-channel 2-digit hex per Section 5.
  # Auto-stops after 10 seconds; re-request to continue (Section 4, Meter data request/query sequence).

- id: error_notification
  description: Command error notification from device
  payload: 'ERROR <command> <errorcode>'
  # Error codes per Section 3.5.1: UnknownCommand, WrongFormat, InvalidArgument,
  # UnknownAddress, UnknownEventID, TooLongCommand, AccessDenied, ReadOnly,
  # NoPermission, InternalError.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences defined for EXi8 in source.
# The source describes a "Communication start sequence" (Section 4) that controllers
# must implement, but this is a controller-side startup procedure, not a device-side macro.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements for EXi8.
```

## Notes
The source document (MTX3, MTX5-D, XMV Series, EXi8, EXo8 Remote Control Protocol Specifications V1.0.1, 2013-10-03) covers five product families. Only EXi8-applicable commands are captured; commands marked "invalid on the XMV, EXi8, and EXo8" or "invalid on the EXi8, and EXo8" in the source are omitted from Actions.

**Key constraints from source:**
- Each command must end with LF (0x0A). At least one space between command name and options and between options. ASCII only.
- Normalized value default resolution is 1000; the controller can change it with `scpmode resolution`. Spec source recommends resolution >= 100.
- `set`/`setn` return `OKm` (not `OK`) when the requested value is out of range and clamped.
- Two remote controllers can connect simultaneously to the EXi8 via NETWORK ports; no port configuration needed (no MTX Editor remote control settings apply to EXi8).
- When EXi8 is controlled from an MTX3 or MTX5-D, only one remote controller can be used (one port reserved for system control from MTX).
- `devmode emergency` is invalid on EXi8 (and XMV/EXo8) per source table 2-5.
- Snapshot/preset commands (`sscurrent`, `ssrecall`, `ssnum`, `ssinfo`) are invalid on EXi8.
- Scheduler (`MTX:EvntScd_On`) and Audio Player event commands are invalid on EXi8.
- `devinfo deviceid` is a 3-digit hex value corresponding to the UNIT ID.
- `devinfo devicename` character encoding follows `scpmode encoding` setting.

<!-- UNRESOLVED: source does not state the EXi8-specific baud rate, data bits, parity, stop bits, or flow control — the serial parameters in Section 1.2 apply to MTX3/MTX5-D only. The EXi8 has no RS-232C connector. The "Known protocol" hint in the input was RS-232C, but the source explicitly contradicts this for the EXi8. -->

<!-- UNRESOLVED: per-parameter address range breakdown for EXi8: Section 7 lists one input-block row (MemNo=512, UniqueId=1, ElmNo=3, Xpos=0..7, Ypos=0, PrmNo=0) with 6 IndexNo entries. No other EXi8 parameter blocks are documented in the source. -->

<!-- UNRESOLVED: source contains no documentation of authentication, TLS, or session security. `auth.type: none` is inferred. -->

## Provenance

```yaml
source_domains:
  - data.yamaha.com
source_urls:
  - https://data.yamaha.com/files/download/other_assets/3/331593/MTX3_MTX5-D_RemoteCtrlProtocolSpecs_v101_en.pdf
retrieved_at: 2026-06-01T23:54:23.696Z
last_checked_at: 2026-06-04T06:32:26.447Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-04T06:32:26.447Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 spec actions (devstatus 4, devmode 1, scpmode 5, get/getn/set/setn 4, mtrstart/mtrstop 2, devinfo 7, scpmode_encoding_utf8 1) match verbatim source commands; port 49280 confirmed; source command catalogue is fully represented by the spec. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "All Section 7 parameter enumeration beyond EXi8 rows (other devices' parameters are out of scope). The source is a shared MTX/XMV/EXi8/EXo8 spec; only EXi8-applicable rows from the parameter/meter lists are captured here."
- "no multi-step macro sequences defined for EXi8 in source."
- "source contains no explicit safety warnings, interlock procedures,"
- "source does not state the EXi8-specific baud rate, data bits, parity, stop bits, or flow control — the serial parameters in Section 1.2 apply to MTX3/MTX5-D only. The EXi8 has no RS-232C connector. The \"Known protocol\" hint in the input was RS-232C, but the source explicitly contradicts this for the EXi8."
- "per-parameter address range breakdown for EXi8: Section 7 lists one input-block row (MemNo=512, UniqueId=1, ElmNo=3, Xpos=0..7, Ypos=0, PrmNo=0) with 6 IndexNo entries. No other EXi8 parameter blocks are documented in the source."
- "source contains no documentation of authentication, TLS, or session security. `auth.type: none` is inferred."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
