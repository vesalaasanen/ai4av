---
spec_id: admin/lumens-vc-tr61
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lumens VC-TR61 / VC-TR61N Control Spec"
manufacturer: Lumens
model_family: VC-TR61
aliases: []
compatible_with:
  manufacturers:
    - Lumens
  models:
    - VC-TR61
    - VC-TR61N
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - mylumens.com
source_urls:
  - "https://www.mylumens.com/Download/RS189%20-%20VC-TR61_VC-TR61N%20RS-232%20command%20set_1_1.pdf"
  - "https://www.mylumens.com/Download/RS189%20-%20VC-TR61%20RS-232%20command%20set_1_0.pdf"
  - https://www.mylumens.com
retrieved_at: 2026-07-14T06:18:24.892Z
last_checked_at: 2026-07-21T23:29:37.964Z
generated_at: 2026-07-21T23:29:37.964Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "flow control not stated in source"
  - "these are reference tables for action parameters, not independent settable variables"
  - "no unsolicited notification events documented in source"
  - "no multi-step sequences explicitly described in source"
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "firmware version compatibility not stated beyond VYW100 / VYW106_VVB101"
  - "flow control method not stated in source"
  - "F_Clear command packet not documented in source (only IF_Clear has a packet)"
  - "power consumption, voltage, current specs not in this document"
verification:
  verdict: verified
  checked_at: 2026-07-21T23:29:37.964Z
  matched_actions: 216
  action_count: 216
  confidence: medium
  summary: "Spec is a near-verbatim transcription of the source RS232 command list and inquiry list; all 216 action units matched literally with correct shapes and transport values. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Lumens VC-TR61 / VC-TR61N Control Spec

## Summary
Lumens VC-TR61 / VC-TR61N 4K AI auto-tracking 30x zoom PTZ camera. Controlled via RS-232 serial (VISCA command set) or VISCA over IP (UDP port 52381). Supports pan/tilt/zoom, auto-tracking, auto-framing, preset recall, exposure/white-balance/focus/picture adjustment, audio, and system configuration.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
# Source documents two transport paths:
# 1. RS-232 serial (Section 1: async half-duplex, 9600 or 38400 bps)
# 2. VISCA over IP (Section 14: UDP, port 52381, IPv4)
# Both carry the same VISCA command payloads.
protocols:
  - serial
  - udp
serial:
  baud_rate: 9600  # default; 38400 also supported (source: "9600bps or 38400bps")
  data_bits: 8
  parity: none  # source: "Parity Check: NA"
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
addressing:
  port: 52381  # VISCA over IP UDP port (Section 14.6)
auth:
  type: none  # inferred: no auth procedure in source
```

**VISCA over IP notes (Section 14–15):**
- Interface: RJ-45 10Base-T/100Base-TX (auto)
- Internet protocol: IPv4
- Transport: UDP (delivery not guaranteed; application must handle retransmission)
- Max 5 controllers simultaneously on one LAN segment
- Over IP, controller address locked to 0, peripheral device address locked to 1
- VISCA over IP message: 8-byte header + payload (1–16 bytes)
- Broadcast function NOT available for VISCA over IP

## Traits
```yaml
- powerable  # inferred: Power On/Standby command present
- queryable  # inferred: extensive inquiry command set present
- levelable  # inferred: volume, gain, brightness, saturation, sharpness direct-set commands present
```

## Actions
```yaml
# Addressing convention: "8x" = header byte where x = camera address (1-7).
# Reply packets use "X0" where X = camera address + 8 (9-F).
# Parameter nibbles shown as 0p, 0q, 0r, 0s, 0t, 0u, 0v, 0w.
# VISCA commands work over both serial and VISCA over IP (UDP).
# Firmware: VYW100 (first version), VYW106_VVB101 (added VC-TR61N).

# ── System / Network / IF_Clear (Sections 3-5) ──
- id: if_clear
  label: IF Clear
  kind: action
  command: "8X 01 00 01 FF"
  params: []
- id: if_clear_broadcast
  label: IF Clear (Broadcast)
  kind: action
  command: "88 01 00 01 FF"
  params: []
- id: address_set
  label: Address Set
  kind: action
  command: "88 30 01 FF"
  params: []
- id: network_change
  label: Network Change
  kind: action
  command: "X0 38 FF"
  params: []
- id: command_cancel
  label: Command Cancel
  kind: action
  command: "8X 2Y FF"
  params:
    - name: Y
      type: integer
      description: "Socket number (1-2)"

# ── Audio ──
- id: audio_enable
  label: Audio Enable
  kind: action
  command: "8x 01 04 68 0p FF"
  params:
    - name: p
      type: enum
      values: {2: On, 3: Off}
- id: dante_audio_enable
  label: Dante Audio Enable
  kind: action
  command: "8x 01 04 6C 00 00 0p FF"
  params:
    - name: p
      type: enum
      values: {2: Enable, 3: Disable}
- id: audio_delay_time
  label: Audio Delay Time
  kind: action
  command: "8x 01 04 6A 0p 0q 0r FF"
  params:
    - name: pqr
      type: string
      description: "Delay time for Internet Streaming, range 001-1F4 (1-500)"
- id: audio_in
  label: Audio In
  kind: action
  command: "8x 01 04 6B 0p FF"
  params:
    - name: p
      type: enum
      values: {2: Line In}
- id: audio_volume
  label: Audio Volume
  kind: action
  command: "8x 01 04 6E 0p FF"
  params:
    - name: p
      type: integer
      description: "0-A (0-10)"
- id: audio_delay_enable
  label: Audio Delay Enable
  kind: action
  command: "8x 01 04 6F 0p FF"
  params:
    - name: p
      type: enum
      values: {2: On, 3: Off}

# ── Auto Focus ──
- id: zoom_tracking
  label: Zoom Tracking
  kind: action
  command: "8x 01 04 38 03 0p FF"
  params:
    - name: p
      type: enum
      values: {0: "Off (Curve Tracking)", 1: "On (Zoom Tracking)"}
- id: af_sensitivity
  label: AF Sensitivity
  kind: action
  command: "8x 01 04 58 0p FF"
  params:
    - name: p
      type: enum
      values: {1: High, 2: Middle, 3: Low}

# ── Dig-Effect ──
- id: mirror
  label: Mirror
  kind: action
  command: "8x 01 04 61 0p FF"
  params:
    - name: p
      type: enum
      values: {2: On, 3: Off}
- id: flip
  label: Flip
  kind: action
  command: "8x 01 04 66 0p FF"
  params:
    - name: p
      type: enum
      values: {2: On, 3: Off}

# ── Ethernet ──
- id: dhcp
  label: DHCP
  kind: action
  command: "8x 01 7C 01 0p FF"
  params:
    - name: p
      type: enum
      values: {2: On, 3: Off}
- id: ip_address
  label: IP Address
  kind: action
  command: "8x 01 7C 02 0p 0q 0r 0s 0t 0u 0v 0x FF"
  params:
    - name: address
      type: string
      description: "IP address pq.rs.tu.vx (HEX), each octet 0-255. e.g. 192.168.100.150 => 81 01 7C 02 0C 00 0A 08 06 04 09 06 FF"
- id: subnet_mask
  label: Subnet Mask
  kind: action
  command: "8x 01 7C 03 0p 0q 0r 0s 0t 0u 0v 0x FF"
  params:
    - name: address
      type: string
      description: "Subnet mask pq.rs.tu.vx (HEX). e.g. 255.255.255.0 => 81 01 7C 03 0F 0F 0F 0F 0F 0F 00 00 FF"
- id: gateway
  label: Gateway
  kind: action
  command: "8x 01 7C 04 0p 0q 0r 0s 0t 0u 0v 0x FF"
  params:
    - name: address
      type: string
      description: "Gateway pq.rs.tu.vx (HEX). e.g. 192.168.100.254 => 81 01 7C 04 0C 00 0A 08 06 04 0F 0E FF"
- id: dns
  label: DNS
  kind: action
  command: "8x 01 7C 05 0p 0q 0r 0s 0t 0u 0v 0x FF"
  params:
    - name: address
      type: string
      description: "DNS pq.rs.tu.vx (HEX). e.g. 8.8.8.8 => 81 01 7C 05 00 08 00 08 00 08 00 08 FF"

# ── Exposure ──
- id: shutter_reset
  label: Shutter Reset
  kind: action
  command: "8x 01 04 0A 00 FF"
  params: []
- id: shutter_up
  label: Shutter Up
  kind: action
  command: "8x 01 04 0A 02 FF"
  params: []
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
      description: "X-axis, 00-06"
    - name: rs
      type: integer
      description: "Y-axis, 00-04"
- id: gain_limit
  label: Gain Limit
  kind: action
  command: "8x 01 04 2C 0p FF"
  params:
    - name: p
      type: integer
      description: "4-F (see AE_Gain Limit Table)"
- id: wdr
  label: WDR
  kind: action
  command: "8x 01 04 2D 0p FF"
  params:
    - name: p
      type: integer
      description: "WDR mode, 0-3"
- id: exposure_mode
  label: Exposure Mode
  kind: action
  command: "8x 01 04 39 pp FF"
  params:
    - name: pp
      type: enum
      values: {"00": Full Auto, "03": Manual, "0A": Shutter Priority, "0B": Iris Priority, "5F": White Board}
- id: flickerless
  label: Flickerless
  kind: action
  command: "8x 01 04 3C 0p FF"
  params:
    - name: p
      type: enum
      values: {0: Off, 1: 50Hz, 2: 60Hz}
- id: exposure_comp_onoff
  label: Exposure Comp On/Off
  kind: action
  command: "8x 01 04 3E 0p FF"
  params:
    - name: p
      type: enum
      values: {2: On, 3: Off}
- id: shutter_direct
  label: Shutter Direct
  kind: action
  command: "8x 01 04 4A 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "Shutter Position, 00-10 (see AE_Shutter Table)"
- id: iris_direct
  label: Iris Direct
  kind: action
  command: "8x 01 04 4B 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "Iris Position, 00-0F (see AE_Iris Table)"
- id: manual_gain_direct
  label: Manual Gain Direct
  kind: action
  command: "8x 01 04 4C 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "Gain Position, 00-0F (see AE_Gain Table)"
- id: exposure_comp_direct
  label: Exposure Comp Direct
  kind: action
  command: "8x 01 04 4E 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "00-0A (see AE_Exposure Comp Table)"
- id: spot_light
  label: Spot Light
  kind: action
  command: "8x 01 04 59 0p FF"
  params:
    - name: p
      type: enum
      values: {2: On, 3: Off}

# ── Focus ──
- id: focus_stop
  label: Focus Stop
  kind: action
  command: "8x 01 04 08 00 FF"
  params: []
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
- id: focus_far_step
  label: Focus Far Step
  kind: action
  command: "8x 01 04 08 04 FF"
  params: []
- id: focus_near_step
  label: Focus Near Step
  kind: action
  command: "8x 01 04 08 05 FF"
  params: []
- id: focus_far_variable
  label: Focus Far (Variable Speed)
  kind: action
  command: "8x 01 04 08 2p FF"
  params:
    - name: p
      type: integer
      description: "Speed 0 (Low) - 7 (High)"
- id: focus_near_variable
  label: Focus Near (Variable Speed)
  kind: action
  command: "8x 01 04 08 3p FF"
  params:
    - name: p
      type: integer
      description: "Speed 0 (Low) - 7 (High)"
- id: focus_one_push_trigger
  label: Focus One Push Trigger
  kind: action
  command: "8x 01 04 18 01 FF"
  params: []
- id: focus_mode
  label: Focus Mode
  kind: action
  command: "8x 01 04 38 0p FF"
  params:
    - name: p
      type: enum
      values: {2: Auto Focus, 3: Manual Focus}
- id: focus_direct
  label: Focus Direct
  kind: action
  command: "8x 01 04 48 0p 0q 0r 0s FF"
  params:
    - name: pqrs
      type: string
      description: "Focus Position per General Zoom Focus Position Table"

# ── Menu ──
- id: menu_left
  label: Menu Left
  kind: action
  command: "8x 01 06 01 01 01 01 03 FF"
  params: []
- id: menu_right
  label: Menu Right
  kind: action
  command: "8x 01 06 01 01 01 02 03 FF"
  params: []
- id: menu_up
  label: Menu Up
  kind: action
  command: "8x 01 06 01 01 01 03 01 FF"
  params: []
- id: menu_down
  label: Menu Down
  kind: action
  command: "8x 01 06 01 01 01 03 02 FF"
  params: []
- id: menu_onoff
  label: Menu On/Off
  kind: action
  command: "8x 01 06 06 pp FF"
  params:
    - name: pp
      type: enum
      values: {2: On, 3: Off, "10": Toggle}
- id: menu_enter
  label: Menu Enter
  kind: action
  command: "8x 01 7E 01 02 00 01 FF"
  params: []

# ── Pan Tilt ──
- id: pan_flip_visca
  label: Pan Flip (VISCA)
  kind: action
  command: "8x 01 04 67 3F 0p FF"
  params:
    - name: p
      type: enum
      values: {2: On, 3: Off}
- id: tilt_flip_visca
  label: Tilt Flip (VISCA)
  kind: action
  command: "8x 01 04 68 3F 0p FF"
  params:
    - name: p
      type: enum
      values: {2: On, 3: Off}
- id: pan_flip_ext
  label: Pan Flip (Extended)
  kind: action
  command: "8x 01 7E 01 06 00 0p FF"
  params:
    - name: p
      type: enum
      values: {0: Off, 1: On}
- id: tilt_flip_ext
  label: Tilt Flip (Extended)
  kind: action
  command: "8x 01 7E 01 09 00 0p FF"
  params:
    - name: p
      type: enum
      values: {0: Off, 1: On}
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
      type: string
      description: "Pan Speed 0x01 (Low) - 0x18 (High)"
    - name: WW
      type: string
      description: "Tilt Speed 0x01 (Low) - 0x14 (High)"
- id: pantilt_downleft
  label: Pan Tilt Down-Left
  kind: action
  command: "8x 01 06 01 VV WW 01 02 FF"
  params:
    - name: VV
      type: string
      description: "Pan Speed 0x01 (Low) - 0x18 (High)"
    - name: WW
      type: string
      description: "Tilt Speed 0x01 (Low) - 0x14 (High)"
- id: pantilt_left
  label: Pan Tilt Left
  kind: action
  command: "8x 01 06 01 VV WW 01 03 FF"
  params:
    - name: VV
      type: string
      description: "Pan Speed 0x01 (Low) - 0x18 (High)"
    - name: WW
      type: string
      description: "Tilt Speed 0x01 (Low) - 0x14 (High)"
- id: pantilt_upright
  label: Pan Tilt Up-Right
  kind: action
  command: "8x 01 06 01 VV WW 02 01 FF"
  params:
    - name: VV
      type: string
      description: "Pan Speed 0x01 (Low) - 0x18 (High)"
    - name: WW
      type: string
      description: "Tilt Speed 0x01 (Low) - 0x14 (High)"
- id: pantilt_downright
  label: Pan Tilt Down-Right
  kind: action
  command: "8x 01 06 01 VV WW 02 02 FF"
  params:
    - name: VV
      type: string
      description: "Pan Speed 0x01 (Low) - 0x18 (High)"
    - name: WW
      type: string
      description: "Tilt Speed 0x01 (Low) - 0x14 (High)"
- id: pantilt_right
  label: Pan Tilt Right
  kind: action
  command: "8x 01 06 01 VV WW 02 03 FF"
  params:
    - name: VV
      type: string
      description: "Pan Speed 0x01 (Low) - 0x18 (High)"
    - name: WW
      type: string
      description: "Tilt Speed 0x01 (Low) - 0x14 (High)"
- id: pantilt_up
  label: Pan Tilt Up
  kind: action
  command: "8x 01 06 01 VV WW 03 01 FF"
  params:
    - name: VV
      type: string
      description: "Pan Speed 0x01 (Low) - 0x18 (High)"
    - name: WW
      type: string
      description: "Tilt Speed 0x01 (Low) - 0x14 (High)"
- id: pantilt_down
  label: Pan Tilt Down
  kind: action
  command: "8x 01 06 01 VV WW 03 02 FF"
  params:
    - name: VV
      type: string
      description: "Pan Speed 0x01 (Low) - 0x18 (High)"
    - name: WW
      type: string
      description: "Tilt Speed 0x01 (Low) - 0x14 (High)"
- id: pantilt_absolute_position
  label: Pan Tilt Absolute Position
  kind: action
  command: "8x 01 06 02 VV WW 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z FF"
  params:
    - name: VV
      type: string
      description: "Pan Speed 0x01-0x18"
    - name: WW
      type: string
      description: "Tilt Speed 0x01-0x14"
    - name: YYYY
      type: string
      description: "Pan Position 0x0000-0x6A40 & 0x95C0-0xFFFF (Center 0000)"
    - name: ZZZZ
      type: string
      description: "Tilt Position 0x0000-0x3840 & 0xED40-0xFFFF (Center 0000)"
- id: pantilt_relative_position
  label: Pan Tilt Relative Position
  kind: action
  command: "8x 01 06 03 VV WW 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z FF"
  params:
    - name: VV
      type: string
      description: "Pan Speed 0x01-0x18"
    - name: WW
      type: string
      description: "Tilt Speed 0x01-0x14"
    - name: YYYY
      type: string
      description: "Pan Position offset 0x0000-0x6A40 & 0x95C0-0xFFFF (Center 0000)"
    - name: ZZZZ
      type: string
      description: "Tilt Position offset 0x0000-0x3840 & 0xED40-0xFFFF (Center 0000)"
- id: pantilt_home
  label: Pan Tilt Home
  kind: action
  command: "8x 01 06 04 FF"
  params: []
- id: pantilt_reset
  label: Pan Tilt Reset
  kind: action
  command: "8x 01 06 05 FF"
  params: []
- id: pantilt_limit_set
  label: Pan Tilt Limit Set
  kind: action
  command: "8x 01 06 07 00 0W 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z FF"
  params:
    - name: W
      type: enum
      values: {1: "Up & Right", 0: "Down & Left"}
    - name: YYYY
      type: string
      description: "Pan Limit Position 0x0000-0x6A40 (Up&Right) or 0xFFFF-0x95C0 (Down&Left)"
    - name: ZZZZ
      type: string
      description: "Tilt Limit Position 0x0000-0x3840 (Up&Right) or 0xFFFF-0xED40 (Down&Left)"
- id: pantilt_limit_clear
  label: Pan Tilt Limit Clear
  kind: action
  command: "8x 01 06 07 01 0W 07 0F 0F 0F 07 0F 0F 0F FF"
  params:
    - name: W
      type: enum
      values: {1: "Clear Up & Right", 0: "Clear Down & Left"}
- id: pantilt_preset_speed
  label: PanTilt Preset Speed
  kind: action
  command: "8x 01 7E 03 02 0p FF"
  params:
    - name: p
      type: enum
      values: {0: "5 deg/sec", 1: "25 deg/sec", 2: "50 deg/sec", 3: "80 deg/sec", 4: "120 deg/sec"}

# ── Pan Tilt Zoom ──
- id: ptz_speed_comp
  label: PTZ Speed Comp
  kind: action
  command: "8x 01 06 1F 01 0p FF"
  params:
    - name: p
      type: enum
      values: {0: Off, 1: On}
- id: preset_speed
  label: Preset Speed
  kind: action
  command: "8x 01 06 20 0p FF"
  params:
    - name: p
      type: enum
      values: {0: "5 deg/sec", 1: "25 deg/sec", 2: "50 deg/sec", 3: "80 deg/sec", 4: "120 deg/sec"}

# ── Picture ──
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
- id: image_mode
  label: Image Mode
  kind: action
  command: "8x 01 04 3F 04 0p FF"
  params:
    - name: p
      type: enum
      values: {0: Standard, 3: Brilliant}
- id: picture_advanced
  label: Picture Advanced
  kind: action
  command: "8x 01 04 3F 07 0p FF"
  params:
    - name: p
      type: enum
      values: {2: On, 3: Off}
- id: sharpness_direct
  label: Sharpness Direct
  kind: action
  command: "8x 01 04 42 00 00 0p 0q FF"
  params:
    - name: pq
      type: string
      description: "00-0B"
- id: saturation
  label: Saturation
  kind: action
  command: "8x 01 04 49 00 00 0p 0q FF"
  params:
    - name: pq
      type: string
      description: "00-19 (Image Mode = Custom mode)"
- id: three_d_nr
  label: 3D NR
  kind: action
  command: "8x 01 04 54 0p FF"
  params:
    - name: p
      type: enum
      values: {0: Off, 1: Low, 2: Type, 3: Max}
- id: gamma
  label: Gamma
  kind: action
  command: "8x 01 04 5B 0p FF"
  params:
    - name: p
      type: integer
      description: "0-3 (Image Mode = Custom mode)"
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
- id: brightness_direct
  label: Brightness Direct
  kind: action
  command: "8x 01 04 4D 00 00 0p 0q FF"
  params:
    - name: pq
      type: string
      description: "00-19 (Image Mode = Custom mode)"

# ── Power ──
- id: power_on_standby
  label: Power On/Standby
  kind: action
  command: "8x 01 04 00 0p FF"
  params:
    - name: p
      type: enum
      values: {2: On, 3: Standby}
- id: standby_mode
  label: Standby Mode
  kind: action
  command: "8x 01 7E 01 0A 03 0p FF"
  params:
    - name: p
      type: enum
      values: {2: "Normal Standby (Lens Tilt Down)", 3: "Ceiling Standby (Lens Tilt Up)"}

# ── Preset ──
- id: preset_reset_0_127
  label: Preset Reset (0-127)
  kind: action
  command: "8x 01 04 3F 00 pp FF"
  params:
    - name: pp
      type: string
      description: "Memory Number 0x00-0x7F (preset address 0-127)"
- id: preset_set_0_127
  label: Preset Set (0-127)
  kind: action
  command: "8x 01 04 3F 01 pp FF"
  params:
    - name: pp
      type: string
      description: "Memory Number 0x00-0x7F (preset address 0-127)"
- id: preset_recall_0_127
  label: Preset Recall (0-127)
  kind: action
  command: "8x 01 04 3F 02 pp FF"
  params:
    - name: pp
      type: string
      description: "Memory Number 0x00-0x7F (preset address 0-127)"
- id: preset_reset_128_255
  label: Preset Reset (128-255)
  kind: action
  command: "8x 01 04 3F 10 pp FF"
  params:
    - name: pp
      type: string
      description: "Memory Number 0x00-0x7F (preset address 128-255)"
- id: preset_set_128_255
  label: Preset Set (128-255)
  kind: action
  command: "8x 01 04 3F 11 pp FF"
  params:
    - name: pp
      type: string
      description: "Memory Number 0x00-0x7F (preset address 128-255)"
- id: preset_recall_128_255
  label: Preset Recall (128-255)
  kind: action
  command: "8x 01 04 3F 12 pp FF"
  params:
    - name: pp
      type: string
      description: "Memory Number 0x00-0x7F (preset address 128-255)"

# ── System ──
- id: privacy_mode
  label: Privacy Mode
  kind: action
  command: "8x 01 04 00 02 0p FF"
  params:
    - name: p
      type: enum
      values: {2: On, 3: Off}
- id: prompt
  label: Prompt
  kind: action
  command: "8x 01 04 07 00 0p FF"
  params:
    - name: p
      type: enum
      values: {2: On, 3: Off}
- id: baud_rate_set
  label: Baud Rate Set
  kind: action
  command: "8x 01 04 24 00 00 0p FF"
  params:
    - name: p
      type: enum
      values: {0: "9600 bps", 1: "38400 bps"}
- id: factory_reset_soft
  label: Factory Reset (Soft)
  kind: action
  command: "8x 01 04 3F 03 00 FF"
  params: []
- id: factory_reset_hard
  label: Factory Reset (Hard)
  kind: action
  command: "8x 01 04 3F 03 01 FF"
  params: []
- id: initial_position
  label: Initial Position
  kind: action
  command: "8x 01 04 75 6A 0p FF"
  params:
    - name: p
      type: enum
      values: {0: Last MEM, 1: 1st Preset}
- id: ir_receive
  label: IR Receive
  kind: action
  command: "8x 01 06 08 pp FF"
  params:
    - name: pp
      type: enum
      values: {2: On, 3: Off, "10": Toggle}
- id: output_mode
  label: Output Mode
  kind: action
  command: "8x 01 06 35 0p 0q FF"
  params:
    - name: pq
      type: enum
      values: {"02": "QFHD 4K(3840x2160) - 59.94p", "03": "QFHD 4K(3840x2160) - 50p", "05": "QFHD 4K(3840x2160) - 29.97p", "06": "QFHD 4K(3840x2160) - 25p", "08": "FHD 1080P(1920x1080) - 59.94p", "09": "FHD 1080P(1920x1080) - 50p", "0B": "FHD 1080P(1920x1080) - 29.97p", "0C": "FHD 1080P(1920x1080) - 25p", "0E": "HD 720P(1280x720) - 59.94p", "0F": "HD 720P(1280x720) - 50p", "11": "HD 720P(1280x720) - 29.97p", "12": "HD 720P(1280x720) - 25p", "15": "FHD 1080i(1920x1080) - 59.94i", "16": "FHD 1080i(1920x1080) - 50i"}
- id: motionless_preset
  label: Motionless Preset
  kind: action
  command: "8x 01 07 01 0p FF"
  params:
    - name: p
      type: enum
      values: {2: On, 3: Off}
- id: hdmi_format
  label: HDMI Format
  kind: action
  command: "8x 01 7E 01 03 00 0p FF"
  params:
    - name: p
      type: enum
      values: {1: RGB, 2: YUV422}
- id: tally_lamp
  label: Tally Lamp
  kind: action
  command: "8x 01 7E 01 0A 00 0p FF"
  params:
    - name: p
      type: enum
      values: {2: On, 3: Off}
- id: tally_mode
  label: Tally Mode
  kind: action
  command: "8x 01 7E 01 0A 01 0p FF"
  params:
    - name: p
      type: enum
      values: {0: "Red:OFF / Green:OFF", 5: "Red:Highlight / Green:OFF", 6: "Red:OFF / Green:Highlight", 7: "Red:Highlight / Green:Highlight"}
- id: write_camera_id
  label: Write Camera ID
  kind: action
  command: "8x 01 CE aa bb cc dd ee ff gg hh ii jj kk ll FF"
  params:
    - name: camera_id
      type: string
      description: "12-byte Camera ID (ASCII): aa bb cc dd ee ff gg hh ii jj kk ll"
- id: reboot
  label: Reboot
  kind: action
  command: "8x 01 DE 01 FF"
  params: []

# ── Tracking ──
- id: tracking_framing_control
  label: Tracking - Framing Control (Preset Recall)
  kind: action
  command: "8x 01 04 3F 02 5p FF"
  params:
    - name: p
      type: enum
      values: {0: "Tracking/Framing On (Recall preset 80)", 1: "Tracking/Framing Off (Recall preset 81)"}
- id: tracking_id_switch
  label: ID Switch
  kind: action
  command: "8x 01 0B 00 00 00 FF"
  params: []
- id: tracking_id_switch_variable
  label: ID Switch (Variable ID)
  kind: action
  command: "8x 01 0B 00 0A 0p 0q FF"
  params:
    - name: pq
      type: string
      description: "0x01-0x10 (DEC 1-16)"
- id: auto_tracking_onoff
  label: Auto Tracking On/Off
  kind: action
  command: "8x 01 0B 00 00 0p FF"
  params:
    - name: p
      type: enum
      values: {2: On, 3: Off}
- id: tracking_mode
  label: Tracking Mode
  kind: action
  command: "8x 01 0B 00 01 0p FF"
  params:
    - name: p
      type: enum
      values: {0: Everywhere, 1: Stage, 2: Partition, 3: Auto Framing, 4: Partition Framing, 5: Center Stage}
- id: tracking_sensitivity
  label: Tracking Sensitivity
  kind: action
  command: "8x 01 0B 00 02 0p FF"
  params:
    - name: p
      type: enum
      values: {0: Low, 1: Middle, 2: High}
- id: tracking_target_lost_time
  label: Tracking Target Lost Time
  kind: action
  command: "8x 01 0B 00 03 0p FF"
  params:
    - name: p
      type: enum
      values: {0: 3s, 1: 5s, 2: 10s}
- id: tracking_target_lost_reaction
  label: Target Lost Reaction
  kind: action
  command: "8x 01 0B 00 04 0p FF"
  params:
    - name: p
      type: enum
      values: {0: "PTZ Back to center and wide", 1: "Stay in last position", 2: "Back to start position"}
- id: tracking_head_position
  label: Head Position
  kind: action
  command: "8x 01 0B 00 05 0p FF"
  params:
    - name: p
      type: enum
      values: {0: Low, 1: Medium, 2: High}
- id: tracking_led_status
  label: Tracking LED Status
  kind: action
  command: "8x 01 0B 00 06 0p FF"
  params:
    - name: p
      type: enum
      values: {2: On, 3: Off}
- id: tracking_body_size_type
  label: Body Size/Type
  kind: action
  command: "8x 01 0B 02 01 0p FF"
  params:
    - name: p
      type: enum
      values: {0: Full Body, 1: Upper Body}
- id: auto_framing_onoff
  label: Auto Framing On/Off
  kind: action
  command: "8x 01 0B 04 02 0p FF"
  params:
    - name: p
      type: enum
      values: {2: On, 3: Off}
- id: framing_type
  label: Framing Type
  kind: action
  command: "8x 0B 01 04 0p FF"
  params:
    - name: p
      type: enum
      values: {A: Tracking, B: Framing}

# ── White Balance ──
- id: wb_manual_red_reset
  label: White Balance Manual Red Reset
  kind: action
  command: "8x 01 04 03 00 FF"
  params: []
- id: wb_manual_red_up
  label: White Balance Manual Red Up
  kind: action
  command: "8x 01 04 03 02 FF"
  params: []
- id: wb_manual_red_down
  label: White Balance Manual Red Down
  kind: action
  command: "8x 01 04 03 03 FF"
  params: []
- id: wb_manual_blue_reset
  label: White Balance Manual Blue Reset
  kind: action
  command: "8x 01 04 04 00 FF"
  params: []
- id: wb_manual_blue_up
  label: White Balance Manual Blue Up
  kind: action
  command: "8x 01 04 04 02 FF"
  params: []
- id: wb_manual_blue_down
  label: White Balance Manual Blue Down
  kind: action
  command: "8x 01 04 04 03 FF"
  params: []
- id: wb_one_push_trigger
  label: White Balance One Push Trigger
  kind: action
  command: "8x 01 04 10 05 FF"
  params: []
- id: wb_mode
  label: White Balance Mode
  kind: action
  command: "8x 01 04 35 0p FF"
  params:
    - name: p
      type: enum
      values: {0: Auto, 1: Indoor, 2: Outdoor, 3: One Push WB, 4: ATW, 5: Manual, C: Sodium Lamp}
- id: wb_manual_red_direct
  label: White Balance Manual Red Direct
  kind: action
  command: "8x 01 04 43 00 00 0p 0q FF"
  params:
    - name: pq
      type: string
      description: "00-80 (0-128)"
- id: wb_manual_blue_direct
  label: White Balance Manual Blue Direct
  kind: action
  command: "8x 01 04 44 00 00 0p 0q FF"
  params:
    - name: pq
      type: string
      description: "00-80 (0-128)"

# ── Zoom ──
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
- id: zoom_tele_step
  label: Zoom Tele Step
  kind: action
  command: "8x 01 04 07 04 FF"
  params: []
- id: zoom_wide_step
  label: Zoom Wide Step
  kind: action
  command: "8x 01 04 07 05 FF"
  params: []
- id: zoom_tele_variable
  label: Zoom Tele (Variable Speed)
  kind: action
  command: "8x 01 04 07 2p FF"
  params:
    - name: p
      type: integer
      description: "Speed 0 (Low) - 7 (High)"
- id: zoom_wide_variable
  label: Zoom Wide (Variable Speed)
  kind: action
  command: "8x 01 04 07 3p FF"
  params:
    - name: p
      type: integer
      description: "Speed 0 (Low) - 7 (High)"
- id: digital_zoom_limit
  label: Digital Zoom Limit
  kind: action
  command: "8x 01 04 26 0p FF"
  params:
    - name: p
      type: enum
      values: {1: 2x, 2: 3x, 3: 4x, 4: 5x, 5: 6x, 6: 7x, 7: 8x}
- id: zoom_direct_variable
  label: Zoom Direct (Variable Speed)
  kind: action
  command: "8x 01 04 47 0p 0q 0r 0s 0t FF"
  params:
    - name: pqrs
      type: string
      description: "Zoom Position, Min 0000h, Max 4000h (D-Zoom x1) or 7AC0h (D-Zoom x2-x8)"
    - name: t
      type: integer
      description: "Zoom Speed 0 (Low) - 7 (High)"
- id: zoom_direct_standard
  label: Zoom Direct (Standard Speed)
  kind: action
  command: "8x 01 04 47 0p 0q 0r 0s FF"
  params:
    - name: pqrs
      type: string
      description: "Zoom Position, Min 0000h, Max 4000h (D-Zoom x1) or 7AC0h (D-Zoom x2-x8)"

# ── Zoom Focus ──
- id: zoom_focus_direct_standard
  label: Zoom Focus Direct (Standard Speed)
  kind: action
  command: "8x 01 04 47 0p 0q 0r 0s 0t 0u 0v 0w FF"
  params:
    - name: pqrs
      type: string
      description: "Zoom Position 0x0000-0x4000"
    - name: tuvw
      type: string
      description: "Focus Position 0x0000-FocusMaxValue (Manual Focus Mode)"

# ══ INQUIRY COMMANDS (Section 13) ══
- id: inq_audio_enable
  label: Audio Enable Inquiry
  kind: query
  command: "8x 09 04 68 FF"
  params: []
- id: inq_dante_audio_enable
  label: Dante Audio Enable Inquiry
  kind: query
  command: "8x 09 04 6C 00 00 FF"
  params: []
- id: inq_delay_time
  label: Delay Time Inquiry
  kind: query
  command: "8x 09 04 6A FF"
  params: []
- id: inq_audio_in
  label: Audio In Inquiry
  kind: query
  command: "8x 09 04 6B FF"
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
- id: inq_af_sensitivity
  label: AF Sensitivity Inquiry
  kind: query
  command: "8x 09 04 58 FF"
  params: []
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
- id: inq_mac_address
  label: MAC Address Inquiry
  kind: query
  command: "8x 09 04 78 FF"
  params: []
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
- id: inq_shutter
  label: Shutter Inquiry
  kind: query
  command: "8x 09 04 4A FF"
  params: []
- id: inq_spot_light
  label: Spot Light Inquiry
  kind: query
  command: "8x 09 04 59 FF"
  params: []
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
- id: inq_menu_mode
  label: Menu Mode Inquiry
  kind: query
  command: "8x 09 06 06 FF"
  params: []
- id: inq_pan_flip_visca
  label: Pan Flip Inquiry (VISCA)
  kind: query
  command: "8x 09 04 67 3F FF"
  params: []
- id: inq_tilt_flip_visca
  label: Tilt Flip Inquiry (VISCA)
  kind: query
  command: "8x 09 04 68 3F FF"
  params: []
- id: inq_pan_flip_ext
  label: Pan Flip Inquiry (Extended)
  kind: query
  command: "8x 09 7E 01 06 FF"
  params: []
- id: inq_tilt_flip_ext
  label: Tilt Flip Inquiry (Extended)
  kind: query
  command: "8x 09 7E 01 09 FF"
  params: []
- id: inq_pantilt_position
  label: Pan Tilt Position Inquiry
  kind: query
  command: "8x 09 06 12 FF"
  params: []
- id: inq_image_mode
  label: Image Mode Inquiry
  kind: query
  command: "8x 09 04 3F 04 FF"
  params: []
- id: inq_advanced
  label: Advanced Inquiry
  kind: query
  command: "8x 09 04 3F 07 FF"
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
- id: inq_brightness
  label: Brightness Inquiry
  kind: query
  command: "8x 09 04 4D FF"
  params: []
- id: inq_power_mode
  label: Power Mode Inquiry
  kind: query
  command: "8x 09 04 00 FF"
  params: []
- id: inq_model_switch
  label: Model Switch Inquiry
  kind: query
  command: "8x 09 06 A4 FF"
  params: []
  # Response pq values: 0B=VC-TR61, 0E=VC-TR61N, 15=VC-TR617, 16=VC-TR75H, 17=VC-TR712, 18=VC-TR717, 19=VC-TR72N, 1A=VC-TR77N
- id: inq_fw_version_main
  label: FW Version Inquiry - Main
  kind: query
  command: "8x 09 7E CF FF"
  params: []
- id: inq_serial
  label: Serial Number Inquiry
  kind: query
  command: "8x 09 02 18 FF"
  params: []
- id: inq_privacy_mode
  label: Privacy Mode Inquiry
  kind: query
  command: "8x 09 04 00 02 FF"
  params: []
- id: inq_prompt
  label: Prompt Inquiry
  kind: query
  command: "8x 09 04 07 00 FF"
  params: []
- id: inq_baud_rate
  label: Baud Rate Inquiry
  kind: query
  command: "8x 09 04 24 00 FF"
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
  # Response pq values: same as output_mode action
- id: inq_motionless_preset
  label: Motionless Preset Inquiry
  kind: query
  command: "8x 09 07 01 FF"
  params: []
- id: inq_hdmi_format
  label: HDMI Format Inquiry
  kind: query
  command: "8x 09 7E 01 03 FF"
  params: []
- id: inq_tally_lamp
  label: Tally Lamp Inquiry
  kind: query
  command: "8x 09 7E 01 0A 00 FF"
  params: []
- id: inq_tally_mode
  label: Tally Mode Inquiry
  kind: query
  command: "8x 09 7E 01 0A 01 FF"
  params: []
- id: inq_cam_id
  label: Camera ID Inquiry
  kind: query
  command: "8x 09 7E CE FF"
  params: []
- id: inq_control_onoff
  label: Control On/Off Inquiry
  kind: query
  command: "8x 09 0B 00 00 FF"
  params: []
- id: inq_id_switch_variable
  label: ID Switch (Variable ID) Inquiry
  kind: query
  command: "8x 09 0B 00 0A FF"
  params: []
- id: inq_tracking_mode
  label: Tracking Mode Inquiry
  kind: query
  command: "8x 09 0B 00 01 FF"
  params: []
- id: inq_target_sensitivity
  label: Target Sensitivity Inquiry
  kind: query
  command: "8x 09 0B 00 02 FF"
  params: []
- id: inq_target_lost_timeout
  label: Target Lost Timeout Inquiry
  kind: query
  command: "8x 09 0B 00 03 FF"
  params: []
- id: inq_target_lost_reaction
  label: Target Lost Reaction Inquiry
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
- id: inq_body_type
  label: Body Type Inquiry
  kind: query
  command: "8x 09 0B 02 01 FF"
  params: []
- id: inq_framing_people_count
  label: Framing People Count Inquiry
  kind: query
  command: "8x 09 0B 04 01 FF"
  params: []
- id: inq_framing_control
  label: Framing Control Inquiry
  kind: query
  command: "8x 09 0B 04 02 FF"
  params: []
- id: inq_framing_type
  label: Framing Type Inquiry
  kind: query
  command: "8x 09 0B 04 FF"
  params: []
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
- id: inq_digital_zoom_limit
  label: Digital Zoom Limit Inquiry
  kind: query
  command: "8x 09 04 26 FF"
  params: []
- id: inq_zoom_position
  label: Zoom Position Inquiry
  kind: query
  command: "8x 09 04 47 FF"
  params: []
```

## Feedbacks
```yaml
# VISCA reply messages (Section 1-2 of source)
- id: ack
  type: raw
  description: "Acknowledge: X0 4Y FF (Y = socket number, X = 9 to F = camera address + 8)"
- id: completion_command
  type: raw
  description: "Completion (commands): X0 5Y FF (Y = socket number)"
- id: completion_inquiry
  type: raw
  description: "Completion (inquiries): X0 5Y ... FF (Y = socket number, ... = inquiry response data)"
- id: error_syntax
  type: raw
  description: "X0 60 02 FF - Syntax Error"
- id: error_buffer_full
  type: raw
  description: "X0 60 03 FF - Command buffer full"
- id: error_cancelled
  type: raw
  description: "X0 6Y 04 FF - Command cancelled (Y = socket number)"
- id: error_no_socket
  type: raw
  description: "X0 6Y 05 FF - No socket (to be cancelled)"
- id: error_not_executable
  type: raw
  description: "X0 6Y 41 FF - Command not executable (Y = socket number)"
```

## Variables
```yaml
# Parameter value tables documented in source (reference lookups, not separate commands):
# - AE_Shutter Table: 17 entries (index 00-10), values differ for 60/30 vs 50/25 mode
# - AE_Gain Table: 16 entries (index 00-0F), 0 dB to +45 dB
# - AE_Gain Limit Table: 12 entries (index 04-0F), +8 dB to +30 dB
# - AE_Exposure Comp Table: 11 entries (index 00-0A), VISCA step 0-10, OSD -6 to +4
# - AE_Iris Table: 16 entries (index 00-0F), Close to F11
# - Zoom Focus Position Table: Zoom 0000-3558-3609/3668, Focus 0000-131A
# UNRESOLVED: these are reference tables for action parameters, not independent settable variables
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements stated in source. Factory Reset (Hard) resets camera and network
# settings - may warrant confirmation but source does not specify.
```

## Notes
- **Protocol:** Sony VISCA command set. Commands work over both RS-232 serial and VISCA over IP (UDP).
- **Addressing:** `8x` header where `x` = camera address (1–7). Reply packets use `X0` where `X` = address + 8 (9–F). Over IP, addresses locked to 0 (controller) / 1 (peripheral).
- **VISCA over IP:** UDP port 52381, IPv4. Message = 8-byte header + payload (1–16 bytes). Payload types: 0x0100=VISCA command, 0x0110=VISCA inquiry, 0x0111=VISCA reply, 0x0120=device setting command, 0x0100/0x0001=control command. Sequence number in header; delivery not guaranteed (application handles retransmission). Max 5 controllers per LAN segment. Broadcast NOT available over IP.
- **Serial config:** Async, half-duplex. Start bit 1, data bits 8, parity none, stop bit 1. Baud 9600 or 38400 (configurable via command).
- **Document version:** RS189, revision 2 (2025/06/27), added VC-TR61N support. Firmware: VYW100 (rev 1), VYW106_VVB101 (rev 2).
- **Mode-specific commands:** Many exposure/focus/WB commands are only available in specific modes (e.g. Shutter commands during Shutter Priority/Manual Mode, WB manual gain during WB Manual mode).
- **Preset range:** 256 presets total (0–255), split across two opcode ranges (0–127 and 128–255).

<!-- UNRESOLVED: firmware version compatibility not stated beyond VYW100 / VYW106_VVB101 -->
<!-- UNRESOLVED: flow control method not stated in source -->
<!-- UNRESOLVED: F_Clear command packet not documented in source (only IF_Clear has a packet) -->
<!-- UNRESOLVED: power consumption, voltage, current specs not in this document -->
````

## Provenance

```yaml
source_domains:
  - mylumens.com
source_urls:
  - "https://www.mylumens.com/Download/RS189%20-%20VC-TR61_VC-TR61N%20RS-232%20command%20set_1_1.pdf"
  - "https://www.mylumens.com/Download/RS189%20-%20VC-TR61%20RS-232%20command%20set_1_0.pdf"
  - https://www.mylumens.com
retrieved_at: 2026-07-14T06:18:24.892Z
last_checked_at: 2026-07-21T23:29:37.964Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T23:29:37.964Z
matched_actions: 216
action_count: 216
confidence: medium
summary: "Spec is a near-verbatim transcription of the source RS232 command list and inquiry list; all 216 action units matched literally with correct shapes and transport values. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "flow control not stated in source"
- "these are reference tables for action parameters, not independent settable variables"
- "no unsolicited notification events documented in source"
- "no multi-step sequences explicitly described in source"
- "no safety warnings, interlock procedures, or power-on sequencing"
- "firmware version compatibility not stated beyond VYW100 / VYW106_VVB101"
- "flow control method not stated in source"
- "F_Clear command packet not documented in source (only IF_Clear has a packet)"
- "power consumption, voltage, current specs not in this document"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
