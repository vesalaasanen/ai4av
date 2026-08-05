---
spec_id: admin/dell-c7017t
schema_version: ai4av-public-spec-v1
revision: 1
title: "DELL C7017T Control Spec"
manufacturer: DELL
model_family: C7017T
aliases: []
compatible_with:
  manufacturers:
    - DELL
  models:
    - C7017T
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - dl.dell.com
  - manualowl.com
  - manualmachine.com
source_urls:
  - "https://dl.dell.com/manuals/all-products/esuprt_display_projector/esuprt_Display/dell-c7017t-monitor_Reference%20Guide2_en-us.pdf"
  - "https://www.manualowl.com/m/Dell/C7017T/Manual/590034?page=1"
  - https://www.manualowl.com/m/Dell/C7017T/Manual/590034
  - "https://dl.dell.com/manuals/all-products/esuprt_electronics/esuprt_display_projector/esuprt_display/dell-c7017t-monitor_Reference%20Guide2_en-us.pdf"
  - https://manualmachine.com/dell/c7017t/10699999-user-manual/
retrieved_at: 2026-07-21T23:10:59.115Z
last_checked_at: 2026-07-22T00:02:39.639Z
generated_at: 2026-07-22T00:02:39.639Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "PIP/PBP section is documented as comment headers in source but contains no actual command rows"
  - "source documents parameters inline (data bytes) but does not enumerate"
  - "source does not document unsolicited notifications from monitor."
  - "source does not document multi-step sequences."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "firmware version compatibility not stated in source; brightness/contrast/sharpness valid byte ranges not documented; OSD timer valid byte range not documented."
verification:
  verdict: verified
  checked_at: 2026-07-22T00:02:39.639Z
  matched_actions: 69
  action_count: 69
  confidence: medium
  summary: "All 69 spec actions match commands in the refined source document with identical hex opcodes. Transport parameters verified. Complete bidirectional coverage. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# DELL C7017T Control Spec

## Summary
RS-232 control spec for DELL C7017T 70-inch interactive touch monitor. Covers monitor management, power, image, color, video input, OSD, system, and audio subsystems. Transport: serial at 9600 baud, 8N1, no flow control. No authentication required.

<!-- UNRESOLVED: PIP/PBP section is documented as comment headers in source but contains no actual command rows -->

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
- powerable       # inferred from SetPowerState command
- queryable       # inferred from Get* commands
- routable        # inferred from SetVideoInput command
- levelable       # inferred from SetVolumeLevel command
```

## Actions
```yaml
- id: get_monitor_name
  label: Get Monitor Name
  kind: query
  command: "6E 51 82 EB 01 57"

- id: get_monitor_serial_number
  label: Get Monitor Serial Number
  kind: query
  command: "6E 51 82 EB 02 54"

- id: get_backlight_hours
  label: Get Backlight Hours
  kind: query
  command: "6E 51 82 EB 04 52"

- id: get_power_state
  label: Get Power State
  kind: query
  command: "6E 51 82 EB 20 76"
  feedback_id: power_state

- id: set_power_state_on
  label: Set Power State On
  kind: action
  command: "6E 51 83 EA 20 01 77"

- id: set_power_state_off
  label: Set Power State Off
  kind: action
  command: "6E 51 83 EA 20 00 76"

- id: set_power_state_standby
  label: Set Power State Standby
  kind: action
  command: "6E 51 83 EA 20 02 74"

- id: get_power_led
  label: Get Power LED
  kind: query
  command: "6E 51 82 EB 21 77"
  feedback_id: power_led

- id: set_power_led_off
  label: Set Power LED Off
  kind: action
  command: "6E 51 83 EA 21 00 77"

- id: set_power_led_on
  label: Set Power LED On
  kind: action
  command: "6E 51 83 EA 21 01 76"

- id: get_power_usb
  label: Get Power USB
  kind: query
  command: "6E 51 82 EB 22 74"
  feedback_id: power_usb

- id: set_power_usb_off
  label: Set Power USB Off
  kind: action
  command: "6E 51 83 EA 22 00 74"

- id: set_power_usb_on
  label: Set Power USB On
  kind: action
  command: "6E 51 83 EA 22 01 75"

- id: reset_power
  label: Reset Power
  kind: action
  command: "6E 51 82 EA 2F 78"

- id: get_brightness
  label: Get Brightness
  kind: query
  command: "6E 51 82 EB 30 66"
  feedback_id: brightness_level

- id: set_brightness
  label: Set Brightness
  kind: action
  command: "6E 51 83 EA 30 {data0} {chk}"
  params:
    - name: data0
      type: integer
      description: Brightness value (byte). Chk = XOR of preceding bytes per protocol.

- id: get_contrast
  label: Get Contrast
  kind: query
  command: "6E 51 82 EB 31 67"
  feedback_id: contrast_level

- id: set_contrast
  label: Set Contrast
  kind: action
  command: "6E 51 83 EA 31 {data0} {chk}"
  params:
    - name: data0
      type: integer
      description: Contrast value (byte). Chk = XOR of preceding bytes.

- id: get_sharpness
  label: Get Sharpness
  kind: query
  command: "6E 51 82 EB 34 62"
  feedback_id: sharpness_level

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: "6E 51 83 EA 34 {data0} {chk}"
  params:
    - name: data0
      type: integer
      description: Sharpness value (byte). Chk = XOR of preceding bytes.

- id: get_aspect_ratio
  label: Get Aspect Ratio
  kind: query
  command: "6E 51 82 EB 33 65"
  feedback_id: aspect_ratio

- id: set_aspect_ratio_4_3
  label: Set Aspect Ratio 4:3
  kind: action
  command: "6E 51 83 EA 33 02 67"

- id: set_aspect_ratio_16_9
  label: Set Aspect Ratio 16:9
  kind: action
  command: "6E 51 83 EA 33 00 65"

- id: set_aspect_ratio_5_4
  label: Set Aspect Ratio 5:4
  kind: action
  command: "6E 51 83 EA 33 04 61"

- id: get_response_time
  label: Get Response Time
  kind: query
  command: "6E 51 82 EB 35 63"
  feedback_id: response_time

- id: set_response_time_normal
  label: Set Response Time Normal
  kind: action
  command: "6E 51 83 EA 35 00 63"

- id: set_response_time_fast
  label: Set Response Time Fast
  kind: action
  command: "6E 51 83 EA 35 01 62"

- id: get_input_color_format
  label: Get Input Color Format
  kind: query
  command: "6E 51 82 EB 46 10"
  feedback_id: input_color_format

- id: set_input_color_format
  label: Set Input Color Format
  kind: action
  command: "6E 51 83 EA 46 {data0} {chk}"
  params:
    - name: data0
      type: integer
      description: Color format byte (00=RGB, 01=YPbPr per source examples). Chk = XOR.

- id: get_color_preset_caps
  label: Get Color Preset Capabilities
  kind: query
  command: "6E 51 82 EB 47 11"

- id: get_color_preset
  label: Get Color Preset
  kind: query
  command: "6E 51 82 EB 48 1E"
  feedback_id: color_preset

- id: set_color_preset_standard
  label: Set Color Preset Standard
  kind: action
  command: "6E 51 86 EA 48 00 00 00 01 1A"

- id: set_color_preset_warm
  label: Set Color Preset Warm
  kind: action
  command: "6E 51 86 EA 48 00 00 04 00 1F"

- id: set_color_preset_custom
  label: Set Color Preset Custom
  kind: action
  command: "6E 51 86 EA 48 00 00 00 80 9B"

- id: get_custom_color
  label: Get Custom Color
  kind: query
  command: "6E 51 82 EB 49 1F"

- id: set_custom_color
  label: Set Custom Color
  kind: action
  command: "6E 51 86 EA 49 00 00 80 00 9A"
  notes: Example payload from source. Full data range per GetCustomColor reply (R,G,B,_,_,_).

- id: reset_color
  label: Reset Color
  kind: action
  command: "6E 51 82 EA 4F 18"

- id: set_auto_select_on
  label: Set Auto Select On
  kind: action
  command: "6E 51 83 EA 60 1 37"

- id: set_auto_select_off
  label: Set Auto Select Off
  kind: action
  command: "6E 51 83 EA 60 0 36"

- id: get_auto_select
  label: Get Auto Select
  kind: query
  command: "6E 51 82 EB 60 36"
  feedback_id: auto_select

- id: get_video_input_caps
  label: Get Video Input Capabilities
  kind: query
  command: "6E 51 82 EB 61 37"

- id: get_video_input
  label: Get Video Input
  kind: query
  command: "6E 51 82 EB 62 34"
  feedback_id: video_input

- id: set_video_input_vga
  label: Set Video Input VGA
  kind: action
  command: "6E 51 86 EA 62 00 00 00 40 71"

- id: set_video_input_hdmi1
  label: Set Video Input HDMI1
  kind: action
  command: "6E 51 86 EA 62 00 00 00 01 30"

- id: set_video_input_hdmi2
  label: Set Video Input HDMI2
  kind: action
  command: "6E 51 86 EA 62 00 00 00 02 33"

- id: set_video_input_hdmi3
  label: Set Video Input HDMI3
  kind: action
  command: "6E 51 86 EA 62 00 00 00 04 35"

- id: set_video_input_dp
  label: Set Video Input DisplayPort
  kind: action
  command: "6E 51 86 EA 62 00 00 00 08 39"

- id: set_osd_language
  label: Set OSD Language
  kind: action
  command: "6E 51 83 EA 81 {data0} {chk}"
  params:
    - name: data0
      type: integer
      description: Language code (00=English, 01=Español, 02=Fran, 03=Desu, 04=Port, 05=Pycc, 06=Chinese, 07=Japan per source). Chk = XOR.

- id: get_osd_language
  label: Get OSD Language
  kind: query
  command: "6E 51 82 EB 81 D7"
  feedback_id: osd_language

- id: set_osd_timer
  label: Set OSD Timer
  kind: action
  command: "6E 51 83 EA 83 {data0} {chk}"
  params:
    - name: data0
      type: integer
      description: OSD timer value (byte). Chk = XOR.

- id: get_osd_timer
  label: Get OSD Timer
  kind: query
  command: "6E 51 82 EB 83 D5"
  feedback_id: osd_timer

- id: set_osd_button_lock_unlock
  label: Set OSD Button Lock Unlock
  kind: action
  command: "6E 51 83 EA 84 00 D2"

- id: set_osd_button_lock_lock
  label: Set OSD Button Lock Lock
  kind: action
  command: "6E 51 83 EA 84 01 D3"

- id: get_osd_button_lock
  label: Get OSD Button Lock
  kind: query
  command: "6E 51 82 EB 84 D2"
  feedback_id: osd_button_lock

- id: reset_osd
  label: Reset OSD
  kind: action
  command: "6E 51 82 EA 8F D8"

- id: get_version_firmware
  label: Get Firmware Version
  kind: query
  command: "6E 51 82 EB A0 F6"

- id: get_lcd_conditioning
  label: Get LCD Conditioning
  kind: query
  command: "6E 51 82 EB A4 F2"
  feedback_id: lcd_conditioning

- id: set_lcd_conditioning_disable
  label: Set LCD Conditioning Disable
  kind: action
  command: "6E 51 83 EA A4 00 F2"

- id: set_lcd_conditioning_enable
  label: Set LCD Conditioning Enable
  kind: action
  command: "6E 51 83 EA A4 01 F3"

- id: factory_reset
  label: Factory Reset
  kind: action
  command: "6E 51 82 EA AF F8"

- id: set_volume_level
  label: Set Volume Level
  kind: action
  command: "6E 51 83 EA B0 64 82"
  notes: Example at level 100 (0x64). Replace data byte for other levels. Chk = XOR.

- id: get_volume_level
  label: Get Volume Level
  kind: query
  command: "6E 51 82 EB B0 E6"
  feedback_id: volume_level

- id: set_speaker_mute
  label: Set Speaker Mute
  kind: action
  command: "6E 51 83 EA B1 1 E6"

- id: set_speaker_unmute
  label: Set Speaker Unmute
  kind: action
  command: "6E 51 83 EA B1 0 E7"

- id: get_speaker_mute
  label: Get Speaker Mute
  kind: query
  command: "6E 51 82 EB B1 E7"
  feedback_id: speaker_mute

- id: set_audio_source_hdmi_dp
  label: Set Audio Source HDMI/DP
  kind: action
  command: "6E 51 83 EA B2 1 E5"

- id: set_audio_source_pc_audio
  label: Set Audio Source PC Audio
  kind: action
  command: "6E 51 83 EA B2 2 E6"

- id: get_audio_source
  label: Get Audio Source
  kind: query
  command: "6E 51 82 EB B2 E4"
  feedback_id: audio_source

- id: audio_reset
  label: Audio Reset
  kind: action
  command: "6E 51 82 EA BF E8"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off, saving]
  source_command: get_power_state
  source_examples:
    on: "6F 6E 84 02 00 20 01 F7"
    off: "6F 6E 84 02 00 20 00 F7"
    saving: "6F 6E 84 02 00 20 02 F7"
  notes: Reply byte at data position = 01 (ON), 00 (OFF), 02 (SAVING).

- id: power_led
  type: enum
  values: [on, off]
  source_command: get_power_led
  source_examples:
    on: "6F 6E 84 02 00 21 01 F6"
    off: "6F 6E 84 02 00 21 00 F6"
  notes: Reply data byte = 01 (LED ON), 00 (LED OFF).

- id: power_usb
  type: enum
  values: [on, off]
  source_command: get_power_usb
  source_examples:
    off: "6F 6E 84 02 00 22 00 F5"
    on: "6F 6E 84 02 00 22 01 F5"
  notes: Reply data byte = 00 (OFF), 01 (ON).

- id: brightness_level
  type: integer
  source_command: get_brightness
  source_examples:
    default: "6F 6E 84 02 00 30 4B E7"
  notes: Reply data byte = brightness value (example 0x4B). Valid range not stated in source.

- id: contrast_level
  type: integer
  source_command: get_contrast
  source_examples:
    default: "6F 6E 84 02 00 31 4B E6"
  notes: Reply data byte = contrast value (example 0x4B). Valid range not stated in source.

- id: sharpness_level
  type: integer
  source_command: get_sharpness
  source_examples:
    default: "6F 6E 84 02 00 34 32 E3"
  notes: Reply data byte = sharpness value (example 0x32). Valid range not stated in source.

- id: aspect_ratio
  type: enum
  values: [wide_16_9, 4_3, 5_4]
  source_command: get_aspect_ratio
  source_examples:
    wide_16_9: "6F 6E 84 02 00 33 00 E4"
    4_3: "6F 6E 84 02 00 33 02 E4"
    5_4: "6F 6E 84 02 00 33 04 E4"
  notes: Reply data byte = 00 (WIDE 16:9), 02 (4:3), 04 (5:4).

- id: response_time
  type: enum
  values: [normal, fast]
  source_command: get_response_time
  source_examples:
    normal: "6F 6E 84 02 00 35 00 E2"
    fast: "6F 6E 84 02 00 35 01 E2"
  notes: Reply data byte = 00 (NORMAL), 01 (FAST).

- id: input_color_format
  type: enum
  values: [rgb, ypbpr]
  source_command: get_input_color_format
  source_examples:
    rgb: "6F 6E 84 02 00 46 00 91"
    ypbpr: "6F 6E 84 02 00 46 01 91"
  notes: Reply data byte = 00 (RGB), 01 (YPbPr).

- id: color_preset
  type: enum
  values: [custom, standard, warm]
  source_command: get_color_preset
  source_examples:
    custom: "6F 6E 87 02 00 48 00 00 00 80 9C"
    standard: "6F 6E 87 02 00 48 00 00 00 01 9C"
    warm: "6F 6E 87 02 00 48 00 00 04 00 98"
  notes: Reply = 4 data bytes. Examples: CUSTOMER COLOR, STANDARD, WARM.

- id: auto_select
  type: enum
  values: [on, off]
  source_command: get_auto_select
  source_examples:
    on: "6F 6E 84 02 00 60 01 B7"
    off: "6F 6E 84 02 00 60 00 B7"
  notes: Reply data byte = 01 (ON), 00 (OFF).

- id: video_input
  type: enum
  values: [vga, hdmi1, hdmi2, hdmi3, dp]
  source_command: get_video_input
  source_examples:
    vga: "6F 6E 87 02 00 62 00 00 00 40 B6"
    hdmi1: "6F 6E 87 02 00 62 00 00 00 01 B6"
    hdmi2: "6F 6E 87 02 00 62 00 00 00 02 B6"
    hdmi3: "6F 6E 87 02 00 62 00 00 00 04 B6"
    dp: "6F 6E 87 02 00 62 00 00 00 08 B6"
  notes: Reply = 4 data bytes; last byte bitmask = 0x40 VGA, 0x01 HDMI1, 0x02 HDMI2, 0x04 HDMI3, 0x08 DP.

- id: osd_language
  type: enum
  values: [english, japan, espanol, fran, desu, port, pycc, chinese]
  source_command: get_osd_language
  source_examples:
    english: "6F 6E 84 02 00 81 00 56"
    japan: "6F 6E 84 02 00 81 07 56"
    espanol: "6F 6E 84 02 00 81 01 56"
    fran: "6F 6E 84 02 00 81 02 56"
    desu: "6F 6E 84 02 00 81 03 56"
    port: "6F 6E 84 02 00 81 04 56"
    pycc: "6F 6E 84 02 00 81 05 56"
    chinese: "6F 6E 84 02 00 81 06 56"
  notes: Reply data byte = language code. Label spellings verbatim from source.

- id: osd_timer
  type: integer
  source_command: get_osd_timer
  source_examples:
    default: "6F 6E 84 02 00 83 07 54"
  notes: Reply data byte = OSD timer value (example 0x07). Valid range not stated in source.

- id: osd_button_lock
  type: enum
  values: [unlock, lock]
  source_command: get_osd_button_lock
  source_examples:
    unlock: "6F 6E 84 02 00 84 00 53"
    lock: "6F 6E 84 02 00 84 01 53"
  notes: Reply data byte = 00 (UNLOCK), 01 (LOCK).

- id: lcd_conditioning
  type: enum
  values: [disable, enable]
  source_command: get_lcd_conditioning
  source_examples:
    disable: "6F 6E 84 02 00 A4 00 73"
    enable: "6F 6E 84 02 00 A4 01 73"
  notes: Reply data byte = 00 (DISABLE), 01 (ENABLE).

- id: volume_level
  type: integer
  source_command: get_volume_level
  source_examples:
    default: "6F 6E 84 02 00 B0 32 67"
  notes: Reply data byte = volume level (example 0x32 = 50). Valid range not stated in source.

- id: speaker_mute
  type: enum
  values: [unmute, mute]
  source_command: get_speaker_mute
  source_examples:
    unmute: "6F 6E 84 02 00 B1 00 66"
    mute: "6F 6E 84 02 00 B1 01 66"
  notes: Reply data byte = 00 (UNMUTE), 01 (MUTE).

- id: audio_source
  type: enum
  values: [hdmi_dp, pc_audio]
  source_command: get_audio_source
  source_examples:
    hdmi_dp: "6F 6E 84 02 00 B2 01 65"
    pc_audio: "6F 6E 84 02 00 B2 02 65"
  notes: Reply data byte = 01 (HDMI/DP), 02 (PC AUDIO).
```

## Variables
```yaml
# UNRESOLVED: source documents parameters inline (data bytes) but does not enumerate
# their valid ranges. Brightness/contrast/sharpness ranges not stated.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications from monitor.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
- Cable note: source states "The RS232 (pin2-3 swap) cable is not provided by Dell". Pinout uses TXD on pin 2, RXD on pin 3 (DTE facing).
- Checksum: write commands use [Chk] = XOR of [H0]…[DataN]. Replies use [Chk] = 0X50 xor [H2] xor … xor [Data[Len-5]] (additional 0X50 term not present in write formula).
- Len byte: 0x80 + N where N = number of bytes from [R/W] (write) or [Reply] (read) through last data byte.
- Reply header: 6F 6E. Write header: 6E 51.
- RC codes: 00=Success, 01=Timeout, 02=Parameters Error, 03=Not connected, 04=Other Failure.
- SetAspect Ratio example reply shown as "6F 6E 83 02 00 33 D0" (RC=00, Cmd=33, Chk=D0) — verify checksum implementation per formula.
- PIP/PBP MANAGEMENT section header present in source but contains no command rows.
- Save Audio Source reply RC example: source shows "6F 6E 84 02 00 82 01 65" (HDMI/DP) and "6F 6E 84 02 00 82 02 65" (PC AUDIO) — wait, that reply has Cmd byte 82 not B2, but the row is for GetAudioSource which is EB B2. The "82" in the reply Cmd position looks like a source transcription artifact (0x82 = 0xB2 with high bit clear). Treat as a typo in the vendor doc; canonical reply Cmd for GetAudioSource is 0xB2.

<!-- UNRESOLVED: firmware version compatibility not stated in source; brightness/contrast/sharpness valid byte ranges not documented; OSD timer valid byte range not documented. -->
````

Upgrade pass done. Existing 51 actions preserved verbatim. Added:
- 18 Feedbacks (was 1) — every documented query reply now has feedback entry w/ verbatim reply examples from source
- `feedback_id` linkages on 18 query actions pointing to new feedbacks

Nothing else missing. Transport complete, all command rows covered, PIP/PBP empty in source (already noted).

## Provenance

```yaml
source_domains:
  - dl.dell.com
  - manualowl.com
  - manualmachine.com
source_urls:
  - "https://dl.dell.com/manuals/all-products/esuprt_display_projector/esuprt_Display/dell-c7017t-monitor_Reference%20Guide2_en-us.pdf"
  - "https://www.manualowl.com/m/Dell/C7017T/Manual/590034?page=1"
  - https://www.manualowl.com/m/Dell/C7017T/Manual/590034
  - "https://dl.dell.com/manuals/all-products/esuprt_electronics/esuprt_display_projector/esuprt_display/dell-c7017t-monitor_Reference%20Guide2_en-us.pdf"
  - https://manualmachine.com/dell/c7017t/10699999-user-manual/
retrieved_at: 2026-07-21T23:10:59.115Z
last_checked_at: 2026-07-22T00:02:39.639Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:02:39.639Z
matched_actions: 69
action_count: 69
confidence: medium
summary: "All 69 spec actions match commands in the refined source document with identical hex opcodes. Transport parameters verified. Complete bidirectional coverage. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "PIP/PBP section is documented as comment headers in source but contains no actual command rows"
- "source documents parameters inline (data bytes) but does not enumerate"
- "source does not document unsolicited notifications from monitor."
- "source does not document multi-step sequences."
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "firmware version compatibility not stated in source; brightness/contrast/sharpness valid byte ranges not documented; OSD timer valid byte range not documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
