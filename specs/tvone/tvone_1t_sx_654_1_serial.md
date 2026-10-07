---
spec_id: admin/tvone-1t-sx-654
schema_version: ai4av-public-spec-v1
revision: 1
title: "tvONE 1T-SX-654 Control Spec"
manufacturer: tvONE
model_family: 1T-SX-654
aliases: []
compatible_with:
  manufacturers:
    - tvONE
  models:
    - 1T-SX-654
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - tvone.com
source_urls:
  - https://tvone.com/filestore/Manuals-Other-Products/Manual-1T-SX-654.pdf
retrieved_at: 2026-07-01T14:11:03.472Z
last_checked_at: 2026-10-07T12:45:30.578Z
generated_at: 2026-10-07T12:45:30.578Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - TVUNMUTE
  - "flow_control not stated in source. Power-on/off for the switcher unit itself not documented (only CEC passthrough TV/SRC power)."
  - "flow control not stated in source"
  - "authentication is not stated in source"
  - "none applicable"
  - "no power-on sequencing requirements stated in source."
  - "flow_control not stated in source (baud/data/stop/parity only)."
  - "no power on/off command for the switcher unit itself (only CEC passthrough TVOn/TVOff and SRCOn/SRCOff for external devices)."
  - "firmware version compatibility range not stated; SYSInfo returns current firmware only."
  - "exact RS-232 cable pinout for the 3.5mm minijack not included in this excerpt."
verification:
  verdict: verified
  checked_at: 2026-10-07T12:45:30.578Z
  matched_actions: 32
  action_count: 32
  confidence: medium
  summary: "All 32 spec commands and transport values appear verbatim in the source. Only the TVUNMUTE row is unrepresented, giving 32/33 coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# tvONE 1T-SX-654 Control Spec

## Summary
The tvONE 1T-SX-654 is a 4×1 HDMI switcher with ARC support, analog audio output, and RS-232 serial control. This spec covers the RS-232 command set for input switching, CEC passthrough control of source and display devices, audio source selection, and system queries.

<!-- UNRESOLVED: flow_control not stated in source. Power-on/off for the switcher unit itself not documented (only CEC passthrough TV/SRC power). -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: UNRESOLVED  # UNRESOLVED: authentication is not stated in source
```

Note: all commands must be terminated with `<CR><LF>`. Send direction uses the `>>` prefix; device responses use the `<<` prefix where shown in the source.

## Traits
```yaml
traits:
  - routable  # inferred: HDMI input switching commands present
  - queryable  # inferred: SYSInfo query returning state
```

## Actions
```yaml
# All payloads are ASCII command strings terminated with <CR><LF>.
# Send-to-device form carries the `>>` prefix verbatim from the source.

# --- Signal Switching ---
- id: switch_hdmi_1
  label: Switch to HDMI Input 1
  kind: action
  command: ">>HDMI1"
  params: []

- id: switch_hdmi_2
  label: Switch to HDMI Input 2
  kind: action
  command: ">>HDMI2"
  params: []

- id: switch_hdmi_3
  label: Switch to HDMI Input 3
  kind: action
  command: ">>HDMI3"
  params: []

- id: switch_hdmi_4
  label: Switch to HDMI Input 4
  kind: action
  command: ">>HDMI4"
  params: []

- id: enable_auto_switching
  label: Enable Auto Switching Mode
  kind: action
  command: ">>AUTO"
  params: []

- id: enable_manual_switching
  label: Enable Manual Switching Mode
  kind: action
  command: ">>MANUAL"
  params: []

# --- Source Device Control (CEC passthrough; requires CEC-capable source) ---
# Note: HDMI input 4 does NOT support CEC.
- id: source_on
  label: Source Device Power On
  kind: action
  command: ">>SRCOn"
  params: []

- id: source_off
  label: Source Device Power Off
  kind: action
  command: ">>SRCOff"
  params: []

- id: source_play
  label: Source Play
  kind: action
  command: ">>SRCPlay"
  params: []

- id: source_pause
  label: Source Pause
  kind: action
  command: ">>SRCPause"
  params: []

- id: source_stop
  label: Source Stop
  kind: action
  command: ">>SRCStop"
  params: []

- id: source_forward
  label: Source Fast Forward x1
  kind: action
  command: ">>SRCForward"
  params: []

- id: source_backward
  label: Source Fast Rewind x1
  kind: action
  command: ">>SRCBackward"
  params: []

- id: source_skip_forward
  label: Source Next Section
  kind: action
  command: ">>SRCSkipForward"
  params: []

- id: source_skip_backward
  label: Source Previous Section
  kind: action
  command: ">>SRCSkipBackward"
  params: []

- id: source_menu
  label: Source Open Menu
  kind: action
  command: ">>SRCMenu"
  params: []

- id: source_back
  label: Source Go Back
  kind: action
  command: ">>SRCBack"
  params: []

- id: source_ok
  label: Source Confirm (OK)
  kind: action
  command: ">>SRCOk"
  params: []

- id: source_exit
  label: Source Exit
  kind: action
  command: ">>SRCExit"
  params: []

- id: source_up
  label: Source Direction Up
  kind: action
  command: ">>SRCUp"
  params: []

- id: source_down
  label: Source Direction Down
  kind: action
  command: ">>SRCDown"
  params: []

- id: source_left
  label: Source Direction Left
  kind: action
  command: ">>SRCLeft"
  params: []

- id: source_right
  label: Source Direction Right
  kind: action
  command: ">>SRCRight"
  params: []

# --- Display Device Control (CEC passthrough; requires CEC-capable display) ---
- id: display_on
  label: Display Device Power On
  kind: action
  command: ">>TVOn"
  params: []

- id: display_off
  label: Display Device Power Off
  kind: action
  command: ">>TVOff"
  params: []

- id: display_volume_up
  label: Display Volume Up
  kind: action
  command: ">>TVVOL+"
  params: []

- id: display_volume_down
  label: Display Volume Down
  kind: action
  command: ">>TVVOL-"
  params: []

- id: display_mute
  label: Display Mute
  kind: action
  command: ">>TVMUTE"
  params: []

# --- Audio Selection ---
- id: audio_arc_external
  label: Select ARC Audio Channel
  kind: action
  command: ">>AUDExternal"
  params: []

- id: audio_internal_hdmi
  label: Select HDMI Audio Input Channel
  kind: action
  command: ">>AUDInternal"
  params: []

# --- System Control ---
- id: system_reset
  label: System Reset
  kind: action
  command: ">>RESET"
  params: []

- id: system_info_query
  label: Get System Information
  kind: query
  command: ">>SYSInfo"
  params: []
```

## Feedbacks
```yaml
- id: command_ack
  type: string
  description: >
    The source response column shows command acknowledgements, but its prefixes
    are inconsistent: examples include `<<HDMI1`, `<<AUTO Switch`, and rows
    showing the `>>` prefix. The exact response behavior for inconsistent rows
    is UNRESOLVED.

- id: system_info_response
  type: object
  description: >
    Multi-line response to `>>SYSInfo`. Order of lines as documented in source:
  fields:
    - audio_channel: "e.g. AUDExternal"
    - model: "e.g. WUH4ARC-H2"
    - firmware_version: "e.g. V1.0.0"
    - separator: "--------"
    - active_input: "e.g. HDMI1"
    - switching_mode: "e.g. Auto Switch"
    - audio_selection: "e.g. AUDExternal"
    - edid_setting: "e.g. EDID0"
```

## Variables
```yaml
# No continuous settable parameters documented beyond discrete actions.
# UNRESOLVED: none applicable
```

## Events
```yaml
# No unsolicited notifications documented.
# UNRESOLVED: none applicable
```

## Macros
```yaml
# No multi-step sequences described in source.
# UNRESOLVED: none applicable
```

## Safety
```yaml
confirmation_required_for:
  - system_reset  # RESET performs a full system reset per source
interlocks:
  - HDMI input 4 does not support CEC; source device on input 4 cannot be controlled by IR remote / CEC passthrough.
  - Source device control requires the connected source to support CEC.
  - Display device control requires the connected display to support CEC.
# UNRESOLVED: no power-on sequencing requirements stated in source.
```

## Notes
- RS-232 connector is a 3.5mm minijack on the rear panel (not a standard DB9).
- All commands must be terminated with `<CR><LF>`.
- The `>>` prefix denotes host→device; `<<` denotes device→host where shown in the source. Some response-column entries use `>>`; their intended response prefix is UNRESOLVED.
- Auto-switching mode is also toggleable via front-panel Auto/Source button (press+hold 3s).
- Auto-switch rules: new input → select it; on reboot → keep last source if still active, else first active input from HDMI1; source removed → first active input from HDMI1.
- Audio output options: ARC audio channel (AUDExternal) or HDMI audio input channel (AUDInternal). Analog 3.5mm audio output jack present.
- Model string returned by SYSInfo (`WUH4ARC-H2`) differs from the marketing model name `1T-SX-654`.

<!-- UNRESOLVED: flow_control not stated in source (baud/data/stop/parity only). -->
<!-- UNRESOLVED: no power on/off command for the switcher unit itself (only CEC passthrough TVOn/TVOff and SRCOn/SRCOff for external devices). -->
<!-- UNRESOLVED: firmware version compatibility range not stated; SYSInfo returns current firmware only. -->
<!-- UNRESOLVED: exact RS-232 cable pinout for the 3.5mm minijack not included in this excerpt. -->

## Provenance

```yaml
source_domains:
  - tvone.com
source_urls:
  - https://tvone.com/filestore/Manuals-Other-Products/Manual-1T-SX-654.pdf
retrieved_at: 2026-07-01T14:11:03.472Z
last_checked_at: 2026-10-07T12:45:30.578Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T12:45:30.578Z
matched_actions: 32
action_count: 32
confidence: medium
summary: "All 32 spec commands and transport values appear verbatim in the source. Only the TVUNMUTE row is unrepresented, giving 32/33 coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- TVUNMUTE
- "flow_control not stated in source. Power-on/off for the switcher unit itself not documented (only CEC passthrough TV/SRC power)."
- "flow control not stated in source"
- "authentication is not stated in source"
- "none applicable"
- "no power-on sequencing requirements stated in source."
- "flow_control not stated in source (baud/data/stop/parity only)."
- "no power on/off command for the switcher unit itself (only CEC passthrough TVOn/TVOff and SRCOn/SRCOff for external devices)."
- "firmware version compatibility range not stated; SYSInfo returns current firmware only."
- "exact RS-232 cable pinout for the 3.5mm minijack not included in this excerpt."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
