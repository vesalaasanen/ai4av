---
spec_id: admin/sunbritetv-sb-v-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sunbritetv SB-V Series Control Spec"
manufacturer: SunBrite
model_family: SB-V-43-4KHDR-BL
aliases: []
compatible_with:
  manufacturers:
    - SunBrite
    - Sunbritetv
  models:
    - SB-V-43-4KHDR-BL
    - SB-V-55-4KHDR-BL
    - SB-V-65-4KHDR-BL
    - SB-V-75-4KHDR-BL
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - snapav.com
  - weatherprooftelevisions.com
source_urls:
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/SunBrite/ManualsAndGuides/SunBriteTV_Codes_RS232.pdf
  - "https://www.weatherprooftelevisions.com/downloads/SunBriteTV-Veranda-Series-43-55-65-User's-Manual.pdf"
retrieved_at: 2026-06-08T19:07:45.123Z
last_checked_at: 2026-06-09T07:24:28.670Z
generated_at: 2026-06-09T07:24:28.670Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "dedicated IP/TCP command list for SB-V series not published. Veranda 3 (SB-V3) sibling has port 60028 CR-terminated ASCII commands but is explicitly NOT compatible with SB-V."
  - "source describes only discrete action opcodes, no continuous settable parameters"
  - "source does not document unsolicited notifications"
  - "source does not document multi-step sequences"
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements"
  - "dedicated IP/TCP command catalogue for SB-V series not found in source."
verification:
  verdict: verified
  checked_at: 2026-06-09T07:24:28.670Z
  matched_actions: 46
  action_count: 46
  confidence: medium
  summary: "All 46 spec actions matched verbatim to source hex codes with exact transport parameters. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-08
---

# Sunbritetv SB-V Series Control Spec

## Summary
Control spec for SunBriteTV SB-V (Veranda 2) outdoor TVs covering the manufacturer-published RS-232 command set. The product page mentions IP control over Ethernet, but the only first-party protocol document available is the RS-232 control codes table (no separate IP command list published for this generation).

<!-- UNRESOLVED: dedicated IP/TCP command list for SB-V series not published. Veranda 3 (SB-V3) sibling has port 60028 CR-terminated ASCII commands but is explicitly NOT compatible with SB-V. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # inferred: not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from power on/off/toggle commands
- routable        # inferred from input selection commands (Tuner/AV1/AV2/Component/HDMI/VGA)
- levelable       # inferred from Vol Up / Vol Down / Mute commands
- queryable       # inferred from ModelClassID, FirmwareVersion, PowerStatus queries
```

## Actions
```yaml
# Source: "RS 232 Control codes SunbriteTV" (Rev. 10/07/2016)
# Com Spec: 9600,8,1,n. Commands do not require Carriage Return or Line Feed.
# All commands prefixed with ESC (0x1B).

- id: model_class_id_query
  label: Model Class ID Query
  kind: query
  command: "1B 3F"  # [ESC]?
  params: []
  notes: "TV responds with [BXXXXXAHD-X.XX]"

- id: firmware_version_query
  label: Firmware Version Query
  kind: query
  command: "1B 2E"  # [ESC].
  params: []
  notes: "Response format: XXXXX-X.XX, then mainboard info, then version"

- id: power_status_query
  label: Power Status Query
  kind: query
  command: "1B 21"  # [ESC]!
  params: []
  notes: "Response: [PWRON] or [PWROFF]"

- id: power_toggle
  label: Power Toggle
  kind: action
  command: "1B 24"  # [ESC]$
  params: []
  notes: "Command received: [$]. Executed response: [PWR]"

- id: power_on
  label: Power On
  kind: action
  command: "1B 41"  # [ESC]A
  params: []
  notes: "Command received: [A]. Executed response: [PWRON]"

- id: power_off
  label: Power Off
  kind: action
  command: "1B 42"  # [ESC]B
  params: []
  notes: "Command received: [B]. Executed response: [PWROFF]"

- id: select_tuner
  label: Select Tuner Input
  kind: action
  command: "1B 43"  # [ESC]C
  params: []
  notes: "Command received: [C]. Executed response: [TN1]"

- id: select_composite_video_1
  label: Select Composite Video Input 1
  kind: action
  command: "1B 44"  # [ESC]D
  params: []
  notes: "Command received: [D]. Executed response: [AV1(CVBS)]"

- id: select_svideo_1
  label: Select S-Video Input 1
  kind: action
  command: "1B 45"  # [ESC]E
  params: []
  notes: "Command received: [E]. Executed response: [AV1(S-VIDEO)]"

- id: select_composite_video_2
  label: Select Composite Video Input 2
  kind: action
  command: "1B 46"  # [ESC]F
  params: []
  notes: "Command received: [F]. Executed response: [AV2(CVBS)]"

- id: select_svideo_2
  label: Select S-Video Input 2
  kind: action
  command: "1B 47"  # [ESC]G
  params: []
  notes: "Command received: [G]. Executed response: [AV2(S-VIDEO)]"

- id: select_component_1
  label: Select Component 1 Input
  kind: action
  command: "1B 48"  # [ESC]H
  params: []
  notes: "Command received: [H]. Executed response: [YpbPr1]"

- id: select_component_2
  label: Select Component 2 Input
  kind: action
  command: "1B 49"  # [ESC]I
  params: []
  notes: "Command received: [I]. Executed response: [YpbPr2]"

- id: select_hdmi_1
  label: Select HDMI Input 1
  kind: action
  command: "1B 4A"  # [ESC]J
  params: []
  notes: "Command received: [J]. Executed response: [HDMI1]"

- id: select_vga
  label: Select VGA Input
  kind: action
  command: "1B 4B"  # [ESC]K
  params: []
  notes: "Command received: [K]. Executed response: [VGA]"

- id: select_hdmi_2
  label: Select HDMI Input 2
  kind: action
  command: "1B 4C"  # [ESC]L
  params: []
  notes: "Command received: [L]. Executed response: [HDMI2]"

- id: mute
  label: Mute
  kind: action
  command: "1B 58"  # [ESC]X
  params: []
  notes: "Command received: [X]. Executed response: [MUTE]"

- id: volume_up
  label: Volume Up
  kind: action
  command: "1B 59"  # [ESC]Y
  params: []
  notes: "Command received: [Y]. Executed response: [VOL+]"

- id: volume_down
  label: Volume Down
  kind: action
  command: "1B 5A"  # [ESC]Z
  params: []
  notes: "Command received: [Z]. Executed response: [VOL-]"

- id: channel_up
  label: Channel Up
  kind: action
  command: "1B 56"  # [ESC]V
  params: []
  notes: "Command received: [V]. Executed response: [CH+]"

- id: channel_down
  label: Channel Down
  kind: action
  command: "1B 57"  # [ESC]W
  params: []
  notes: "Command received: [W]. Executed response: [CH-]"

- id: digit_1
  label: Digit 1
  kind: action
  command: "1B 31"  # [ESC]1
  params: []
  notes: "Command received: [1]"

- id: digit_2
  label: Digit 2
  kind: action
  command: "1B 32"  # [ESC]2
  params: []
  notes: "Command received: [2]"

- id: digit_3
  label: Digit 3
  kind: action
  command: "1B 33"  # [ESC]3
  params: []
  notes: "Command received: [3]"

- id: digit_4
  label: Digit 4
  kind: action
  command: "1B 34"  # [ESC]4
  params: []
  notes: "Command received: [4]"

- id: digit_5
  label: Digit 5
  kind: action
  command: "1B 35"  # [ESC]5
  params: []
  notes: "Command received: [5]"

- id: digit_6
  label: Digit 6
  kind: action
  command: "1B 36"  # [ESC]6
  params: []
  notes: "Command received: [6]"

- id: digit_7
  label: Digit 7
  kind: action
  command: "1B 37"  # [ESC]7
  params: []
  notes: "Command received: [7]"

- id: digit_8
  label: Digit 8
  kind: action
  command: "1B 38"  # [ESC]8
  params: []
  notes: "Command received: [8]"

- id: digit_9
  label: Digit 9
  kind: action
  command: "1B 39"  # [ESC]9
  params: []
  notes: "Command received: [9]"

- id: digit_0
  label: Digit 0
  kind: action
  command: "1B 30"  # [ESC]0
  params: []
  notes: "Command received: [0]"

- id: dash
  label: Dash (-)
  kind: action
  command: "1B 2D"  # [ESC]-
  params: []
  notes: "Command received: [-]"

- id: channel_return
  label: Channel Return (Previous Channel)
  kind: action
  command: "1B 72"  # [ESC]r
  params: []
  notes: "Command received: [r]"

- id: source_toggle
  label: Source Toggle
  kind: action
  command: "1B 62"  # [ESC]b
  params: []
  notes: "Command received: [SRC]"

- id: aspect
  label: Aspect
  kind: action
  command: "1B 61"  # [ESC]a
  params: []
  notes: "Command received: [ASPECT]"

- id: enter
  label: Enter
  kind: action
  command: "1B 65"  # [ESC]e
  params: []
  notes: "Command received: [ENTER]"

- id: info
  label: Info
  kind: action
  command: "1B 69"  # [ESC]i
  params: []
  notes: "Command received: [INFO]"

- id: cc
  label: CC (Closed Caption)
  kind: action
  command: "1B 63"  # [ESC]c
  params: []
  notes: "Command received: [CC]"

- id: sleep
  label: Sleep
  kind: action
  command: "1B 7A"  # [ESC]z
  params: []
  notes: "Command received: [SLEEP]"

- id: picture
  label: Picture
  kind: action
  command: "1B 70"  # [ESC]p
  params: []
  notes: "Command received: [PICT]"

- id: sound
  label: Sound
  kind: action
  command: "1B 73"  # [ESC]s
  params: []
  notes: "Command received: [SND]"

- id: menu
  label: Menu
  kind: action
  command: "1B 6D"  # [ESC]m
  params: []
  notes: "Command received: [MENU]"

- id: up_arrow
  label: Up Arrow
  kind: action
  command: "1B 5E"  # [ESC]^
  params: []
  notes: "Command received: [^]"

- id: down_arrow
  label: Down Arrow
  kind: action
  command: "1B 76"  # [ESC]v
  params: []
  notes: "Command received: [v]"

- id: left_arrow
  label: Left Arrow
  kind: action
  command: "1B 3E"  # [ESC]>
  params: []
  notes: "Command received: [<]"

- id: right_arrow
  label: Right Arrow
  kind: action
  command: "1B 3C"  # [ESC]<
  params: []
  notes: "Command received: [>]"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
  source: "Response to Power Status query [ESC]! : [PWRON] or [PWROFF]"

- id: model_class_id
  type: string
  source: "Response to [ESC]? : [BXXXXXAHD-X.XX]"

- id: firmware_version
  type: string
  source: "Response to [ESC]. : XXXXX-X.XX (then mainboard id, then version)"

- id: current_input
  type: enum
  values: [TN1, AV1_CVBS, AV1_SVIDEO, AV2_CVBS, AV2_SVIDEO, YpbPr1, YpbPr2, HDMI1, VGA, HDMI2]
  source: "Inferred from executed response tokens on input select commands"
```

## Variables
```yaml
# UNRESOLVED: source describes only discrete action opcodes, no continuous settable parameters
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements
```

## Notes
- All commands prefixed with ESC (0x1B). Per source, commands do NOT require Carriage Return or Line Feed.
- Com spec: 9600 baud, 8 data bits, 1 stop bit, no parity.
- Source document title is "RS 232 Control codes SunbriteTV" (Rev. 10/07/2016). Origin: https://www.manualslib.com/manual/734396/Sunbritetv-3220hd.html (Appendix B style table, applied across SB-V series chassis).
- Operator's manual for SB-V-43/55/65/75-4KHDR exists at Google Drive ID `1kXj3SCfQNm5uZ4312XGMpXyZve7kczNT` (54 pages) but does not enumerate the IP control command set.
- Veranda 3 (SB-V3) IP control exists on TCP port 60028 with CR-terminated ASCII commands, but SunBriteTV explicitly states those commands are NOT compatible with SB-V — do not apply here.
- Source product page lists "ETHERNET (RJ 45 for IP Control)" as a control input, but the command set for IP control of SB-V is not published in the first-party manual reviewed.

<!-- UNRESOLVED: dedicated IP/TCP command catalogue for SB-V series not found in source. -->

## Provenance

```yaml
source_domains:
  - snapav.com
  - weatherprooftelevisions.com
source_urls:
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/SunBrite/ManualsAndGuides/SunBriteTV_Codes_RS232.pdf
  - "https://www.weatherprooftelevisions.com/downloads/SunBriteTV-Veranda-Series-43-55-65-User's-Manual.pdf"
retrieved_at: 2026-06-08T19:07:45.123Z
last_checked_at: 2026-06-09T07:24:28.670Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T07:24:28.670Z
matched_actions: 46
action_count: 46
confidence: medium
summary: "All 46 spec actions matched verbatim to source hex codes with exact transport parameters. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "dedicated IP/TCP command list for SB-V series not published. Veranda 3 (SB-V3) sibling has port 60028 CR-terminated ASCII commands but is explicitly NOT compatible with SB-V."
- "source describes only discrete action opcodes, no continuous settable parameters"
- "source does not document unsolicited notifications"
- "source does not document multi-step sequences"
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements"
- "dedicated IP/TCP command catalogue for SB-V series not found in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
