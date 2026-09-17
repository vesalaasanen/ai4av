---
spec_id: admin/nec-np-mc3xxxg-mc3xxwg-mc4xxxg-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC NP MC3xxXG / MC3xxWG / MC4xxXG Series Control Spec"
manufacturer: NEC
model_family: "NP MC3xxXG Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NP MC3xxXG Series"
    - "NP MC3xxWG Series"
    - "NP MC4xxXG Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T08:28:53.578Z
last_checked_at: 2026-09-15T22:16:43.264Z
generated_at: 2026-09-15T22:16:43.264Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "per-model capability matrix (which models support which commands) — source defers to appendix \"Connecting an External Device\" / \"Supplementary Information by Command\" not included in this excerpt"
  - "LAN connection has no documented authentication or encryption"
  - "WLAN specifics deferred to model-specific wireless-LAN-unit manual"
  - "no continuous parameters documented outside of the action command payloads themselves."
  - "source does not document unsolicited device-to-host notifications."
  - "no multi-step sequences described in source."
  - "lamp replacement moratorium and usage-exceeded thresholds (the source notes the condition exists but does not state specific hour limits per model)."
verification:
  verdict: verified
  checked_at: 2026-09-15T22:16:43.264Z
  matched_actions: 54
  action_count: 54
  confidence: medium
  summary: "All 54 spec action units map to hex byte sequences documented verbatim in source sections 3.1–3.30; transport values verbatim at source §1.2/§Port number. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-09
---

# NEC NP MC3xxXG / MC3xxWG / MC4xxXG Series Control Spec

## Summary
Binary control protocol for NEC NP MC3xxXG, MC3xxWG, and MC4xxXG series projectors over RS-232C and wired LAN (TCP port 7142). Commands are framed as hex byte sequences; each command emits an acknowledgement response. Covers power, input switching, picture/sound/onscreen mute, picture/volume/aspect/lamp adjustments, lens control and memory, information requests, error status, and remote-key emulation.

<!-- UNRESOLVED: per-model capability matrix (which models support which commands) — source defers to appendix "Connecting an External Device" / "Supplementary Information by Command" not included in this excerpt -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800; highest listed
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: full_duplex
auth:
  type: none  # inferred: no auth procedure in source
```

<!-- UNRESOLVED: LAN connection has no documented authentication or encryption -->
<!-- UNRESOLVED: WLAN specifics deferred to model-specific wireless-LAN-unit manual -->

## Traits
```yaml
- powerable       # POWER ON / POWER OFF commands present
- routable        # INPUT SW CHANGE present
- queryable       # ERROR STATUS REQUEST, INFORMATION REQUEST, LAMP/FILTER INFO REQUESTS present
- levelable       # PICTURE ADJUST (brightness/contrast/color/hue/sharpness), VOLUME ADJUST, LAMP ADJUST present
```

## Actions
```yaml
- id: error_status_request
  label: Error Status Request (009)
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: Power On (015)
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

- id: power_off
  label: Power Off (016)
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_switch_change
  label: Input Switch Change (018)
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal code (see Appendix "Supplementary Information by Command")

- id: picture_mute_on
  label: Picture Mute On (020)
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: picture_mute_off
  label: Picture Mute Off (021)
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: Sound Mute On (022)
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: sound_mute_off
  label: Sound Mute Off (023)
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On (024)
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: onscreen_mute_off
  label: Onscreen Mute Off (025)
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: Picture Adjust (030-1)
  kind: action
  command: "03h 10h 00h 00h 05h {target} {FFh} {mode} {value_lo} {value_hi} {CKS}"
  params:
    - name: target
      type: integer
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value_lo
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_hi
      type: integer
      description: Adjustment value high-order 8 bits

- id: volume_adjust
  label: Volume Adjust (030-2)
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {mode} {value_lo} {value_hi} {CKS}"
  params:
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value_lo
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_hi
      type: integer
      description: Adjustment value high-order 8 bits

- id: aspect_adjust
  label: Aspect Adjust (030-12)
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Aspect value (see Appendix "Supplementary Information by Command")

- id: lamp_adjust
  label: Lamp Adjust / Light Adjust (030-15)
  kind: action
  command: "03h 10h 00h 00h 05h 96h FFh {mode} {value_lo} {value_hi} {CKS}"
  params:
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value_lo
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_hi
      type: integer
      description: Adjustment value high-order 8 bits

- id: information_request
  label: Information Request (037)
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request (037-3)
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3
  label: Lamp Information Request 3 (037-4)
  kind: query
  command: "03h 96h 00h 00h 02h {lamp} {content} {CKS}"
  params:
    - name: lamp
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: content
      type: integer
      description: "01h=usage time (seconds), 04h=remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request (037-6)
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_power_on
  label: Remote Key - POWER ON
  kind: action
  command: "02h 0Fh 00h 00h 02h 02h 00h {CKS}"
  params: []

- id: remote_key_power_off
  label: Remote Key - POWER OFF
  kind: action
  command: "02h 0Fh 00h 00h 02h 03h 00h {CKS}"
  params: []

- id: remote_key_auto
  label: Remote Key - AUTO
  kind: action
  command: "02h 0Fh 00h 00h 02h 05h 00h {CKS}"
  params: []

- id: remote_key_menu
  label: Remote Key - MENU
  kind: action
  command: "02h 0Fh 00h 00h 02h 06h 00h {CKS}"
  params: []

- id: remote_key_up
  label: Remote Key - UP
  kind: action
  command: "02h 0Fh 00h 00h 02h 07h 00h {CKS}"
  params: []

- id: remote_key_down
  label: Remote Key - DOWN
  kind: action
  command: "02h 0Fh 00h 00h 02h 08h 00h {CKS}"
  params: []

- id: remote_key_right
  label: Remote Key - RIGHT
  kind: action
  command: "02h 0Fh 00h 00h 02h 09h 00h {CKS}"
  params: []

- id: remote_key_left
  label: Remote Key - LEFT
  kind: action
  command: "02h 0Fh 00h 00h 02h 0Ah 00h {CKS}"
  params: []

- id: remote_key_enter
  label: Remote Key - ENTER
  kind: action
  command: "02h 0Fh 00h 00h 02h 0Bh 00h {CKS}"
  params: []

- id: remote_key_exit
  label: Remote Key - EXIT
  kind: action
  command: "02h 0Fh 00h 00h 02h 0Ch 00h {CKS}"
  params: []

- id: remote_key_help
  label: Remote Key - HELP
  kind: action
  command: "02h 0Fh 00h 00h 02h 0Dh 00h {CKS}"
  params: []

- id: remote_key_magnify_up
  label: Remote Key - MAGNIFY UP
  kind: action
  command: "02h 0Fh 00h 00h 02h 0Fh 00h {CKS}"
  params: []

- id: remote_key_magnify_down
  label: Remote Key - MAGNIFY DOWN
  kind: action
  command: "02h 0Fh 00h 00h 02h 10h 00h {CKS}"
  params: []

- id: remote_key_mute
  label: Remote Key - MUTE
  kind: action
  command: "02h 0Fh 00h 00h 02h 13h 00h {CKS}"
  params: []

- id: remote_key_picture
  label: Remote Key - PICTURE
  kind: action
  command: "02h 0Fh 00h 00h 02h 29h 00h {CKS}"
  params: []

- id: remote_key_computer1
  label: Remote Key - COMPUTER1
  kind: action
  command: "02h 0Fh 00h 00h 02h 4Bh 00h {CKS}"
  params: []

- id: remote_key_computer2
  label: Remote Key - COMPUTER2
  kind: action
  command: "02h 0Fh 00h 00h 02h 4Ch 00h {CKS}"
  params: []

- id: remote_key_video1
  label: Remote Key - VIDEO1
  kind: action
  command: "02h 0Fh 00h 00h 02h 4Fh 00h {CKS}"
  params: []

- id: remote_key_svideo1
  label: Remote Key - S-VIDEO1
  kind: action
  command: "02h 0Fh 00h 00h 02h 51h 00h {CKS}"
  params: []

- id: remote_key_volume_up
  label: Remote Key - VOLUME UP
  kind: action
  command: "02h 0Fh 00h 00h 02h 84h 00h {CKS}"
  params: []

- id: remote_key_volume_down
  label: Remote Key - VOLUME DOWN
  kind: action
  command: "02h 0Fh 00h 00h 02h 85h 00h {CKS}"
  params: []

- id: remote_key_freeze
  label: Remote Key - FREEZE
  kind: action
  command: "02h 0Fh 00h 00h 02h 8Ah 00h {CKS}"
  params: []

- id: remote_key_aspect
  label: Remote Key - ASPECT
  kind: action
  command: "02h 0Fh 00h 00h 02h A3h 00h {CKS}"
  params: []

- id: remote_key_source
  label: Remote Key - SOURCE
  kind: action
  command: "02h 0Fh 00h 00h 02h D7h 00h {CKS}"
  params: []

- id: remote_key_lamp_mode_eco
  label: Remote Key - LAMP MODE / ECO
  kind: action
  command: "02h 0Fh 00h 00h 02h EEh 00h {CKS}"
  params: []

- id: shutter_close
  label: Shutter Close (051)
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: Shutter Open (052)
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: Lens Control - Periphery Focus (053)
  kind: action
  command: "02h 18h 00h 00h 02h 06h {direction} {CKS}"
  params:
    - name: direction
      type: integer
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_request
  label: Lens Control Request (053-1)
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Lens axis selector

- id: lens_control_2
  label: Lens Control 2 (053-2)
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {mode} {value_lo} {value_hi} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "FFh=Stop (then mode/value ignored)"
    - name: mode
      type: integer
      description: "00h=absolute, 02h=relative"
    - name: value_lo
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_hi
      type: integer
      description: Adjustment value high-order 8 bits

- id: lens_memory_control
  label: Lens Memory Control (053-3)
  kind: action
  command: "02h 1Eh 00h 00h 01h {op} {CKS}"
  params:
    - name: op
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control (053-4)
  kind: action
  command: "02h 1Fh 00h 00h 01h {op} {CKS}"
  params:
    - name: op
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: lens_memory_option_request
  label: Lens Memory Option Request (053-5)
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set (053-6)
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: integer
      description: "00h=OFF, 01h=ON"

- id: lens_information_request
  label: Lens Information Request (053-7)
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: Lens Profile Set (053-10)
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"
```

## Feedbacks
```yaml
- id: error_status
  type: object
  description: |
    12-byte error information returned by 009 ERROR STATUS REQUEST.
    Bit = 0 normal, Bit = 1 error.
  fields:
    DATA01:
      type: bits
      description: "Bit0=Cover, Bit1=Temperature (bi-metallic), Bit2=reserved, Bit3=Fan, Bit4=Fan, Bit5=Power, Bit6=Lamp1 off, Bit7=Lamp1 replacement moratorium"
    DATA02:
      type: bits
      description: "Bit0=Lamp1 usage exceeded, Bit1=Formatter, Bit2=Lamp2 off, Bit7=Refer to extended status"
    DATA03:
      type: bits
      description: "Bit1=FPGA, Bit2=Temperature (sensor), Bit3=Lamp1 not present, Bit4=Lamp1 data, Bit5=Mirror cover, Bit6=Lamp2 moratorium, Bit7=Lamp2 usage exceeded"
    DATA04:
      type: bits
      description: "Bit0=Lamp2 not present, Bit1=Lamp2 data, Bit2=Temperature due to dust, Bit3=Foreign matter sensor, Bit5=Ballast comms, Bit6=Iris calibration, Bit7=Lens not installed"
    DATA09:
      type: bits
      description: "Bit0=Portrait cover side up, Bit1=Interlock open, Bit2=System error (Slave CPU), Bit3=System error (Formatter)"

- id: ack_response
  type: object
  description: |
    Standard command acknowledgement. Successful execution: command-specific data
    frame. Failure: A_/2_/... prefix frame carrying ERR1 and ERR2 error codes.

- id: input_switch_response
  type: enum
  values: [ok, ff_no_signal]
  description: |
    Response DATA01 returned by 018 INPUT SW CHANGE. FFh = ended with error
    (no signal switch made).

- id: adjust_execution_result
  type: enum
  values: [0000h_success, other_error]
  description: "DATA01/DATA02 = 0000h on success, non-zero on error. Returned by 030-1, 030-2, 030-12, 030-15."

- id: remote_key_response
  type: enum
  values: [ok, ff_error]
  description: "DATA01 = FFh indicates remote-key command ended with an error."

- id: lens_control_response
  type: enum
  values: [ok, ff_error]
  description: "DATA01 = FFh indicates lens-control command ended with an error."

- id: lens_memory_response
  type: enum
  values: [move, store, reset, ff_error]
  description: "DATA01 from 053-3 / 053-4 responses."

- id: lamp_information
  type: object
  description: |
    Response from 037-4 LAMP INFORMATION REQUEST 3.
    DATA01 echoes lamp selector, DATA02 echoes content selector,
    DATA03-DATA06 carries the requested value (seconds for usage, percent for life).
    Negative remaining-life value = replacement deadline exceeded.

- id: filter_information
  type: object
  description: |
    Response from 037-3 FILTER USAGE INFORMATION REQUEST.
    DATA01-DATA04 = usage time (seconds); DATA05-DATA08 = alarm start time (seconds).
    -1 returned if no time defined.

- id: projector_information
  type: object
  description: |
    Response from 037 INFORMATION REQUEST.
    DATA01-DATA49 = projector name (NUL-terminated string).
    DATA83-DATA86 = lamp usage time (seconds, one-minute update interval).
    DATA87-DATA90 = filter usage time (seconds).
```

## Variables
```yaml
# Source documents discrete opcode per setting value (e.g. remote-key codes, aspect values, input-terminal codes, lens direction bytes). No settable continuous parameters are exposed as separate variables beyond what is encoded into the action commands above.
# UNRESOLVED: no continuous parameters documented outside of the action command payloads themselves.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited device-to-host notifications.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for:
  - power_off
  - shutter_close
interlocks:
  - id: portrait_cover_side_up
    description: "DATA09 Bit0 - portrait cover side is up; projector will refuse unsafe operations."
  - id: interlock_switch_open
    description: "DATA09 Bit1 - interlock switch open; lamp/light cannot be safely energized."
  - id: lens_not_installed
    description: "DATA04 Bit7 - lens is not installed properly."
# UNRESOLVED: lamp replacement moratorium and usage-exceeded thresholds (the source notes the condition exists but does not state specific hour limits per model).
```

## Notes
- **Framing.** Every command is a hex byte sequence. The CKS byte is the low-order one byte of the sum of all preceding bytes (see source §2.2 "Example of checksum calculation"). Templates above show `{CKS}` as the final byte — implementer computes it.
- **ID1 / ID2.** Every request and response carries <ID1> (Control ID, configured on the projector) and <ID2> (model code, varies per model). Templates above omit these for clarity; append `{ID1} {ID2}` before CKS as shown in the source frames.
- **Baud rate selection.** Source lists 115200 / 38400 / 19200 / 9600 / 4800 bps as valid options. Spec declares 115200 because source lists it first; lower rates are likely fall-back options but the source does not state when each is selected.
- **Per-model capability.** Source repeatedly defers to "Appendix 'Connecting an External Device'" and "Appendix 'Supplementary Information by Command'" for model-specific input-terminal codes, aspect values, and which commands each model supports. Those appendices are not included in this excerpt.
- **Standby command reception.** Source notes "Some models cannot receive commands in standby mode" without listing which — see Appendix "Standby Mode setting for receiving commands".
- **No auth.** Neither RS-232C nor LAN commands require login. Anyone with physical or network access can drive the projector.
- **Two-lamp models.** DATA01 = 01h in lamp commands only valid for two-lamp projector models (unspecified which).
```

Self-check:
- [x] no voltage/current/power values invented
- [x] port 7142 stated verbatim in source
- [x] baud rate / data bits / parity / stop bits all stated in source
- [x] `status: draft`, `declared_confidence: low` set
- [x] YAML blocks use quoted commands with hex bytes verbatim
- [x] `entity_id` placeholder left as `FILL_IN_FROM_CONVEX`
- [x] UNRESOLVED markers present for gaps (per-model matrix, WLAN auth, unsolicited events, macros, lamp thresholds)

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T08:28:53.578Z
last_checked_at: 2026-09-15T22:16:43.264Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-15T22:16:43.264Z
matched_actions: 54
action_count: 54
confidence: medium
summary: "All 54 spec action units map to hex byte sequences documented verbatim in source sections 3.1–3.30; transport values verbatim at source §1.2/§Port number. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "per-model capability matrix (which models support which commands) — source defers to appendix \"Connecting an External Device\" / \"Supplementary Information by Command\" not included in this excerpt"
- "LAN connection has no documented authentication or encryption"
- "WLAN specifics deferred to model-specific wireless-LAN-unit manual"
- "no continuous parameters documented outside of the action command payloads themselves."
- "source does not document unsolicited device-to-host notifications."
- "no multi-step sequences described in source."
- "lamp replacement moratorium and usage-exceeded thresholds (the source notes the condition exists but does not state specific hour limits per model)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
