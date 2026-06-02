---
spec_id: admin/seura-stm3-55-s
schema_version: ai4av-public-spec-v1
revision: 1
title: "Séura STM3 Outdoor Display Control Spec"
manufacturer: "Séura"
model_family: STM3-49-S
aliases: []
compatible_with:
  manufacturers:
    - "Séura"
  models:
    - STM3-49-S
    - STM3-49-U
    - STM3-55-S
    - STM3-55-U
    - STM3-65-S
    - STM3-65-U
    - STM3-86-S
    - STM3-86-U
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - storage.googleapis.com
source_urls:
  - https://storage.googleapis.com/wp-stateless/2019/10/seura-rs232protocol-stm32.pdf
  - https://storage.googleapis.com/wp-stateless/2019/10/storm-outdoor-tv-manual.pdf
retrieved_at: 2026-04-29T12:19:40.820Z
last_checked_at: 2026-06-02T05:46:12.336Z
generated_at: 2026-06-02T05:46:12.336Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source filename references \"STRM-55.3-S Series\" but refined document is titled \"STM3 Outdoor Displays\" and lists STM3-* SKUs. Naming discrepancy noted; spec follows source."
  - "source provides no safety warnings, fault behavior, error recovery sequences, or power-on interlocks."
  - "no multi-step sequences described in source."
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "baud rate, parity, character length, flow control, start/stop bits are stated in the source; no other transport parameters are documented."
  - "no firmware compatibility range, protocol version, or device-revision field documented."
  - "cable pinout is documented (TX/RX/GND on a 3-wire link, plus a 1/2/3 pin list with White/Red/Black); no DB9 connector pin numbering or RJ45 pinout stated."
verification:
  verdict: verified
  checked_at: 2026-06-02T05:46:12.336Z
  matched_actions: 16
  action_count: 16
  confidence: medium
  summary: "All 16 spec actions matched verbatim in source; all transport parameters verified in source docs; source command catalogue fully represented by spec. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Séura STM3 Outdoor Display Control Spec

## Summary
RS-232 control protocol for Séura STM3-series outdoor displays (49/55/65/86-inch, S and U variants). Commands cover power, input selection, volume, and mute; queries return current state. Wire format: ASCII commands wrapped in `STX [0x02] ... ETX [0x03]`, with an optional 3-digit unit ID separated by `;`.

<!-- UNRESOLVED: source filename references "STRM-55.3-S Series" but refined document is titled "STM3 Outdoor Displays" and lists STM3-* SKUs. Naming discrepancy noted; spec follows source. -->
<!-- UNRESOLVED: source provides no safety warnings, fault behavior, error recovery sequences, or power-on interlocks. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

**Wire format notes (from source):**
- Synchronization: Asynchronous
- STX framing: every command/response begins with `0x02`, ends with `0x03`
- STX and ETX sent as hex bytes; command body sent as ASCII
- Optional unit ID: three ASCII digits `000`-`255`, prefixed by `;` and prepended to the command
- ID `000` is a global broadcast (reaches all devices regardless of individual ID)
- `:` separates command mnemonic from its parameter
- Parameter length: 1-5 ASCII characters
- Unit ID configured via Service Menu (not documented in this spec)

## Traits
```yaml
- powerable  # inferred: PWD ON/OFF/TOGGLE commands
- routable   # inferred: INP commands for HDMI1/2/3, DisplayPort, Component, HDBaseT
- queryable  # inferred: PWD?, INP?, VOL?, MUT? queries
- levelable  # inferred: VOL set-volume command
```

## Actions
```yaml
# All commands framed as: <0x02> [optional ID;] <COMMAND> [:<PARAM>] <0x03>
# ID is omitted in the templates below; prepend "<ID>;" when targeting a specific unit.

# ---------- POWER (PWD) ----------
- id: power_off
  label: Power Off
  kind: action
  command: "\x02PWD:0\x03"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "\x02PWD:1\x03"
  params: []

- id: power_toggle
  label: Power Toggle
  kind: action
  command: "\x02PWD:3\x03"
  params: []

- id: power_status_query
  label: Power Status Query
  kind: query
  command: "\x02PWD?\x03"
  params: []

# ---------- INPUT (INP) ----------
- id: input_hdmi1
  label: Select Input HDMI1
  kind: action
  command: "\x02INP:1\x03"
  params: []

- id: input_hdmi2
  label: Select Input HDMI2
  kind: action
  command: "\x02INP:6\x03"
  params: []

- id: input_hdmi3
  label: Select Input HDMI3
  kind: action
  command: "\x02INP:9\x03"
  params: []

- id: input_displayport
  label: Select Input DisplayPort
  kind: action
  command: "\x02INP:10\x03"
  params: []

- id: input_component
  label: Select Input Component
  kind: action
  command: "\x02INP:7\x03"
  params: []

- id: input_hdbaset
  label: Select Input HDBaseT
  kind: action
  command: "\x02INP:11\x03"
  params: []

- id: input_status_query
  label: Input Status Query
  kind: query
  command: "\x02INP?\x03"
  params: []

# ---------- VOLUME (VOL) ----------
- id: volume_set
  label: Set Volume
  kind: action
  command: "\x02VOL:{level}\x03"
  params:
    - name: level
      type: integer
      description: Volume level 0-100 (zero-padded to 3 digits is optional in request)

- id: volume_status_query
  label: Volume Status Query
  kind: query
  command: "\x02VOL?\x03"
  params: []

# ---------- MUTE (MUT) ----------
- id: mute_on
  label: Mute
  kind: action
  command: "\x02MUT:1\x03"
  params: []

- id: mute_off
  label: Unmute
  kind: action
  command: "\x02MUT:0\x03"
  params: []

- id: mute_status_query
  label: Mute Status Query
  kind: query
  command: "\x02MUT?\x03"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
  # Response payload: "\x02Power(0)\x03" (off) or "\x02Power(1)\x03" (on)

- id: input_state
  type: integer
  description: |
    Current input. Mapping from source:
      1  = HDMI1
      6  = HDMI2
      7  = Component
      9  = HDMI3
      10 = DisplayPort
      11 = HDBaseT
  # Response payload: "\x02Input(N)\x03" where N is one of the values above.

- id: volume_level
  type: integer
  description: Current volume 0-100; leading zeros truncated in response.
  # Response payload: "\x02Volume(XXX)\x03"

- id: mute_state
  type: enum
  values: [unmuted, muted]
  # Response payload: "\x02Mute(0)\x03" (unmuted) or "\x02Mute(1)\x03" (muted)

- id: command_ack
  type: string
  description: Generic command acknowledgment.
  # Payload: "\x02OK\x03" (per source: "the ASCII letters 'OK'")

- id: command_error
  type: string
  description: |
    Error response. Source documents: "\x02ER\x03" with optional parameters
    after a colon for more detail. Unsolicited "INVALID" response when the
    command is not supported by the target device (e.g. tuner command to monitor).
  # Payload: "\x02ER\x03" or "\x02INVALID\x03"
```

## Variables
```yaml
# Settable parameters that are discrete actions in this protocol are listed under
# Actions. No standalone variable pool (e.g. brightness, contrast, picture mode)
# is documented in the source.
```

## Events
```yaml
# Source documents unsolicited state-change notifications. The display emits
# these when state transitions occur (not in response to a query).
- id: power_state_change
  description: Sent during power state change.
  payload: "\x02Power(X)\x03"  # X = 0 (off) or 1 (on)
- id: input_state_change
  description: Sent during input state change.
  payload: "\x02Input(X)\x03"  # X = current input number
- id: input_state_change_on_power_on
  description: Sent only during power-on transition.
  payload: "\x02Input(X)\x03"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements present in source. Do not infer.
```

## Notes
- All commands are ASCII text framed by `0x02` (STX) and `0x03` (ETX). STX/ETX are sent as raw bytes; everything between is ASCII.
- Optional unit ID syntax: `STX <ID>; <COMMAND>:<PARAM> ETX`. ID is `000`-`255` (3 ASCII digits). ID `000` broadcasts to all units.
- Acknowledgment: `STX OK ETX` for accepted commands. `STX ER ETX` (optionally `ER:<detail>`) for errors. `STX INVALID ETX` when the addressed device does not support the command.
- The "Service Menu" used to set the unit ID is referenced but not documented in this source; contact Séura Technical Support (800-957-3872 / techsupport@seura.com) for access instructions.
- Filename/series name supplied by the operator (`seura_strm_55_3_s_series`) does not match the source title (`STM3 Outdoor Displays`) or the SKU prefix (`STM3-*-{S|U}`). The spec follows the source's nomenclature.
- Source does not specify behavior for: firmware upgrades, factory reset, picture/audio tuning, image position, OSD control, or any non-PWD/INP/VOL/MUT command surface. These are out of scope of the documented protocol.

<!-- UNRESOLVED: baud rate, parity, character length, flow control, start/stop bits are stated in the source; no other transport parameters are documented. -->
<!-- UNRESOLVED: no firmware compatibility range, protocol version, or device-revision field documented. -->
<!-- UNRESOLVED: cable pinout is documented (TX/RX/GND on a 3-wire link, plus a 1/2/3 pin list with White/Red/Black); no DB9 connector pin numbering or RJ45 pinout stated. -->

## Provenance

```yaml
source_domains:
  - storage.googleapis.com
source_urls:
  - https://storage.googleapis.com/wp-stateless/2019/10/seura-rs232protocol-stm32.pdf
  - https://storage.googleapis.com/wp-stateless/2019/10/storm-outdoor-tv-manual.pdf
retrieved_at: 2026-04-29T12:19:40.820Z
last_checked_at: 2026-06-02T05:46:12.336Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T05:46:12.336Z
matched_actions: 16
action_count: 16
confidence: medium
summary: "All 16 spec actions matched verbatim in source; all transport parameters verified in source docs; source command catalogue fully represented by spec. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source filename references \"STRM-55.3-S Series\" but refined document is titled \"STM3 Outdoor Displays\" and lists STM3-* SKUs. Naming discrepancy noted; spec follows source."
- "source provides no safety warnings, fault behavior, error recovery sequences, or power-on interlocks."
- "no multi-step sequences described in source."
- "no safety warnings, interlock procedures, or power-on sequencing"
- "baud rate, parity, character length, flow control, start/stop bits are stated in the source; no other transport parameters are documented."
- "no firmware compatibility range, protocol version, or device-revision field documented."
- "cable pinout is documented (TX/RX/GND on a 3-wire link, plus a 1/2/3 pin list with White/Red/Black); no DB9 connector pin numbering or RJ45 pinout stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
