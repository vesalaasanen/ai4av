---
spec_id: admin/christie-lx1000-900-1200-lw600
schema_version: ai4av-public-spec-v1
revision: 1
title: "Christie LX 1000 / 900 / 1200 / LW600 Control Spec"
manufacturer: Christie
model_family: LX700
aliases: []
compatible_with:
  manufacturers:
    - Christie
  models:
    - LX700
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - preproduction.christiedigital.com
  - christiedigital.com
source_urls:
  - https://preproduction.christiedigital.com/globalassets/resources/public/020-000139-01-christie-lx700-rs232-serial-communications.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000141-christie-lx1000-user-manual.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000046-02-lw600-rs232-expnd-codes.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000053-02-christie-lx900-lw600-user-manual.pdf
retrieved_at: 2026-05-14T15:02:49.722Z
last_checked_at: 2026-06-02T17:21:54.285Z
generated_at: 2026-06-02T17:21:54.285Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document is titled for LX700 only; applicability to LX1000/900/1200/LW600 assumed by family grouping and not explicitly stated in this excerpt."
  - "per-model coefficient not stated in source"
  - "source does not document a generic settable-parameter channel"
  - "source does not document unsolicited notifications / async events."
  - "source does not describe multi-step sequences."
  - "only \"C02\" implies confirmation (\"Power OFF?\" message); C01 quick-off bypasses it"
  - "per-model lamp-time coefficient, exact model-by-model applicability of the LX700 command set to LX1000/900/1200/LW600, and any firmware-version gating of individual commands are not stated in this source."
  - "the 19200 baud \"initial setting\" is taken as the default; 9600 fallback is supported only via service-mode change. The on-wire default at first power-on is 19200 per the source."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:21:54.285Z
  matched_actions: 66
  action_count: 66
  confidence: medium
  summary: "All 66 spec action ids matched literally in source; transport parameters (19200 baud, 8 data bits, no parity, 1 stop bit) verified; no commands extra. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Christie LX 1000 / 900 / 1200 / LW600 Control Spec

## Summary
RS-232C control protocol for Christie LX-series projectors. Commands are ASCII strings starting with `C` (execution) or `CR` (status read), terminated by `0x0D` carriage return. Source document is the "LX700 RS232 Codes — Basic Technical Reference" (Rev. 1, 11/08); command set is treated as applicable to the LX1000/900/1200/LW600 family per the family-level spec.

<!-- UNRESOLVED: source document is titled for LX700 only; applicability to LX1000/900/1200/LW600 assumed by family grouping and not explicitly stated in this excerpt. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200  # source: "initial setting value is 19200" (9600 also supported, changeable in service mode)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred: POWER ON / POWER OFF commands present (C00, C01, C02)
- routable   # inferred: INPUT selection commands present (C05-C08, C23-C25, C33-C35, C50-C53)
- queryable  # inferred: Status Read Commands present (CR0-CR7)
- levelable  # inferred: VOLUME +/-, BRIGHTNESS +/-, ZOOM +/-, FOCUS +/- present
```

## Actions
```yaml
- id: power_on
  label: Power ON
  kind: action
  command: "C00"  # ASCII, terminated by 0x0D
  params: []

- id: power_off_quick
  label: Power OFF (Quick)
  kind: action
  command: "C01"
  params: []

- id: power_off
  label: Power OFF
  kind: action
  command: "C02"
  params: []

- id: input_1
  label: INPUT 1
  kind: action
  command: "C05"
  params: []

- id: input_2
  label: INPUT 2
  kind: action
  command: "C06"
  params: []

- id: input_3
  label: INPUT 3
  kind: action
  command: "C07"
  params: []

- id: input_network
  label: NETWORK
  kind: action
  command: "C08"
  params: []

- id: volume_up
  label: Volume Up
  kind: action
  command: "C09"
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "C0A"
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "C0B"
  params: []

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "C0C"
  params: []

- id: video_mute_on
  label: Video Mute On
  kind: action
  command: "C0D"
  params: []

- id: video_mute_off
  label: Video Mute Off
  kind: action
  command: "C0E"
  params: []

- id: screen_normal_size
  label: Screen Normal Size (4:3)
  kind: action
  command: "C0F"
  params: []

- id: screen_wide_size
  label: Screen Wide Size (16:9)
  kind: action
  command: "C10"
  params: []

- id: menu_on
  label: Menu On
  kind: action
  command: "C1C"
  params: []

- id: menu_off
  label: Menu Off
  kind: action
  command: "C1D"
  params: []

- id: display_clear
  label: Display Clear
  kind: action
  command: "C1E"
  params: []

- id: brightness_up
  label: Brightness +
  kind: action
  command: "C20"
  params: []

- id: brightness_down
  label: Brightness -
  kind: action
  command: "C21"
  params: []

- id: input_2_video
  label: Input 2 Video
  kind: action
  command: "C23"
  params: []

- id: input_2_yuv
  label: Input 2 Y,Pb/Cb,Pr/Cr
  kind: action
  command: "C24"
  params: []

- id: input_2_rgb
  label: Input 2 RGB
  kind: action
  command: "C25"
  params: []

- id: image
  label: Image
  kind: action
  command: "C27"
  params: []

- id: on_start_enable
  label: On Start Enable
  kind: action
  command: "C28"
  params: []

- id: on_start_disable
  label: On Start Disable
  kind: action
  command: "C29"
  params: []

- id: power_management_ready
  label: Power Management Ready
  kind: action
  command: "C2A"
  params: []

- id: power_management_off
  label: Power Management Off
  kind: action
  command: "C2B"
  params: []

- id: power_management_shutdown
  label: Power Management Shutdown
  kind: action
  command: "C2E"
  params: []

- id: dzoom_up
  label: D.Zoom +
  kind: action
  command: "C30"
  params: []

- id: dzoom_down
  label: D.Zoom -
  kind: action
  command: "C31"
  params: []

- id: input_3_video
  label: Input 3 Video
  kind: action
  command: "C33"
  params: []

- id: input_3_svideo
  label: Input 3 S-Video
  kind: action
  command: "C34"
  params: []

- id: input_3_yuv
  label: Input 3 Y,Pb/Cb,Pr/Cr
  kind: action
  command: "C35"
  params: []

- id: pointer_right
  label: Pointer Right
  kind: action
  command: "C3A"
  params: []

- id: pointer_left
  label: Pointer Left
  kind: action
  command: "C3B"
  params: []

- id: pointer_up
  label: Pointer Up
  kind: action
  command: "C3C"
  params: []

- id: pointer_down
  label: Pointer Down
  kind: action
  command: "C3D"
  params: []

- id: enter
  label: Enter
  kind: action
  command: "C3F"
  params: []

- id: freeze_on
  label: Freeze On
  kind: action
  command: "C43"
  params: []

- id: freeze_off
  label: Freeze Off
  kind: action
  command: "C44"
  params: []

- id: zoom_down
  label: Zoom -
  kind: action
  command: "C46"
  params: []

- id: zoom_up
  label: Zoom +
  kind: action
  command: "C47"
  params: []

- id: focus_down
  label: Focus -
  kind: action
  command: "C4A"
  params: []

- id: focus_up
  label: Focus +
  kind: action
  command: "C4B"
  params: []

- id: color_management
  label: Color Management
  kind: action
  command: "C4E"
  params: []

- id: input_1_analog_rgb
  label: Input 1 Analog RGB
  kind: action
  command: "C50"
  params: []

- id: input_1_scart
  label: Input 1 SCART
  kind: action
  command: "C51"
  params: []

- id: input_1_dvi_pc
  label: Input 1 DVI (PC Digital)
  kind: action
  command: "C52"
  params: []

- id: input_1_dvi_hdcp
  label: Input 1 DVI (AV HDCP)
  kind: action
  command: "C53"
  params: []

- id: lens_shift_up
  label: Lens Shift Up
  kind: action
  command: "C5D"
  params: []

- id: lens_shift_down
  label: Lens Shift Down
  kind: action
  command: "C5E"
  params: []

- id: lens_shift_left
  label: Lens Shift Left
  kind: action
  command: "C5F"
  params: []

- id: lens_shift_right
  label: Lens Shift Right
  kind: action
  command: "C60"
  params: []

- id: auto_pc_adj
  label: Auto PC Adj.
  kind: action
  command: "C89"
  params: []

- id: presentation_timer
  label: Presentation Timer
  kind: action
  command: "C8A"
  params: []

- id: keystone_upper
  label: Keystone (reduce upper part)
  kind: action
  command: "C8E"
  params: []

- id: keystone_lower
  label: Keystone (reduce lower part)
  kind: action
  command: "C8F"
  params: []

- id: keystone_right
  label: Keystone (reduce right side)
  kind: action
  command: "C90"
  params: []

- id: keystone_left
  label: Keystone (reduce left side)
  kind: action
  command: "C91"
  params: []

- id: status_read
  label: Status Read
  kind: query
  command: "CR0"
  params: []

- id: input_mode_read
  label: Input Mode Read
  kind: query
  command: "CR1"
  params: []

- id: lamp_time_read
  label: Lamp Time Read
  kind: query
  command: "CR3"
  params: []

- id: setting_read
  label: Setting Read (Screen)
  kind: query
  command: "CR4"
  params: []

- id: temp_read
  label: Temperature Read
  kind: query
  command: "CR6"
  params: []

- id: lamp_mode_read
  label: Lamp Mode Read
  kind: query
  command: "CR7"
  params: []
```

## Feedbacks
```yaml
- id: power_status
  type: enum
  values: [power_on, standby, countdown, cooling_down, power_failure, cooling_abnormal_temp, standby_abnormal_temp, power_save_cooling, power_save, cooling_lamp_failure, standby_lamp_failure, cooling_shutter_mgmt, standby_shutter_mgmt]
  description: |
    Returned by CR0. Encoding:
    "00" = Power ON
    "80" = Standby
    "40" = Countdown in process
    "20" = Cooling Down in process
    "10" = Power Failure
    "28" = Cooling Down in process due to Abnormal Temperature
    "88" = Standby after Cooling Down due to Abnormal Temperature
    "24" = Power-Save Cooling Down in process
    "04" = Power Save
    "21" = Cooling Down in process after OFF due to Lamp Failure
    "81" = Standby after Cooling Down due to Lamp Failure
    "2C" = Cooling Down in process after OFF due to Shutter Management
    "8C" = Standby after Cooling Down due to Shutter Management

- id: input_mode
  type: enum
  values: [input_1, input_2, input_3, input_4_network]
  description: |
    Returned by CR1. "1"=Input 1, "2"=Input 2, "3"=Input 3,
    "4"=Input 4 (Networking-capable models only).

- id: lamp_hours
  type: integer
  description: |
    Returned by CR3. 5-digit value representing total lamp running hours
    multiplied by a model-specific coefficient. Example: "00410" = 410 hours.
    # UNRESOLVED: per-model coefficient not stated in source

- id: screen_setting
  type: enum
  values: [normal, rear_ceiling, rear, ceiling]
  description: |
    Returned by CR4. "11"=Normal, "10"=Rear+Ceiling (top/bottom reversed),
    "01"=Rear (left/right reversed), "00"=Ceiling (both reversed).

- id: temperature_sensors
  type: string
  description: |
    Returned by CR6. Three space-separated values "%1 %2 %3" (basic format " 00.0").
    Negative values start with "-". Hardware-fault readings start with "E".

- id: lamp_mode
  type: enum
  values: [lamp_on, lamp_off]
  description: |
    Returned by CR7. "00"=Lamp ON, "01"=Lamp OFF.
```

## Variables
```yaml
# UNRESOLVED: source does not document a generic settable-parameter channel
# distinct from the discrete action set above.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications / async events.
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step sequences.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # UNRESOLVED: only "C02" implies confirmation ("Power OFF?" message); C01 quick-off bypasses it
interlocks:
  - status: cooling_down
    behavior: "No Functional Execution Commands accepted; only ACK returned."
  - status: abnormal_temperature
    behavior: "No Functional Execution Commands accepted; only ACK returned."
  - status: abnormal_power
    behavior: "No Functional Execution Commands accepted; only ACK returned."
  - status: abnormal_filter
    behavior: "No Functional Execution Commands accepted; only ACK returned."
  - status: power_save_cooling
    behavior: "No Functional Execution Commands accepted; only ACK returned."
  - status: cooling_lamp_failure
    behavior: "No Functional Execution Commands accepted; only ACK returned."
initialization_window:
  duration: "~7 seconds after AC power-on"
  behavior: "Commands not processed; do not issue any command during this window."
input_switching_lockout:
  duration: "5 seconds from start of INPUT switch action"
  behavior: "ACK returned but command not executed (status reads are honored after 500ms)."
```

## Notes
Command format: `"C" + two-hex-chars + 0x0D` for execution; `"CR" + one-char + 0x0D` for status read. All command characters must be uppercase A–Z. Successful execution returns `ACK CR` (`0x06 0x0D`); undecodable commands return `? CR`. Pipelining interval: 100ms for `VOLUME +/-`, `ZOOM UP/DOWN`, `FOCUS UP/DOWN`, `LENS-SHIFT UP/DOWN/LEFT/RIGHT`; 500ms for all others. Functional execution commands hold a 120ms execution window per pipelined repeat. Status read pipeline: ≥500ms between reads. "C02" (power off) requires double-press semantics: first send displays "Power OFF?" confirmation; second send executes the off. "C01" is the quick-off variant that bypasses the confirmation. C28/C29/C2A/C2B/C2E write to EEPROM and persist across power cycles. Cooling-down status: ~90s of fan spin after power off before standby (model-dependent).

<!-- UNRESOLVED: per-model lamp-time coefficient, exact model-by-model applicability of the LX700 command set to LX1000/900/1200/LW600, and any firmware-version gating of individual commands are not stated in this source. -->
<!-- UNRESOLVED: the 19200 baud "initial setting" is taken as the default; 9600 fallback is supported only via service-mode change. The on-wire default at first power-on is 19200 per the source. -->

## Provenance

```yaml
source_domains:
  - preproduction.christiedigital.com
  - christiedigital.com
source_urls:
  - https://preproduction.christiedigital.com/globalassets/resources/public/020-000139-01-christie-lx700-rs232-serial-communications.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000141-christie-lx1000-user-manual.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000046-02-lw600-rs232-expnd-codes.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000053-02-christie-lx900-lw600-user-manual.pdf
retrieved_at: 2026-05-14T15:02:49.722Z
last_checked_at: 2026-06-02T17:21:54.285Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:21:54.285Z
matched_actions: 66
action_count: 66
confidence: medium
summary: "All 66 spec action ids matched literally in source; transport parameters (19200 baud, 8 data bits, no parity, 1 stop bit) verified; no commands extra. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document is titled for LX700 only; applicability to LX1000/900/1200/LW600 assumed by family grouping and not explicitly stated in this excerpt."
- "per-model coefficient not stated in source"
- "source does not document a generic settable-parameter channel"
- "source does not document unsolicited notifications / async events."
- "source does not describe multi-step sequences."
- "only \"C02\" implies confirmation (\"Power OFF?\" message); C01 quick-off bypasses it"
- "per-model lamp-time coefficient, exact model-by-model applicability of the LX700 command set to LX1000/900/1200/LW600, and any firmware-version gating of individual commands are not stated in this source."
- "the 19200 baud \"initial setting\" is taken as the default; 9600 fallback is supported only via service-mode change. The on-wire default at first power-on is 19200 per the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
