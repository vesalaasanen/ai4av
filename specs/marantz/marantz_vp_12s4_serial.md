---
spec_id: admin/marantz-vp-12s4
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz VP-12S4 Control Spec"
manufacturer: Marantz
model_family: VP-12S4
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - VP-12S4
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
  - marantz.com
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
  - https://www.marantz.com/product/archive-video-displays/vp-12s4m-bl/VP12S4MBL.html
retrieved_at: 2026-05-27T17:16:54.151Z
last_checked_at: 2026-06-23T08:31:09.044Z
generated_at: 2026-06-23T08:31:09.044Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Keystone V direct-value encoding — the sample \"@KEYV/+0F\" shows a sign-prefixed two-character field (\"+0F\" appears to be hex), but the exact format (sign, hex vs decimal, field width, valid range) is not fully specified in the source."
  - "Keystone V direct-value encoding — the sample \"@KEYV/+0F\" shows a"
verification:
  verdict: verified
  checked_at: 2026-06-23T08:31:09.044Z
  matched_actions: 98
  action_count: 98
  confidence: medium
  summary: "All 98 spec actions matched literal source commands; transport parameters verified; bidirectional coverage of the VP-12S4 RS-232C command table. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-23
---

# Marantz VP-12S4 Control Spec

## Summary
The Marantz VP-12S4 is a DLP high-definition projector controlled over RS-232C via a D-sub 9-pin straight cable. This spec covers all Normal Commands (power, source selection, picture mode, aspect ratio, V-mute, keystone, blanking, RGB sync, pattern, black level, lamp mode, IRIS, auto power off, cinema mode, remote navigation, menu, and information overlay), all Request Status Query commands, and all Special Commands (lamp life, lamp lit status, build number, firmware versions, and elapsed time). All commands are ASCII strings terminated by 0x0D (carriage return).

<!-- UNRESOLVED: Keystone V direct-value encoding — the sample "@KEYV/+0F" shows a sign-prefixed two-character field ("+0F" appears to be hex), but the exact format (sign, hex vs decimal, field width, valid range) is not fully specified in the source. -->

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
  connector: D-sub 9-pin (straight cable)
  termination: "0x0D (CR)"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable
  - routable
  - mutable
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: "@PWR1<CR>"
  params: []

- id: power_standby
  label: Power Standby
  kind: action
  command: "@PWR0<CR>"
  params: []

- id: source_component1
  label: Source Component 1
  kind: action
  command: "@CMP1<CR>"
  params: []

- id: source_component2
  label: Source Component 2
  kind: action
  command: "@CMP2<CR>"
  params: []

- id: source_svideo
  label: Source S-Video
  kind: action
  command: "@SVD<CR>"
  params: []

- id: source_video
  label: Source Video
  kind: action
  command: "@VDO<CR>"
  params: []

- id: source_rgb
  label: Source RGB
  kind: action
  command: "@RGB<CR>"
  params: []

- id: source_hdmi1
  label: Source HDMI 1
  kind: action
  command: "@HDMI1<CR>"
  params: []

- id: source_hdmi2
  label: Source HDMI 2
  kind: action
  command: "@HDMI2<CR>"
  params: []

- id: picture_mode_theater1
  label: Picture Mode Theater 1
  kind: action
  command: "@THE1<CR>"
  params: []

- id: picture_mode_theater2
  label: Picture Mode Theater 2
  kind: action
  command: "@THE2<CR>"
  params: []

- id: picture_mode_theater3
  label: Picture Mode Theater 3
  kind: action
  command: "@THE3<CR>"
  params: []

- id: picture_mode_theater_default
  label: Picture Mode Theater Default
  kind: action
  command: "@THED<CR>"
  params: []

- id: picture_mode_standard1
  label: Picture Mode Standard 1
  kind: action
  command: "@STD1<CR>"
  params: []

- id: picture_mode_standard2
  label: Picture Mode Standard 2
  kind: action
  command: "@STD2<CR>"
  params: []

- id: picture_mode_standard3
  label: Picture Mode Standard 3
  kind: action
  command: "@STD3<CR>"
  params: []

- id: picture_mode_standard_default
  label: Picture Mode Standard Default
  kind: action
  command: "@STDD<CR>"
  params: []

- id: picture_mode_dynamic1
  label: Picture Mode Dynamic 1
  kind: action
  command: "@DYN1<CR>"
  params: []

- id: picture_mode_dynamic2
  label: Picture Mode Dynamic 2
  kind: action
  command: "@DYN2<CR>"
  params: []

- id: picture_mode_dynamic3
  label: Picture Mode Dynamic 3
  kind: action
  command: "@DYN3<CR>"
  params: []

- id: picture_mode_dynamic_default
  label: Picture Mode Dynamic Default
  kind: action
  command: "@DYND<CR>"
  params: []

- id: picture_mode_user1
  label: Picture Mode User 1
  kind: action
  command: "@USR1<CR>"
  params: []

- id: picture_mode_user2
  label: Picture Mode User 2
  kind: action
  command: "@USR2<CR>"
  params: []

- id: picture_mode_user3
  label: Picture Mode User 3
  kind: action
  command: "@USR3<CR>"
  params: []

- id: picture_mode_user4
  label: Picture Mode User 4
  kind: action
  command: "@USR4<CR>"
  params: []

- id: picture_mode_user5
  label: Picture Mode User 5
  kind: action
  command: "@USR5<CR>"
  params: []

- id: picture_mode_user6
  label: Picture Mode User 6
  kind: action
  command: "@USR6<CR>"
  params: []

- id: picture_mode_user7
  label: Picture Mode User 7
  kind: action
  command: "@USR7<CR>"
  params: []

- id: picture_mode_user8
  label: Picture Mode User 8
  kind: action
  command: "@USR8<CR>"
  params: []

- id: picture_mode_user9
  label: Picture Mode User 9
  kind: action
  command: "@USR9<CR>"
  params: []

- id: aspect_normal
  label: Aspect Normal
  kind: action
  command: "@NML<CR>"
  params: []

- id: aspect_through
  label: Aspect Through
  kind: action
  command: "@THRH<CR>"
  params: []

- id: aspect_full
  label: Aspect Full
  kind: action
  command: "@FULL<CR>"
  params: []

- id: aspect_zoom
  label: Aspect Zoom
  kind: action
  command: "@ZOOM<CR>"
  params: []

- id: vmute_on
  label: V-Mute On
  kind: action
  command: "@MUT1<CR>"
  params: []

- id: vmute_off
  label: V-Mute Off
  kind: action
  command: "@MUT0<CR>"
  params: []

- id: keystone_v_up
  label: Keystone V +
  kind: action
  command: "@KEYV+<CR>"
  params: []

- id: keystone_v_down
  label: Keystone V -
  kind: action
  command: "@KEYV-<CR>"
  params: []

# UNRESOLVED: Keystone V direct-value encoding — the sample "@KEYV/+0F" shows a
# sign-prefixed two-character field ("+0F" appears to be hex), but the exact format
# (sign, hex vs decimal, field width, valid range) is not fully specified in the source.
- id: keystone_v_direct
  label: Keystone V Direct Value
  kind: action
  command: "@KEYV/<value><CR>"
  params:
    - name: value
      description: "Sign-prefixed hex value, e.g. +0F or -0A. Exact encoding UNRESOLVED."

- id: blanking_off
  label: Blanking Off
  kind: action
  command: "@BLNK0<CR>"
  params: []

- id: blanking_1
  label: Blanking 1
  kind: action
  command: "@BLNK1<CR>"
  params: []

- id: blanking_2
  label: Blanking 2
  kind: action
  command: "@BLNK2<CR>"
  params: []

- id: blanking_3
  label: Blanking 3
  kind: action
  command: "@BLNK3<CR>"
  params: []

- id: rgb_sync_auto
  label: RGB Sync Auto
  kind: action
  command: "@RGBS0<CR>"
  params: []

- id: rgb_sync_1
  label: RGB Sync 1
  kind: action
  command: "@RGBS1<CR>"
  params: []

- id: rgb_sync_2
  label: RGB Sync 2
  kind: action
  command: "@RGBS2<CR>"
  params: []

- id: rgb_sync_3
  label: RGB Sync 3
  kind: action
  command: "@RGBS3<CR>"
  params: []

- id: pattern_on
  label: Pattern On
  kind: action
  command: "@PAT1<CR>"
  params: []

- id: pattern_off
  label: Pattern Off
  kind: action
  command: "@PAT0<CR>"
  params: []

- id: black_level_0ire
  label: Black Level 0IRE
  kind: action
  command: "@BLVL0<CR>"
  params: []

- id: black_level_75ire
  label: Black Level 7.5IRE
  kind: action
  command: "@BLVL7<CR>"
  params: []

- id: black_level_normal
  label: Black Level Normal
  kind: action
  command: "@BLVLNOR<CR>"
  params: []

- id: black_level_expand
  label: Black Level Expand
  kind: action
  command: "@BLVLEXP<CR>"
  params: []

- id: lamp_mode_high
  label: Lamp Mode High
  kind: action
  command: "@LMODEH<CR>"
  params: []

- id: lamp_mode_low
  label: Lamp Mode Low
  kind: action
  command: "@LMODEL<CR>"
  params: []

- id: iris_f5
  label: IRIS F5
  kind: action
  command: "@IRIS1<CR>"
  params: []

- id: iris_f3
  label: IRIS F3
  kind: action
  command: "@IRIS0<CR>"
  params: []

- id: auto_power_off_enable
  label: Auto Power Off Enable
  kind: action
  command: "@APO1<CR>"
  params: []

- id: auto_power_off_disable
  label: Auto Power Off Disable
  kind: action
  command: "@APO0<CR>"
  params: []

- id: cinema_auto
  label: Cinema Auto
  kind: action
  command: "@CINEMA1<CR>"
  params: []

- id: cinema_off
  label: Cinema Off
  kind: action
  command: "@CINEMA0<CR>"
  params: []

- id: cursor_up
  label: Cursor Up
  kind: action
  command: "@UP<CR>"
  params: []

- id: cursor_down
  label: Cursor Down
  kind: action
  command: "@DOWN<CR>"
  params: []

- id: cursor_right
  label: Cursor Right
  kind: action
  command: "@RIGHT<CR>"
  params: []

- id: cursor_left
  label: Cursor Left
  kind: action
  command: "@LEFT<CR>"
  params: []

- id: cursor_enter
  label: Cursor Enter
  kind: action
  command: "@ENTER<CR>"
  params: []

- id: menu_on
  label: Menu On
  kind: action
  command: "@MENU1<CR>"
  params: []

- id: menu_off
  label: Menu Off
  kind: action
  command: "@MENU0<CR>"
  params: []

- id: information_on
  label: Information On
  kind: action
  command: "@INFO1<CR>"
  params: []

- id: information_off
  label: Information Off
  kind: action
  command: "@INFO0<CR>"
  params: []

- id: query_power
  label: Query Power State
  kind: query
  command: "@PWR?<CR>"
  params: []

- id: query_source
  label: Query Source
  kind: query
  command: "@SRC?<CR>"
  params: []

- id: query_memory
  label: Query Picture Memory/Mode
  kind: query
  command: "@MEM?<CR>"
  params: []

- id: query_aspect
  label: Query Aspect Ratio
  kind: query
  command: "@ASP?<CR>"
  params: []

- id: query_vmute
  label: Query V-Mute State
  kind: query
  command: "@MUT?<CR>"
  params: []

- id: query_keystone_v
  label: Query Keystone V Value
  kind: query
  command: "@KEYV?<CR>"
  params: []

- id: query_blanking
  label: Query Blanking State
  kind: query
  command: "@BLNK?<CR>"
  params: []

- id: query_rgb_sync
  label: Query RGB Sync Setting
  kind: query
  command: "@RGBS?<CR>"
  params: []

- id: query_pattern
  label: Query Pattern State
  kind: query
  command: "@PAT?<CR>"
  params: []

- id: query_black_level
  label: Query Black Level
  kind: query
  command: "@BLVL?<CR>"
  params: []

- id: query_lamp_mode
  label: Query Lamp Mode
  kind: query
  command: "@LMODE?<CR>"
  params: []

- id: query_iris
  label: Query IRIS Setting
  kind: query
  command: "@IRIS?<CR>"
  params: []

- id: query_auto_power_off
  label: Query Auto Power Off State
  kind: query
  command: "@APO?<CR>"
  params: []

- id: query_cinema
  label: Query Cinema Mode
  kind: query
  command: "@CINEMA?<CR>"
  params: []

- id: query_error_status
  label: Query Error Status
  kind: query
  command: "@ERR?<CR>"
  params: []

- id: query_menu
  label: Query Menu State
  kind: query
  command: "@MENU?<CR>"
  params: []

- id: query_information
  label: Query Information State
  kind: query
  command: "@INFO?<CR>"
  params: []

- id: query_vp_status
  label: Query VP Power Status
  kind: query
  command: "@POW?<CR>"
  params: []

- id: query_all_commands
  label: Query All Commands
  kind: query
  command: "@?<CR>"
  params: []

- id: query_lamp_life
  label: Query Lamp Life Remaining
  kind: query
  command: "@LAMPLIFE?<CR>"
  params: []

- id: query_lamp_lit
  label: Query Lamp Lit Status
  kind: query
  command: "@LAMPLIT?<CR>"
  params: []

- id: query_build_number
  label: Query Build Number
  kind: query
  command: "@BUILD?<CR>"
  params: []

- id: query_version_main
  label: Query Main uP Firmware Version
  kind: query
  command: "@VER_MAIN?<CR>"
  params: []

- id: query_version_sub
  label: Query Sub uP Firmware Version
  kind: query
  command: "@VER_SUB?<CR>"
  params: []

- id: query_version_gfboot
  label: Query GF Boot Firmware Version
  kind: query
  command: "@VER_GFBOOT?<CR>"
  params: []

- id: query_version_fpga
  label: Query FPGA Firmware Version
  kind: query
  command: "@VER_FPGA?<CR>"
  params: []

- id: query_version_cpld
  label: Query CPLD Firmware Version
  kind: query
  command: "@VER_CPLD?<CR>"
  params: []

- id: query_elapsed_time
  label: Query Elapsed Lamp Time
  kind: query
  command: "@TIME?<CR>"
  params: []
```

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
  - marantz.com
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
  - https://www.marantz.com/product/archive-video-displays/vp-12s4m-bl/VP12S4MBL.html
retrieved_at: 2026-05-27T17:16:54.151Z
last_checked_at: 2026-06-23T08:31:09.044Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-23T08:31:09.044Z
matched_actions: 98
action_count: 98
confidence: medium
summary: "All 98 spec actions matched literal source commands; transport parameters verified; bidirectional coverage of the VP-12S4 RS-232C command table. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Keystone V direct-value encoding — the sample \"@KEYV/+0F\" shows a sign-prefixed two-character field (\"+0F\" appears to be hex), but the exact format (sign, hex vs decimal, field width, valid range) is not fully specified in the source."
- "Keystone V direct-value encoding — the sample \"@KEYV/+0F\" shows a"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
