---
spec_id: admin/lumens-ps751
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lumens PS751 Control Spec"
manufacturer: Lumens
model_family: PS751
aliases: []
compatible_with:
  manufacturers:
    - Lumens
  models:
    - PS751
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - mylumens.com
source_urls:
  - "https://www.mylumens.com/Download/RS061%20-%20PS751%20RS-232%20command%20set_1_2.pdf"
  - "https://www.mylumens.com/Download/RS128%20-%20LC200%20RS-232%20command%20set_1_5.pdf"
  - "https://www.mylumens.com/en/Downloads/4?id2=8&keyword=PS751"
  - "https://www.mylumens.com/Download/DC193,V01_PS752,V01%20RS-232%20command%20set_1_0.pdf"
retrieved_at: 2026-05-17T22:10:06.787Z
last_checked_at: 2026-10-01T08:15:13.585Z
generated_at: 2026-10-01T08:15:13.585Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - 4Ah
  - D4h
  - D5h
  - "device class (document camera vs. PTZ) — source describes presenter/camera hybrid"
  - "device may send unsolicited status messages during keypad detect mode"
  - "preset save/load sequences not described as macros"
  - "no safety warnings or interlock procedures in source"
  - "device class confirmation (document camera vs. PTZ camera — prior attempt notes indicate possible PTZ camera, but source describes presenter with slide-show/capture features)"
  - "RS-232 port connector type (DB-9 referenced in wire diagram, but gender/pinout details may be incomplete)"
  - "TCP/IP support — source covers RS-232 only; IP control not confirmed"
  - "firmware version compatibility — not stated in source"
verification:
  verdict: verified
  checked_at: 2026-10-01T08:15:13.585Z
  matched_actions: 69
  action_count: 69
  confidence: medium
  summary: "All 69 spec actions match source by semantic-id; coverage 69/71 above 0.9; 3 source commands (4Ah, D4h, D5h) unrepresented; playback and playback_thumbnail both map to B3h (many-to-one). (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-18
---

# Lumens PS751 Control Spec

## Summary
Document camera / presenter with half-duplex RS-232 control. Protocol uses 7-byte command packets (A0h STX, AFh ETX) with ACK/NAK/IGNORE response format. No authentication described.

<!-- UNRESOLVED: device class (document camera vs. PTZ) — source describes presenter/camera hybrid -->

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
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
# Evidence from source:
# - power on/off commands: powerable
# - query commands (Call Zoom Position, Call Focus Position, etc.): queryable
# - source live/PC switching, preview rotation: routable
# - brightness control, zoom, focus, R/B gain: levelable
# - preset save/load: presetable
powerable: true
queryable: true
routable: true
levelable: true
presetable: true
```

## Actions
```yaml
# All commands from Command Packet table (Section 5). Params inferred from source.
- id: preset_factory_reset
  label: Preset/Factory Reset
  kind: action
  params:
    - name: p1
      type: integer
      description: "0=Preset Load/Save, 1=Factory Reset"
    - name: p2
      type: integer
      description: "P1=0: 00=Load, 01=Save"

- id: slideshow_on_off
  label: Slide Show On/Off
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=Off, 01=On"

- id: slideshow_delay
  label: Slide Show Delay
  kind: action
  params:
    - name: p1
      type: integer
      description: "0~5: 0.5sec/1sec/3sec/5sec/10sec/Manual"

- id: image_record_quality
  label: Image/Record Quality
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=High, 01=Medium, 02=Low"

- id: copy_nand_to_sd
  label: Copy From Nand to SD
  kind: action
  params: []

- id: zoom_stop
  label: Zoom Stop
  kind: action
  params: []

- id: zoom_start_no_af
  label: Zoom Start (No AF)
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=Tele, 01=Wide"
    - name: p2
      type: integer
      description: Speed 00~06

- id: zoom_direct_no_af
  label: Zoom Direct (No AF)
  kind: action
  params:
    - name: p1
      type: integer
      description: Low byte (0~855)
    - name: p2
      type: integer
      description: High byte (0~855)

- id: auto_erase
  label: Auto Erase
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=Off, 01=On"

- id: focus_stop
  label: Focus Stop
  kind: action
  params: []

- id: focus_start
  label: Focus Start
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=Near, 01=Far"
    - name: p2
      type: integer
      description: Speed 00~06

- id: focus_direct
  label: Focus Direct
  kind: action
  params:
    - name: p1
      type: integer
      description: Low byte (0~776)
    - name: p2
      type: integer
      description: High byte (0~776)
    - name: p3
      type: integer
      description: Speed 00~06

- id: zoom_start_with_af
  label: Zoom Start (with AF)
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=Tele, 01=Wide"
    - name: p2
      type: integer
      description: Speed

- id: zoom_direct_with_af
  label: Zoom Direct (with AF)
  kind: action
  params:
    - name: p1
      type: integer
      description: Low byte
    - name: p2
      type: integer
      description: High byte

- id: white_balance
  label: White Balance (AWB, Auto Tune)
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=Auto Tune, 01=AWB"

- id: set_pan_mode
  label: Set Pan Mode
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=Off, 01=On"

- id: mask_mode
  label: Mask Mode
  kind: action
  params:
    - name: p1
      type: integer
      description: "0=Disable, 1=Mask, 2=Spotlight"

- id: freeze
  label: Freeze
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=Off, 01=On"

- id: brightness_control
  label: Brightness Control
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=Auto, 01=Manual"
    - name: p2
      type: integer
      description: "AE Auto: 00~20 level; AE Manual: 00~147 step"

- id: logo_delay
  label: Logo Delay
  kind: action
  params:
    - name: p1
      type: integer
      description: "0~26 maps to 4~30 sec"

- id: language_select
  label: Language Select
  kind: action
  params:
    - name: p1
      type: integer
      description: "0=English...18=Korean (19 languages)"

- id: brightness_step
  label: Brightness Step
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=-1, 01=+1"

- id: source_live_pc
  label: Source Live/PC
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=Camera, 01=PC, 02=Source OFF"

- id: disable_digital_zoom
  label: Disable Digital Zoom After Optical Zoom
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=Disable, 01=Enable"

- id: call_master_version
  label: Call Master Version
  kind: query
  params: []
  response:
    returns:
      - name: p1
        type: integer
        description: ASCII code version byte 1
      - name: p2
        type: integer
        description: ASCII code version byte 2
      - name: p3
        type: integer
        description: ASCII code version byte 3

- id: call_ae_status
  label: Call AE Status
  kind: query
  params: []
  response:
    returns:
      - name: p1
        type: integer
        description: "00=Off, 01=On"

- id: enable_disable_logo_image
  label: Enable/Disable Logo Image
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=Default Logo, 01=User Logo"

- id: playback_thumbnail
  label: Playback Thumbnail
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=Thumbnail"

- id: all_osd_on_off
  label: All OSD On/Off
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=Off, 01=On"

- id: call_slave_version
  label: Call Slave Version
  kind: query
  params: []
  response:
    returns:
      - name: p1
        type: integer
        description: ASCII code version byte 1
      - name: p2
        type: integer
        description: ASCII code version byte 2
      - name: p3
        type: integer
        description: ASCII code version byte 3

- id: frame_average
  label: Frame Average
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=LCD, 01=DLP"

- id: call_lamp_status
  label: Call Lamp Status
  kind: query
  params: []
  response:
    returns:
      - name: p1
        type: integer
        description: "00=Lamp+Backlight OFF, 01=Lamp ON, 02=Backlight ON"

- id: call_text_photo_status
  label: Call Text/Photo Status
  kind: query
  params: []
  response:
    returns:
      - name: p1
        type: integer
        description: "00=Photo, 01=Text, 02=Gray"

- id: reg1
  label: reg1
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=Read, 01=Write"
    - name: p2
      type: integer
      description: "0x00~0xff"

- id: reg2
  label: reg2
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=Read, 01=Write"
    - name: p2
      type: integer
      description: "0x00~0xff"

- id: reg3
  label: reg3
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=Read, 01=Write"
    - name: p2
      type: integer
      description: "0x00~0xff"

- id: error_code
  label: Error Code
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=Show Error Code, 01=Clear Error Code"

- id: awb_correction
  label: AWB Correction
  kind: action
  params: []

- id: call_ac_power_state
  label: Call AC 50/60 Hz Power State
  kind: query
  params: []

- id: keypad_detect
  label: Keypad Detect
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=Stop, 01=Start"

- id: call_zoom_position
  label: Call Zoom Position
  kind: query
  params: []
  response:
    returns:
      - name: p1
        type: integer
        description: Low byte
      - name: p2
        type: integer
        description: High byte
      - name: resolution
        type: string
        description: "Max varies by resolution (XGA:805, SXGA:802, WXGA:802, 1080P:795, NTSC:810, PAL:810)"

- id: call_digital_zoom_position
  label: Call Digital Zoom Position
  kind: query
  params: []
  response:
    returns:
      - name: p1
        type: integer
        description: Low byte
      - name: p2
        type: integer
        description: High byte

- id: call_focus_position
  label: Call Focus Position
  kind: query
  params: []
  response:
    returns:
      - name: p1
        type: integer
        description: Low byte (0~776)
      - name: p2
        type: integer
        description: High byte (0~776)

- id: call_freeze_status
  label: Call Freeze Status
  kind: query
  params: []
  response:
    returns:
      - name: p1
        type: integer
        description: "00=Off, 01=On"

- id: call_brightness_position
  label: Call Brightness Position
  kind: query
  params: []
  response:
    returns:
      - name: p1
        type: integer
        description: "AE Auto: 00~20; AE Manual: 00~147"

- id: call_mix_zoom_position
  label: Call Mix Zoom Position
  kind: query
  params: []
  response:
    returns:
      - name: p1
        type: integer
        description: Low byte
      - name: p2
        type: integer
        description: High byte

- id: call_menu_status
  label: Call Menu Status
  kind: query
  params: []
  response:
    returns:
      - name: p1
        type: integer
        description: "00=Off, 01=On"

- id: capture_action
  label: Capture Action
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=Single Capture, 01=Time Lapse, 02=Record, 03=Disabled"

- id: capture_time
  label: Capture Time
  kind: action
  params:
    - name: p1
      type: integer
      description: "00~06: 1hr/2hr/4hr/8hr/24hr/48hr/72hr"

- id: capture_interval
  label: Capture Interval
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=3sec, 01=5sec, 02=10sec, 03=30sec, 04=1min, 05=2min, 06=5min"

- id: key_function
  label: Key Function
  kind: action
  params:
    - name: p1
      type: integer
      description: "01=Enter, 02=Up, 03=Down, 04=Left, 05=Right, 06=Menu"

- id: set_rb_gain
  label: Set R/B Gain
  kind: action
  params:
    - name: p1
      type: integer
      description: "01=Red Gain, 02=Blue Gain"
    - name: p2
      type: integer
      description: Low byte (0x100~0xFFF)
    - name: p3
      type: integer
      description: High byte (0x100~0xFFF)

- id: call_rb_gain
  label: Call R/B Gain
  kind: query
  params:
    - name: p1
      type: integer
      description: "01=Red Gain, 02=Blue Gain"
  response:
    returns:
      - name: p1
        type: integer
        description: "01=Red Gain, 02=Blue Gain"
      - name: p2
        type: integer
        description: Low byte
      - name: p3
        type: integer
        description: High byte

- id: af_one_push_trigger
  label: AF One Push Trigger
  kind: action
  params:
    - name: p1
      type: integer
      description: "01 (fixed)"

- id: set_gamma_mode
  label: Set Gamma Mode
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=Photo, 01=Text, 02=Gray"

- id: set_image_mode
  label: Set Image Mode
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=Normal, 01=Slide, 02=Film, 03=Microscope"

- id: system_on_off
  label: System On/Off
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=Off, 01=On"

- id: power
  label: Power
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=Off, 01=On"

- id: capture
  label: Capture
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=Capture, 01=Record"

- id: playback
  label: Playback Thumbnail
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=Thumbnail"

- id: preview_rotation
  label: Preview Rotation
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=Rotate 0, 01=180, 02=Flip, 03=Mirror"

- id: delete
  label: Delete
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=Delete one, 01=Delete all, 02=Format"

- id: call_system_status
  label: Call System Status
  kind: query
  params: []
  response:
    returns:
      - name: p1
        type: integer
        description: "00=Not ready, 01=Ready to receive command"
      - name: p2
        type: integer
        description: "00=Off, 01=On (Power Status)"

- id: lamp_on_off
  label: Lamp On/Off
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=Lamp+Backlight OFF, 01=Lamp ON, 02=Backlight ON"

- id: firmware_upgrade
  label: Firmware Upgrade
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=OSD, 01=No OSD"

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  params:
    - name: p1
      type: integer
      description: "0~31"

- id: call_audio_volume
  label: Call Audio Volume
  kind: query
  params: []
  response:
    returns:
      - name: p1
        type: integer
        description: "0~31"

- id: pe_storage_save
  label: PE Storage Test Data (Save)
  kind: action
  params:
    - name: p1
      type: integer
      description: "1~7: Address"
    - name: p2
      type: integer
      description: "0x00~0xff: Data"
    - name: p3
      type: integer
      description: "Data (high byte if applicable)"

- id: pe_storage_load
  label: PE Storage Test Data (Load)
  kind: action
  params:
    - name: p1
      type: integer
      description: "1~7: Address"
    - name: p2
      type: integer
      description: "0x00~0xff: Data"
    - name: p3
      type: integer
      description: "Data (high byte if applicable)"
```

## Feedbacks
```yaml
# Response packet structure from Section 4.2 and Section 6 return table
# Status byte encoding (bit structure from Section 4.1):
# Bit 7,6,5,4,3,2 = reserved
# Bit 1,0 = Communication Response: 0=ACK, 1=NAK, 2=IGNORE, 3=Not Used
#
# ACK (00): "Capable Of Normal End Or Normal Operation"
# NAK (01): Parity/Framing/Overrun error, or data out of range
# IGNORE (10): Cannot execute command (e.g., already in that state, unsupported)
# Not Used (11): Unsupported command

- id: command_ack
  label: Command ACK
  type: enum
  values:
    - ack
    - nak
    - ignore
    - not_used
  description: "Bit0/Bit1 of status byte: 00=ACK, 01=NAK, 10=IGNORE, 11=Not Used"

- id: zoom_moving_status
  label: Zoom Moving Status
  type: boolean
  description: "Bit 5 of status byte: 1=Moving, 0=Stop"

- id: focus_moving_status
  label: Focus Moving Status
  type: boolean
  description: "Bit 4 of status byte: 1=Moving, 0=Stop"

- id: iris_moving_status
  label: Iris Moving Status
  type: boolean
  description: "Bit 6 of status byte: 1=Moving, 0=Stop"

- id: command_result
  label: Command Result Status
  type: enum
  values:
    - succeed
    - nak
    - ignore
  description: "St byte from return packet: 0=Succeed, 1=NAK, 2=Ignore"
```

## Variables
```yaml
# Settable parameters tracked as variables (not discrete on/off actions):
- id: zoom_position
  label: Zoom Position
  type: integer
  range:
    min: 0
    max: 855
  description: Current optical zoom position (max varies by resolution mode)

- id: digital_zoom_position
  label: Digital Zoom Position
  type: integer
  description: Current digital zoom position (max varies: XGA=50, SXGA=53, WXGA=53, 1080P=60, NTSC/PAL=45)

- id: focus_position
  label: Focus Position
  type: integer
  range:
    min: 0
    max: 776

- id: brightness_level
  label: Brightness Level
  type: integer
  description: "AE Auto: 00~20; AE Manual: 00~147"

- id: audio_volume
  label: Audio Volume
  type: integer
  range:
    min: 0
    max: 31

- id: microphone_volume
  label: Microphone Volume
  type: integer
  range:
    min: 0
    max: 16
```

## Events
```yaml
# No unsolicited event descriptions found in source
# UNRESOLVED: device may send unsolicited status messages during keypad detect mode
```

## Macros
```yaml
# No explicit multi-step macros described in source
# UNRESOLVED: preset save/load sequences not described as macros
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes

**Command Packet Structure (7 bytes):**
`[STX=A0h] [Cmd] [P1] [P2] [Status] [ETX=AFh]`

**Return Packet Structure:**
`[STX=A0h] [Cmd] [P1] [P2] [Status] [ETX=AFh]` — device echoes command with status byte updated.

**Response encoding (Section 4.2):**
- ACK (bits 1:0 = 00): command accepted
- NAK (bits 1:0 = 01): parity/framing/overrun error or data out of range
- IGNORE (bits 1:0 = 10): cannot execute (e.g., already in requested state, command not supported in current mode)
- Not Used (bits 1:0 = 11): unsupported command

**Resolution-dependent zoom maxima (from source):**
| Resolution | Optical Zoom Max | Digital Zoom Max |
|---|---|---|
| XGA | 805 | 50 |
| SXGA | 802 | 53 |
| WXGA | 802 | 53 |
| 1080P | 795 | 60 |
| NTSC | 810 | 45 |
| PAL | 810 | 45 |

<!-- UNRESOLVED: device class confirmation (document camera vs. PTZ camera — prior attempt notes indicate possible PTZ camera, but source describes presenter with slide-show/capture features) -->
<!-- UNRESOLVED: RS-232 port connector type (DB-9 referenced in wire diagram, but gender/pinout details may be incomplete) -->
<!-- UNRESOLVED: TCP/IP support — source covers RS-232 only; IP control not confirmed -->
<!-- UNRESOLVED: firmware version compatibility — not stated in source -->

## Provenance

```yaml
source_domains:
  - mylumens.com
source_urls:
  - "https://www.mylumens.com/Download/RS061%20-%20PS751%20RS-232%20command%20set_1_2.pdf"
  - "https://www.mylumens.com/Download/RS128%20-%20LC200%20RS-232%20command%20set_1_5.pdf"
  - "https://www.mylumens.com/en/Downloads/4?id2=8&keyword=PS751"
  - "https://www.mylumens.com/Download/DC193,V01_PS752,V01%20RS-232%20command%20set_1_0.pdf"
retrieved_at: 2026-05-17T22:10:06.787Z
last_checked_at: 2026-10-01T08:15:13.585Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T08:15:13.585Z
matched_actions: 69
action_count: 69
confidence: medium
summary: "All 69 spec actions match source by semantic-id; coverage 69/71 above 0.9; 3 source commands (4Ah, D4h, D5h) unrepresented; playback and playback_thumbnail both map to B3h (many-to-one). (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- 4Ah
- D4h
- D5h
- "device class (document camera vs. PTZ) — source describes presenter/camera hybrid"
- "device may send unsolicited status messages during keypad detect mode"
- "preset save/load sequences not described as macros"
- "no safety warnings or interlock procedures in source"
- "device class confirmation (document camera vs. PTZ camera — prior attempt notes indicate possible PTZ camera, but source describes presenter with slide-show/capture features)"
- "RS-232 port connector type (DB-9 referenced in wire diagram, but gender/pinout details may be incomplete)"
- "TCP/IP support — source covers RS-232 only; IP control not confirmed"
- "firmware version compatibility — not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
