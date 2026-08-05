---
spec_id: admin/lumens-vc-tr40
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lumens VC-TR40 Control Spec"
manufacturer: Lumens
model_family: VC-TR40
aliases: []
compatible_with:
  manufacturers:
    - Lumens
  models:
    - VC-TR40
    - VC-TR40N
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - mylumens.com
  - lumens.cn
source_urls:
  - "https://www.mylumens.com/Download/RS171%20-%20VC-TR40_VC-TR40N%20RS-232%20command%20set_1_3.pdf"
  - "https://www.mylumens.com/Download/RS171%20-%20VC-TR40%20RS-232%20command%20set_1_0.pdf"
  - "https://www.lumens.cn/Download/RS180%20-%20VC-TR40,AT%20RS-232%20command%20set_1_1.pdf"
  - https://www.mylumens.com
retrieved_at: 2026-07-14T06:35:45.076Z
last_checked_at: 2026-07-21T23:29:36.755Z
generated_at: 2026-07-21T23:29:36.755Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact firmware version compatibility ranges not stated; revision history only notes VXA100/VXA200/VXA201 as apply-firmware for specific command additions"
  - "flow control not mentioned in source; half-duplex async stated"
  - "no other unsolicited event types documented in source"
  - "no multi-step command sequences documented in source"
  - "no explicit safety warnings or interlock procedures documented in source"
  - "DHCP command parameter value mapping not documented beyond command structure"
  - "Flip command parameter values (2=On, 3=Off) not explicitly stated — inferred from pattern"
  - "flow control not mentioned in serial communication spec"
  - "exact firmware version compatibility ranges not stated"
verification:
  verdict: verified
  checked_at: 2026-07-21T23:29:36.755Z
  matched_actions: 226
  action_count: 226
  confidence: medium
  summary: "Spec is a near-exhaustive verbatim transcription of the VC-TR40 VISCA command list; all 226 actions matched literally with no shape drift, transport values confirmed. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Lumens VC-TR40 Control Spec

## Summary
The Lumens VC-TR40 / VC-TR40N is an AI auto-tracking PTZ camera controllable via RS-232C serial using the VISCA command protocol. The device also supports VISCA over IP via UDP (port 52381) on the same command set. Commands cover power, pan/tilt/zoom, focus, exposure, white balance, picture adjustment, presets, audio, Ethernet configuration, auto-tracking, auto-framing, and system management. Firmware revisions referenced: VXA100, VXA200, VXA201.

<!-- UNRESOLVED: exact firmware version compatibility ranges not stated; revision history only notes VXA100/VXA200/VXA201 as apply-firmware for specific command additions -->

## Transport
```yaml
protocols:
  - serial
  - udp
serial:
  baud_rate: 9600  # source states "9600bps or 38400bps" - configurable via command
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not mentioned in source; half-duplex async stated
addressing:
  port: 52381  # UDP port for VISCA over IP (section 14.6)
auth:
  type: none  # inferred: no auth procedure in source
```

**Notes on addressing:** VISCA commands use a header byte `8x` where `x` = camera address (1–7). Reply packets use `X0` where `X` = camera address + 8 (i.e. 9–F). All commands terminate with `FF`. Socket number `Y` (1–2) identifies the command socket for ACK/completion messages. For VISCA over IP, device addresses are locked to 0 (controller) and 1 (peripheral). Broadcast header is `88`. Broadcast is not available for VISCA over IP.

**Baud rate configuration:** The device supports both 9600 bps (default, `p:0`) and 38400 bps (`p:1`), settable via the Baud Rate command `8x 01 04 24 00 00 0p FF`.

## Traits
```yaml
# - powerable    (Power On/Standby command present)
# - queryable    (extensive inquiry command set - section 13)
# - levelable    (volume, gain, brightness, sharpness, saturation, hue, zoom/focus direct control)
```

## Actions
```yaml
# =============================================================================
# VISCA protocol commands. Header byte "8x" where x = camera address (1-7).
# "0p" / "pq" / "pqrs" are parameter nibbles/bytes as documented in source.
# All commands terminate with FF. Values are hex unless noted.
# =============================================================================

# --- System / Protocol Commands ---
- id: if_clear
  label: IF Clear
  kind: action
  command: "8x 01 00 01 FF"
  params: []

- id: if_clear_broadcast
  label: IF Clear (Broadcast)
  kind: action
  command: "88 01 00 01 FF"
  params: []

- id: command_cancel
  label: Command Cancel
  kind: action
  command: "8x 2Y FF"
  params:
    - name: Y
      type: integer
      description: "Socket number (1-2)"

- id: address_set
  label: Address Set
  kind: action
  command: "88 30 01 FF"
  params: []
  notes: Always broadcasted

# --- Audio ---
- id: audio_enable
  label: Audio Enable
  kind: action
  command: "8x 01 04 68 0p FF"
  params:
    - name: p
      type: integer
      description: "2=On, 3=Off"

- id: audio_delay_time
  label: Audio Delay Time (Internet Streaming)
  kind: action
  command: "8x 01 04 6A 0p 0q 0r FF"
  params:
    - name: pqr
      type: integer
      description: "Delay time, range: A ~ 1F4 (10 ~ 500)"

- id: audio_in_select
  label: Audio In Select
  kind: action
  command: "8x 01 04 6B 0p FF"
  params:
    - name: p
      type: integer
      description: "2=Line In, 3=Mic In"

- id: encode_sample_rate
  label: Encode Sample Rate
  kind: action
  command: "8x 01 04 6D 0p FF"
  params:
    - name: p
      type: integer
      description: "0=48 kHz (AAC)"

- id: audio_volume
  label: Audio Volume
  kind: action
  command: "8x 01 04 6E 0p FF"
  params:
    - name: p
      type: integer
      description: "0 ~ A (0 ~ 10)"

- id: audio_delay_enable
  label: Audio Delay Enable (Internet Streaming)
  kind: action
  command: "8x 01 04 6F 0p FF"
  params:
    - name: p
      type: integer
      description: "2=On, 3=Off"

- id: audio_in_select_alt
  label: Audio In Select (Alt)
  kind: action
  command: "8x 01 7E 07 09 0p FF"
  params:
    - name: p
      type: integer
      description: "2=Line In, 3=Mic In"

# --- Auto Focus ---
- id: af_sensitivity
  label: AF Sensitivity
  kind: action
  command: "8x 01 04 58 0p FF"
  params:
    - name: p
      type: integer
      description: "1=High, 2=Middle, 3=Low"

- id: af_frame
  label: AF Frame
  kind: action
  command: "8x 01 04 5C pp FF"
  params:
    - name: p
      type: integer
      description: "1=Auto, 2=Full Frame, 3=Center"

# --- Dig-Effect ---
- id: mirror
  label: Mirror
  kind: action
  command: "8x 01 04 61 0p FF"
  params:
    - name: p
      type: integer
      description: "2=On, 3=Off"

- id: flip
  label: Flip
  kind: action
  command: "8x 01 04 66 0p FF"
  params:
    - name: p
      type: integer
      description: "2=On, 3=Off"

# --- Ethernet ---
- id: dhcp_set
  label: DHCP
  kind: action
  command: "8x 01 7C 01 0p FF"
  params: []
  notes: "p value not documented in source beyond command structure"

- id: ip_address_set
  label: IP Address
  kind: action
  command: "8x 01 7C 02 0p 0q 0r 0s 0t 0u 0v 0x FF"
  params:
    - name: address
      type: string
      description: "IP address as hex nibble pairs: pq.rs.tu.vx, each 0~255. e.g. 192.168.100.150 => 0C 00 0A 08 06 04 09 06"

- id: subnet_mask_set
  label: Subnet Mask
  kind: action
  command: "8x 01 7C 03 0p 0q 0r 0s 0t 0u 0v 0x FF"
  params:
    - name: address
      type: string
      description: "Subnet mask as hex nibble pairs. e.g. 255.255.255.0 => 0F 0F 0F 0F 0F 0F 00 00"

- id: gateway_set
  label: Gateway
  kind: action
  command: "8x 01 7C 04 0p 0q 0r 0s 0t 0u 0v 0x FF"
  params:
    - name: address
      type: string
      description: "Gateway as hex nibble pairs. e.g. 192.168.100.254 => 0C 00 0A 08 06 04 0F 0E"

- id: dns_set
  label: DNS
  kind: action
  command: "8x 01 7C 05 0p 0q 0r 0s 0t 0u 0v 0x FF"
  params:
    - name: address
      type: string
      description: "DNS as hex nibble pairs. e.g. 8.8.8.8 => 00 08 00 08 00 08 00 08"

# --- Exposure ---
- id: icr_set
  label: ICR (Day/Night)
  kind: action
  command: "8x 01 04 01 0p FF"
  params:
    - name: p
      type: integer
      description: "2=ICR On (NIGHT), 3=ICR Off (DAY)"

- id: shutter_reset
  label: Shutter Reset
  kind: action
  command: "8x 01 04 0A 00 FF"
  params: []
  notes: "Available during Shutter Priority/Manual Mode"

- id: shutter_up
  label: Shutter Up
  kind: action
  command: "8x 01 04 0A 02 FF"
  params: []
  notes: "Available during Shutter Priority/Manual Mode"

- id: shutter_down
  label: Shutter Down
  kind: action
  command: "8x 01 04 0A 03 FF"
  params: []

- id: iris_reset
  label: Iris Reset
  kind: action
  command: "8x 01 04 0B 00 FF"
  params: []
  notes: "Available during Iris Priority/Manual Mode"

- id: iris_up
  label: Iris Up
  kind: action
  command: "8x 01 04 0B 02 FF"
  params: []

- id: iris_down
  label: Iris Down
  kind: action
  command: "8x 01 04 0B 03 FF"
  params: []

- id: manual_gain_reset
  label: Manual Gain Reset
  kind: action
  command: "8x 01 04 0C 00 FF"
  params: []
  notes: "Available during AE Manual Mode"

- id: manual_gain_up
  label: Manual Gain Up
  kind: action
  command: "8x 01 04 0C 02 FF"
  params: []

- id: manual_gain_down
  label: Manual Gain Down
  kind: action
  command: "8x 01 04 0C 03 FF"
  params: []

- id: exposure_comp_reset
  label: Exposure Comp Reset
  kind: action
  command: "8x 01 04 0E 00 FF"
  params: []
  notes: "Available during ExpComp On"

- id: exposure_comp_up
  label: Exposure Comp Up
  kind: action
  command: "8x 01 04 0E 02 FF"
  params: []

- id: exposure_comp_down
  label: Exposure Comp Down
  kind: action
  command: "8x 01 04 0E 03 FF"
  params: []

- id: spot_light_position
  label: Spot Light Position
  kind: action
  command: "8x 01 04 29 0p 0q 0r 0s FF"
  params:
    - name: pq
      type: integer
      description: "X-axis, 00 ~ 06"
    - name: rs
      type: integer
      description: "Y-axis, 00 ~ 04"

- id: gain_limit
  label: Gain Limit
  kind: action
  command: "8x 01 04 2C 0p FF"
  params:
    - name: p
      type: integer
      description: "4 ~ F"

- id: wdr
  label: WDR
  kind: action
  command: "8x 01 04 2D 0p FF"
  params:
    - name: p
      type: integer
      description: "WDR mode, 0 ~ 3"

- id: back_light
  label: Back Light Compensation
  kind: action
  command: "8x 01 04 33 0p FF"
  params:
    - name: p
      type: integer
      description: "2=On, 3=Off"
  notes: "Available during Full Auto Mode"

- id: exposure_mode
  label: Exposure Mode
  kind: action
  command: "8x 01 04 39 pp FF"
  params:
    - name: pp
      type: integer
      description: "00=Full Auto, 03=Manual, 0A=Shutter Priority, 0B=Iris Priority, 5F=White Board"

- id: flickerless
  label: Flickerless
  kind: action
  command: "8x 01 04 3C 0p FF"
  params:
    - name: p
      type: integer
      description: "0=Off, 1=50Hz, 2=60Hz"

- id: exposure_comp_onoff
  label: Exposure Comp On/Off
  kind: action
  command: "8x 01 04 3E 0p FF"
  params:
    - name: p
      type: integer
      description: "2=On, 3=Off"
  notes: "Disabled during Manual Mode"

- id: shutter_direct
  label: Shutter Direct
  kind: action
  command: "8x 01 04 4A 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "Shutter Position, 00 ~ 10"
  notes: "Available during Shutter Priority/Manual Mode"

- id: iris_direct
  label: Iris Direct
  kind: action
  command: "8x 01 04 4B 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "Iris Position, 00 ~ 0D"
  notes: "Available during Iris Priority/Manual Mode"

- id: manual_gain_direct
  label: Manual Gain Direct
  kind: action
  command: "8x 01 04 4C 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "Gain Position, 00 ~ 0F"

- id: exposure_comp_direct
  label: Exposure Comp Direct
  kind: action
  command: "8x 01 04 4E 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "00 ~ 0A"

- id: spot_light
  label: Spot Light
  kind: action
  command: "8x 01 04 59 0p FF"
  params:
    - name: p
      type: integer
      description: "2=On, 3=Off"

# --- Focus ---
- id: focus_stop
  label: Focus Stop
  kind: action
  command: "8x 01 04 08 00 FF"
  params: []
  notes: "Available during Manual Focus Mode"

- id: focus_far_standard
  label: Focus Far (Standard Speed)
  kind: action
  command: "8x 01 04 08 02 FF"
  params: []

- id: focus_near_standard
  label: Focus Near (Standard Speed)
  kind: action
  command: "8x 01 04 08 03 FF"
  params: []

- id: focus_far_variable
  label: Focus Far (Variable Speed)
  kind: action
  command: "8x 01 04 08 2p FF"
  params:
    - name: p
      type: integer
      description: "Speed 0 (Low) ~ 7 (High)"
  notes: "Available during Manual Focus Mode"

- id: focus_near_variable
  label: Focus Near (Variable Speed)
  kind: action
  command: "8x 01 04 08 3p FF"
  params:
    - name: p
      type: integer
      description: "Speed 0 (Low) ~ 7 (High)"
  notes: "Available during Manual Focus Mode"

- id: focus_one_push_trigger
  label: Focus One Push Trigger
  kind: action
  command: "8x 01 04 18 01 FF"
  params: []
  notes: "One Push AF Trigger; Available during Manual Focus Mode"

- id: focus_mode
  label: Focus Mode
  kind: action
  command: "8x 01 04 38 0p FF"
  params:
    - name: p
      type: integer
      description: "2=Auto Focus, 3=Manual Focus"

- id: focus_mode_trigger
  label: Focus Mode AF ON/OFF Trigger
  kind: action
  command: "8x 01 04 38 10 FF"
  params: []
  notes: "AF ON/OFF Trigger"

- id: focus_direct
  label: Focus Direct
  kind: action
  command: "8x 01 04 48 0p 0q 0r 0s FF"
  params:
    - name: pqrs
      type: integer
      description: "Focus Position, per Zoom Focus Position Table (0000 ~ 131A)"
  notes: "Available during Manual Focus Mode"

# --- Menu ---
- id: menu_onoff
  label: Menu On/Off
  kind: action
  command: "8x 01 06 06 pp FF"
  params:
    - name: pp
      type: integer
      description: "2=On, 3=Off, 10=Toggle"

- id: menu_enter
  label: Menu Enter
  kind: action
  command: "8x 01 7E 01 02 00 01 FF"
  params: []

# --- Pan Tilt ---
- id: pantilt_stop
  label: Pan Tilt Stop
  kind: action
  command: "8x 01 06 01 00 00 03 03 FF"
  params: []

- id: pantilt_upleft
  label: Pan Tilt Up-Left
  kind: action
  command: "8x 01 06 01 VV WW 01 01 FF"
  params:
    - name: VV
      type: integer
      description: "Pan Speed 0x01 (Low) ~ 0x18 (High)"
    - name: WW
      type: integer
      description: "Tilt Speed 0x01 (Low) ~ 0x14 (High)"

- id: pantilt_downleft
  label: Pan Tilt Down-Left
  kind: action
  command: "8x 01 06 01 VV WW 01 02 FF"
  params:
    - name: VV
      type: integer
      description: "Pan Speed 0x01 (Low) ~ 0x18 (High)"
    - name: WW
      type: integer
      description: "Tilt Speed 0x01 (Low) ~ 0x14 (High)"

- id: pantilt_left
  label: Pan Tilt Left
  kind: action
  command: "8x 01 06 01 VV WW 01 03 FF"
  params:
    - name: VV
      type: integer
      description: "Pan Speed 0x01 (Low) ~ 0x18 (High)"
    - name: WW
      type: integer
      description: "Tilt Speed 0x01 (Low) ~ 0x14 (High)"

- id: pantilt_upright
  label: Pan Tilt Up-Right
  kind: action
  command: "8x 01 06 01 VV WW 02 01 FF"
  params:
    - name: VV
      type: integer
      description: "Pan Speed 0x01 (Low) ~ 0x18 (High)"
    - name: WW
      type: integer
      description: "Tilt Speed 0x01 (Low) ~ 0x14 (High)"

- id: pantilt_downright
  label: Pan Tilt Down-Right
  kind: action
  command: "8x 01 06 01 VV WW 02 02 FF"
  params:
    - name: VV
      type: integer
      description: "Pan Speed 0x01 (Low) ~ 0x18 (High)"
    - name: WW
      type: integer
      description: "Tilt Speed 0x01 (Low) ~ 0x14 (High)"

- id: pantilt_right
  label: Pan Tilt Right
  kind: action
  command: "8x 01 06 01 VV WW 02 03 FF"
  params:
    - name: VV
      type: integer
      description: "Pan Speed 0x01 (Low) ~ 0x18 (High)"
    - name: WW
      type: integer
      description: "Tilt Speed 0x01 (Low) ~ 0x14 (High)"

- id: pantilt_up
  label: Pan Tilt Up
  kind: action
  command: "8x 01 06 01 VV WW 03 01 FF"
  params:
    - name: VV
      type: integer
      description: "Pan Speed 0x01 (Low) ~ 0x18 (High)"
    - name: WW
      type: integer
      description: "Tilt Speed 0x01 (Low) ~ 0x14 (High)"

- id: pantilt_down
  label: Pan Tilt Down
  kind: action
  command: "8x 01 06 01 VV WW 03 02 FF"
  params:
    - name: VV
      type: integer
      description: "Pan Speed 0x01 (Low) ~ 0x18 (High)"
    - name: WW
      type: integer
      description: "Tilt Speed 0x01 (Low) ~ 0x14 (High)"

- id: pantilt_absolute_position
  label: Pan Tilt Absolute Position
  kind: action
  command: "8x 01 06 02 VV WW 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z FF"
  params:
    - name: VV
      type: integer
      description: "Pan Speed 0x01 ~ 0x18"
    - name: WW
      type: integer
      description: "Tilt Speed 0x01 ~ 0x14"
    - name: YYYY
      type: integer
      description: "Pan Position 0x0000 ~ 0x0990 & 0xF670 ~ 0xFFFF (Center 0000)"
    - name: ZZZZ
      type: integer
      description: "Tilt Position 0x0000 ~ 0x0510 & 0xFE50 ~ 0xFFFF (Center 0000)"

- id: pantilt_relative_position
  label: Pan Tilt Relative Position
  kind: action
  command: "8x 01 06 03 VV WW 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z FF"
  params:
    - name: VV
      type: integer
      description: "Pan Speed 0x01 ~ 0x18"
    - name: WW
      type: integer
      description: "Tilt Speed 0x01 ~ 0x14"
    - name: YYYY
      type: integer
      description: "Pan offset"
    - name: ZZZZ
      type: integer
      description: "Tilt offset"

- id: pantilt_home
  label: Pan Tilt Home
  kind: action
  command: "8x 01 06 04 FF"
  params: []
  notes: "Go to Home Position"

- id: pantilt_reset
  label: Pan Tilt Reset
  kind: action
  command: "8x 01 06 05 FF"
  params: []
  notes: "Initialize Pan Tilt and return to HOME position"

- id: pantilt_limit_set
  label: Pan Tilt Limit Set
  kind: action
  command: "8x 01 06 07 00 0W 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z FF"
  params:
    - name: W
      type: integer
      description: "1=Up & Right, 0=Down & Left"
    - name: YYYY
      type: integer
      description: "Pan Limit Position 0x0000~0x0990 (W=1) or 0xFFFF~0xF670 (W=0)"
    - name: ZZZZ
      type: integer
      description: "Tilt Limit Position 0x0000~0x0510 (W=1) or 0xFFFF~0xFE50 (W=0)"

- id: pantilt_limit_clear
  label: Pan Tilt Limit Clear
  kind: action
  command: "8x 01 06 07 01 0W 07 0F 0F 0F 07 0F 0F 0F FF"
  params:
    - name: W
      type: integer
      description: "1=Clear Up & Right, 0=Clear Down & Left"

- id: pan_direction_set
  label: Pan Direction Set
  kind: action
  command: "8x 01 06 14 0p FF"
  params:
    - name: p
      type: integer
      description: "0=Normal, 1=Reverse"

- id: pantilt_preset_speed
  label: PanTilt Preset Speed (7E)
  kind: action
  command: "8x 01 7E 03 02 0p FF"
  params:
    - name: p
      type: integer
      description: "0=5 deg/sec, 1=25 deg/sec, 2=50 deg/sec, 3=80 deg/sec, 4=120 deg/sec"

- id: pantilt_preset_speed_06
  label: PanTilt Preset Speed (06)
  kind: action
  command: "8x 01 06 20 0p FF"
  params:
    - name: p
      type: integer
      description: "0=5 deg/sec, 1=25 deg/sec, 2=50 deg/sec, 3=80 deg/sec, 4=120 deg/sec"

# --- Pan Tilt Zoom ---
- id: ptz_speed_comp
  label: PTZ Speed Comp
  kind: action
  command: "8x 01 06 1F 01 0p FF"
  params:
    - name: p
      type: integer
      description: "0=Off, 1=On"

# --- Picture ---
- id: sharpness_reset
  label: Sharpness Reset
  kind: action
  command: "8x 01 04 02 00 FF"
  params: []

- id: sharpness_up
  label: Sharpness Up
  kind: action
  command: "8x 01 04 02 02 FF"
  params: []

- id: sharpness_down
  label: Sharpness Down
  kind: action
  command: "8x 01 04 02 03 FF"
  params: []

- id: brightness_reset
  label: Brightness Reset
  kind: action
  command: "8x 01 04 0D 00 FF"
  params: []

- id: brightness_up
  label: Brightness Up
  kind: action
  command: "8x 01 04 0D 02 FF"
  params: []

- id: brightness_down
  label: Brightness Down
  kind: action
  command: "8x 01 04 0D 03 FF"
  params: []

- id: image_mode
  label: Image Mode
  kind: action
  command: "8x 01 04 3F 04 0p FF"
  params:
    - name: p
      type: integer
      description: "0=Default, 1=Custom"

- id: sharpness_direct
  label: Sharpness Direct
  kind: action
  command: "8x 01 04 42 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "00 ~ 0E"

- id: saturation
  label: Saturation
  kind: action
  command: "8x 01 04 49 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "00 ~ 0F"
  notes: "Available during Image Mode = Custom mode"

- id: brightness_direct
  label: Brightness Direct
  kind: action
  command: "8x 01 04 4D 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "Brightness value"

- id: hue
  label: Hue
  kind: action
  command: "8x 01 04 4F 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "Hue value"

- id: nr_2d
  label: 2D NR
  kind: action
  command: "8x 01 04 53 0p FF"
  params:
    - name: p
      type: integer
      description: "0=Off, 1=Level 1, 2=Level 2, 3=Level 3"

- id: nr_3d
  label: 3D NR
  kind: action
  command: "8x 01 04 54 0p FF"
  params:
    - name: p
      type: integer
      description: "0=Off, 1=Low, 2=Type, 3=Max"

- id: gamma
  label: Gamma
  kind: action
  command: "8x 01 04 5B 0p FF"
  params:
    - name: p
      type: integer
      description: "0 ~ 3"
  notes: "Available during Image Mode = Custom mode"

- id: freeze
  label: Freeze
  kind: action
  command: "8x 01 04 62 0p FF"
  params:
    - name: p
      type: integer
      description: "2=On, 3=Off"

# --- Power ---
- id: power_on_standby
  label: Power On/Standby
  kind: action
  command: "8x 01 04 00 0p FF"
  params:
    - name: p
      type: integer
      description: "2=On, 3=Standby"

- id: standby_mode
  label: Standby Mode
  kind: action
  command: "8x 01 7E 01 0A 03 0p FF"
  params:
    - name: p
      type: integer
      description: "2=Normal Standby (Lens Tilt Down), 3=Ceiling Standby (Lens Tilt Up)"

# --- Preset (0-127) ---
- id: preset_reset_0_127
  label: Preset Reset (0-127)
  kind: action
  command: "8x 01 04 3F 00 pp FF"
  params:
    - name: pp
      type: integer
      description: "Memory Number 0x00 ~ 0x7F (Preset address range: 0 ~ 127)"

- id: preset_set_0_127
  label: Preset Set (0-127)
  kind: action
  command: "8x 01 04 3F 01 pp FF"
  params:
    - name: pp
      type: integer
      description: "Memory Number 0x00 ~ 0x7F (Preset address range: 0 ~ 127)"

- id: preset_recall_0_127
  label: Preset Recall (0-127)
  kind: action
  command: "8x 01 04 3F 02 pp FF"
  params:
    - name: pp
      type: integer
      description: "Memory Number 0x00 ~ 0x7F (Preset address range: 0 ~ 127)"

# --- Preset (128-255) ---
- id: preset_reset_128_255
  label: Preset Reset (128-255)
  kind: action
  command: "8x 01 04 3F 10 pp FF"
  params:
    - name: pp
      type: integer
      description: "Memory Number 0x00 ~ 0x7F (Preset address range: 128 ~ 255)"

- id: preset_set_128_255
  label: Preset Set (128-255)
  kind: action
  command: "8x 01 04 3F 11 pp FF"
  params:
    - name: pp
      type: integer
      description: "Memory Number 0x00 ~ 0x7F (Preset address range: 128 ~ 255)"

- id: preset_recall_128_255
  label: Preset Recall (128-255)
  kind: action
  command: "8x 01 04 3F 12 pp FF"
  params:
    - name: pp
      type: integer
      description: "Memory Number 0x00 ~ 0x7F (Preset address range: 128 ~ 255)"

# --- System ---
- id: privacy_mode
  label: Privacy Mode
  kind: action
  command: "8x 01 04 00 02 0p FF"
  params:
    - name: p
      type: integer
      description: "2=On, 3=Off"

- id: set_camera_vender_model
  label: Set Camera Vender Model
  kind: action
  command: "8x 01 04 23 pp qq rr ss FF"
  params: []
  notes: "ppqq: Vender ID = 0x0001, rrss: Model ID = 0x0513 (Development Only)"

- id: baud_rate_set
  label: Baud Rate
  kind: action
  command: "8x 01 04 24 00 00 0p FF"
  params:
    - name: p
      type: integer
      description: "0=9600 bps, 1=38400 bps"

- id: factory_reset_soft
  label: Factory Reset (Soft)
  kind: action
  command: "8x 01 04 3F 03 00 FF"
  params: []
  notes: "Reset camera setting"

- id: factory_reset_hard
  label: Factory Reset (Hard)
  kind: action
  command: "8x 01 04 3F 03 01 FF"
  params: []
  notes: "Reset camera and network setting"

- id: initial_position
  label: Initial Position
  kind: action
  command: "8x 01 04 75 6A 0p FF"
  params:
    - name: p
      type: integer
      description: "0=Last MEM, 1=1st Preset"

- id: save_last_memory
  label: Save Last Memory
  kind: action
  command: "8x 01 06 00 01 FF"
  params: []

- id: ir_receive
  label: IR Receive
  kind: action
  command: "8x 01 06 08 pp FF"
  params:
    - name: pp
      type: integer
      description: "2=On, 3=Off, 10=Toggle"

- id: output_mode
  label: Output Mode
  kind: action
  command: "8x 01 06 35 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "07=FHD 1080P(1920x1080)-60p, 09=FHD 1080P-50p, 0A=FHD 1080P-30p, 0C=FHD 1080P-25p, 0D=HD 720P(1280x720)-60p, 0F=HD 720P-50p, 14=FHD 1080i(1920x1080)-60i, 16=FHD 1080i-50i"

- id: motionless_preset
  label: Motionless Preset
  kind: action
  command: "8x 01 07 01 0p FF"
  params:
    - name: p
      type: integer
      description: "2=On, 3=Off"

- id: write_camera_id
  label: Write Camera ID
  kind: action
  command: "8x 01 CE aa bb cc dd ee ff gg hh ii jj kk ll FF"
  params:
    - name: camera_id
      type: string
      description: "Camera ID (ASCII), 12 bytes: aa bb cc dd ee ff gg hh ii jj kk ll"

- id: reboot
  label: Reboot
  kind: action
  command: "8x 01 DE 01 FF"
  params: []
  notes: "Set to reboot (added in VXA200)"

# --- Tracking ---
- id: tracking_framing_control_preset_recall
  label: Tracking-Framing Control (Preset Recall)
  kind: action
  command: "8x 01 04 3F 02 5p FF"
  params:
    - name: p
      type: integer
      description: "0=Tracking/Framing On (Recall preset 80), 1=Tracking/Framing Off (Recall preset 81)"

- id: id_switch
  label: ID Switch
  kind: action
  command: "8x 01 0B 00 00 00 FF"
  params: []

- id: auto_tracking_onoff
  label: Auto Tracking On/Off
  kind: action
  command: "8x 01 0B 00 00 0p FF"
  params:
    - name: p
      type: integer
      description: "2=On, 3=Off"

- id: tracking_mode
  label: Tracking Mode
  kind: action
  command: "8x 01 0B 00 01 0p FF"
  params:
    - name: p
      type: integer
      description: "0=Everywhere, 1=Stage, 2=Partition, 3=Auto Framing, 4=Partition Framing, 5=Center Stage"

- id: tracking_sensitivity
  label: Tracking Sensitivity
  kind: action
  command: "8x 01 0B 00 02 0p FF"
  params:
    - name: p
      type: integer
      description: "0=Low, 1=Middle, 2=High"

- id: tracking_target_lost_time
  label: Tracking Target Lost Time
  kind: action
  command: "8x 01 0B 00 03 0p FF"
  params:
    - name: p
      type: integer
      description: "0=3s, 1=5s, 2=10s"

- id: lost_tracking_target
  label: Lost Tracking Target Behavior
  kind: action
  command: "8x 01 0B 00 04 0p FF"
  params:
    - name: p
      type: integer
      description: "0=PTZ Back to center and wide, 1=Stay in last position, 2=Back to start position"

- id: head_position
  label: Head Position
  kind: action
  command: "8x 01 0B 00 05 0p FF"
  params:
    - name: p
      type: integer
      description: "0=Low, 1=Medium, 2=High"

- id: tracking_led_status
  label: Tracking LED Status
  kind: action
  command: "8x 01 0B 00 06 0p FF"
  params:
    - name: p
      type: integer
      description: "2=On, 3=Off"

- id: center_stage
  label: Center Stage
  kind: action
  command: "8x 01 0B 00 07 0p FF"
  params:
    - name: p
      type: integer
      description: "2=On, 3=Off"

- id: body_size_type
  label: Body Size/Type
  kind: action
  command: "8x 01 0B 02 01 0p FF"
  params:
    - name: p
      type: integer
      description: "0=Full Body, 1=Upper Body"

- id: tracking_distance
  label: Tracking Distance
  kind: action
  command: "8x 01 0B 02 0B 0p FF"
  params:
    - name: p
      type: integer
      description: "0=12M, 1=14M"

- id: auto_framing_onoff
  label: Auto Framing On/Off
  kind: action
  command: "8x 01 0B 04 02 0p FF"
  params:
    - name: p
      type: integer
      description: "2=On, 3=Off"

- id: auto_trigger_zone
  label: Auto-Trigger Zone
  kind: action
  command: "8x 01 0B 03 09 0p FF"
  params:
    - name: p
      type: integer
      description: "2=On, 3=Off"
  notes: "Added in VXA201"

- id: auto_framing_sensitivity
  label: Auto Framing Sensitivity
  kind: action
  command: "8x 01 0B 04 03 0p FF"
  params:
    - name: p
      type: integer
      description: "0=Low, 1=Middle, 2=High"

- id: auto_framing_target_lost_time
  label: Auto Framing Target Lost Time
  kind: action
  command: "8x 01 0B 04 04 0p FF"
  params:
    - name: p
      type: integer
      description: "0=3s, 1=5s, 2=10s"

- id: tracking_framing_type
  label: Tracking-Framing TYPE
  kind: action
  command: "8x 0B 01 04 0p FF"
  params:
    - name: p
      type: integer
      description: "A=Auto Tracking, B=Auto Framing"
  notes: "Header byte as written in source: 8x 0B 01 04 0p FF"

- id: framing_size
  label: Framing Size
  kind: action
  command: "8x 01 0B 04 05 0p FF"
  params:
    - name: p
      type: integer
      description: "0=Tight, 1=Medium, 2=Wide"

# --- White Balance ---
- id: wb_manual_red_reset
  label: WB Manual Red Reset
  kind: action
  command: "8x 01 04 03 00 FF"
  params: []
  notes: "Available during WB Manual mode"

- id: wb_manual_red_up
  label: WB Manual Red Up
  kind: action
  command: "8x 01 04 03 02 FF"
  params: []

- id: wb_manual_red_down
  label: WB Manual Red Down
  kind: action
  command: "8x 01 04 03 03 FF"
  params: []

- id: wb_manual_blue_reset
  label: WB Manual Blue Reset
  kind: action
  command: "8x 01 04 04 00 FF"
  params: []

- id: wb_manual_blue_up
  label: WB Manual Blue Up
  kind: action
  command: "8x 01 04 04 02 FF"
  params: []

- id: wb_manual_blue_down
  label: WB Manual Blue Down
  kind: action
  command: "8x 01 04 04 03 FF"
  params: []

- id: wb_one_push_trigger
  label: WB One Push Trigger
  kind: action
  command: "8x 01 04 10 05 FF"
  params: []
  notes: "One Push WB Trigger; Available during One Push WB Mode"

- id: wb_mode
  label: White Balance Mode
  kind: action
  command: "8x 01 04 35 0p FF"
  params:
    - name: p
      type: integer
      description: "0=Auto, 1=Indoor, 2=Outdoor, 3=One Push WB, 4=ATW, 5=Manual, C=Sodium Lamp"

- id: wb_manual_red_direct
  label: WB Manual Red Direct
  kind: action
  command: "8x 01 04 43 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "00 ~ 7F (0 ~ 127)"

- id: wb_manual_blue_direct
  label: WB Manual Blue Direct
  kind: action
  command: "8x 01 04 44 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "00 ~ 7F (0 ~ 127)"

# --- Zoom ---
- id: zoom_stop
  label: Zoom Stop
  kind: action
  command: "8x 01 04 07 00 FF"
  params: []

- id: zoom_tele_standard
  label: Zoom Tele (Standard Speed)
  kind: action
  command: "8x 01 04 07 02 FF"
  params: []

- id: zoom_wide_standard
  label: Zoom Wide (Standard Speed)
  kind: action
  command: "8x 01 04 07 03 FF"
  params: []

- id: zoom_tele_variable
  label: Zoom Tele (Variable Speed)
  kind: action
  command: "8x 01 04 07 2p FF"
  params:
    - name: p
      type: integer
      description: "Speed 0 (Low) ~ 7 (High)"

- id: zoom_wide_variable
  label: Zoom Wide (Variable Speed)
  kind: action
  command: "8x 01 04 07 3p FF"
  params:
    - name: p
      type: integer
      description: "Speed 0 (Low) ~ 7 (High)"

- id: digital_zoom_limit
  label: Digital Zoom Limit
  kind: action
  command: "8x 01 04 26 0p FF"
  params:
    - name: p
      type: integer
      description: "0 (x1) ~ B (x12)"

- id: zoom_direct_variable
  label: Zoom Direct (Variable Speed)
  kind: action
  command: "8x 01 04 47 0p 0q 0r 0s 0t FF"
  params:
    - name: pqrs
      type: integer
      description: "Zoom Position per Zoom Focus Position Table"
    - name: t
      type: integer
      description: "Speed 0 ~ 7"

- id: zoom_direct_standard
  label: Zoom Direct (Standard Speed)
  kind: action
  command: "8x 01 04 47 0p 0q 0r 0s FF"
  params:
    - name: pqrs
      type: integer
      description: "Zoom Position per Zoom Focus Position Table"

# =============================================================================
# INQUIRY COMMANDS (section 13) - kind: query
# Format: "8x 09 ..." where x = camera address (1-7)
# Reply format: "y0 50 ..." where y = camera address + 8
# =============================================================================

# --- Audio Inquiries ---
- id: inq_audio_enable
  label: Audio Enable Inquiry
  kind: query
  command: "8x 09 04 68 FF"
  params: []

- id: inq_encode_sample_rate
  label: Encode Sample Rate Inquiry
  kind: query
  command: "8x 09 04 6D FF"
  params: []

- id: inq_audio_volume
  label: Audio Volume Inquiry
  kind: query
  command: "8x 09 04 6E FF"
  params: []

- id: inq_delay_enable
  label: Delay Enable Inquiry
  kind: query
  command: "8x 09 04 6F FF"
  params: []

- id: inq_audio_enable_alt
  label: Audio Enable Inquiry (Alt)
  kind: query
  command: "8x 09 7E 07 07 FF"
  params: []

# --- Auto Focus Inquiries ---
- id: inq_af_sensitivity
  label: AF Sensitivity Inquiry
  kind: query
  command: "8x 09 04 58 FF"
  params: []

- id: inq_af_frame
  label: AF Frame Inquiry
  kind: query
  command: "8x 09 04 5C FF"
  params: []

# --- Dig-Effect Inquiries ---
- id: inq_mirror
  label: Mirror Inquiry
  kind: query
  command: "8x 09 04 61 FF"
  params: []

- id: inq_flip
  label: Flip Inquiry
  kind: query
  command: "8x 09 04 66 FF"
  params: []

# --- Network Inquiries ---
- id: inq_mac_address
  label: MAC Address Inquiry
  kind: query
  command: "8x 09 04 78 FF"
  params: []
  notes: "Reply: y0 50 0a 0b 0c 0d 0e 0f 0g 0h 0i 0j 0k 0l FF; MAC = ab:cd:ef:gh:ij:kl"

- id: inq_dhcp
  label: DHCP Inquiry
  kind: query
  command: "8x 09 7C 01 FF"
  params: []

- id: inq_ip_address
  label: IP Address Inquiry
  kind: query
  command: "8x 09 7C 02 FF"
  params: []

- id: inq_subnet_mask
  label: Subnet Mask Inquiry
  kind: query
  command: "8x 09 7C 03 FF"
  params: []

- id: inq_gateway
  label: Gateway Inquiry
  kind: query
  command: "8x 09 7C 04 FF"
  params: []

- id: inq_dns
  label: DNS Inquiry
  kind: query
  command: "8x 09 7C 05 FF"
  params: []

# --- Exposure Inquiries ---
- id: inq_icr
  label: ICR Inquiry
  kind: query
  command: "8x 09 04 01 FF"
  params: []

- id: inq_spot_light_position
  label: Spot Light Position Inquiry
  kind: query
  command: "8x 09 04 29 FF"
  params: []

- id: inq_gain_limit
  label: Gain Limit Inquiry
  kind: query
  command: "8x 09 04 2C FF"
  params: []

- id: inq_wdr
  label: WDR Inquiry
  kind: query
  command: "8x 09 04 2D FF"
  params: []

- id: inq_back_light
  label: Back Light Inquiry
  kind: query
  command: "8x 09 04 33 FF"
  params: []

- id: inq_exposure_mode
  label: Exposure Mode Inquiry
  kind: query
  command: "8x 09 04 39 FF"
  params: []

- id: inq_flickerless
  label: Flickerless Inquiry
  kind: query
  command: "8x 09 04 3C FF"
  params: []

- id: inq_exposure_comp
  label: Exposure Comp Inquiry
  kind: query
  command: "8x 09 04 3E FF"
  params: []

- id: inq_shutter
  label: Shutter Inquiry
  kind: query
  command: "8x 09 04 4A FF"
  params: []

- id: inq_iris
  label: Iris Inquiry
  kind: query
  command: "8x 09 04 4B FF"
  params: []

- id: inq_manual_gain
  label: Manual Gain Inquiry
  kind: query
  command: "8x 09 04 4C FF"
  params: []

- id: inq_exposure_comp_level
  label: Exposure Comp Level Inquiry
  kind: query
  command: "8x 09 04 4E FF"
  params: []

- id: inq_spot_light
  label: Spot Light Inquiry
  kind: query
  command: "8x 09 04 59 FF"
  params: []

# --- Focus Inquiries ---
- id: inq_focus_mode
  label: Focus Mode Inquiry
  kind: query
  command: "8x 09 04 38 FF"
  params: []

- id: inq_focus_position
  label: Focus Position Inquiry
  kind: query
  command: "8x 09 04 48 FF"
  params: []

# --- Menu Inquiry ---
- id: inq_menu_mode
  label: Menu Mode Inquiry
  kind: query
  command: "8x 09 06 06 FF"
  params: []

# --- Pan Tilt Inquiries ---
- id: inq_pantilt_preset_speed
  label: PanTilt Preset Speed Inquiry
  kind: query
  command: "8x 09 04 75 32 FF"
  params: []

- id: inq_pantilt_max_speed
  label: Pan-Tilt Max Speed Inquiry
  kind: query
  command: "8x 09 06 11 FF"
  params: []
  notes: "Reply: y0 50 ww zz FF; ww=Pan Max Speed (0x18), zz=Tilt Max Speed (0x18)"

- id: inq_pantilt_position
  label: Pan-Tilt Position Inquiry
  kind: query
  command: "8x 09 06 12 FF"
  params: []

- id: inq_pan_direction
  label: Pan Direction Inquiry
  kind: query
  command: "8x 09 06 14 FF"
  params: []

- id: inq_ptz_speed_comp
  label: PTZ Speed Comp Inquiry
  kind: query
  command: "8x 09 06 1F 01 FF"
  params: []

# --- Picture Inquiries ---
- id: inq_image_mode
  label: Image Mode Inquiry
  kind: query
  command: "8x 09 04 3F 04 FF"
  params: []

- id: inq_sharpness
  label: Sharpness Inquiry
  kind: query
  command: "8x 09 04 42 FF"
  params: []

- id: inq_saturation
  label: Saturation Inquiry
  kind: query
  command: "8x 09 04 49 FF"
  params: []

- id: inq_brightness
  label: Brightness Inquiry
  kind: query
  command: "8x 09 04 4D FF"
  params: []

- id: inq_hue
  label: Hue Inquiry
  kind: query
  command: "8x 09 04 4F FF"
  params: []

- id: inq_2d_nr
  label: 2D NR Inquiry
  kind: query
  command: "8x 09 04 53 FF"
  params: []

- id: inq_3d_nr
  label: 3D NR Inquiry
  kind: query
  command: "8x 09 04 54 FF"
  params: []

- id: inq_gamma
  label: Gamma Inquiry
  kind: query
  command: "8x 09 04 5B FF"
  params: []

- id: inq_freeze
  label: Freeze Inquiry
  kind: query
  command: "8x 09 04 62 FF"
  params: []

# --- Power / System Inquiries ---
- id: inq_power_mode
  label: Power Mode Inquiry
  kind: query
  command: "8x 09 04 00 FF"
  params: []

- id: inq_fw_version
  label: FW Version Inquiry
  kind: query
  command: "8x 09 00 02 00 03 FF"
  params: []
  notes: "Reply: y0 50 mm nn oo pp qq rr ss FF; version as ASCII"

- id: inq_camera_vender_model
  label: Camera Vender Model Inquiry
  kind: query
  command: "8x 09 00 02 FF"
  params: []
  notes: "Reply: y0 50 pp qq rr ss jj jj kk FF; ppqq=Vender ID(0001), rrss=Model ID(0513), jjjj=Rom revision(0104), kk=Max socket(02)"

- id: inq_serial
  label: Serial Number Inquiry
  kind: query
  command: "8x 09 02 18 FF"
  params: []
  notes: "Reply: y0 50 aa bb cc dd ee ff gg hh ii FF; serial as ASCII"

- id: inq_privacy_mode
  label: Privacy Mode Inquiry
  kind: query
  command: "8x 09 04 00 02 FF"
  params: []

- id: inq_baud_rate
  label: Baud Rate Inquiry
  kind: query
  command: "8x 09 04 24 00 FF"
  params: []

- id: inq_memory
  label: Memory Inquiry
  kind: query
  command: "8x 09 04 3F FF"
  params: []
  notes: "Reply: y0 50 pp FF; pp=last recalled memory number (0x00 ~ 0x7F)"

- id: inq_initial_position
  label: Initial Position Inquiry
  kind: query
  command: "8x 09 04 75 6A FF"
  params: []

- id: inq_ir_receive
  label: IR Receive Inquiry
  kind: query
  command: "8x 09 06 08 FF"
  params: []

- id: inq_output_mode
  label: Output Mode Inquiry
  kind: query
  command: "8x 09 06 23 FF"
  params: []

- id: inq_motionless_preset
  label: Motionless Preset Inquiry
  kind: query
  command: "8x 09 07 01 FF"
  params: []

- id: inq_camera_id
  label: Camera ID Inquiry
  kind: query
  command: "8x 09 7E CE FF"
  params: []
  notes: "Reply: y0 50 aa bb cc dd ee ff gg hh ii jj kk ll FF; Camera ID as ASCII"

- id: inq_fw_version_main
  label: FW Version Inquiry - Main
  kind: query
  command: "8x 09 7E CF FF"
  params: []
  notes: "Reply: y0 50 mm nn oo pp qq rr ss tt FF"

# --- Tracking Inquiries ---
- id: inq_tracking_framing_ctrl
  label: Tracking-Framing CTRL Inquiry
  kind: query
  command: "8x 09 04 3F 02 FF"
  params: []

- id: inq_tracking_auto
  label: Tracking Auto Inquiry
  kind: query
  command: "8x 09 0B 00 00 FF"
  params: []

- id: inq_tracking_mode
  label: Tracking Mode Inquiry
  kind: query
  command: "8x 09 0B 00 01 FF"
  params: []

- id: inq_tracking_sensitivity
  label: Tracking Sensitivity Inquiry
  kind: query
  command: "8x 09 0B 00 02 FF"
  params: []

- id: inq_tracking_target_lost_time
  label: Tracking Target Lost Time Inquiry
  kind: query
  command: "8x 09 0B 00 03 FF"
  params: []

- id: inq_lost_tracking_target
  label: Lost Tracking Target Inquiry
  kind: query
  command: "8x 09 0B 00 04 FF"
  params: []

- id: inq_head_position
  label: Head Position Inquiry
  kind: query
  command: "8x 09 0B 00 05 FF"
  params: []

- id: inq_tracking_led_status
  label: Tracking LED Status Inquiry
  kind: query
  command: "8x 09 0B 00 06 FF"
  params: []

- id: inq_center_stage
  label: Center Stage Inquiry
  kind: query
  command: "8x 09 0B 00 07 FF"
  params: []

- id: inq_tracking_body_size
  label: Tracking Body Size Inquiry
  kind: query
  command: "8x 09 0B 02 01 FF"
  params: []

- id: inq_tracking_distance
  label: Tracking Distance Inquiry
  kind: query
  command: "8x 09 0B 02 0B FF"
  params: []

- id: inq_auto_trigger_zone
  label: Auto-Trigger Zone Inquiry
  kind: query
  command: "8x 09 0B 03 09 FF"
  params: []

- id: inq_people_count
  label: People Count Inquiry
  kind: query
  command: "8x 09 0B 04 01 FF"
  params: []
  notes: "Reply: y0 50 0p 0q 0r 0s FF; pqrs=people count value"

- id: inq_framing_ctrl
  label: Framing CTRL Inquiry
  kind: query
  command: "8x 09 0B 04 02 FF"
  params: []

- id: inq_auto_framing_sensitivity
  label: Auto Framing Sensitivity Inquiry
  kind: query
  command: "8x 09 0B 04 03 FF"
  params: []

- id: inq_auto_framing_target_lost_time
  label: Auto Framing Target Lost Time Inquiry
  kind: query
  command: "8x 09 0B 04 04 FF"
  params: []

- id: inq_framing_size
  label: Framing Size Inquiry
  kind: query
  command: "8x 09 0B 04 05 FF"
  params: []

- id: inq_tracking_framing_type
  label: Tracking-Framing TYPE Inquiry
  kind: query
  command: "8x 09 0B 04 FF"
  params: []

# --- White Balance Inquiries ---
- id: inq_wb_mode
  label: White Balance Mode Inquiry
  kind: query
  command: "8x 09 04 35 FF"
  params: []

- id: inq_manual_red
  label: Manual Red Inquiry
  kind: query
  command: "8x 09 04 43 FF"
  params: []

- id: inq_manual_blue
  label: Manual Blue Inquiry
  kind: query
  command: "8x 09 04 44 FF"
  params: []

# --- Zoom Inquiry ---
- id: inq_zoom_position
  label: Zoom Position Inquiry
  kind: query
  command: "8x 09 04 47 FF"
  params: []
  notes: "Reply: y0 50 0p 0q 0r 0s FF; Min 0000h, Max 4000h (Dzoom x1), Max 7AC0h (D-Zoom x2~12)"
```

## Feedbacks
```yaml
# Protocol-level reply packets (sections 1-2).
# X = 9 to F (camera address + 8), Y = socket number (1-2).
- id: ack
  type: raw
  values: []
  notes: "ACK reply: X0 4Y FF; Y = socket number"

- id: completion_command
  type: raw
  values: []
  notes: "Completion (commands): X0 5Y FF; Y = socket number"

- id: completion_inquiry
  type: raw
  values: []
  notes: "Completion (inquiries): X0 5Y ... FF; Y = socket number, followed by inquiry response data"

- id: error_syntax
  type: raw
  values: []
  notes: "Syntax Error: X0 60 02 FF"

- id: error_buffer_full
  type: raw
  values: []
  notes: "Command buffer full: X0 60 03 FF"

- id: error_cancelled
  type: raw
  values: []
  notes: "Command cancelled: X0 6Y 04 FF; Y = socket number"

- id: error_no_socket
  type: raw
  values: []
  notes: "No socket (to be cancelled): X0 6Y 05 FF; Y = socket number"

- id: error_not_executable
  type: raw
  values: []
  notes: "Command not executable: X0 6Y 41 FF; Y = socket number"
```

## Variables
```yaml
# Settable continuous-value parameters are covered by their corresponding
# "*_direct" actions in the Actions section (shutter, iris, gain, exposure comp,
# sharpness, saturation, brightness, hue, zoom position, focus position, etc.).
# No additional discrete variables beyond those actions are documented in the source.
```

## Events
```yaml
- id: network_change
  type: raw
  values: []
  notes: "Network Change notification: X0 38 FF; X = 9 to F (camera address + 8). Sent from peripheral device when network change occurs."
# UNRESOLVED: no other unsolicited event types documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step command sequences documented in source
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset_soft
  - factory_reset_hard
  - reboot
interlocks: []
notes: >
  Factory Reset (Soft) resets camera settings. Factory Reset (Hard) resets camera
  AND network settings - disruptive on a deployed device. Reboot command (added
  VXA200) cycles the camera. These should require confirmation before execution.
# UNRESOLVED: no explicit safety warnings or interlock procedures documented in source
```

## Notes
- This device uses the **VISCA** protocol (Sony VISCA-compatible). The command set is byte-oriented hex with `FF` terminator.
- **Camera addressing:** Command header byte `8x` where `x` = camera address (1–7). Reply header `X0` where `X` = address + 8 (9–F). Broadcast uses `88`.
- **Socket model:** VISCA uses 2 sockets (Y = 1–2) for concurrent command execution. ACK is returned immediately; completion message follows when command finishes.
- **Baud rate:** Configurable between 9600 bps and 38400 bps via the Baud Rate command. Default 9600 bps.
- **VISCA over IP:** UDP port 52381. Up to 5 controllers simultaneously on one LAN segment. Addresses locked to 0 (controller) / 1 (peripheral). Broadcast not available over IP. Delivery not guaranteed (UDP) — application must handle retransmission/timeout.
- **Zoom/Focus position tables:** Zoom range 0000–3558 (optical), to 3609 (720p digital tele) / 3668 (1080p digital tele). Focus range 0000–131A (far end to near end).
- **AE tables:** Iris (F1.6–F14, index 00–0E), Shutter (1/10000–1/30, index 00–10), Gain (0–+30dB, index 00–0F), Exposure Comp (0 to -6 step, index 00–0A).
- **Revision history:** Rev 1 (2022/11/17, VXA100) first version. Rev 2 (2024/03/07) deleted Block_Inquiry. Rev 3 (2025/05/15, VXA200) added reboot command `8x 01 DE 01 FF`. Rev 4 (2025/06/30, VXA201) added Auto Trigger Zone Set/Inq.

<!-- UNRESOLVED: DHCP command parameter value mapping not documented beyond command structure -->
<!-- UNRESOLVED: Flip command parameter values (2=On, 3=Off) not explicitly stated — inferred from pattern -->
<!-- UNRESOLVED: flow control not mentioned in serial communication spec -->
<!-- UNRESOLVED: exact firmware version compatibility ranges not stated -->

## Provenance

```yaml
source_domains:
  - mylumens.com
  - lumens.cn
source_urls:
  - "https://www.mylumens.com/Download/RS171%20-%20VC-TR40_VC-TR40N%20RS-232%20command%20set_1_3.pdf"
  - "https://www.mylumens.com/Download/RS171%20-%20VC-TR40%20RS-232%20command%20set_1_0.pdf"
  - "https://www.lumens.cn/Download/RS180%20-%20VC-TR40,AT%20RS-232%20command%20set_1_1.pdf"
  - https://www.mylumens.com
retrieved_at: 2026-07-14T06:35:45.076Z
last_checked_at: 2026-07-21T23:29:36.755Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T23:29:36.755Z
matched_actions: 226
action_count: 226
confidence: medium
summary: "Spec is a near-exhaustive verbatim transcription of the VC-TR40 VISCA command list; all 226 actions matched literally with no shape drift, transport values confirmed. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact firmware version compatibility ranges not stated; revision history only notes VXA100/VXA200/VXA201 as apply-firmware for specific command additions"
- "flow control not mentioned in source; half-duplex async stated"
- "no other unsolicited event types documented in source"
- "no multi-step command sequences documented in source"
- "no explicit safety warnings or interlock procedures documented in source"
- "DHCP command parameter value mapping not documented beyond command structure"
- "Flip command parameter values (2=On, 3=Off) not explicitly stated — inferred from pattern"
- "flow control not mentioned in serial communication spec"
- "exact firmware version compatibility ranges not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
