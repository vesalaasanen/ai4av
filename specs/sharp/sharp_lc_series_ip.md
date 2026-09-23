---
spec_id: admin/sharp-lc-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp LC Series Control Spec"
manufacturer: Sharp
model_family: "Sharp LC Series"
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - "Sharp LC Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.sharpusa.com
source_urls:
  - https://files.sharpusa.com/Downloads/ForHome/HomeEntertainment/LCDTVs/Manuals/tel_man_LC40_46_52_60LE830U.pdf
retrieved_at: 2026-09-02T19:53:09.731Z
last_checked_at: 2026-09-19T22:17:24.776Z
generated_at: 2026-09-19T22:17:24.776Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "power consumption figures, exact port number (TV menu-set), firmware version compatibility"
  - "control port number is set on the TV menu, not stated in source"
  - "source states ID/password MAY be set on TV menu (\"When you set your ID and password...\"), not confirmed absent"
  - "settable parameters are exposed as discrete Actions in the source,"
  - "source does not document unsolicited notifications from the TV."
  - "source does not document multi-step macro sequences."
  - "source contains no safety warnings, interlock procedures, or"
verification:
  verdict: verified
  checked_at: 2026-09-19T22:17:24.776Z
  matched_actions: 41
  action_count: 41
  confidence: medium
  summary: "All 41 spec actions match the command table; serial transport (9600/8/N/1/none) verbatim; spec covers the full command catalogue. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Sharp LC Series Control Spec

## Summary
Sharp LC Series TV. RS-232C and IP (TCP/IP) PC control. ASCII command/response protocol with 4-digit command + 4-digit parameter + CR return. Covers power, input, volume, channel, view mode, and model identification.

<!-- UNRESOLVED: power consumption figures, exact port number (TV menu-set), firmware version compatibility -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: null  # UNRESOLVED: control port number is set on the TV menu, not stated in source
auth:
  type: none  # UNRESOLVED: source states ID/password MAY be set on TV menu ("When you set your ID and password..."), not confirmed absent
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
```

## Traits
```yaml
- powerable   # inferred from RSPW/POWR commands
- routable    # inferred from ITGD/ITVD/IAVD input selection commands
- queryable   # inferred from RSPW?/TVNM/MNRD/SWVN/IPPV commands
- levelable   # inferred from VOLM volume command
```

## Actions
```yaml
- id: power_on_command_setting_rs232c
  label: Power On (RS-232C)
  kind: action
  command: "RSPW 1___"   # RSPW + space + 1 + 3 spaces
  params: []
- id: power_on_command_setting_ip
  label: Power On (IP)
  kind: action
  command: "RSPW 2___"
  params: []
- id: power_on_command_setting_off
  label: Power On Reject
  kind: action
  command: "RSPW 0___"
  params: []
- id: power_on_command_setting_query
  label: Power On Command Setting Query
  kind: query
  command: "RSPW ?___"
  params: []
- id: power_setting_off
  label: Power Off
  kind: action
  command: "POWR 0___"
  params: []
- id: power_setting_on
  label: Power On
  kind: action
  command: "POWR 1___"
  params: []
- id: power_setting_query
  label: Power State Query
  kind: query
  command: "POWR ?___"
  params: []
- id: input_toggle
  label: Input Toggle
  kind: action
  command: "ITGD x___"
  params:
    - name: x
      type: string
      description: Any digit (placeholder)
- id: input_select_tv
  label: Input Select TV
  kind: action
  command: "ITVD 0___"
  params: []
- id: input_select_av
  label: Input Select (HDMI/COMP/VIDEO)
  kind: action
  command: "IAVD *___"
  params:
    - name: input
      type: integer
      description: 1: HDMI 1, 2: HDMI 2, 3: HDMI 3, 4: HDMI 4, 5: COMPONENT, 6: VIDEO 1, 7: VIDEO 2
- id: av_mode_select
  label: AV Mode Select
  kind: action
  command: "AVMD *___"
  params:
    - name: mode
      type: integer
      description: 0: Toggle, 1: STANDARD, 2: MOVIE, 3: GAME, 4: USER, 5: DYNAMIC (Fixed), 6: DYNAMIC, 7: PC, 8: x.v.Color, 100: AUTO
- id: av_mode_query
  label: AV Mode Query
  kind: query
  command: "AVMD ?___"
  params: []
- id: volume_set
  label: Volume Set
  kind: action
  command: "VOLM **__"
  params:
    - name: level
      type: integer
      description: Volume 0-60 (left-aligned, padded with spaces)
- id: volume_query
  label: Volume Query
  kind: query
  command: "VOLM ?___"
  params: []
- id: hposition_set
  label: H-Position Set
  kind: action
  command: "HPOS ***_"
  params:
    - name: position
      type: integer
      description: Horizontal screen position (range depends on View Mode/signal)
- id: vposition_set
  label: V-Position Set
  kind: action
  command: "VPOS ***_"
  params:
    - name: position
      type: integer
      description: Vertical screen position (range depends on View Mode/signal)
- id: clock_set
  label: Clock Set (PC mode)
  kind: action
  command: "CLCK ***_"
  params:
    - name: value
      type: integer
      description: 0-180, PC mode only
- id: phase_set
  label: Phase Set (PC mode)
  kind: action
  command: "PHSE ***_"
  params:
    - name: value
      type: integer
      description: 0-40, PC mode only
- id: view_mode_set
  label: View Mode Set
  kind: action
  command: "WIDE *___"
  params:
    - name: mode
      type: integer
      description: 0: Toggle [AV], 1: Side Bar [AV], 2: S.Stretch [AV], 3: Zoom [AV], 4: Stretch [AV], 5: Normal [PC], 6: Zoom [PC], 7: Stretch [PC], 8: Dot by Dot [PC][AV], 9: Full Screen [AV], 10: Auto [USB-Video/DLNA-Video/Internet apps], 11: Original [USB-Video/DLNA-Video/Internet apps]
- id: view_mode_query
  label: View Mode Query
  kind: query
  command: "WIDE ?___"
  params: []
- id: mute_set
  label: Mute Set
  kind: action
  command: "MUTE *___"
  params:
    - name: state
      type: integer
      description: 0: Toggle, 1: On, 2: Off
- id: mute_query
  label: Mute Query
  kind: query
  command: "MUTE ?___"
  params: []
- id: surround_set
  label: Surround Set
  kind: action
  command: "ACSU *___"
  params:
    - name: state
      type: integer
      description: 0: Toggle, 1: On, 2: Off
- id: surround_query
  label: Surround Query
  kind: query
  command: "ACSU ?___"
  params: []
- id: audio_selection_toggle
  label: Audio Selection Toggle
  kind: action
  command: "ACHA x___"
  params:
    - name: x
      type: string
      description: Any digit (placeholder)
- id: sleep_timer_set
  label: Sleep Timer Set
  kind: action
  command: "OFTM *___"
  params:
    - name: timer
      type: integer
      description: 0: Off, 1: 30 MIN, 2: 60 MIN, 3: 90 MIN, 4: 120 MIN
- id: sleep_timer_query
  label: Sleep Timer Query
  kind: query
  command: "OFTM ?___"
  params: []
- id: channel_analog_direct
  label: Direct Analog Channel
  kind: action
  command: "DCCH ***_"
  params:
    - name: channel
      type: integer
      description: Analog channel 1-135 (Air: 2-69 effective; Cable: 1-135 effective)
- id: channel_digital_air_direct
  label: Direct Digital Air Channel
  kind: action
  command: "DA2P ****"
  params:
    - name: channel
      type: string
      description: Digital Air two-part channel 0100-9999
- id: channel_digital_cable_major
  label: Direct Digital Cable Major Channel
  kind: action
  command: "DC2U ***_"
  params:
    - name: channel
      type: integer
      description: Digital Cable major channel 1-999
- id: channel_digital_cable_minor
  label: Direct Digital Cable Minor Channel
  kind: action
  command: "DC2L ***_"
  params:
    - name: channel
      type: integer
      description: Digital Cable minor channel 0-999
- id: channel_digital_cable_1part_under_10k
  label: Direct Digital Cable 1-Part Channel (<10000)
  kind: action
  command: "DC10 ****"
  params:
    - name: channel
      type: integer
      description: Digital Cable one-part channel 0-9999
- id: channel_digital_cable_1part_over_10k
  label: Direct Digital Cable 1-Part Channel (>=10000)
  kind: action
  command: "DC11 ****"
  params:
    - name: channel
      type: integer
      description: Digital Cable one-part channel 0-6383 (>=10000)
- id: channel_up
  label: Channel Up
  kind: action
  command: "CHUP x___"
  params:
    - name: x
      type: string
      description: Any digit (placeholder)
- id: channel_down
  label: Channel Down
  kind: action
  command: "CHDW x___"
  params:
    - name: x
      type: string
      description: Any digit (placeholder)
- id: closed_caption_toggle
  label: Closed Caption Toggle
  kind: action
  command: "CLCP x___"
  params:
    - name: x
      type: string
      description: Any digit (placeholder)
- id: closed_caption_query
  label: Closed Caption Query
  kind: query
  command: "CLCP ?___"
  params: []
- id: device_name_query
  label: Device Name Query
  kind: query
  command: "TVNM 1___"
  params: []
- id: model_name_query
  label: Model Name Query
  kind: query
  command: "MNRD 1___"
  params: []
- id: software_version_query
  label: Software Version Query
  kind: query
  command: "SWVN 1___"
  params: []
- id: ip_protocol_version_query
  label: IP Protocol Version Query
  kind: query
  command: "IPPV 1___"
  params: []
```

## Feedbacks
```yaml
# Response codes documented in source:
#   "OK" + CR  (0DH) - normal response
#   "ERR" + CR (0DH) - problem response (communication error or incorrect command)

- id: response_normal
  type: string
  values: ["OK"]
- id: response_error
  type: string
  values: ["ERR"]
```

## Variables
```yaml
# UNRESOLVED: settable parameters are exposed as discrete Actions in the source,
# not as free-form variables. No standalone Variables block documented.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications from the TV.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements beyond the RSPW2 standby-mode note.
```

## Notes
Command format: 8 ASCII bytes total = C1 C2 C3 C4 (4-char command) + P1 P2 P3 P4 (4-char parameter, left-aligned, padded with blanks). Terminated by CR (0DH).

Do NOT send multiple commands simultaneously. Wait for "OK" response before sending next. Connection auto-disconnects after 3 minutes of no IP communication.

"x" in parameter column means any digit; "_" means a literal space; "*" means a value from the documented range.

For IP: Service must be set to None (not Telnet or SSH). ID/password may be required if configured on TV menu.

RSPW (Power On Command Setting) parameter 2 keeps the command in waiting status when TV is in standby — power consumption similar to usual, and the Center Icon Illumination on the TV front lights up while commands are queued.

## Provenance

```yaml
source_domains:
  - files.sharpusa.com
source_urls:
  - https://files.sharpusa.com/Downloads/ForHome/HomeEntertainment/LCDTVs/Manuals/tel_man_LC40_46_52_60LE830U.pdf
retrieved_at: 2026-09-02T19:53:09.731Z
last_checked_at: 2026-09-19T22:17:24.776Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-19T22:17:24.776Z
matched_actions: 41
action_count: 41
confidence: medium
summary: "All 41 spec actions match the command table; serial transport (9600/8/N/1/none) verbatim; spec covers the full command catalogue. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "power consumption figures, exact port number (TV menu-set), firmware version compatibility"
- "control port number is set on the TV menu, not stated in source"
- "source states ID/password MAY be set on TV menu (\"When you set your ID and password...\"), not confirmed absent"
- "settable parameters are exposed as discrete Actions in the source,"
- "source does not document unsolicited notifications from the TV."
- "source does not document multi-step macro sequences."
- "source contains no safety warnings, interlock procedures, or"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
