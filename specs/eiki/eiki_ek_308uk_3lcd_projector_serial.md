---
spec_id: admin/eiki-ek-308uk-3lcd-projector
schema_version: ai4av-public-spec-v1
revision: 1
title: "Eiki EK-308UK 3LCD Projector Control Spec"
manufacturer: Eiki
model_family: EK-308UK
aliases: []
compatible_with:
  manufacturers:
    - Eiki
  models:
    - EK-308UK
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - eiki.com
source_urls:
  - "https://www.eiki.com/download/ek-300-series-rs232-commands/?wpdmdl=3638&ind=1755806273826&refresh=bb6129ec&filename=EK-308U-309W-RS232.pdf"
  - https://www.eiki.com/download/ek-300-series-rs232-commands/
retrieved_at: 2026-09-02T20:31:42.277Z
last_checked_at: 2026-09-05T22:16:34.521Z
generated_at: 2026-09-05T22:16:34.521Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "power-failure detail table (CR ALLPFAIL response codes) cut off in source"
  - "source contains no explicit safety warnings, interlock procedures, or"
  - "firmware version compatibility not stated in source. CR ALLPFAIL response codes (MAIN, FAN, 5V fault detail) cut off at end of source."
verification:
  verdict: verified
  checked_at: 2026-09-05T22:16:34.521Z
  matched_actions: 60
  action_count: 60
  confidence: medium
  summary: "All 60 spec action literals (C00-C89, CR0-CR7, CR ALLPFAIL) appear verbatim in the source command table; transport parameters all supported by the source's port-setting table. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Eiki EK-308UK 3LCD Projector Control Spec

## Summary
RS-232C control spec for the Eiki EK-308UK 3LCD projector. One command per line, framed by "C" prefix and CR terminator. Two command classes: functional execution (ACK/NAK response) and status read (returns value + CR or NAK).

<!-- UNRESOLVED: power-failure detail table (CR ALLPFAIL response codes) cut off in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred from POWER ON / POWER OFF commands
- routable     # inferred from input selection commands (VGA, HDMI, etc.)
- queryable    # inferred from status read commands (CR0, CR1, CR3, CR4, CR6, CR7)
- levelable    # inferred from volume and brightness commands
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: "C00\r"  # 43 30 30 0D
  params: []
- id: power_off_immediate
  label: Power Off (immediate)
  kind: action
  command: "C01\r"  # 43 30 31 0D
  params: []
- id: power_off
  label: Power Off
  kind: action
  command: "C02\r"  # 43 30 32 0D
  params: []
- id: select_vga_in_1
  label: Select VGA IN 1
  kind: action
  command: "C05\r"  # 43 30 35 0D
  params: []
- id: select_vga_in_2
  label: Select VGA IN 2
  kind: action
  command: "C06\r"  # 43 30 36 0D
  params: []
- id: select_video
  label: Select Video
  kind: action
  command: "C07\r"  # 43 30 37 0D
  params: []
- id: select_svideo
  label: Select S-Video
  kind: action
  command: "C34\r"  # 43 33 34 0D
  params: []
- id: select_component
  label: Select Component
  kind: action
  command: "C33\r"  # 43 33 33 0D
  params: []
- id: select_hdmi_1
  label: Select HDMI 1
  kind: action
  command: "C36\r"  # 43 33 36 0D
  params: []
- id: select_network
  label: Select NETWORK
  kind: action
  command: "C15\r"  # 43 31 35 0D
  params: []
- id: select_memory_viewer
  label: Select Memory Viewer
  kind: action
  command: "C16\r"  # 43 31 36 0D
  params: []
- id: select_usb_display
  label: Select USB Display
  kind: action
  command: "C17\r"  # 43 31 37 0D
  params: []
- id: select_hdmi_2_mhl
  label: Select HDMI 2 (MHL)
  kind: action
  command: "C37\r"  # 43 33 37 0D
  params: []
- id: keystone_up
  label: Keystone Up
  kind: action
  command: "C8E\r"  # 43 38 45 0D
  params: []
- id: keystone_down
  label: Keystone Down
  kind: action
  command: "C8F\r"  # 43 38 46 0D
  params: []
- id: menu_on
  label: Menu On
  kind: action
  command: "C1C\r"  # 43 31 43 0D
  params: []
- id: menu_off
  label: Menu Off
  kind: action
  command: "C1D\r"  # 43 31 44 0D
  params: []
- id: keystone_left
  label: Keystone Left
  kind: action
  command: "C90\r"  # 43 39 30 0D
  params: []
- id: keystone_right
  label: Keystone Right
  kind: action
  command: "C91\r"  # 43 39 31 0D
  params: []
- id: still_on
  label: Still On
  kind: action
  command: "C43\r"  # 43 34 33 0D
  params: []
- id: still_off
  label: Still Off
  kind: action
  command: "C44"  # 43 34 34 00
  params: []
- id: blank_on
  label: Blank On
  kind: action
  command: "C0D"  # 43 30 44 00
  params: []
- id: blank_off
  label: Blank Off
  kind: action
  command: "C0E\r"  # 43 30 45 0D
  params: []
- id: timer
  label: Timer
  kind: action
  command: "C8A\r"  # 43 38 41 0D
  params: []
- id: timer_exit
  label: Timer Exit
  kind: action
  command: "C8B\r"  # 43 38 42 0D
  params: []
- id: mute_on
  label: Mute On
  kind: action
  command: "C0B\r"  # 43 30 42 0D
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  command: "C0C\r"  # 43 30 43 0D
  params: []
- id: digital_zoom_in
  label: Digital Zoom In
  kind: action
  command: "C30\r"  # 43 33 30 0D
  params: []
- id: digital_zoom_out
  label: Digital Zoom Out
  kind: action
  command: "C31\r"  # 43 33 31 0D
  params: []
- id: volume_up
  label: Volume Up
  kind: action
  command: "C09\r"  # 43 30 39 0D
  params: []
- id: volume_down
  label: Volume Down
  kind: action
  command: "C0A\r"  # 43 30 41 0D
  params: []
- id: image_mode_dynamic
  label: Image Mode: Dynamic
  kind: action
  command: "C19\r"  # 43 31 39 0D
  params: []
- id: image_mode_standard
  label: Image Mode: Standard
  kind: action
  command: "C11\r"  # 43 31 31 0D
  params: []
- id: image_mode_colorboard
  label: Image Mode: Colorboard
  kind: action
  command: "C39\r"  # 43 33 39 0D
  params: []
- id: screen_normal
  label: Screen Normal Size
  kind: action
  command: "C0F\r"  # 43 30 46 0D
  params: []
- id: screen_wide
  label: Screen Wide (16:9)
  kind: action
  command: "C10\r"  # 43 31 30 0D
  params: []
- id: image_mode_cinema
  label: Image Mode: Cinema
  kind: action
  command: "C13\r"  # 43 31 33 0D
  params: []
- id: image_mode_blackboard
  label: Image Mode: Blackboard
  kind: action
  command: "C18"  # 43 31 38 00
  params: []
- id: display_clear
  label: Display Clear
  kind: action
  command: "C1E\r"  # 43 31 45 0D
  params: []
- id: brightness_up
  label: Brightness Up
  kind: action
  command: "C20\r"  # 43 32 30 0D
  params: []
- id: brightness_down
  label: Brightness Down
  kind: action
  command: "C21\r"  # 43 32 31 0D
  params: []
- id: image_toggle
  label: Image Toggle
  kind: action
  command: "C27\r"  # 43 32 37 0D
  params: []
- id: direct_on_enable
  label: Direct On Enable
  kind: action
  command: "C28\r"  # 43 32 38 0D
  params: []
- id: direct_on_disable
  label: Direct On Disable
  kind: action
  command: "C29\r"  # 43 32 39 0D
  params: []
- id: power_mgmt_ready
  label: Power Management Ready
  kind: action
  command: "C2A\r"  # 43 32 41 0D
  params: []
- id: power_mgmt_off
  label: Power Management Off
  kind: action
  command: "C2B\r"  # 43 32 42 0D
  params: []
- id: power_mgmt_shutdown
  label: Power Management Shut Down
  kind: action
  command: "C2E\r"  # 43 32 45 0D
  params: []
- id: pointer_right
  label: Pointer Right
  kind: action
  command: "C3A\r"  # 43 33 41 0D
  params: []
- id: pointer_left
  label: Pointer Left
  kind: action
  command: "C3B\r"  # 43 33 42 0D
  params: []
- id: pointer_up
  label: Pointer Up
  kind: action
  command: "C3C\r"  # 43 33 43 0D
  params: []
- id: pointer_down
  label: Pointer Down
  kind: action
  command: "C3D\r"  # 43 33 44 0D
  params: []
- id: enter
  label: Enter
  kind: action
  command: "C3F\r"  # 43 33 46 0D
  params: []
- id: auto_pc_adjust
  label: Auto PC Adjust
  kind: action
  command: "C89\r"  # 43 38 39 0D
  params: []
- id: lamp_timer_read
  label: Lamp Timer Read
  kind: query
  command: "CR3\r"  # 43 52 33 0D
  params: []
- id: get_power_status
  label: Get Power Status
  kind: query
  command: "CR0\r"  # 43 52 30 0D
  params: []
- id: get_input_source
  label: Get Input Source
  kind: query
  command: "CR1\r"  # 43 52 31 0D
  params: []
- id: get_screen_setting
  label: Get Screen Setting Status
  kind: query
  command: "CR4"  # 43 52 34 00
  params: []
- id: get_temperature
  label: Get Internal Temperature
  kind: query
  command: "CR6\r"  # 43 52 36 0D
  params: []
- id: get_lamp_mode
  label: Get Lamp Mode Status
  kind: query
  command: "CR7\r"  # 43 52 37 0D
  params: []
- id: get_power_failure_detail
  label: Get Power Failure Detail
  kind: query
  command: "CR ALLPFAIL"
  params: []
```

## Feedbacks
```yaml
- id: power_status
  type: enum
  values:
    - "00"  # Power on
    - "80"  # Standby
    - "40"  # Countdown in process
    - "20"  # Cooling down in process
    - "10"  # Power failure
    - "28"  # Cooling down due to temperature anomaly
    - "88"  # Coming back after temperature anomaly
    - "24"  # Power management cooling
    - "04"  # Suspend status (Power Management Ready)
    - "21"  # Cooling down after lamp off
    - "81"  # Standby after cooling down due to lamp off
- id: input_source
  type: enum
  values:
    - VGA 1
    - VGA 2
    - Component
    - HDMI
    - "HDMI (MHL)"
    - Video
    - S-Video
    - NETWORK
    - Memory Viewer
    - USB Display
- id: screen_setting
  type: enum
  values:
    - "11"  # Normal screen setting
    - "10"  # Rear & Ceiling ON
    - "01"  # Rear ON
    - "00"  # Ceiling ON
- id: lamp_mode
  type: enum
  values:
    - "00"  # Light is out
    - "01"  # Light is on
- id: internal_temperature
  type: string
  description: Three sensor readings formatted as "%1_%2_%3" in "00.0" format (Sensor 1, Sensor 2, Sensor 3)
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements. Do not infer.
```

## Notes
Connect via RS-232 cross cable. Command framing: ASCII command string prefixed by "C", terminated by CR (0x0D). Functional execution commands return ACK or NAK followed by CR. Status read commands return value + CR or NAK + CR. Several commands in source table show terminator byte 0x00 (Still Off, Blank On, Blackboard, Get Screen Setting) instead of 0x0D — flagged as potential source typo since spec text states CR is terminator. Source document truncated at line 130; CR ALLPFAIL response code table incomplete.
<!-- UNRESOLVED: firmware version compatibility not stated in source. CR ALLPFAIL response codes (MAIN, FAN, 5V fault detail) cut off at end of source. -->

## Provenance

```yaml
source_domains:
  - eiki.com
source_urls:
  - "https://www.eiki.com/download/ek-300-series-rs232-commands/?wpdmdl=3638&ind=1755806273826&refresh=bb6129ec&filename=EK-308U-309W-RS232.pdf"
  - https://www.eiki.com/download/ek-300-series-rs232-commands/
retrieved_at: 2026-09-02T20:31:42.277Z
last_checked_at: 2026-09-05T22:16:34.521Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-05T22:16:34.521Z
matched_actions: 60
action_count: 60
confidence: medium
summary: "All 60 spec action literals (C00-C89, CR0-CR7, CR ALLPFAIL) appear verbatim in the source command table; transport parameters all supported by the source's port-setting table. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "power-failure detail table (CR ALLPFAIL response codes) cut off in source"
- "source contains no explicit safety warnings, interlock procedures, or"
- "firmware version compatibility not stated in source. CR ALLPFAIL response codes (MAIN, FAN, 5V fault detail) cut off at end of source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
