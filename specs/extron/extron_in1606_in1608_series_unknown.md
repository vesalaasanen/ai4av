---
spec_id: admin/extron-in1606-in1608-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron IN1606 / IN1608 Series Control Spec"
manufacturer: Extron
model_family: IN1606
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - IN1606
    - "IN1608 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - manua.ls
  - manualmachine.com
source_urls:
  - https://media.extron.com/public/download/files/userman/IN1606-1608_UG_68-2290-01_J.pdf
  - https://media.extron.com/public/download/files/userman/68-2290-50_B_IN1606_SUG.pdf
  - https://media.extron.com/public/product/panel/in1606.pdf
  - https://www.manua.ls/extron/in1606/manual
  - https://manualmachine.com/extronelectronic/in1606/1323808-user-manual/
retrieved_at: 2026-07-26T07:32:11.596Z
last_checked_at: 2026-10-01T12:26:50.090Z
generated_at: 2026-10-01T12:26:50.090Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source."
  - "this excerpt derives from the IN1606/IN1608 user guide (68-2290-01 Rev.J); the IN1608 IPCP / IP Link variant and the retired IN1608 xi share SIS but were not separately verified."
  - "voltage, current, and power specifications are not in this command-protocol excerpt."
  - "data bits not stated in source (source states only \"1 stop bit, no parity, and no flow control\")"
  - "TCP/Telnet port number not explicitly stated in source excerpt (Telnet application referenced but port not given)"
  - "none beyond the action-scoped params above."
  - none.
  - "TCP/Telnet control port not stated in this excerpt (do not assume 23)."
  - "serial data_bits not stated (only stop bits / parity / flow control given)."
  - "firmware version range and IN1608 xi / IN1608 IPCP-specific command deltas not verified against a separate programmer's guide."
  - "maximum number of simultaneous TCP/Telnet connections value not numerically stated (referenced as \"maximum number of open connections\")."
verification:
  verdict: verified
  checked_at: 2026-10-01T12:26:50.090Z
  matched_actions: 213
  action_count: 213
  confidence: medium
  summary: "All 213 spec actions match SIS command tokens verbatim in the source's Command and Response table; transport parameters (9600 baud, 1 stop bit, no parity, no flow control, password auth) are stated. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-26
---

# Extron IN1606 / IN1608 Series Control Spec

## Summary
The Extron IN1606 and IN1608 Series are scaling presentation switchers (6 and 8 inputs respectively) with HDMI A, HDMI B, and (IN1608) Out C outputs. This spec covers control of the switchers via the Extron Simple Instruction Set (SIS) — an ASCII command protocol carried over RS-232, the front-panel USB port (virtual serial), and Ethernet/Telnet. The switchers also expose an internal web-page GUI over HTTP, but no REST request/response payloads are documented; all documented programmatic commands are SIS.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: this excerpt derives from the IN1606/IN1608 user guide (68-2290-01 Rev.J); the IN1608 IPCP / IP Link variant and the retired IN1608 xi share SIS but were not separately verified. -->
<!-- UNRESOLVED: voltage, current, and power specifications are not in this command-protocol excerpt. -->

## Transport
```yaml
# Documented SIS transports: RS-232 (3-pole captive screw), USB (virtual serial),
# and Ethernet/Telnet. USB carries the same SIS command stream as RS-232; it is
# noted here as a serial-class transport, not a separate protocol.
# The internal web pages are a browser GUI (HTTP) with no documented REST endpoints,
# so http is not listed as a programmatic protocol here - see Notes.
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: null  # UNRESOLVED: data bits not stated in source (source states only "1 stop bit, no parity, and no flow control")
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: null  # UNRESOLVED: TCP/Telnet port number not explicitly stated in source excerpt (Telnet application referenced but port not given)
auth:
  type: password  # source describes administrator/user password login; factory default password = device serial number (case-sensitive)
```

**Default network settings (stated verbatim in source):**
- IP address: `192.168.254.254`
- Subnet mask: `255.255.0.0`
- Gateway: `0.0.0.0`
- DHCP: `Off`

## Traits
```yaml
# - routable    # inferred: input switching (X!!/X!&/X!$) and auto-switch mode commands present
# - queryable   # inferred: many status/view/query commands (Q, N, *Q, E ... }, view commands)
# - levelable   # inferred: volume/gain (AU, GRPM), brightness/contrast/color/tint (BRIT/CONT/COLR/TINT)
# - powerable   # inferred: power-save on/off (PSAV) toggles full vs low-power state
```

## Actions
```yaml
- id: video_and_audio
  label: "Video and audio"
  kind: action
  command: "X! !"
  params: []

- id: video_only
  label: "Video only"
  kind: action
  command: "X! &"
  params: []

- id: audio_only
  label: "Audio only"
  kind: action
  command: "X! $"
  params: []

- id: view_video_input
  label: "View video input"
  kind: action
  command: "& X!"
  params: []

- id: view_audio_input
  label: "View audio input"
  kind: action
  command: "$ X!"
  params: []

- id: view_current_input
  label: "View current input"
  kind: action
  command: "! X!"
  params: []

- id: disable_auto_switch_mode
  label: "Disable auto switch mode"
  kind: action
  command: "E 0AUSW }"
  params: []

- id: prioritize_highest_active_input
  label: "Prioritize highest active input"
  kind: action
  command: "E 1AUSW }"
  params: []

- id: prioritize_lowest_active_input
  label: "Prioritize lowest active input"
  kind: action
  command: "E 2AUSW }"
  params: []

- id: view_auto_switch_mode
  label: "View auto switch mode"
  kind: action
  command: "E AUSW }"
  params: []

- id: set_video_format
  label: "Set video format"
  kind: action
  command: "X! * X# \\"
  params: []

- id: view_set_format
  label: "View set format"
  kind: action
  command: "X! \\"
  params: []

- id: assign_edid_to_input
  label: "Assign EDID to input"
  kind: action
  command: "E A X! * X6) EDID }"
  params: []

- id: view_assigned_edid
  label: "View assigned EDID"
  kind: action
  command: "E A X! EDID }"
  params: []

- id: save_an_output_edid_to_custom_slot
  label: "Save an output EDID to custom slot"
  kind: action
  command: "E S X@ * X6) EDID }"
  params: []

- id: export_edid_file
  label: "Export EDID file"
  kind: action
  command: "E E X6) ,<filename> EDID }"
  params: []

- id: import_edid_file
  label: "Import EDID file"
  kind: action
  command: "E I X6) ,<filename> EDID }"
  params: []

- id: write_input_name
  label: "Write input name"
  kind: action
  command: "EX! , X1$ NI }"
  params: []

- id: view_input_name
  label: "View input name"
  kind: action
  command: "EX! NI }"
  params: []

- id: enable
  label: "Enable"
  kind: action
  command: "X! *1A"
  params: []

- id: disable
  label: "Disable"
  kind: action
  command: "X! *0A"
  params: []

- id: view
  label: "View"
  kind: action
  command: "X! A"
  params: []

- id: execute
  label: "Execute"
  kind: action
  command: "A"
  params: []

- id: execute_and_fill
  label: "Execute and fill"
  kind: action
  command: "1*A"
  params: []

- id: execute_and_follow
  label: "Execute and follow"
  kind: action
  command: "2*A"
  params: []

- id: set_value
  label: "Set value"
  kind: action
  command: "EX3) ALVL }"
  params: []

- id: view_2
  label: "View"
  kind: action
  command: "E ALVL }"
  params: []

- id: specify_a_value
  label: "Specify a value"
  kind: action
  command: "EX$ HSRT }"
  params: []

- id: increment_value
  label: "Increment value"
  kind: action
  command: "E +HSRT }"
  params: []

- id: decrement_value
  label: "Decrement value"
  kind: action
  command: "E -HSRT }"
  params: []

- id: view_3
  label: "View"
  kind: action
  command: "E HSRT }"
  params: []

- id: specify_a_value_2
  label: "Specify a value"
  kind: action
  command: "EX$ VSRT }"
  params: []

- id: increment_value_2
  label: "Increment value"
  kind: action
  command: "E +VSRT }"
  params: []

- id: decrement_value_2
  label: "Decrement value"
  kind: action
  command: "E -VSRT }"
  params: []

- id: view_4
  label: "View"
  kind: action
  command: "E VSRT }"
  params: []

- id: specify_a_value_3
  label: "Specify a value"
  kind: action
  command: "EX% PHAS }"
  params: []

- id: increment_value_3
  label: "Increment value"
  kind: action
  command: "E +PHAS }"
  params: []

- id: decrement_value_3
  label: "Decrement value"
  kind: action
  command: "E -PHAS }"
  params: []

- id: view_5
  label: "View"
  kind: action
  command: "E PHAS }"
  params: []

- id: specify_a_value_4
  label: "Specify a value"
  kind: action
  command: "EX^ TPIX }"
  params: []

- id: increment_value_4
  label: "Increment value"
  kind: action
  command: "E +TPIX }"
  params: []

- id: decrement_value_4
  label: "Decrement value"
  kind: action
  command: "E -TPIX }"
  params: []

- id: view_6
  label: "View"
  kind: action
  command: "E TPIX }"
  params: []

- id: specify_a_value_5
  label: "Specify a value"
  kind: action
  command: "EX& APIX }"
  params: []

- id: increment_value_5
  label: "Increment value"
  kind: action
  command: "E +APIX }"
  params: []

- id: decrement_value_5
  label: "Decrement value"
  kind: action
  command: "E -APIX }"
  params: []

- id: view_7
  label: "View"
  kind: action
  command: "E APIX }"
  params: []

- id: specify_a_value_6
  label: "Specify a value"
  kind: action
  command: "EX* ALIN }"
  params: []

- id: increment_value_6
  label: "Increment value"
  kind: action
  command: "E +ALIN }"
  params: []

- id: decrement_value_6
  label: "Decrement value"
  kind: action
  command: "E -ALIN }"
  params: []

- id: view_8
  label: "View"
  kind: action
  command: "E ALIN }"
  params: []

- id: auto
  label: "Auto"
  kind: action
  command: "EX! *1FILM }"
  params: []

- id: off
  label: "Off"
  kind: action
  command: "EX! *0FILM }"
  params: []

- id: view_setting
  label: "View setting"
  kind: action
  command: "EX! FILM }"
  params: []

- id: set_video_mute_for_an_individual_output
  label: "Set video mute for an individual output"
  kind: action
  command: "X@ * X2( B"
  params: []

- id: mute_video_to_black
  label: "Mute video to black"
  kind: action
  command: "1B"
  params: []

- id: mute_sync_and_video
  label: "Mute sync and video"
  kind: action
  command: "2B"
  params: []

- id: unmute_sync_and_video
  label: "Unmute sync and video"
  kind: action
  command: "0B"
  params: []

- id: specify_a_value_7
  label: "Specify a value"
  kind: action
  command: "EX1% COLR }"
  params: []

- id: increment_value_7
  label: "Increment value"
  kind: action
  command: "E +COLR }"
  params: []

- id: decrement_value_7
  label: "Decrement value"
  kind: action
  command: "E -COLR }"
  params: []

- id: view_9
  label: "View"
  kind: action
  command: "E COLR }"
  params: []

- id: specify_a_value_8
  label: "Specify a value"
  kind: action
  command: "EX1% TINT }"
  params: []

- id: increment_value_8
  label: "Increment value"
  kind: action
  command: "E +TINT }"
  params: []

- id: decrement_value_8
  label: "Decrement value"
  kind: action
  command: "E -TINT }"
  params: []

- id: view_10
  label: "View"
  kind: action
  command: "E TINT }"
  params: []

- id: specify_a_value_9
  label: "Specify a value"
  kind: action
  command: "EX1% CONT }"
  params: []

- id: increment_value_9
  label: "Increment value"
  kind: action
  command: "E +CONT }"
  params: []

- id: decrement_value_9
  label: "Decrement value"
  kind: action
  command: "E -CONT }"
  params: []

- id: view_11
  label: "View"
  kind: action
  command: "E CONT }"
  params: []

- id: specify_a_value_10
  label: "Specify a value"
  kind: action
  command: "EX1% BRIT }"
  params: []

- id: increment_value_10
  label: "Increment value"
  kind: action
  command: "E +BRIT }"
  params: []

- id: decrement_value_10
  label: "Decrement value"
  kind: action
  command: "E -BRIT }"
  params: []

- id: view_12
  label: "View"
  kind: action
  command: "E BRIT }"
  params: []

- id: specify_a_value_11
  label: "Specify a value"
  kind: action
  command: "EX1% HDET }"
  params: []

- id: increment_value_11
  label: "Increment value"
  kind: action
  command: "E +HDET }"
  params: []

- id: decrement_value_11
  label: "Decrement value"
  kind: action
  command: "E -HDET }"
  params: []

- id: view_13
  label: "View"
  kind: action
  command: "E HDET }"
  params: []

- id: specify_a_value_12
  label: "Specify a value"
  kind: action
  command: "EX1^ HCTR }"
  params: []

- id: increment_value_12
  label: "Increment value"
  kind: action
  command: "E +HCTR }"
  params: []

- id: decrement_value_12
  label: "Decrement value"
  kind: action
  command: "E -HCTR }"
  params: []

- id: view_14
  label: "View"
  kind: action
  command: "E HCTR }"
  params: []

- id: specify_a_value_13
  label: "Specify a value"
  kind: action
  command: "EX1& VCTR }"
  params: []

- id: increment_value_13
  label: "Increment value"
  kind: action
  command: "E +VCTR }"
  params: []

- id: decrement_value_13
  label: "Decrement value"
  kind: action
  command: "E -VCTR }"
  params: []

- id: view_15
  label: "View"
  kind: action
  command: "E VCTR }"
  params: []

- id: specify_a_value_14
  label: "Specify a value"
  kind: action
  command: "EX1* HSIZ }"
  params: []

- id: increment_value_14
  label: "Increment value"
  kind: action
  command: "E +HSIZ }"
  params: []

- id: decrement_value_14
  label: "Decrement value"
  kind: action
  command: "E -HSIZ }"
  params: []

- id: view_16
  label: "View"
  kind: action
  command: "E HSIZ }"
  params: []

- id: specify_a_value_15
  label: "Specify a value"
  kind: action
  command: "EX1( VSIZ }"
  params: []

- id: increment_value_15
  label: "Increment value"
  kind: action
  command: "E +VSIZ }"
  params: []

- id: decrement_value_15
  label: "Decrement value"
  kind: action
  command: "E -VSIZ }"
  params: []

- id: view_17
  label: "View"
  kind: action
  command: "E VSIZ }"
  params: []

- id: specify_a_value_16
  label: "Specify a value"
  kind: action
  command: "EX1^ * X1& * X1* * X1( XIMG }"
  params: []

- id: view_18
  label: "View"
  kind: action
  command: "E XIMG }"
  params: []

- id: set_output_rate
  label: "Set output rate"
  kind: action
  command: "EX6) RATE }"
  params: []

- id: view_output_rate
  label: "View output rate"
  kind: action
  command: "E RATE }"
  params: []

- id: set_format
  label: "Set format"
  kind: action
  command: "EX@ * X3# VTPO }"
  params: []

- id: view_setting_2
  label: "View setting"
  kind: action
  command: "EX@ VTPO }"
  params: []

- id: power_save_off
  label: "Power save off"
  kind: action
  command: "E 0PSAV }"
  params: []

- id: power_save_on
  label: "Power save on"
  kind: action
  command: "E 1PSAV }"
  params: []

- id: view_setting_3
  label: "View setting"
  kind: action
  command: "E PSAV }"
  params: []

- id: set_mode
  label: "Set mode"
  kind: action
  command: "E M X2& SSAV }"
  params: []

- id: view_mode
  label: "View mode"
  kind: action
  command: "E MSSAV }"
  params: []

- id: set_custom_color
  label: "Set custom color"
  kind: action
  command: "E C X2* SSAV }"
  params: []

- id: set_time_out_duration
  label: "Set time-out duration"
  kind: action
  command: "E T X2# SSAV }"
  params: []

- id: view_time_out_duration
  label: "View time-out duration"
  kind: action
  command: "E TSSAV }"
  params: []

- id: set_audio_input_format
  label: "Set audio input format"
  kind: action
  command: "E I X! * X3% AFMT }"
  params: []

- id: view_audio_input_format
  label: "View audio input format"
  kind: action
  command: "E I X! AFMT }"
  params: []

- id: set_gain_or_trim
  label: "Set gain or trim"
  kind: action
  command: "E G X5& * X5* AU }"
  params: []

- id: view_gain_or_trim
  label: "View gain or trim"
  kind: action
  command: "E G X5& AU }"
  params: []

- id: mute_audio
  label: "Mute audio"
  kind: action
  command: "E M X5& *1AU }"
  params: []

- id: unmute_audio
  label: "Unmute audio"
  kind: action
  command: "E M X5& *0AU }"
  params: []

- id: set_volume_knob_group
  label: "Set volume knob group"
  kind: action
  command: "E 1* X5^ KNOB }"
  params: []

- id: view_volume_knob_group
  label: "View volume knob group"
  kind: action
  command: "E 1KNOB }"
  params: []

- id: set_volume
  label: "Set volume"
  kind: action
  command: "E D X4^ * X4& GRPM }"
  params: []

- id: raise_volume
  label: "Raise volume"
  kind: action
  command: "E D X4^ * X5! +GRPM }"
  params: []

- id: lower_volume
  label: "Lower volume"
  kind: action
  command: "E D X4^ * X5! -GRPM }"
  params: []

- id: view_volume_level
  label: "View volume level"
  kind: action
  command: "E D X4^ GRPM }"
  params: []

- id: group_mute
  label: "Group mute"
  kind: action
  command: "E D X4* *1GRPM }"
  params: []

- id: group_unmute
  label: "Group unmute"
  kind: action
  command: "E D X4* *0GRPM }"
  params: []

- id: set_bass_or_treble_level
  label: "Set bass or treble level"
  kind: action
  command: "E D X4( * X5) GRPM }"
  params: []

- id: raise_bass_or_treble
  label: "Raise bass or treble"
  kind: action
  command: "E D X4( * X5! +GRPM }"
  params: []

- id: lower_bass_or_treble
  label: "Lower bass or treble"
  kind: action
  command: "E D X4( * X5! -GRPM }"
  params: []

- id: view_bass_or_treble_level
  label: "View bass or treble level"
  kind: action
  command: "E D X4( GRPM }"
  params: []

- id: recall_user_preset
  label: "Recall user preset"
  kind: action
  command: "1* X2! ."
  params: []

- id: save_user_preset
  label: "Save user preset"
  kind: action
  command: "1* X2! ,"
  params: []

- id: delete_user_preset
  label: "Delete user preset"
  kind: action
  command: "E X1* X2! PRST }"
  params: []

- id: recall_input_preset
  label: "Recall input preset"
  kind: action
  command: "2* X2@ ."
  params: []

- id: save_input_preset
  label: "Save input preset"
  kind: action
  command: "2* X2@ ,"
  params: []

- id: delete_input_preset
  label: "Delete input preset"
  kind: action
  command: "E X2* X2@ PRST }"
  params: []

- id: write_user_preset_name
  label: "Write user preset name"
  kind: action
  command: "E 1* X2! , X1$ PNAM }"
  params: []

- id: view_user_preset_name
  label: "View user preset name"
  kind: action
  command: "E 1* X2! PNAM }"
  params: []

- id: write_input_preset_name
  label: "Write input preset name"
  kind: action
  command: "E 2* X2@ , X1$ PNAM }"
  params: []

- id: view_input_preset_name
  label: "View input preset name"
  kind: action
  command: "E 2* X2@ PNAM }"
  params: []

- id: enable_2
  label: "Enable"
  kind: action
  command: "EX! *1AMEM }"
  params: []

- id: disable_2
  label: "Disable"
  kind: action
  command: "EX! *0AMEM }"
  params: []

- id: view_19
  label: "View"
  kind: action
  command: "EX! AMEM }"
  params: []

- id: set_pattern
  label: "Set pattern"
  kind: action
  command: "EX2) TEST }"
  params: []

- id: view_test_pattern
  label: "View test pattern"
  kind: action
  command: "E TEST }"
  params: []

- id: enable_3
  label: "Enable"
  kind: action
  command: "1F"
  params: []

- id: disable_3
  label: "Disable"
  kind: action
  command: "0F"
  params: []

- id: view_20
  label: "View"
  kind: action
  command: "F"
  params: []

- id: cut
  label: "Cut"
  kind: action
  command: "E 0SWEF }"
  params: []

- id: fade_through_black
  label: "Fade through black"
  kind: action
  command: "E 1SWEF }"
  params: []

- id: view_setting_4
  label: "View setting"
  kind: action
  command: "E SWEF }"
  params: []

- id: set_for_fill
  label: "Set for fill"
  kind: action
  command: "EX! *1ASPR }"
  params: []

- id: set_to_follow
  label: "Set to follow"
  kind: action
  command: "EX! *2ASPR }"
  params: []

- id: view_aspect_setting
  label: "View aspect setting"
  kind: action
  command: "EX! ASPR }"
  params: []

- id: enable_mode_1
  label: "Enable mode 1"
  kind: action
  command: "1X"
  params: []

- id: enable_mode_2
  label: "Enable mode 2"
  kind: action
  command: "2X"
  params: []

- id: disable_4
  label: "Disable"
  kind: action
  command: "0X"
  params: []

- id: set_value_2
  label: "Set value"
  kind: action
  command: "EX# * X2% OSCN }"
  params: []

- id: enable_notification
  label: "Enable notification"
  kind: action
  command: "E N1HDCP }"
  params: []

- id: disable_notification
  label: "Disable notification"
  kind: action
  command: "E N0HDCP }"
  params: []

- id: enable_hdcp_authorization
  label: "Enable HDCP authorization"
  kind: action
  command: "E E X! *1HDCP }"
  params: []

- id: disable_hdcp_authorization
  label: "Disable HDCP authorization"
  kind: action
  command: "E E X! *0HDCP }"
  params: []

- id: set_hdcp_mode
  label: "Set HDCP mode"
  kind: action
  command: "E S X5( HDCP }"
  params: []

- id: view_hdcp_mode_setting
  label: "View HDCP mode setting"
  kind: action
  command: "E SHDCP }"
  params: []

- id: set_osd_bug_time_out
  label: "Set OSD bug time-out"
  kind: action
  command: "EX2# MDUR }"
  params: []

- id: view_time_out
  label: "View time-out"
  kind: action
  command: "E MDUR }"
  params: []

- id: erase_user_supplied_web_pages_and_files_24_28
  label: "Erase user-supplied web pages and files [24 28]"
  kind: action
  command: "E filename EF }"
  params: []

- id: erase_current_directory_and_files_24_28
  label: "Erase current directory and files [24 28]"
  kind: action
  command: "E /EF }"
  params: []

- id: erase_current_directory_and_subdirectories_24_28
  label: "Erase current directory and subdirectories [24 28]"
  kind: action
  command: "E //EF }"
  params: []

- id: erase_flash_memory_24
  label: "Erase flash memory [24]"
  kind: action
  command: "E ZFFF }"
  params: []

- id: reset_all_device_settings_to_factory_default_24
  label: "Reset all device settings to factory default [24]"
  kind: action
  command: "E ZXXX }"
  params: []

- id: absolute_system_reset_includes_setting_dhcp_to_off_and_the_ip_address_to_192_168_254_254_24
  label: "Absolute system reset (includes setting DHCP to Off and the IP address to 192.168.254.254) [24]"
  kind: action
  command: "E ZQQQ }"
  params: []

- id: absolute_system_reset_retain_ip_24
  label: "Absolute system reset (retain IP) [24]"
  kind: action
  command: "E ZY }"
  params: []

- id: set_verbose_mode
  label: "Set verbose mode"
  kind: action
  command: "EX5# CV }"
  params: []

- id: view_verbose_mode
  label: "View verbose mode"
  kind: action
  command: "E CV }"
  params: []

- id: general_information
  label: "General Information"
  kind: action
  command: "I"
  params: []

- id: view_internal_temperature
  label: "View internal temperature"
  kind: action
  command: "E 20STAT }"
  params: []

- id: save_configuration_to_file_system
  label: "Save configuration to file system"
  kind: action
  command: "E 1* X4% XF }"
  params: []

- id: restore_configuration_from_file_system
  label: "Restore configuration from file system"
  kind: action
  command: "E 0* X4% XF }"
  params: []

- id: set_unit_name_24
  label: "Set unit name [24]"
  kind: action
  command: "EX1$ CN }"
  params: []

- id: set_unit_name_to_factory_default_24
  label: "Set unit name to factory default [24]"
  kind: action
  command: "E• CN }"
  params: []

- id: view_unit_name
  label: "View unit name"
  kind: action
  command: "E CN }"
  params: []

- id: set_dhcp_mode_24
  label: "Set DHCP mode [24]"
  kind: action
  command: "EX( DH }"
  params: []

- id: view_dhcp_mode
  label: "View DHCP mode"
  kind: action
  command: "E DH }"
  params: []

- id: set_ip_address_24
  label: "Set IP address [24]"
  kind: action
  command: "EX4) CI }"
  params: []

- id: set_subnet_mask_24
  label: "Set subnet mask [24]"
  kind: action
  command: "EX4! CS }"
  params: []

- id: view_subnet_mask
  label: "View subnet mask"
  kind: action
  command: "E CS }"
  params: []

- id: set_gateway_ip_address_24
  label: "Set gateway IP address [24]"
  kind: action
  command: "EX4@ CG }"
  params: []

- id: view_gateway_ip_address
  label: "View gateway IP address"
  kind: action
  command: "E CG }"
  params: []

- id: reboot_networking
  label: "Reboot networking"
  kind: action
  command: "E 2BOOT }"
  params: []

- id: set_zeroconf_m_dns_discovery_services
  label: "Set Zeroconf (mDNS) discovery services"
  kind: action
  command: "EX( ZCON }"
  params: []

- id: view_zeroconf_m_dns_discovery_services
  label: "View Zeroconf (mDNS) discovery services"
  kind: action
  command: "E ZCON }"
  params: []

- id: set_administrator_password
  label: "Set administrator password"
  kind: action
  command: "EX5@ CA }"
  params: []

- id: view_administrator_password
  label: "View administrator password"
  kind: action
  command: "E CA }"
  params: []

- id: reset_clear_administrator_password
  label: "Reset (clear) administrator password"
  kind: action
  command: "E• CA }"
  params: []

- id: set_user_password
  label: "Set user password"
  kind: action
  command: "EX5@ CU }"
  params: []

- id: view_user_password
  label: "View user password"
  kind: action
  command: "E CU }"
  params: []

- id: reset_clear_user_password
  label: "Reset (clear) user password"
  kind: action
  command: "E• CU }"
  params: []
```

## Feedbacks
```yaml
- id: view_output_mute_status
  label: "View output mute status"
  kind: query
  query_command: "X@ *B"

- id: view_mute_status_on_all_outputs
  label: "View mute status on all outputs"
  kind: query
  query_command: "B"

- id: view_screen_saver_status
  label: "View screen saver status"
  kind: query
  query_command: "E SSSAV }"

- id: view_audio_mute_status
  label: "View audio mute status"
  kind: query
  query_command: "E M X5& AU }"

- id: view_group_mute_status
  label: "View group mute status"
  kind: query
  query_command: "E D X4* GRPM }"

- id: query_input_preset_availability
  label: "Query input preset availability"
  kind: query
  query_command: "51#"

- id: view_status
  label: "View status"
  kind: query
  query_command: "X"

- id: view_status_2
  label: "View status"
  kind: query
  query_command: "EX# OSCN }"

- id: query_notification
  label: "Query notification"
  kind: query
  query_command: "E NHDCP }"

- id: query_input
  label: "Query input"
  kind: query
  query_command: "E I X! HDCP }"

- id: query_output
  label: "Query output"
  kind: query
  query_command: "E O X@ HDCP }"

- id: query_hdcp_authorization_status
  label: "Query HDCP authorization status"
  kind: query
  query_command: "E E X! HDCP }"

- id: view_video_signal_presence_status
  label: "View video signal presence status"
  kind: query
  query_command: "E 0LS }"

- id: query_firmware_version
  label: "Query firmware version"
  kind: query
  query_command: "Q"

- id: query_full_firmware_version
  label: "Query full firmware version"
  kind: query
  query_command: "*Q"

- id: query_part_number
  label: "Query part number"
  kind: query
  query_command: "N"

- id: read_ip_address
  label: "Read IP address"
  kind: query
  query_command: "E CI }"

- id: read_mac_address
  label: "Read MAC address"
  kind: query
  query_command: "E CH }"

- id: query_the_number_of_open_connections
  label: "Query the number of open connections"
  kind: query
  query_command: "E CC }"
```

## Variables
```yaml
# SIS parameter symbols (X!, X@, X#, X$, X%, X1% ... X5() are scoped to individual
# actions as `params` and are not independently settable state. No standalone
# settable variables exist outside the action catalogue.
# UNRESOLVED: none beyond the action-scoped params above.
```

## Events
```yaml
# Scaler-initiated (unsolicited) messages. Sent on local events; host need not respond.
- id: input_switch_event
  description: >
    Emitted when an input is switched. Payload format: "In X! All ]" (X! = new input
    number). Example: input 3 selected → "In3•All ]".
- id: reconfig_event
  description: >
    Emitted when an input is switched or a new input signal is detected.
    Payload: "Reconfig ]".
- id: hot_plug_event
  description: >
    Emitted when a hot-plug event is detected on output X@.
    Payload format: "HplgO X@]" (X@ = 1 HDMI A, 2 HDMI B, 3 Out C).
```

## Macros
```yaml
# No multi-step SIS command sequences are documented. Rear-panel reset modes
# (1, 4, 5) are hardware button hold-sequences, not SIS macros - see Safety.
# UNRESOLVED: none.
```

## Safety
```yaml
confirmation_required_for:
  # Destructive SIS commands - each resets/deletes device state. Source flags
  # these with the [24] privilege/error superscript (administrator-only).
  - reset_all_device_settings_to_factory_default_24        # E ZXXX }
  - absolute_system_reset_includes_setting_dhcp_to_off_and_the_ip_address_to_192_168_254_254_24  # E ZQQQ }
  - absolute_system_reset_retain_ip_24                      # E ZY }
  - erase_flash_memory_24                                   # E ZFFF }
  - erase_current_directory_and_subdirectories_24_28        # E //EF }
  - erase_current_directory_and_files_24_28                 # E /EF }
  - erase_user_supplied_web_pages_and_files_24_28           # E filename EF }
interlocks:
  - "TCP/IP setting changes (DHCP, IP, subnet, gateway) do NOT take effect until the reboot-networking command is issued: E 2BOOT }"
  - "All reset modes close every open IP/Telnet connection and all sockets - each mode is a discrete function, not a continuation."
  - "Mode 1 reset reverts firmware to factory default for a SINGLE power cycle only; source warns DO NOT operate on the resulting firmware version."
  - "Front Panel Lockout mode 1 (1X) disables ALL front-panel functions; only USB/RS-232/Ethernet control remains operational. Mode 2 (2X) permits only input switching and volume control from the front panel."
  - "Audio breakaway ($) is invalid to an input configured for a digital audio format; video breakaway (&) is invalid FROM such an input. Violations return E17."
  - "HDCP authorization/blocking commands (E E X! *X(HDCP }) are valid for HDMI inputs (3+) only."
notes:
  - "Factory default for ALL accounts is the password = device serial number. Performing E ZQQQ } or rear-panel mode 5 resets passwords to no-password."
```

## Notes
- **Protocol:** Extron Simple Instruction Set (SIS). Commands are ASCII; no special start/end characters are required to frame a command. Valid commands are executed and acknowledged; invalid commands return an error code.
- **Response terminator convention:** `]` = carriage return + line feed (CR/LF) marking end of response. `}` = carriage return with no line feed (host→device); for URL-encoded commands substitute the pipe `|`. `E` = Escape (substitute `W` for URL-encoded). A space is a literal space.
- **Verbose mode (`X5#`):** `0` = clear/none (Telnet default); `1` = verbose (RS-232 default); `2` = tagged responses to queries; `3` = verbose + tagged. Verbose modes 2/3 change several response formats (noted per-command in the source); implementers must parse both forms.
- **Error codes:** `E01` invalid input number; `E06` invalid input channel; `E10` invalid command; `E11` invalid preset number; `E12` invalid port number; `E13` invalid parameter; `E14` not valid for this configuration; `E17` invalid command for signal type (auto-switch active, or breakaway into a digital-audio input); `E22` busy; `E24` privilege violation (admin-only command); `E25` device not present; `E26` maximum connections exceeded; `E28` bad filename / file not found. Source superscripts `14`, `24`, `28` on a command row indicate that command may emit the corresponding error.
- **IP Link:** Ethernet control via IP Link is **IN1608 IPCP only** — the IN1606 does not support IP Link.
- **USB control:** The front-panel USB 2.0 port presents a virtual serial port and accepts the same SIS command stream as RS-232.
- **Internal web pages:** An on-board HTTP server at the device IP (default `192.168.254.254`) provides a browser GUI. Not compatible with IE compatibility mode; Extron recommends Firefox or Chrome. Admins can adjust all settings; users are limited to input selection, volume, freeze, user/input preset recall, audio mute, video mute, and Auto-Image. No REST request/response contract is documented — the web UI is a control surface over the same SIS state, not a documented programmatic API.
- **Symbol legend (parameters):** `X!` input (1–6 IN1606 / 1–8 IN1608); `X@` output (1=HDMI A top, 2=HDMI B bottom, 3=Out C); `X#` input video format; `X1$` text label (≤63 chars, but ≤16 for input names); `X2!` user presets 01–16; `X2@` input presets 1–128; `X2#` OSD-bug / output-sync timeout; `X2$` executive-mode status; `X2(` video output mute; `X3#` HDMI output format; `X3&` power-save mode; `X4)` IP, `X4!` subnet, `X4@` gateway, `X4#` MAC; `X5&` gain/mute control; `X5*` gain/trim level; `X5(` HDCP mode; `X6)` EDID / output-rate index (0 automatic, 10–92 standard rates, 3–8/201/202 custom slots).
- **Copyright banner:** On TCP/IP or Telnet connect (or after a power cycle over RS-232) the device emits `] © Copyright YYYY, Extron Electronics, [model], V x.xx, 60-XXXX-XX ] Ddd, DD MMM YYYY HH:MM:SS ]` followed by the `] Password:` prompt.

<!-- UNRESOLVED: TCP/Telnet control port not stated in this excerpt (do not assume 23). -->
<!-- UNRESOLVED: serial data_bits not stated (only stop bits / parity / flow control given). -->
<!-- UNRESOLVED: firmware version range and IN1608 xi / IN1608 IPCP-specific command deltas not verified against a separate programmer's guide. -->
<!-- UNRESOLVED: maximum number of simultaneous TCP/Telnet connections value not numerically stated (referenced as "maximum number of open connections"). -->

## Provenance

```yaml
source_domains:
  - media.extron.com
  - manua.ls
  - manualmachine.com
source_urls:
  - https://media.extron.com/public/download/files/userman/IN1606-1608_UG_68-2290-01_J.pdf
  - https://media.extron.com/public/download/files/userman/68-2290-50_B_IN1606_SUG.pdf
  - https://media.extron.com/public/product/panel/in1606.pdf
  - https://www.manua.ls/extron/in1606/manual
  - https://manualmachine.com/extronelectronic/in1606/1323808-user-manual/
retrieved_at: 2026-07-26T07:32:11.596Z
last_checked_at: 2026-10-01T12:26:50.090Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T12:26:50.090Z
matched_actions: 213
action_count: 213
confidence: medium
summary: "All 213 spec actions match SIS command tokens verbatim in the source's Command and Response table; transport parameters (9600 baud, 1 stop bit, no parity, no flow control, password auth) are stated. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source."
- "this excerpt derives from the IN1606/IN1608 user guide (68-2290-01 Rev.J); the IN1608 IPCP / IP Link variant and the retired IN1608 xi share SIS but were not separately verified."
- "voltage, current, and power specifications are not in this command-protocol excerpt."
- "data bits not stated in source (source states only \"1 stop bit, no parity, and no flow control\")"
- "TCP/Telnet port number not explicitly stated in source excerpt (Telnet application referenced but port not given)"
- "none beyond the action-scoped params above."
- none.
- "TCP/Telnet control port not stated in this excerpt (do not assume 23)."
- "serial data_bits not stated (only stop bits / parity / flow control given)."
- "firmware version range and IN1608 xi / IN1608 IPCP-specific command deltas not verified against a separate programmer's guide."
- "maximum number of simultaneous TCP/Telnet connections value not numerically stated (referenced as \"maximum number of open connections\")."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
