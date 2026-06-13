---
spec_id: admin/sanyo-north-america-corp-plc-xm-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sanyo North America Corp PLC XM Series Control Spec"
manufacturer: Sanyo
model_family: PLC-XM100
aliases: []
compatible_with:
  manufacturers:
    - Sanyo
    - "Sanyo North America Corp"
  models:
    - PLC-XM100
    - PLC-XM150
    - PLC-XM100L
    - PLC-XM150L
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
  - manualslib.com
source_urls:
  - https://www.audiogeneral.com/Sanyo/plcxm_series_rs232.pdf
  - https://www.manualslib.com/products/Sanyo-Plc-Xm150-3068582.html
retrieved_at: 2026-06-12T01:21:14.669Z
last_checked_at: 2026-06-12T19:38:23.872Z
generated_at: 2026-06-12T19:38:23.872Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "factory-default baud setting is 19200; the 9600 alternative is a service-mode option, so the device-issued default is unambiguous. Source lists both \"9600 / 19200\" but the init note says initial value is 19200. The spec records 19200 as the default."
  - "this spec covers RS-232C only as documented. The vendor also offers a \"NETWORK\" input selection command (C08) but does not document a separate TCP/IP command set, so no TCP transport is recorded."
  - "source documents only discrete action commands; no continuous"
  - "source does not document any unsolicited event/notification"
  - "source does not document any multi-step macro sequences"
  - "source documents abnormal-state conditions (Abnormal Temperature,"
  - "no firmware version compatibility range is stated in the source."
  - "no voltage/current/power specifications are stated in the source."
  - "no fault-recovery or error-state machine beyond the abnormal-temperature/power/lamp status codes is documented."
verification:
  verdict: verified
  checked_at: 2026-06-12T19:38:23.872Z
  matched_actions: 66
  action_count: 66
  confidence: medium
  summary: "All 66 spec actions matched literally in source; full command catalogue represented; transport parameters confirmed. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Sanyo North America Corp PLC XM Series Control Spec

## Summary
RS-232C serial control spec for the Sanyo PLC-XM100 / PLC-XM150 / PLC-XM100L / PLC-XM150L projector series. Document covers line-format ("C" + two chars + CR for execution, "CR" + one char + CR for status read), pipelining timing rules, and the full Functional Execution and Status Read command catalogues.

<!-- UNRESOLVED: factory-default baud setting is 19200; the 9600 alternative is a service-mode option, so the device-issued default is unambiguous. Source lists both "9600 / 19200" but the init note says initial value is 19200. The spec records 19200 as the default. -->
<!-- UNRESOLVED: this spec covers RS-232C only as documented. The vendor also offers a "NETWORK" input selection command (C08) but does not document a separate TCP/IP command set, so no TCP transport is recorded. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200  # default; 9600 also supported per source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred from C00/C01/C02 power commands
  - routable        # inferred from C05-C08, C23-C25, C33-C35, C50-C53 input select commands
  - queryable       # inferred from CR0-CR7 status read commands
  - levelable       # inferred from C09/C0A volume, C20/C21 brightness, C46/C47 zoom, C4A/C4B focus, C8E-C91 keystone commands
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: "C00[CR]"
  params: []

- id: power_off_quick
  label: Power Off (Quick Power Off)
  kind: action
  command: "C01[CR]"
  params: []

- id: power_off
  label: Power Off (Normal)
  kind: action
  command: "C02[CR]"
  params: []

- id: select_input_1
  label: Select Input 1
  kind: action
  command: "C05[CR]"
  params: []

- id: select_input_2
  label: Select Input 2
  kind: action
  command: "C06[CR]"
  params: []

- id: select_input_3
  label: Select Input 3
  kind: action
  command: "C07[CR]"
  params: []

- id: select_network_input
  label: Select Network Input
  kind: action
  command: "C08[CR]"
  params: []

- id: volume_up
  label: Volume Up
  kind: action
  command: "C09[CR]"
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "C0A[CR]"
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "C0B[CR]"
  params: []

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "C0C[CR]"
  params: []

- id: video_mute_on
  label: Video Mute On (Shutter Close)
  kind: action
  command: "C0D[CR]"
  params: []

- id: video_mute_off
  label: Video Mute Off (Shutter Open)
  kind: action
  command: "C0E[CR]"
  params: []

- id: screen_normal_4_3
  label: Screen Normal Size (4:3)
  kind: action
  command: "C0F[CR]"
  params: []

- id: screen_wide_16_9
  label: Screen Wide Size (16:9)
  kind: action
  command: "C10[CR]"
  params: []

- id: menu_on
  label: Menu On
  kind: action
  command: "C1C[CR]"
  params: []

- id: menu_off
  label: Menu Off
  kind: action
  command: "C1D[CR]"
  params: []

- id: display_clear
  label: Display Clear
  kind: action
  command: "C1E[CR]"
  params: []

- id: brightness_up
  label: Brightness Up
  kind: action
  command: "C20[CR]"
  params: []

- id: brightness_down
  label: Brightness Down
  kind: action
  command: "C21[CR]"
  params: []

- id: input_2_video
  label: Select Input 2 Video
  kind: action
  command: "C23[CR]"
  params: []

- id: input_2_component
  label: Select Input 2 Y,Pb/Cb,Pr/Cr
  kind: action
  command: "C24[CR]"
  params: []

- id: input_2_rgb
  label: Select Input 2 RGB
  kind: action
  command: "C25[CR]"
  params: []

- id: image_toggle
  label: Image (toggle image setting)
  kind: action
  command: "C27[CR]"
  params: []

- id: on_start_enable
  label: On Start Enable
  kind: action
  command: "C28[CR]"
  params: []

- id: on_start_disable
  label: On Start Disable
  kind: action
  command: "C29[CR]"
  params: []

- id: power_management_ready
  label: Power Management Ready
  kind: action
  command: "C2A[CR]"
  params: []

- id: power_management_off
  label: Power Management Off
  kind: action
  command: "C2B[CR]"
  params: []

- id: power_management_shutdown
  label: Power Management Shutdown
  kind: action
  command: "C2E[CR]"
  params: []

- id: dzoom_up
  label: Digital Zoom Up
  kind: action
  command: "C30[CR]"
  params: []

- id: dzoom_down
  label: Digital Zoom Down
  kind: action
  command: "C31[CR]"
  params: []

- id: input_3_video
  label: Select Input 3 Video
  kind: action
  command: "C33[CR]"
  params: []

- id: input_3_svideo
  label: Select Input 3 S-Video
  kind: action
  command: "C34[CR]"
  params: []

- id: input_3_component
  label: Select Input 3 Y,Pb/Cb,Pr/Cr
  kind: action
  command: "C35[CR]"
  params: []

- id: pointer_right
  label: Pointer Right
  kind: action
  command: "C3A[CR]"
  params: []

- id: pointer_left
  label: Pointer Left
  kind: action
  command: "C3B[CR]"
  params: []

- id: pointer_up
  label: Pointer Up
  kind: action
  command: "C3C[CR]"
  params: []

- id: pointer_down
  label: Pointer Down
  kind: action
  command: "C3D[CR]"
  params: []

- id: enter
  label: Enter (Select)
  kind: action
  command: "C3F[CR]"
  params: []

- id: freeze_on
  label: Freeze On
  kind: action
  command: "C43[CR]"
  params: []

- id: freeze_off
  label: Freeze Off
  kind: action
  command: "C44[CR]"
  params: []

- id: zoom_down
  label: Zoom Down
  kind: action
  command: "C46[CR]"
  params: []

- id: zoom_up
  label: Zoom Up
  kind: action
  command: "C47[CR]"
  params: []

- id: focus_down
  label: Focus Down
  kind: action
  command: "C4A[CR]"
  params: []

- id: focus_up
  label: Focus Up
  kind: action
  command: "C4B[CR]"
  params: []

- id: input_1_analog_rgb
  label: Select Input 1 Analog RGB
  kind: action
  command: "C50[CR]"
  params: []

- id: input_1_scart
  label: Select Input 1 SCART
  kind: action
  command: "C51[CR]"
  params: []

- id: input_1_dvi_pc_digital
  label: Select Input 1 DVI (PC Digital)
  kind: action
  command: "C52[CR]"
  params: []

- id: input_1_dvi_av_hdcp
  label: Select Input 1 DVI (AV HDCP)
  kind: action
  command: "C53[CR]"
  params: []

- id: lens_shift_up
  label: Lens Shift Up
  kind: action
  command: "C5D[CR]"
  params: []

- id: lens_shift_down
  label: Lens Shift Down
  kind: action
  command: "C5E[CR]"
  params: []

- id: lens_shift_left
  label: Lens Shift Left
  kind: action
  command: "C5F[CR]"
  params: []

- id: lens_shift_right
  label: Lens Shift Right
  kind: action
  command: "C60[CR]"
  params: []

- id: auto_pc_adj
  label: Auto PC Adjust
  kind: action
  command: "C89[CR]"
  params: []

- id: presentation_timer_start
  label: Presentation Timer Start
  kind: action
  command: "C8A[CR]"
  params: []

- id: presentation_timer_exit
  label: Presentation Timer Exit
  kind: action
  command: "C8B[CR]"
  params: []

- id: keystone_up
  label: Keystone Up
  kind: action
  command: "C8E[CR]"
  params: []

- id: keystone_down
  label: Keystone Down
  kind: action
  command: "C8F[CR]"
  params: []

- id: keystone_right
  label: Keystone Right
  kind: action
  command: "C90[CR]"
  params: []

- id: keystone_left
  label: Keystone Left
  kind: action
  command: "C91[CR]"
  params: []

- id: status_read
  label: Status Read
  kind: query
  command: "CR0[CR]"
  params: []

- id: input_mode_read
  label: Input Mode Read
  kind: query
  command: "CR1[CR]"
  params: []

- id: lamp_time_read
  label: Lamp Time Read
  kind: query
  command: "CR3[CR]"
  params: []

- id: setting_read
  label: Setting Read
  kind: query
  command: "CR4[CR]"
  params: []

- id: temp_read
  label: Temperature Read
  kind: query
  command: "CR6[CR]"
  params: []

- id: lamp_mode_read
  label: Lamp Mode Read
  kind: query
  command: "CR7[CR]"
  params: []
```

## Feedbacks
```yaml
- id: functional_execution_ack
  type: enum
  values: [ack, error]
  description: "Successful Functional Execution Command returns ACK (0x06) + CR (0x0D). Undecodable data returns '?' + CR."

- id: projector_status
  type: enum
  values:
    - "00"  # Power ON
    - "80"  # Standby
    - "40"  # Countdown in process
    - "20"  # Cooling Down in process
    - "10"  # Power Failure
    - "28"  # Cooling Down in process due to Abnormal Temperature
    - "88"  # Standby after Cooling Down due to Abnormal Temperature
    - "24"  # Power-Save Cooling Down in process
    - "04"  # Power Save
    - "21"  # Cooling Down in process after OFF due to Lamp Failure
    - "81"  # Standby after Cooling Down due to Lamp Failure
    - "2C"  # Cooling Down in process after OFF due to Shutter Management
    - "8C"  # Standby after Cooling Down due to Shutter Management
  description: "Response to CR0 (Status Read). 2-char hex code returned as ASCII."

- id: input_mode
  type: enum
  values:
    - "1"  # Input 1
    - "2"  # Input 2
    - "3"  # Input 3
    - "4"  # Input 4 (Networking-capable models only)
  description: "Response to CR1 (Input Mode Read). 1-char ASCII digit."

- id: lamp_hours
  type: string
  description: "Response to CR3 (Lamp Time Read). 5-digit decimal, e.g. '00410' = 410 hours. Note: returned value is lamp operating time multiplied by a vendor coefficient, not actual elapsed time."

- id: screen_setting
  type: enum
  values:
    - "11"  # Normal Screen Setting
    - "10"  # Rear & Ceiling ON (top/bottom reversed)
    - "01"  # Rear ON (left/right reversed)
    - "00"  # Ceiling ON (top/bottom + left/right reversed)
  description: "Response to CR4 (Setting Read). 2-char code."

- id: internal_temperature
  type: string
  description: "Response to CR6 (Temp Read). Space-separated 3-tuple of sensor readings, e.g. ' 31.5   35.2 33.4'. Format is ' XX.X'. 'E00.0' indicates sensor hardware error; '-05.5' indicates sub-zero reading."

- id: lamp_mode
  type: enum
  values:
    - "00"  # Lamp is ON
    - "01"  # Lamp is OFF
  description: "Response to CR7 (Lamp Mode Read). 2-char code."
```

## Variables
```yaml
# UNRESOLVED: source documents only discrete action commands; no continuous
# settable variables (e.g. volume absolute value, brightness absolute value)
# are exposed. All level controls are increment/decrement style.
```

## Events
```yaml
# UNRESOLVED: source does not document any unsolicited event/notification
# stream from the projector. All status updates are poll-based via CR0/CR1/CR3/CR4/CR6/CR7.
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step macro sequences
# stored on the device or defined by the protocol.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # C02 displays "Power OFF?" message and requires second send to confirm
interlocks: []
# UNRESOLVED: source documents abnormal-state conditions (Abnormal Temperature,
# Power Failure, Lamp Failure, Shutter abnormal, Filter abnormal) that suspend
# command execution, but does not prescribe a user-facing interlock or
# recovery sequence beyond powering off and clearing the fault on next power-on.
```

## Notes
- Line format: Functional Execution = "C" + 2 chars + CR (0x0D). Status Read = "C" + "R" + 1 char + CR. Commands must be uppercase A–Z.
- Decode starts only after CR (0x0D) is received.
- Receive buffer clears on LF (0x0A), EOF (0x1A), or inter-character gap > 1 second.
- Pipelining: 100 ms interval for VOLUME+/-, ZOOM UP/DOWN, FOCUS UP/DOWN, LENS-SHIFT UP/DOWN/RIGHT. 500 ms interval for all other commands. 500 ms minimum for Status Read after response.
- Do not send next command before receiving response; exception: no response after 5 s.
- ~7 s internal initialization after AC plug-in; commands during this window return ACK but are not executed (Status Read becomes available 500 ms after POWER ON ACK).
- During countdown/cooling/input-switching (5 s) windows, ACK is returned but commands (other than Status Read in select cases) are not executed.
- Baud rate 9600 is selectable only via service mode; factory default is 19200.
- C08 "NETWORK" input is a source-selection input key; the spec covers RS-232C only, so no IP/TCP command set is included.
- Lamp hours (CR3) returns a vendor-coefficient-multiplied value, not actual elapsed hours.

<!-- UNRESOLVED: no firmware version compatibility range is stated in the source. -->
<!-- UNRESOLVED: no voltage/current/power specifications are stated in the source. -->
<!-- UNRESOLVED: no fault-recovery or error-state machine beyond the abnormal-temperature/power/lamp status codes is documented. -->

## Provenance

```yaml
source_domains:
  - audiogeneral.com
  - manualslib.com
source_urls:
  - https://www.audiogeneral.com/Sanyo/plcxm_series_rs232.pdf
  - https://www.manualslib.com/products/Sanyo-Plc-Xm150-3068582.html
retrieved_at: 2026-06-12T01:21:14.669Z
last_checked_at: 2026-06-12T19:38:23.872Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:38:23.872Z
matched_actions: 66
action_count: 66
confidence: medium
summary: "All 66 spec actions matched literally in source; full command catalogue represented; transport parameters confirmed. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "factory-default baud setting is 19200; the 9600 alternative is a service-mode option, so the device-issued default is unambiguous. Source lists both \"9600 / 19200\" but the init note says initial value is 19200. The spec records 19200 as the default."
- "this spec covers RS-232C only as documented. The vendor also offers a \"NETWORK\" input selection command (C08) but does not document a separate TCP/IP command set, so no TCP transport is recorded."
- "source documents only discrete action commands; no continuous"
- "source does not document any unsolicited event/notification"
- "source does not document any multi-step macro sequences"
- "source documents abnormal-state conditions (Abnormal Temperature,"
- "no firmware version compatibility range is stated in the source."
- "no voltage/current/power specifications are stated in the source."
- "no fault-recovery or error-state machine beyond the abnormal-temperature/power/lamp status codes is documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
