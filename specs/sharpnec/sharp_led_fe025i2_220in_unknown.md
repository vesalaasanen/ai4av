---
spec_id: admin/sharp-nec-led-fe025i2-220in
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED FE025I2 (220in) Control Spec"
manufacturer: Sharp/NEC
model_family: "LED FE025I2 (220in)"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED FE025I2 (220in)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:29:52.774Z
last_checked_at: 2026-06-18T08:07:19.959Z
generated_at: 2026-06-18T08:07:19.959Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version not stated in source. Specific feature support per model is referenced to an \"Appendix / Supplementary Information by Command\" not included in the refined source, so several enum value tables (input terminal values, aspect values, eco-mode values, base model type values) are not fully enumerated here."
  - "flow control not stated in communication-conditions table (RTS/CTS pins 7/8 present on D-SUB 9P connector)"
  - "source documents settable parameters as discrete commands (see Actions:"
  - "no unsolicited notification / push mechanism described in source."
  - "no multi-step command sequences described in source."
  - "no explicit safety warnings, power-on sequencing, or operator"
  - "source \"Appendix / Supplementary Information by Command\" (input terminal values, aspect values, eco-mode values, base model type values, sub-input values) was not included in the refined excerpt, so those enum tables are referenced but not fully materialized."
  - "default baud rate / flow-control setting not stated."
  - "firmware version compatibility not stated."
  - "this manual is a generic Sharp/NEC projector command reference (BDT140013 Rev 7.1); model-specific feature support for FE025I2 not enumerated in the excerpt."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:07:19.959Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED FE025I2 (220in) Control Spec

## Summary
Sharp/NEC large-format LED display / projector controllable over RS-232C (PC CONTROL, D-SUB 9P) and wired/wireless LAN (TCP). Control uses a binary framed protocol with hex command bytes, per-device control ID + model code, and a trailing additive low-byte checksum. Source: Projector Control Command Reference Manual (BDT140013 Rev 7.1) — a generic Sharp/NEC projector command catalogue applied to the FE025I2 model.

<!-- UNRESOLVED: firmware version not stated in source. Specific feature support per model is referenced to an "Appendix / Supplementary Information by Command" not included in the refined source, so several enum value tables (input terminal values, aspect values, eco-mode values, base model type values) are not fully enumerated here. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # TCP port stated for LAN command send/receive
serial:
  baud_rate: 4800  # one of: 4800 / 9600 / 19200 / 38400 / 115200 bps (switchable; default not stated)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in communication-conditions table (RTS/CTS pins 7/8 present on D-SUB 9P connector)
auth:
  type: none  # inferred: no login/auth procedure described in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from POWER ON/OFF commands (015/016)
  - routable     # inferred from INPUT SW CHANGE (018)
  - queryable    # inferred from numerous REQUEST/status commands
  - levelable    # inferred from VOLUME / PICTURE adjust commands
  - muteable     # inferred from picture/sound/onscreen mute commands
```

## Actions
```yaml
# Frame: commands use leading message-type byte (00h-03h).
# <ID1> = control ID, <ID2> = model code (placeholders shown as 00h 00h; set per device).
# <CKS> = checksum = low byte of sum of all preceding bytes.
# Responses echo with leading 2xh (success) / Axh (error) + <ERR1><ERR2>.
# All payloads below are verbatim from the source.
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: No other command accepted while power-on in progress.

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: No other command accepted during power-off incl. cooling time.

- id: input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {input} {checksum}"
  params:
    - name: input
      type: integer
      description: Input terminal value (e.g. 06h = video port). Full value table in source Appendix "Supplementary Information by Command".

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: Cleared on input/video-signal switch.

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: Cleared on input/video-signal switch or volume adjust.

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []
  notes: Cleared on input/video-signal switch.

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {target} FFh {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: target
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
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
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {mode} {value_lo} {value_hi} {checksum}"
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
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {value} 00h {checksum}"
  params:
    - name: value
      type: integer
      description: Aspect value; full table in source Appendix.

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {target} {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: target
      type: integer
      description: "Adjustment target (DATA01): 96h=LAMP ADJUST / LIGHT ADJUST"
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
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90).

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: Returns filter usage time + filter alarm start time (seconds; -1 if undefined).

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {lamp} {content} {checksum}"
  params:
    - name: lamp
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: content
      type: integer
      description: "01h=lamp usage time (seconds), 04h=lamp remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {type} {checksum}"
  params:
    - name: type
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {key_lo} {key_hi} {checksum}"
  params:
    - name: key_lo
      type: integer
      description: "Key code low byte (WORD). Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: key_hi
      type: integer
      description: Key code high byte (00h for listed keys).

- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h {target} {action} {checksum}"
  params:
    - name: target
      type: integer
      description: "Lens target (DATA01): e.g. 06h=Periphery Focus"
    - name: action
      type: integer
      description: "00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus, 81h=drive minus, FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {target} 00h {checksum}"
  params:
    - name: target
      type: integer
      description: Lens target (DATA01).
  notes: Returns upper/lower limit + current value of adjustment range.

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {target} {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: target
      type: integer
      description: "FFh=Stop, otherwise lens target (DATA01)"
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
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {operation} {checksum}"
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {operation} {checksum}"
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET (operates on profile set via LENS PROFILE SET)"
    - name: value_lo
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_hi
      type: integer
      description: Adjustment value high-order 8 bits

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {option} {checksum}"
  params:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {option} {value} {checksum}"
  params:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: Returns lens operation bitmap (lens memory, zoom, focus, lens shift H/V - stop/in-operation).

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {profile} {checksum}"
  params:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {name} 00h 00h {checksum}"
  params:
    - name: name
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: Returns base model type, sound function availability, profile/clock/sleep-timer function.

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: Returns power status, cooling/power process, operation status.

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: Returns signal switch process, signal list number, selection signal type, test pattern/content displayed.

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: Returns picture/sound/onscreen/forced-onscreen mute + OSD display state.

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Returns 00h=normal (cover opened), 01h=cover closed."

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {state} {checksum}"
  params:
    - name: state
      type: integer
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00 {type} 01h {checksum}"
  params:
    - name: type
      type: integer
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: Returns eco / light / lamp mode value; full value table in source Appendix.

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: PIP / Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {param} {checksum}"
  params:
    - name: param
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {value} {checksum}"
  params:
    - name: value
      type: integer
      description: Eco / light / lamp mode value; full table in source Appendix.

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {name_01} {name_16} 00h {checksum}"
  params:
    - name: name_01
      type: string
      description: Projector name byte 1 (up to 16 bytes total, NUL-terminated).

- id: pip_picture_by_picture_set
  label: PIP / Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {param} {value} {checksum}"
  params:
    - name: param
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: "MODE: 00h=PIP,01h=PBP. START POSITION: 00h=TL,01h=TR,02h=BL,03h=BR. Sub-input values in Appendix."

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {value} {checksum}"
  params:
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: Returns base model type + model name string.

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: Returns operation status, content displayed, signal type, mute + freeze state.

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {input} {value} {checksum}"
  params:
    - name: input
      type: integer
      description: Input terminal value (full table in source Appendix).
    - name: value
      type: integer
      description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Observable query-response states. Error responses carry <ERR1><ERR2> codes.
- id: error_status
  type: bitmap
  description: Error information (DATA01-12), bit=1 indicates error (cover/fan/temp/lamp/ballast/interlock etc.).

- id: power_state
  type: enum
  values: [standby, power_on, cooling]
  description: From RUNNING STATUS / BASIC INFORMATION request (DATA03/01).

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]

- id: input_signal_status
  type: composite
  description: Signal list number, selection signal type, content displayed.

- id: mute_status
  type: composite
  description: Picture / sound / onscreen / forced-onscreen mute + OSD display flags.

- id: lamp_usage_time
  type: integer
  unit: seconds
  description: Lamp usage time (updated at 1-min intervals).

- id: lamp_remaining_life
  type: integer
  unit: percent
  description: Lamp remaining life (%); negative if replacement deadline exceeded.

- id: filter_usage_time
  type: integer
  unit: seconds

- id: lamp_information
  type: composite
  description: Per-lamp usage time / remaining life.

- id: carbon_savings
  type: composite
  description: Total / operation carbon savings (kg + mg).

- id: lens_position
  type: composite
  description: Upper/lower adjustment limit + current value per lens target.

- id: lens_status
  type: bitmap
  description: Lens memory/zoom/focus/lens-shift operation state (stop/in-operation).

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]

- id: eco_mode
  type: enum
  description: Eco / light / lamp mode (value table in source Appendix).

- id: projector_name
  type: string

- id: mac_address
  type: string

- id: edge_blending
  type: enum
  values: [off, on]

- id: cover_status
  type: enum
  values: [normal_opened, closed]

- id: freeze_status
  type: enum
  values: [off, on]

- id: model_name
  type: string

- id: base_model_type
  type: composite

- id: serial_number
  type: string

- id: gain_parameter
  type: composite
  description: Range/default/current for brightness/contrast/color/hue/sharpness/volume/lamp-adjust.

- id: sync_frequency
  type: composite
  description: Horizontal / vertical sync frequency strings.

- id: command_error
  type: composite
  description: "ERR1/ERR2 error code pair (e.g. 00h/00h=unrecognized, 02h/0Dh=power off, 03h/02h=adjust failed)."
```

## Variables
```yaml
# UNRESOLVED: source documents settable parameters as discrete commands (see Actions:
# PICTURE ADJUST, VOLUME ADJUST, ASPECT, ECO MODE, LAMP ADJUST, etc.) rather than a
# unified variable registry. No separate variable list enumerated.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification / push mechanism described in source.
# All data acquisition is poll-based via REQUEST commands.
```

## Macros
```yaml
# UNRESOLVED: no multi-step command sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes operational interlocks (not safety interlocks per se):
#  - POWER ON/OFF reject all other commands while power transition / cooling in progress.
#  - Error status bitmap reports an interlock-switch-open bit (DATA09 Bit1) and
#    foreign-matter / mirror-cover / lens-not-installed errors - treat as device
#    health indicators, not a documented control interlock procedure.
# UNRESOLVED: no explicit safety warnings, power-on sequencing, or operator
# confirmation procedures stated in this command reference.
```

## Notes
- Binary framed protocol. Command message-type lead bytes: `00h`/`01h`/`02h`/`03h`; success-response lead bytes `20h`/`21h`/`22h`/`23h`; error-response lead bytes `A0h`/`A1h`/`A2h`/`A3h`.
- Checksum = low-order byte of the sum of all preceding bytes (inclusive of message type, command code, ID1, ID2, LEN, and DATA bytes). Example given in source: `20h+81h+01h+60h+01h+00h = 103h → CKS = 03h`.
- `<ID1>` = control ID set on projector; `<ID2>` = model code (model-dependent). Command examples use `00h 00h` placeholders — substitute real values and recompute checksum.
- Serial cable must be a cross cable wired to PC CONTROL (D-SUB 9P): pin2↔3 (RxD/TxD), pin7↔8 (RTS/CTS), pin5 GND.
- LAN: TCP port 7142 (stated). Wired 10/100 Mbps auto-sensing; wireless via optional wireless-LAN unit (manual refers to unit's own operation manual for details).
- Usage-time fields update at 1-minute intervals despite 1-second resolution.
- Two-lamp variant: Lamp 2 selectors (`01h` in lamp DATA01) only valid on two-lamp models.
- Picture/Sound/Onscreen mute auto-clear on input/video-signal switch (and volume adjust for sound mute).

<!-- UNRESOLVED: source "Appendix / Supplementary Information by Command" (input terminal values, aspect values, eco-mode values, base model type values, sub-input values) was not included in the refined excerpt, so those enum tables are referenced but not fully materialized. -->
<!-- UNRESOLVED: default baud rate / flow-control setting not stated. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: this manual is a generic Sharp/NEC projector command reference (BDT140013 Rev 7.1); model-specific feature support for FE025I2 not enumerated in the excerpt. -->

---

Spec complete. 53 actions enumerated (all source command rows). Binary payloads verbatim w/ checksums. Serial + TCP transport, port 7142 stated, baud options listed. Appendix enum tables marked UNRESOLVED (not in refined excerpt).

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:29:52.774Z
last_checked_at: 2026-06-18T08:07:19.959Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:07:19.959Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version not stated in source. Specific feature support per model is referenced to an \"Appendix / Supplementary Information by Command\" not included in the refined source, so several enum value tables (input terminal values, aspect values, eco-mode values, base model type values) are not fully enumerated here."
- "flow control not stated in communication-conditions table (RTS/CTS pins 7/8 present on D-SUB 9P connector)"
- "source documents settable parameters as discrete commands (see Actions:"
- "no unsolicited notification / push mechanism described in source."
- "no multi-step command sequences described in source."
- "no explicit safety warnings, power-on sequencing, or operator"
- "source \"Appendix / Supplementary Information by Command\" (input terminal values, aspect values, eco-mode values, base model type values, sub-input values) was not included in the refined excerpt, so those enum tables are referenced but not fully materialized."
- "default baud rate / flow-control setting not stated."
- "firmware version compatibility not stated."
- "this manual is a generic Sharp/NEC projector command reference (BDT140013 Rev 7.1); model-specific feature support for FE025I2 not enumerated in the excerpt."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
