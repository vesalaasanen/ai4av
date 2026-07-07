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
  - https://tvone.com/products/video-scalers-switchers-format-converters/1t-sx-654-1
retrieved_at: 2026-07-01T14:08:51.012Z
last_checked_at: 2026-07-07T12:47:41.372Z
generated_at: 2026-07-07T12:47:41.372Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "EDID DIP-switch settings, IR remote codes, and full product part numbers not in source excerpt. Source device/display control requires CEC support on the attached devices."
  - "flow control not stated in source"
  - "no volume/level state exposed for the switcher itself (TVVOL± are CEC passthroughs)."
  - "auto-switching source-change events not documented as explicit notifications."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "RS-232 connector pinout not documented. flow_control not stated. EDID DIP-switch mapping not in excerpt. IR remote command set not in excerpt. Firmware version \"V1.0.0\" appears only inside a sample SYSInfo response, not as a documented compatibility range."
verification:
  verdict: verified
  checked_at: 2026-07-07T12:47:41.372Z
  matched_actions: 33
  action_count: 33
  confidence: medium
  summary: "All 33 commands matched in source table. TVUNMUTE has documented typo (source shows << prefix instead of >> in send column); spec corrected per established >> pattern. Perfect 1:1 coverage, all transport values verified. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# tvONE 1T-SX-654 Control Spec

## Summary
4×1 HDMI switcher (4 HDMI inputs, 1 HDMI output, ARC on input 4) with analog 3.5mm audio output. Controlled via RS-232C over a 3.5mm minijack. Also relays CEC commands to attached source devices and display. This spec covers the RS-232 command set documented in the vendor manual excerpt.

<!-- UNRESOLVED: EDID DIP-switch settings, IR remote codes, and full product part numbers not in source excerpt. Source device/display control requires CEC support on the attached devices. -->

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
  type: none  # inferred: no auth procedure in source
# All commands must be terminated with <CR><LF> (stated in source).
```

## Traits
```yaml
# - routable    (HDMI input selection: HDMI1..HDMI4)
# - queryable   (SYSInfo returns device state)
traits:
  - routable
  - queryable
```

## Actions
```yaml
# All payloads must be sent verbatim followed by <CR><LF>.
# Source table uses ">>CMD" for host→device send and "<<CMD" for device→host echo.
# Several rows in the source mis-print the response column with ">>" instead of "<<";
# the SEND command (>> form) is authoritative and emitted here.

# --- Signal Switching ---
- id: select_hdmi_input_1
  label: Switch to HDMI Input 1
  kind: action
  command: ">>HDMI1"
  params: []

- id: select_hdmi_input_2
  label: Switch to HDMI Input 2
  kind: action
  command: ">>HDMI2"
  params: []

- id: select_hdmi_input_3
  label: Switch to HDMI Input 3
  kind: action
  command: ">>HDMI3"
  params: []

- id: select_hdmi_input_4
  label: Switch to HDMI Input 4
  kind: action
  command: ">>HDMI4"
  params: []

- id: enable_auto_switching
  label: Enable Auto-Switching Mode
  kind: action
  command: ">>AUTO"
  params: []

- id: enable_manual_switching
  label: Enable Manual Switching Mode
  kind: action
  command: ">>MANUAL"
  params: []

# --- Source Device Control (CEC; source device must support CEC; HDMI 4 has no CEC) ---
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
  label: Source Up
  kind: action
  command: ">>SRCUp"
  params: []

- id: source_down
  label: Source Down
  kind: action
  command: ">>SRCDown"
  params: []

- id: source_left
  label: Source Left
  kind: action
  command: ">>SRCLeft"
  params: []

- id: source_right
  label: Source Right
  kind: action
  command: ">>SRCRight"
  params: []

# --- Display Device Control (CEC; display must support CEC) ---
- id: display_on
  label: Display Power On
  kind: action
  command: ">>TVOn"
  params: []

- id: display_off
  label: Display Power Off
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

- id: display_unmute
  label: Display Unmute
  kind: action
  command: ">>TVUNMUTE"  # source table prints "<<TVUNMUTE" in send column - corrected to ">>" per established pattern
  params: []

# --- Audio Selection ---
- id: select_audio_arc
  label: Select ARC Audio Channel
  kind: action
  command: ">>AUDExternal"
  params: []

- id: select_audio_hdmi
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
# Device echoes each accepted command back to the host using the "<<" prefix.
# Echo is a command acknowledgement; distinct responses listed below.

- id: command_ack_echo
  type: string
  description: >
    Device echoes the accepted command prefixed with "<<" (e.g. send ">>HDMI1"
    yields "<<HDMI1"). Auto/Manual modes echo "<<AUTO Switch" / "<<MANUAL Switch".

- id: system_info_response
  type: string
  description: >
    Multi-line response to ">>SYSInfo". Example from source:
    <<AUDExternal
    << WUH4ARC-H2
    << V1.0.0
    << --------
    <<HDMI1
    <<Auto Switch
    <<AUDExternal
    <<EDID0
```

## Variables
```yaml
# No settable continuous parameters documented beyond discrete actions.
# UNRESOLVED: no volume/level state exposed for the switcher itself (TVVOL± are CEC passthroughs).
```

## Events
```yaml
# No unsolicited notifications documented beyond command echoes.
# UNRESOLVED: auto-switching source-change events not documented as explicit notifications.
```

## Macros
```yaml
# No multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. RESET reinitializes the device but no
# warning text accompanies it in the excerpt.
```

## Notes
- Device is a 4×1 HDMI switcher; RS-232 port is a 3.5mm minijack (not a DE-9). A suitable adapter/cable is required; pinout not documented in the excerpt.
- Power: external 5V DC locking connector. No power on/off command exists for the switcher itself via RS-232 (only RESET). The `TVOn/TVOff` and `SRCOn/SRCOff` commands are CEC passthroughs to attached display/source devices, not switcher power.
- Source Device Control and Display Device Control require the attached devices to support CEC. HDMI Input 4 does NOT support CEC, so a source on input 4 cannot be controlled this way.
- Part number observed in SYSInfo response: `WUH4ARC-H2`.
- Source table typos: the response column for Fast Forward, Skip Forward/Backward, Menu, Back, OK, Exit, Up, Down, Left (and the send column for Unmute) are printed with the wrong `>>`/`<<` prefix in several rows. Send commands use the `>>` form throughout this spec; echo responses use `<<`.
- EDID is set via a 4-pin DIP switch, not via RS-232.

<!-- UNRESOLVED: RS-232 connector pinout not documented. flow_control not stated. EDID DIP-switch mapping not in excerpt. IR remote command set not in excerpt. Firmware version "V1.0.0" appears only inside a sample SYSInfo response, not as a documented compatibility range. -->
```

## Provenance

```yaml
source_domains:
  - tvone.com
source_urls:
  - https://tvone.com/filestore/Manuals-Other-Products/Manual-1T-SX-654.pdf
  - https://tvone.com/products/video-scalers-switchers-format-converters/1t-sx-654-1
retrieved_at: 2026-07-01T14:08:51.012Z
last_checked_at: 2026-07-07T12:47:41.372Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T12:47:41.372Z
matched_actions: 33
action_count: 33
confidence: medium
summary: "All 33 commands matched in source table. TVUNMUTE has documented typo (source shows << prefix instead of >> in send column); spec corrected per established >> pattern. Perfect 1:1 coverage, all transport values verified. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "EDID DIP-switch settings, IR remote codes, and full product part numbers not in source excerpt. Source device/display control requires CEC support on the attached devices."
- "flow control not stated in source"
- "no volume/level state exposed for the switcher itself (TVVOL± are CEC passthroughs)."
- "auto-switching source-change events not documented as explicit notifications."
- "source contains no explicit safety warnings, interlock procedures,"
- "RS-232 connector pinout not documented. flow_control not stated. EDID DIP-switch mapping not in excerpt. IR remote command set not in excerpt. Firmware version \"V1.0.0\" appears only inside a sample SYSInfo response, not as a documented compatibility range."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
