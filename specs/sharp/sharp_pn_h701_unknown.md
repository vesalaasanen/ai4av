---
spec_id: admin/sharp-pn-h701
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp PN-H701 Control Spec"
manufacturer: Sharp
model_family: PN-H701
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - PN-H701
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - business.sharpusa.com
source_urls:
  - https://business.sharpusa.com/Portals/0/downloads/Manuals/PN_H701_Operation_Manual.pdf
  - https://business.sharpusa.com
retrieved_at: 2026-08-11T01:01:51.667Z
last_checked_at: 2026-08-19T09:45:35.124Z
generated_at: 2026-08-19T09:45:35.124Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "LAN port number, login ID procedure not fully detailed in source."
  - "no additional settable parameters beyond what Actions cover."
  - "source does not document unsolicited notifications."
  - "source does not document multi-step macro sequences."
  - "source notes button control lock feature but no explicit safety interlock procedures."
  - "LAN protocol details, IP control login procedure, firmware version compatibility."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:45:35.124Z
  matched_actions: 57
  action_count: 57
  confidence: medium
  summary: "All 57 spec actions match distinct source mnemonics (POWR/ITGD/IAVD/AVMD/VLMP/CONT/BLVL/TINT/COLR/SHRP/SBAL/LANG/OFTM/HPOS/VPOS/CLCK/PHSE/NOPO/NSPO/ALCK); transport values verbatim. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-11
---

# Sharp PN-H701 Control Spec

## Summary
RS-232C / LAN control spec for Sharp PN-H701 monitor. PC controls monitor via RS-232C or LAN (not simultaneously). ASCII command protocol, 4-char command + 4-char parameter, terminated by CR/LF.

<!-- UNRESOLVED: LAN port number, login ID procedure not fully detailed in source. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure described in source
```

## Traits
```yaml
- powerable  # inferred from POWR command
- routable   # inferred from ITGD/IAVD input selection
- queryable  # inferred from R-direction commands
- levelable  # inferred from VOLM and audio controls
```

## Actions
```yaml
- id: power_control
  label: Power Control
  kind: action
  command: "POWR{0|1}"
  params:
    - name: state
      type: integer
      description: 0 = standby, 1 = power on

- id: power_status_query
  label: Power Status Query
  kind: query
  command: "POWR????"
  params: []

- id: input_mode_toggle
  label: Input Mode Toggle
  kind: action
  command: "ITGD0000"
  params: []

- id: input_select_hdmi1
  label: Select HDMI1
  kind: action
  command: "IAVD0001"
  params: []

- id: input_select_hdmi2
  label: Select HDMI2
  kind: action
  command: "IAVD0002"
  params: []

- id: input_select_hdmi3
  label: Select HDMI3
  kind: action
  command: "IAVD0003"
  params: []

- id: input_select_hdmi4
  label: Select HDMI4
  kind: action
  command: "IAVD0004"
  params: []

- id: input_select_dsub
  label: Select D-SUB
  kind: action
  command: "IAVD0005"
  params: []

- id: input_select_multimedia
  label: Select MULTIMEDIA (USB/Internal)
  kind: action
  command: "IAVD0006"
  params: []

- id: input_status_query
  label: Input Status Query
  kind: query
  command: "IAVD????"

- id: picture_mode_toggle
  label: Picture Mode Toggle
  kind: action
  command: "AVMD0000"

- id: picture_mode_av
  label: Picture Mode AV
  kind: action
  command: "AVMD0001"

- id: picture_mode_movie
  label: Picture Mode MOVIE
  kind: action
  command: "AVMD0002"

- id: picture_mode_game
  label: Picture Mode GAME
  kind: action
  command: "AVMD0003"

- id: picture_mode_dynamic
  label: Picture Mode DYNAMIC
  kind: action
  command: "AVMD0006"

- id: picture_mode_pc
  label: Picture Mode PC
  kind: action
  command: "AVMD0007"

- id: picture_mode_srgb
  label: Picture Mode sRGB
  kind: action
  command: "AVMD0009"

- id: picture_mode_photo
  label: Picture Mode PHOTO
  kind: action
  command: "AVMD0011"

- id: picture_mode_high_resolution
  label: Picture Mode HIGH RESOLUTION
  kind: action
  command: "AVMD0020"

- id: picture_mode_query
  label: Picture Mode Query
  kind: query
  command: "AVMD????"

- id: bright_set
  label: Brightness Set
  kind: action
  command: "VLMP{value}"
  params:
    - name: value
      type: integer
      description: -16 to 16

- id: bright_query
  label: Brightness Query
  kind: query
  command: "VLMP????"

- id: contrast_set
  label: Contrast Set
  kind: action
  command: "CONT{value}"
  params:
    - name: value
      type: integer
      description: 0 to 40

- id: contrast_query
  label: Contrast Query
  kind: query
  command: "CONT????"

- id: black_level_set
  label: Black Level Set
  kind: action
  command: "BLVL{value}"
  params:
    - name: value
      type: integer
      description: -30 to 30 (3-digit format)

- id: black_level_query
  label: Black Level Query
  kind: query
  command: "BLVL????"

- id: tint_set
  label: Tint Set
  kind: action
  command: "TINT{value}"
  params:
    - name: value
      type: integer
      description: -30 to 30

- id: tint_query
  label: Tint Query
  kind: query
  command: "TINT????"

- id: colors_set
  label: Colors Set
  kind: action
  command: "COLR{value}"
  params:
    - name: value
      type: integer
      description: -30 to 30

- id: colors_query
  label: Colors Query
  kind: query
  command: "COLR????"

- id: sharpness_set
  label: Sharpness Set
  kind: action
  command: "SHRP{value}"
  params:
    - name: value
      type: integer
      description: 0 to 20

- id: sharpness_query
  label: Sharpness Query
  kind: query
  command: "SHRP????"

- id: balance_set
  label: Balance Set
  kind: action
  command: "SBAL{value}"
  params:
    - name: value
      type: integer
      description: -30 (L) to 30 (R)

- id: balance_query
  label: Balance Query
  kind: query
  command: "SBAL????"

- id: language_english
  label: Language ENGLISH
  kind: action
  command: "LANG0014"

- id: language_deutsch
  label: Language DEUTSCH
  kind: action
  command: "LANG0001"

- id: language_francais
  label: Language FRANÇAIS
  kind: action
  command: "LANG0002"

- id: language_italiano
  label: Language ITALIANO
  kind: action
  command: "LANG0003"

- id: language_espanol
  label: Language ESPAÑOL
  kind: action
  command: "LANG0004"

- id: language_russian
  label: Language РУССКИЙ
  kind: action
  command: "LANG0005"

- id: language_query
  label: Language Query
  kind: query
  command: "LANG????"

- id: sleep_timer_cancel
  label: Sleep Timer Cancel
  kind: action
  command: "OFTM0000"

- id: sleep_timer_set
  label: Sleep Timer Set (hours)
  kind: action
  command: "OFTM{hours}"
  params:
    - name: hours
      type: integer
      description: 1 to 23

- id: sleep_timer_query
  label: Sleep Timer Query
  kind: query
  command: "OFTM????"

- id: hpos_set
  label: Horizontal Position Set
  kind: action
  command: "HPOS{value}"
  params:
    - name: value
      type: integer
      description: -88 to 90 (varies by signal)

- id: hpos_query
  label: Horizontal Position Query
  kind: query
  command: "HPOS????"

- id: vpos_set
  label: Vertical Position Set
  kind: action
  command: "VPOS{value}"
  params:
    - name: value
      type: integer
      description: -26 to 36 (varies by signal)

- id: vpos_query
  label: Vertical Position Query
  kind: query
  command: "VPOS????"

- id: clock_set
  label: Clock Set
  kind: action
  command: "CLCK{value}"
  params:
    - name: value
      type: integer
      description: -90 to 90

- id: clock_query
  label: Clock Query
  kind: query
  command: "CLCK????"

- id: phase_set
  label: Phase Set
  kind: action
  command: "PHSE{value}"
  params:
    - name: value
      type: integer
      description: -20 to 20

- id: phase_query
  label: Phase Query
  kind: query
  command: "PHSE????"

- id: off_if_no_operation_set
  label: Off If No Operation Set
  kind: action
  command: "NOPO{value}"
  params:
    - name: value
      type: integer
      description: 0 = OFF, 1 = ON

- id: off_if_no_operation_query
  label: Off If No Operation Query
  kind: query
  command: "NOPO????"

- id: off_if_no_signal_set
  label: Off If No Signal Set
  kind: action
  command: "NSPO{value}"
  params:
    - name: value
      type: integer
      description: 0 = OFF, 1 = ON

- id: off_if_no_signal_query
  label: Off If No Signal Query
  kind: query
  command: "NSPO????"

- id: button_control_lock_set
  label: Button Control Lock Set
  kind: action
  command: "ALCK{lock}"
  params:
    - name: lock
      type: string
      description: "4-digit ABCD code: A=power (0/1/2/3), B=RC lock (0/1), C=monitor lock (0/1), D=unused"
```

## Feedbacks
```yaml
- id: ok_response
  type: string
  values: ["OK"]

- id: err_response
  type: string
  values: ["ERR"]

- id: power_state
  type: enum
  values: [standby, on]

- id: input_mode
  type: enum
  values: [hdmi1, hdmi2, hdmi3, hdmi4, dsub, multimedia]

- id: picture_mode
  type: enum
  values: [av, movie, game, dynamic, pc, srgb, photo, high_resolution]
```

## Variables
```yaml
# Discrete parameter ranges, all expressed as Actions above.
# UNRESOLVED: no additional settable parameters beyond what Actions cover.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source notes button control lock feature but no explicit safety interlock procedures.
```

## Notes
- RS-232C and LAN cannot be used simultaneously (per source).
- In standby, only POWER CONTROL accepted.
- LOW POWER standby mode disables LAN control.
- Parameter field always 4 chars, pad with spaces; negative values use 3-digit format (e.g. `BLVL-005`).
- Response: `OK` on success, `ERR` on bad command/state. Timeout 10s; ≥100ms interval between commands.
- LAN port and login ID procedure referenced but not detailed in this excerpt.

<!-- UNRESOLVED: LAN protocol details, IP control login procedure, firmware version compatibility. -->

## Provenance

```yaml
source_domains:
  - business.sharpusa.com
source_urls:
  - https://business.sharpusa.com/Portals/0/downloads/Manuals/PN_H701_Operation_Manual.pdf
  - https://business.sharpusa.com
retrieved_at: 2026-08-11T01:01:51.667Z
last_checked_at: 2026-08-19T09:45:35.124Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:45:35.124Z
matched_actions: 57
action_count: 57
confidence: medium
summary: "All 57 spec actions match distinct source mnemonics (POWR/ITGD/IAVD/AVMD/VLMP/CONT/BLVL/TINT/COLR/SHRP/SBAL/LANG/OFTM/HPOS/VPOS/CLCK/PHSE/NOPO/NSPO/ALCK); transport values verbatim. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "LAN port number, login ID procedure not fully detailed in source."
- "no additional settable parameters beyond what Actions cover."
- "source does not document unsolicited notifications."
- "source does not document multi-step macro sequences."
- "source notes button control lock feature but no explicit safety interlock procedures."
- "LAN protocol details, IP control login procedure, firmware version compatibility."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
