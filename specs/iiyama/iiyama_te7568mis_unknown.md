---
spec_id: admin/iiyama-te7568mis
schema_version: ai4av-public-spec-v1
revision: 1
title: "Iiyama TE7568MIS Control Spec"
manufacturer: Iiyama
model_family: TE7568MIS
aliases: []
compatible_with:
  manufacturers:
    - Iiyama
  models:
    - TE7568MIS
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - iiyama.com
source_urls:
  - https://iiyama.com/f/3b30cd7d6a4bc40e1d229c327cda4d35_texx68-rs232-protocol-v1-0-2.pdf
  - https://iiyama.com/f/e814fb38675840f086adb2ecd13f84e8_te7568mis-usermanual-e-revf.pdf
  - https://iiyama.com/pdf/Product/552/gb_en.pdf
retrieved_at: 2026-05-13T05:27:13.010Z
last_checked_at: 2026-06-02T02:29:32.395Z
generated_at: 2026-06-02T02:29:32.395Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no firmware version range, no query for aspect ratio, no TV-channel commands beyond the volume-template example"
  - "no settable parameters beyond the discrete actions above"
  - "no unsolicited notifications documented in source"
  - "no multi-step sequences documented in source"
  - "no safety warnings, interlock procedures, or power-on sequencing requirements stated in source"
  - "aspect-ratio status query, TV-channel commands, firmware version range, and any device-side retry/timeout behavior not documented in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T02:29:32.395Z
  matched_actions: 69
  action_count: 69
  confidence: medium
  summary: "All 69 spec actions matched verbatim against source command table; transport parameters verified; comprehensive protocol coverage. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Iiyama TE7568MIS Control Spec

## Summary
RS-232 control spec for Iiyama TE7568MIS interactive intelligent panel (LED LCD). Covers power, source select, volume/mute, aspect ratio, and remote-control key forwarding. Transport is serial, 9600 8N1, no flow control. Frame format: `AA BB CC <Main> <Sub> <Len=00> <Checksum> DD EE FF` where checksum = sum of bytes 4–6.

<!-- UNRESOLVED: no firmware version range, no query for aspect ratio, no TV-channel commands beyond the volume-template example -->

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
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred from power on/off commands
- routable     # inferred from source-select commands
- queryable    # inferred from polling/status query commands
- levelable    # inferred from volume set command
```

## Actions
```yaml
# Frame format: AA BB CC <Main> <Sub> 00 <Checksum> DD EE FF
# Checksum = sum of Main + Sub + Length (byte 4 + 5 + 6)

- id: power_on
  label: Power On
  kind: action
  command: "AA BB CC 01 00 00 01 DD EE FF"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "AA BB CC 01 01 00 02 DD EE FF"
  params: []

- id: power_status_query
  label: Power Status Query
  kind: query
  command: "AA BB CC 01 02 00 03 DD EE FF"
  params: []

- id: select_input_av
  label: Select Input AV (CVBS)
  kind: action
  command: "AA BB CC 02 02 00 04 DD EE FF"
  params: []

- id: select_input_vga1
  label: Select Input VGA1
  kind: action
  command: "AA BB CC 02 03 00 05 DD EE FF"
  params: []

- id: select_input_hdmi1
  label: Select Input HDMI1
  kind: action
  command: "AA BB CC 02 06 00 08 DD EE FF"
  params: []

- id: select_input_hdmi2
  label: Select Input HDMI2
  kind: action
  command: "AA BB CC 02 07 00 09 DD EE FF"
  params: []

- id: select_input_hdmi3
  label: Select Input HDMI3
  kind: action
  command: "AA BB CC 02 05 00 07 DD EE FF"
  params: []

- id: select_input_android
  label: Select Input Android
  kind: action
  command: "AA BB CC 02 0A 00 0C DD EE FF"
  params: []

- id: select_input_dp
  label: Select Input DP
  kind: action
  command: "AA BB CC 02 11 00 13 DD EE FF"
  params: []

- id: source_status_query
  label: Source Status Query
  kind: query
  command: "AA BB CC 02 00 00 02 DD EE FF"
  params: []

- id: set_volume
  label: Set Volume
  kind: action
  command: "AA BB CC 03 00 {level_hex} {checksum} DD EE FF"  # level 0-100 decimal = xx hex; checksum = 03 + 00 + xx
  params:
    - name: level
      type: integer
      description: Volume level 0-100 (decimal). Encode as single hex byte (xx); checksum = 0x03 + 0x00 + xx

- id: mute
  label: Mute
  kind: action
  command: "AA BB CC 03 01 00 04 DD EE FF"
  params: []

- id: unmute
  label: Unmute
  kind: action
  command: "AA BB CC 03 01 01 05 DD EE FF"
  params: []

- id: volume_status_query
  label: Volume Status Query
  kind: query
  command: "AA BB CC 03 02 00 05 DD EE FF"
  params: []

- id: mute_status_query
  label: Mute Status Query
  kind: query
  command: "AA BB CC 03 03 00 06 DD EE FF"
  params: []

- id: set_aspect_16_9
  label: Aspect Ratio 16:9
  kind: action
  command: "AA BB CC 08 00 00 08 DD EE FF"
  params: []

- id: set_aspect_4_3
  label: Aspect Ratio 4:3
  kind: action
  command: "AA BB CC 08 01 00 09 DD EE FF"
  params: []

- id: set_aspect_ptp
  label: Aspect Ratio PTP (Pixel-to-Pixel)
  kind: action
  command: "AA BB CC 08 07 00 0F DD EE FF"
  params: []

- id: rc_win
  label: Remote Control WIN
  kind: action
  command: "AA BB CC 07 0B 00 12 DD EE FF"
  params: []

- id: rc_space
  label: Remote Control Space
  kind: action
  command: "AA BB CC 07 46 00 4D DD EE FF"
  params: []

- id: rc_alt_tab
  label: Remote Control Alt+Tab
  kind: action
  command: "AA BB CC 07 1D 00 24 DD EE FF"
  params: []

- id: rc_alt_f4
  label: Remote Control Alt+F4
  kind: action
  command: "AA BB CC 07 1F 00 26 DD EE FF"
  params: []

- id: rc_num_1
  label: Remote Control NUM_1
  kind: action
  command: "AA BB CC 07 00 00 07 DD EE FF"
  params: []

- id: rc_num_2
  label: Remote Control NUM_2
  kind: action
  command: "AA BB CC 07 10 00 17 DD EE FF"
  params: []

- id: rc_num_3
  label: Remote Control NUM_3
  kind: action
  command: "AA BB CC 07 11 00 18 DD EE FF"
  params: []

- id: rc_num_4
  label: Remote Control NUM_4
  kind: action
  command: "AA BB CC 07 13 00 1A DD EE FF"
  params: []

- id: rc_num_5
  label: Remote Control NUM_5
  kind: action
  command: "AA BB CC 07 14 00 1B DD EE FF"
  params: []

- id: rc_num_6
  label: Remote Control NUM_6
  kind: action
  command: "AA BB CC 07 15 00 1C DD EE FF"
  params: []

- id: rc_num_7
  label: Remote Control NUM_7
  kind: action
  command: "AA BB CC 07 17 00 1E DD EE FF"
  params: []

- id: rc_num_8
  label: Remote Control NUM_8
  kind: action
  command: "AA BB CC 07 18 00 1F DD EE FF"
  params: []

- id: rc_num_9
  label: Remote Control NUM_9
  kind: action
  command: "AA BB CC 07 19 00 20 DD EE FF"
  params: []

- id: rc_num_0
  label: Remote Control NUM_0
  kind: action
  command: "AA BB CC 07 1B 00 22 DD EE FF"
  params: []

- id: rc_display
  label: Remote Control Display
  kind: action
  command: "AA BB CC 07 1C 00 23 DD EE FF"
  params: []

- id: rc_refresh
  label: Remote Control Refresh
  kind: action
  command: "AA BB CC 07 4C 00 53 DD EE FF"
  params: []

- id: rc_input
  label: Remote Control Input
  kind: action
  command: "AA BB CC 07 07 00 0E DD EE FF"
  params: []

- id: rc_home
  label: Remote Control Home
  kind: action
  command: "AA BB CC 07 48 00 4F DD EE FF"
  params: []

- id: rc_menu
  label: Remote Control Menu
  kind: action
  command: "AA BB CC 07 0D 00 14 DD EE FF"
  params: []

- id: rc_delete
  label: Remote Control Delete
  kind: action
  command: "AA BB CC 07 40 00 47 DD EE FF"
  params: []

- id: rc_energy
  label: Remote Control Energy
  kind: action
  command: "AA BB CC 07 4E 00 55 DD EE FF"
  params: []

- id: rc_up
  label: Remote Control Up
  kind: action
  command: "AA BB CC 07 47 00 4E DD EE FF"
  params: []

- id: rc_down
  label: Remote Control Down
  kind: action
  command: "AA BB CC 07 4D 00 54 DD EE FF"
  params: []

- id: rc_left
  label: Remote Control Left
  kind: action
  command: "AA BB CC 07 49 00 50 DD EE FF"
  params: []

- id: rc_right
  label: Remote Control Right
  kind: action
  command: "AA BB CC 07 4B 00 52 DD EE FF"
  params: []

- id: rc_enter
  label: Remote Control Enter
  kind: action
  command: "AA BB CC 07 4A 00 51 DD EE FF"
  params: []

- id: rc_point
  label: Remote Control Point
  kind: action
  command: "AA BB CC 07 06 00 0D DD EE FF"
  params: []

- id: rc_back
  label: Remote Control Back
  kind: action
  command: "AA BB CC 07 0A 00 11 DD EE FF"
  params: []

- id: rc_ch_plus
  label: Remote Control CH+
  kind: action
  command: "AA BB CC 07 02 00 09 DD EE FF"
  params: []

- id: rc_ch_minus
  label: Remote Control CH-
  kind: action
  command: "AA BB CC 07 09 00 10 DD EE FF"
  params: []

- id: rc_vol_plus
  label: Remote Control VOL+
  kind: action
  command: "AA BB CC 07 03 00 0A DD EE FF"
  params: []

- id: rc_vol_minus
  label: Remote Control VOL-
  kind: action
  command: "AA BB CC 07 41 00 48 DD EE FF"
  params: []

- id: rc_page_up
  label: Remote Control PageUp
  kind: action
  command: "AA BB CC 07 42 00 49 DD EE FF"
  params: []

- id: rc_page_down
  label: Remote Control PageDown
  kind: action
  command: "AA BB CC 07 0F 00 16 DD EE FF"
  params: []

- id: rc_f1
  label: Remote Control F1
  kind: action
  command: "AA BB CC 07 45 00 4C DD EE FF"
  params: []

- id: rc_f2
  label: Remote Control F2
  kind: action
  command: "AA BB CC 07 12 00 19 DD EE FF"
  params: []

- id: rc_f3
  label: Remote Control F3
  kind: action
  command: "AA BB CC 07 51 00 58 DD EE FF"
  params: []

- id: rc_f4
  label: Remote Control F4
  kind: action
  command: "AA BB CC 07 5B 00 62 DD EE FF"
  params: []

- id: rc_f5
  label: Remote Control F5
  kind: action
  command: "AA BB CC 07 44 00 4B DD EE FF"
  params: []

- id: rc_f6
  label: Remote Control F6
  kind: action
  command: "AA BB CC 07 50 00 57 DD EE FF"
  params: []

- id: rc_f7
  label: Remote Control F7
  kind: action
  command: "AA BB CC 07 43 00 4A DD EE FF"
  params: []

- id: rc_f8
  label: Remote Control F8
  kind: action
  command: "AA BB CC 07 1A 00 21 DD EE FF"
  params: []

- id: rc_f9
  label: Remote Control F9
  kind: action
  command: "AA BB CC 07 04 00 0B DD EE FF"
  params: []

- id: rc_f10
  label: Remote Control F10
  kind: action
  command: "AA BB CC 07 59 00 60 DD EE FF"
  params: []

- id: rc_f11
  label: Remote Control F11
  kind: action
  command: "AA BB CC 07 57 00 5E DD EE FF"
  params: []

- id: rc_f12
  label: Remote Control F12
  kind: action
  command: "AA BB CC 07 08 00 0F DD EE FF"
  params: []

- id: rc_red
  label: Remote Control RED
  kind: action
  command: "AA BB CC 07 5C 00 63 DD EE FF"
  params: []

- id: rc_green
  label: Remote Control GREEN
  kind: action
  command: "AA BB CC 07 5D 00 64 DD EE FF"
  params: []

- id: rc_yellow
  label: Remote Control YELLOW
  kind: action
  command: "AA BB CC 07 5E 00 65 DD EE FF"
  params: []

- id: rc_blue
  label: Remote Control BLUE
  kind: action
  command: "AA BB CC 07 5F 00 66 DD EE FF"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
  response: "AA BB CC 80 00 00 80 DD EE FF = ON; AA BB CC 80 01 00 81 DD EE FF = OFF"

- id: current_source
  type: enum
  values: [av, vga1, hdmi1, hdmi2, hdmi3, android, dp]
  response: |
    AV/CVBS: AA BB CC 81 02 00 83 DD EE FF
    VGA1:   AA BB CC 81 03 00 84 DD EE FF
    HDMI3:  AA BB CC 81 05 00 86 DD EE FF
    HDMI1:  AA BB CC 81 06 00 87 DD EE FF
    HDMI2:  AA BB CC 81 07 00 88 DD EE FF
    ANDROID: AA BB CC 81 0A 00 8B DD EE FF
    DP:     AA BB CC 81 11 00 92 DD EE FF

- id: current_volume
  type: integer
  range: 0-100
  response: "AA BB CC 82 00 xx ** DD EE FF where xx = volume 0-100 (hex), ** = 0x82+0x00+xx"

- id: mute_state
  type: enum
  values: [mute, unmute]
  response: "AA BB CC 82 01 00 83 DD EE FF = MUTE; AA BB CC 82 01 01 84 DD EE FF = UNMUTE"
```

## Variables
```yaml
# UNRESOLVED: no settable parameters beyond the discrete actions above
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing requirements stated in source
```

## Notes
Source uses DB9 pinout: Pin2=TXD, Pin3=RXD (pin-to-pin / null-modem crossover). All commands share the 10-byte frame `AA BB CC <Main> <Sub> 00 <Checksum> DD EE FF`. Checksum is the low byte of (Main + Sub + Length); for fixed Sub/Length=0x00 commands, checksum is just Main. TV Channel example (XX=0-99, **=XX+05) appears in source but no corresponding TV-channel command table — not emitted as an action.
<!-- UNRESOLVED: aspect-ratio status query, TV-channel commands, firmware version range, and any device-side retry/timeout behavior not documented in source -->

## Provenance

```yaml
source_domains:
  - iiyama.com
source_urls:
  - https://iiyama.com/f/3b30cd7d6a4bc40e1d229c327cda4d35_texx68-rs232-protocol-v1-0-2.pdf
  - https://iiyama.com/f/e814fb38675840f086adb2ecd13f84e8_te7568mis-usermanual-e-revf.pdf
  - https://iiyama.com/pdf/Product/552/gb_en.pdf
retrieved_at: 2026-05-13T05:27:13.010Z
last_checked_at: 2026-06-02T02:29:32.395Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T02:29:32.395Z
matched_actions: 69
action_count: 69
confidence: medium
summary: "All 69 spec actions matched verbatim against source command table; transport parameters verified; comprehensive protocol coverage. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no firmware version range, no query for aspect ratio, no TV-channel commands beyond the volume-template example"
- "no settable parameters beyond the discrete actions above"
- "no unsolicited notifications documented in source"
- "no multi-step sequences documented in source"
- "no safety warnings, interlock procedures, or power-on sequencing requirements stated in source"
- "aspect-ratio status query, TV-channel commands, firmware version range, and any device-side retry/timeout behavior not documented in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
