---
spec_id: admin/meridian-g68
schema_version: ai4av-public-spec-v1
revision: 1
title: "Meridian G68 Control Spec"
manufacturer: Meridian
model_family: G68
aliases: []
compatible_with:
  manufacturers:
    - Meridian
  models:
    - G68
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - meridian-audio.com
  - corebrands-resources.s3.amazonaws.com
source_urls:
  - https://meridian-audio.com/download/AppNotes/232_G68v12.pdf
  - https://corebrands-resources.s3.amazonaws.com/Download/xist_files/meridian_g68_controller_serial_protocol.doc
retrieved_at: 2026-06-04T02:45:45.200Z
last_checked_at: 2026-10-07T12:55:18.949Z
generated_at: 2026-10-07T12:55:18.949Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility, error recovery, RS-232 cable/connector pinout, and any safety interlocks are not stated in the source."
  - "settable numeric/parameter values that are not covered by the"
  - "source describes no unsolicited notifications. All device output"
  - "source describes no multi-step sequences."
  - "source contains no safety warnings, interlock procedures, or"
  - "RS-232 connector pinout, maximum cable length, and electrical levels (RS-232 vs TTL) are not stated in the source. Firmware version compatibility is not stated."
verification:
  verdict: verified
  checked_at: 2026-10-07T12:55:18.949Z
  matched_actions: 78
  action_count: 78
  confidence: medium
  summary: "All 78 action literals appear verbatim in the source and the serial parameters match. CO13=Mute sits oddly inside the preset block, so confidence is medium. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-04
---

# Meridian G68 Control Spec

## Summary

The Meridian G68 supports RS-232 control. Commands use 2-character ASCII mnemonics terminated by carriage return at 9600 baud, with 1 start bit, 1 stop bit, and no parity. The unit returns a 20-character response after each executed command.

<!-- UNRESOLVED: firmware version compatibility, error recovery, RS-232 cable/connector pinout, and any safety interlocks are not stated in the source. -->

## Transport
```yaml
# Serial-only interface. Baud and framing parameters are stated in source;
# data bits and flow control are not specified.
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: UNRESOLVED
  parity: none
  stop_bits: 1
  flow_control: UNRESOLVED
auth:
  type: UNRESOLVED  # source does not specify authentication
```

## Traits
```yaml
- powerable   # inferred from SB (Standby) command
- routable    # inferred from CD/RD/DV/AX/DC/TA/TV/CB/SA/V1/V2/GA source-select commands
- levelable   # inferred from VP/VM/VNnn/MU volume commands
- queryable   # inferred: every executed command returns a 20-character state string
```

## Actions
```yaml
# Every distinct command-bearing entry in the source is enumerated below.
# Command strings are the literal 2-ASCII-character mnemonics from the
# source. The controller must append a carriage return (CR, 0x0D) to execute.
# Commands with the suffix {nn} take a signed numeric argument as noted.

# --- Source select ---
- id: select_cd
  label: Select CD
  kind: action
  command: "CD\r"
  params: []
- id: select_radio
  label: Select Radio
  kind: action
  command: "RD\r"
  params: []
- id: select_dvd
  label: Select DVD
  kind: action
  command: "DV\r"
  params: []
- id: select_aux
  label: Select Aux
  kind: action
  command: "AX\r"
  params: []
- id: select_disc
  label: Select Disc
  kind: action
  command: "DC\r"
  params: []
- id: select_tape
  label: Select Tape
  kind: action
  command: "TA\r"
  params: []
- id: select_tv
  label: Select TV
  kind: action
  command: "TV\r"
  params: []
- id: select_cable
  label: Select Cable
  kind: action
  command: "CB\r"
  params: []
- id: select_satellite
  label: Select Satellite
  kind: action
  command: "SA\r"
  params: []
- id: select_vcr1
  label: Select VCR1
  kind: action
  command: "V1\r"
  params: []
- id: select_vcr2
  label: Select VCR2
  kind: action
  command: "V2\r"
  params: []
- id: select_game
  label: Select Game
  kind: action
  command: "GA\r"
  params: []

# --- Volume ---
- id: volume_up
  label: Volume Up
  kind: action
  command: "VP\r"
  params: []
- id: volume_down
  label: Volume Down
  kind: action
  command: "VM\r"
  params: []
- id: volume_set
  label: Goto Volume (1-99)
  kind: action
  command: "VN{nn}\r"
  params:
    - name: nn
      type: integer
      description: Target volume, 1-99
- id: mute
  label: Mute
  kind: action
  command: "MU\r"
  params: []

# --- General ---
- id: standby
  label: Standby
  kind: action
  command: "SB\r"
  params: []
- id: menu_right
  label: Menu Right
  kind: action
  command: "mr\r"
  params: []
- id: menu_left
  label: Menu Left
  kind: action
  command: "ml\r"
  params: []
- id: menu_plus
  label: Menu Plus (Up)
  kind: action
  command: "mp\r"
  params: []
- id: menu_minus
  label: Menu Minus (Down)
  kind: action
  command: "mm\r"
  params: []
- id: preset_goto
  label: Go to Preset
  kind: action
  command: "PN{nn}\r"
  params:
    - name: nn
      type: integer
      description: Presets listed in the source are 0-6 and 9-21; user presets are 24-33. Preset numbers 7, 8, 22, and 23 are not specified.
- id: preset_next
  label: Go to Next Preset
  kind: action
  command: "DS\r"
  params: []

# --- Copy source ---
- id: copy_source
  label: Select Copy Source
  kind: action
  command: "CO{nn}\r"
  params:
    - name: nn
      type: integer
      description: Copy source index 0-12. 0=CD, 1=Radio, 2=Aux, 3=TV, 4=Tape, 5=Sat, 6=Disc, 7=Cable, 8=DVD, 9=VCR1, 10=VCR2, 11=Game, 12=Source

# --- Additional source / MSR+ keys ---
- id: play
  label: Play
  kind: action
  command: "PL\r"
  params: []
- id: stop
  label: Stop
  kind: action
  command: "ST\r"
  params: []
- id: pause
  label: Pause
  kind: action
  command: "PS\r"
  params: []
- id: repeat
  label: Repeat
  kind: action
  command: "RP\r"
  params: []
- id: next
  label: Next
  kind: action
  command: "NE\r"
  params: []
- id: previous
  label: Previous
  kind: action
  command: "PR\r"
  params: []
- id: display
  label: Display
  kind: action
  command: "DI\r"
  params: []
- id: store
  label: Store
  kind: action
  command: "SR\r"
  params: []
- id: clear
  label: Clear
  kind: action
  command: "CL\r"
  params: []
- id: decimal_point
  label: Decimal Point
  kind: action
  command: "DP\r"
  params: []
- id: fast_forward
  label: Fast Forward
  kind: action
  command: "FF\r"
  params: []
- id: fast_back
  label: Fast Back
  kind: action
  command: "FB\r"
  params: []
- id: number_0
  label: Number 0
  kind: action
  command: "N0\r"
  params: []
- id: number_9
  label: Number 9
  kind: action
  command: "N9\r"
  params: []
- id: open
  label: Open
  kind: action
  command: "OP\r"
  params: []
- id: mono
  label: Mono
  kind: action
  command: "MO\r"
  params: []
- id: slow
  label: Slow
  kind: action
  command: "SL\r"
  params: []
- id: audio
  label: Audio
  kind: action
  command: "AU\r"
  params: []
- id: subtitle_toggle
  label: Subtitle On/Off
  kind: action
  command: "SU\r"
  params: []
- id: subtitle_choice
  label: Subtitle Choice
  kind: action
  command: "su\r"
  params: []
- id: ab_repeat_lower
  label: AB Repeat (lowercase)
  kind: action
  command: "rp\r"
  params: []
- id: ab_repeat
  label: AB Repeat
  kind: action
  command: "AB\r"
  params: []
- id: phase
  label: Phase
  kind: action
  command: "PH\r"
  params: []
- id: t_msr3
  label: T (MSR3)
  kind: action
  command: "TB\r"
  params: []
- id: hash_button
  label: # Button
  kind: action
  command: "#B\r"
  params: []
- id: chapter
  label: Chapter (MSR3)
  kind: action
  command: "CH\r"
  params: []
- id: setup
  label: Setup
  kind: action
  command: "SE\r"
  params: []

# --- Second MSR+ / function-key table ---
- id: menu
  label: Menu
  kind: action
  command: "ME\r"
  params: []
- id: return
  label: Return
  kind: action
  command: "RT\r"
  params: []
- id: enter
  label: Enter
  kind: action
  command: "EN\r"
  params: []
- id: top_menu
  label: Top Menu
  kind: action
  command: "TM\r"
  params: []
- id: next_page
  label: Next Page
  kind: action
  command: "NP\r"
  params: []
- id: previous_page
  label: Previous Page
  kind: action
  command: "PP\r"
  params: []
- id: menu_up
  label: Menu Up
  kind: action
  command: "MP\r"
  params: []
- id: menu_down
  label: Menu Down
  kind: action
  command: "MM\r"
  params: []
- id: menu_left_caps
  label: Menu Left (caps)
  kind: action
  command: "ML\r"
  params: []
- id: menu_right_caps
  label: Menu Right (caps)
  kind: action
  command: "MR\r"
  params: []
- id: fn_clear
  label: Fn Clear
  kind: action
  command: "cl\r"
  params: []
- id: fn_store
  label: Fn Store
  kind: action
  command: "sr\r"
  params: []
- id: fn_display
  label: Fn Display
  kind: action
  command: "di\r"
  params: []
- id: fn_mute
  label: Fn Mute
  kind: action
  command: "mu\r"
  params: []
- id: fn_dsp
  label: Fn DSP
  kind: action
  command: "ds\r"
  params: []
- id: fn_fast_forward
  label: Fn Fast Forward
  kind: action
  command: "ff\r"
  params: []
- id: fn_fast_back
  label: Fn Fast Back
  kind: action
  command: "fb\r"
  params: []
- id: fn_vol_up
  label: Fn Vol Up
  kind: action
  command: "vp\r"
  params: []
- id: fn_vol_down
  label: Fn Vol Down
  kind: action
  command: "vm\r"
  params: []
- id: record
  label: Record
  kind: action
  command: "RC\r"
  params: []
- id: band
  label: Band
  kind: action
  command: "BA\r"
  params: []
- id: angle
  label: Angle
  kind: action
  command: "AN\r"
  params: []
- id: osd
  label: OSD
  kind: action
  command: "OS\r"
  params: []
- id: red_button
  label: Red Button
  kind: action
  command: "RE\r"
  params: []
- id: green_button
  label: Green Button
  kind: action
  command: "GR\r"
  params: []
- id: yellow_button
  label: Yellow Button
  kind: action
  command: "YE\r"
  params: []
- id: blue_button
  label: Blue Button
  kind: action
  command: "BL\r"
  params: []
```

## Feedbacks
```yaml
# Source: "When a command is executed, the G68 will return 20 characters."
# The 20-character response string corresponds to the front-panel display and
# encodes the current source, listening mode, and volume (e.g. "CD   Trifield    65").
# Treat the response as a single opaque state string.
- id: front_panel_state
  type: string
  description: 20-character response returned after every command. Format matches the front-panel display: source name, listening mode, and volume level.
```

## Variables
```yaml
# UNRESOLVED: settable numeric/parameter values that are not covered by the
# discrete commands above. The source documents only the discrete command
# mnemonics plus VN{nn} (volume 1-99) and PN{nn} / CO{nn} (preset/copy
# source indices). No other settable parameters are described.
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications. All device output
# is a synchronous 20-character response to a command.
```

## Macros
```yaml
# UNRESOLVED: source describes no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements.
```

## Notes

- Commands are 2 ASCII characters, in some cases followed by a signed argument. A carriage return (CR, `0x0D`) executes each command.
- The 20-character response after each command corresponds to the front-panel display. Example from the source: `CD    Trifield    65` (source name, listening mode, volume).
- Command characters are echoed by the processor. Backspace is implemented for command-line editing.
- The unit supports the uppercase and lowercase mnemonics listed in separate source tables (e.g. `VP` and `vp`, `MU` and `mu`, `MR` and `mr`). These remain separate actions here.
- The source lists preset numbers 0-6 and 9-21, and says PN24 to PN33 select user presets. The meanings or availability of PN7, PN8, PN22, and PN23 are UNRESOLVED.
- Authentication is UNRESOLVED; the source does not specify an authentication procedure.
- Data bits and flow control are UNRESOLVED; the source does not specify them.

<!-- UNRESOLVED: RS-232 connector pinout, maximum cable length, and electrical levels (RS-232 vs TTL) are not stated in the source. Firmware version compatibility is not stated. -->

## Provenance

```yaml
source_domains:
  - meridian-audio.com
  - corebrands-resources.s3.amazonaws.com
source_urls:
  - https://meridian-audio.com/download/AppNotes/232_G68v12.pdf
  - https://corebrands-resources.s3.amazonaws.com/Download/xist_files/meridian_g68_controller_serial_protocol.doc
retrieved_at: 2026-06-04T02:45:45.200Z
last_checked_at: 2026-10-07T12:55:18.949Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T12:55:18.949Z
matched_actions: 78
action_count: 78
confidence: medium
summary: "All 78 action literals appear verbatim in the source and the serial parameters match. CO13=Mute sits oddly inside the preset block, so confidence is medium. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility, error recovery, RS-232 cable/connector pinout, and any safety interlocks are not stated in the source."
- "settable numeric/parameter values that are not covered by the"
- "source describes no unsolicited notifications. All device output"
- "source describes no multi-step sequences."
- "source contains no safety warnings, interlock procedures, or"
- "RS-232 connector pinout, maximum cable length, and electrical levels (RS-232 vs TTL) are not stated in the source. Firmware version compatibility is not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
