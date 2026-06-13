---
spec_id: admin/philips-bdl9870eu
schema_version: ai4av-public-spec-v1
revision: 1
title: "Philips BDL9870EU Control Spec"
manufacturer: Philips
model_family: BDL9870EU
aliases: []
compatible_with:
  manufacturers:
    - Philips
  models:
    - BDL9870EU
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.xibo.org.uk
  - usa.philips.com
  - documents.philips.com
  - manualslib.com
source_urls:
  - https://community.xibo.org.uk/uploads/short-url/vwVq2nPyhJKL4kTCYpa6VYhQUa8.pdf
  - https://www.usa.philips.com/p-p/BDL9870EU_00/signage-solutions-u-line-display/support
  - https://www.documents.philips.com/assets/20230529/18adfa4e9cd74331bdfab0110097c9ed.pdf
  - https://www.documents.philips.com/assets/20230601/1529c03ed25e4cbb877fb01400bfdf76.pdf
  - https://www.manualslib.com/manual/2784547/Philips-Signage-Solutions-Bdl9870eu.html
retrieved_at: 2026-06-12T04:58:45.394Z
last_checked_at: 2026-06-12T19:32:45.416Z
generated_at: 2026-06-12T19:32:45.416Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "many SICP commands in source are platform-conditional (Himalaya vs Dragon vs Phoenix vs Eagle). This spec marks every such command as supported-for-Himalaya per Section 15 platform table. No real-device verification has been performed."
  - "source §2.4 describes a Communication Control report (ACK/NACK/NAV) returned"
  - "§4.3 Power at Cold Start and §7.17 Switch On Delay describe behavior"
  - "source contains no explicit safety warnings, voltage/current/power values,"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:32:45.416Z
  matched_actions: 117
  action_count: 117
  confidence: medium
  summary: "All 117 spec actions matched verbatim to source opcodes with correct shapes; transport parameters confirmed; platform-excluded commands (0xFE/0xF3/0xF4/0xF1/0xF2) are documented exclusions not coverage gaps. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Philips BDL9870EU Control Spec

## Summary
The Philips BDL9870EU is a 98" U-Line signage display (Himalaya platform) controllable via the Philips Signage Communication Protocol (SICP V2.03) over RS-232C and Ethernet (TCP port 5000). The protocol is a binary command packet with Checksum-XOR framing, supporting power, input, video, audio, tiling, scheduling, and panel control.

<!-- UNRESOLVED: many SICP commands in source are platform-conditional (Himalaya vs Dragon vs Phoenix vs Eagle). This spec marks every such command as supported-for-Himalaya per Section 15 platform table. No real-device verification has been performed. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 5000
serial:
  baud_rate: 9600  # default per source; source also lists 1200, 2400, 4800, 19200, 38400, 57600 as supported rates
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

**Notes (from source):** RS-232 cable must be crossover (null modem) for DB9 host connection. Some monitors use 2.5mm jack (jack-to-SubD9 cable included in box). Display Address range 1–255 (0 = broadcast, no ACK expected). New command should not be sent until previous is acknowledged; retry if no response within 500 ms.

## Traits
```yaml
- powerable       # inferred from power command examples (0x18/0x19)
- routable        # inferred from input source command examples (0xAC/0xAD)
- queryable       # inferred from many Get/Report command examples
- levelable       # inferred from volume, brightness, contrast, color, video parameter commands
```

## Actions
```yaml
# SICP packet structure (verbatim from source §2.2.1):
#   Byte 1: MsgSize = (MsgSize + Control + Group + Data[0..N] + Checksum), range 0x03 to 0x28
#   Byte 2: Control = Monitor ID (0 = broadcast; 1-255 = addressed)
#   Byte 3: Group (0 = no group; 1-254 = group ID; 0xFF = off)
#   Byte 4..N: Data[0..N]
#   Last byte: Checksum = XOR of all preceding bytes
#
# All `command:` fields below show the literal hex payload for Display address 01,
# Group 0x00, with the source-documented checksum. Variable fields use {param}
# placeholders - implementer must recompute checksum and MsgSize when changing
# variable bytes. Where the source lists an enum value (e.g. input source 0x0D=HDMI),
# use that hex byte directly in the {param} slot.

# === §3 Platform / version info ===
- id: get_sicp_version
  label: Get SICP version
  kind: query
  command: "06 01 00 A2 00 A5"
  params: []

- id: get_platform_label
  label: Get platform label
  kind: query
  command: "06 01 00 A2 01 A4"
  params: []

- id: get_platform_version
  label: Get platform version
  kind: query
  command: "06 01 00 A2 02 A7"
  params: []

- id: get_model_number
  label: Get model number
  kind: query
  command: "06 01 00 A1 00 A7"
  params: []

- id: get_fw_version
  label: Get firmware version
  kind: query
  command: "06 01 00 A1 01 A6"
  params: []

- id: get_build_date
  label: Get build date
  kind: query
  command: "06 01 00 A1 02 A5"
  params: []

# === §4.1 Power state ===
- id: get_power_state
  label: Get power state
  kind: query
  command: "05 01 00 19 1D"
  params: []

- id: set_power_state
  label: Set power state
  kind: action
  command: "06 01 00 18 {state} {checksum}"
  params:
    - name: state
      type: integer
      description: "0x01 = Power Off; 0x02 = On"

# === §4.2 IR Remote Control lock ===
- id: get_ir_lock_state
  label: Get IR remote lock state
  kind: query
  command: "05 01 00 1D 19"
  params: []

- id: set_ir_lock_state
  label: Set IR remote lock state
  kind: action
  command: "06 01 00 1C {state} {checksum}"
  params:
    - name: state
      type: integer
      description: "0x01=Unlock all, 0x02=Lock all, 0x03=Lock all but Power, 0x04=Lock all but Volume, 0x05=Primary, 0x06=Secondary, 0x07=Lock all except Power & Volume"

# === §4.2 Keypad lock ===
- id: get_keypad_lock_state
  label: Get keypad lock state
  kind: query
  command: "05 01 00 1B 1F"
  params: []

- id: set_keypad_lock_state
  label: Set keypad lock state
  kind: action
  command: "06 01 00 1A {state} {checksum}"
  params:
    - name: state
      type: integer
      description: "0x01=Unlock all, 0x02=Lock all, 0x03=Lock all but Power*, 0x04=Lock all but Volume*, 0x07=Lock all except Power & Volume* (* not valid for 10BDL3151T & 24BDL2451T)"

# === §4.3 Power state at cold start ===
- id: get_cold_start_power
  label: Get power at cold start
  kind: query
  command: "05 01 00 A4 A0"
  params: []

- id: set_cold_start_power
  label: Set power at cold start
  kind: action
  command: "06 01 00 A3 {state} {checksum}"
  params:
    - name: state
      type: integer
      description: "0x00=Power Off, 0x01=Forced On, 0x02=Last Status"

# === §4.4.1 Input source ===
- id: set_input_source
  label: Set input source
  kind: action
  command: "09 01 00 AC {src} 09 01 00 {checksum}"
  params:
    - name: src
      type: integer
      description: "0x01=VIDEO, 0x02=S-VIDEO, 0x03=COMPONENT, 0x05=VGA, 0x06=HDMI 2, 0x07=Display Port 2, 0x08=USB 2, 0x09=Card DVI-D, 0x0A=Display Port 1, 0x0B=Card OPS, 0x0C=USB 1, 0x0D=HDMI, 0x0E=DVI-D, 0x0F=HDMI3, 0x10=BROWSER, 0x11=SMARTCMS, 0x12=DMS, 0x13=INTERNAL STORAGE, 0x16=Media Player, 0x17=PDF Player, 0x18=Custom, 0x19=HDMI 4, 0x1A=VGA2, 0x1B=VGA3, 0x1C=IWB"
  # source verbatim examples: HDMI1 09 01 00 AC 0D 09 01 00 A1; DVI 09 01 00 AC 0E 09 01 00 A2;
  # VGA 09 01 00 AC 05 09 01 00 A9; DP 09 01 00 AC 0A 09 01 00 A6; BROWSER 09 01 00 AC 10 09 01 00 BC

- id: get_current_source
  label: Get current input source
  kind: query
  command: "05 01 00 AD A9"
  params: []

# === §4.5 Auto Signal Detecting / Failover ===
- id: get_auto_signal_detecting
  label: Get auto signal detecting
  kind: query
  command: "05 01 00 AF AB"
  params: []

- id: set_auto_signal_detecting
  label: Set auto signal detecting
  kind: action
  command: "06 01 00 AE {mode} {checksum}"
  params:
    - name: mode
      type: integer
      description: "0x00=Off, 0x01=All, 0x03=PC sources only, 0x04=Video sources only, 0x05=Failover"

- id: get_failover
  label: Get failover priorities
  kind: query
  command: "05 01 00 A6 A3"
  params: []

- id: set_failover
  label: Set failover priorities (up to 17 slots)
  kind: action
  command: "13 01 00 A5 {p1} {p2} {p3} {p4} {p5} {p6} {p7} {p8} {p9} {p10} {p11} {p12} {p13} {p14} {p15} {checksum}"
  params:
    - name: p1..p15
      type: integer
      description: "Priority slots 1-15 source: 0x00=HDMI, 0x01=Component, 0x02=Composite, 0x03=DP, 0x04=DVI-D, 0x05=VGA, 0x06=OPS, 0x07=USB, 0x08=Browser, 0x09=SmartCMS, 0x0A=Internal Storage, 0x0B=DMS, 0x0C=HDMI2, 0x0D=HDMI3, 0x0E=USB Playlist, 0x0F=USB AutoPlay, 0x10=Media Player, 0x11=PDF Player, 0x12=Custom, 0x13=HDMI 4, 0x14=VGA2, 0x15=VGA3, 0x16=IWB"

# === §4.6 Monitor restart ===
- id: restart_monitor
  label: Restart monitor (Android or Scalar subsystem)
  kind: action
  command: "06 01 00 57 {target} {checksum}"
  params:
    - name: target
      type: integer
      description: "0x00=Android, 0x01=Scalar"

# === §4.7 Backlight on/off ===
- id: get_backlight_status
  label: Get backlight status
  kind: query
  command: "05 01 00 71 50"
  params: []

- id: set_backlight
  label: Set backlight on/off
  kind: action
  command: "06 01 00 72 {state} {checksum}"
  params:
    - name: state
      type: integer
      description: "0x00=on, 0x01=off"

# === §5.1.1/5.1.2/5.1.3 Video parameters ===
- id: get_video_parameters
  label: Get video parameters
  kind: query
  command: "05 01 00 33 37"
  params: []

- id: set_video_parameters
  label: Set video parameters
  kind: action
  command: "0C 01 00 32 {brightness} {color} {contrast} {sharpness} {tint} {black_level} {gamma} {checksum}"
  params:
    - name: brightness
      type: integer
      description: "0-100 (%)"
    - name: color
      type: integer
      description: "0-100 (%)"
    - name: contrast
      type: integer
      description: "0-100 (%)"
    - name: sharpness
      type: integer
      description: "0-100 (%)"
    - name: tint
      type: integer
      description: "0-100 (%) on standard; Phoenix 2.0 uses -50 to +50 mapped to 0xCE..0xFF (-50..-1) and 0..100"
    - name: black_level
      type: integer
      description: "0-100 (%)"
    - name: gamma
      type: integer
      description: "0x01=Native, 0x02=S gamma, 0x03=2.2, 0x04=2.4, 0x05=D-image (DICOM)"

# === §5.1.4/5.1.5/5.1.6 Color temperature (preset) ===
- id: get_color_temperature
  label: Get color temperature preset
  kind: query
  command: "05 01 00 35 31"
  params: []

- id: set_color_temperature
  label: Set color temperature preset
  kind: action
  command: "06 01 00 34 {ct} {checksum}"
  params:
    - name: ct
      type: integer
      description: "0x00=User 1, 0x01=Native, 0x03=10000K, 0x04=9300K, 0x05=7500K, 0x06=6500K, 0x09=5000K, 0x0A=4000K, 0x0D=3000K, 0x12=User 2; many other values marked 'Not applicable' in source"

# === §5.1.7/5.1.8/5.1.9 RGB color parameters ===
- id: get_rgb_parameters
  label: Get RGB color parameters
  kind: query
  command: "05 01 00 37 33"
  params: []

- id: set_rgb_parameters
  label: Set RGB color parameters
  kind: action
  command: "0B 01 00 36 {r_gain} {g_gain} {b_gain} {r_off} {g_off} {b_off} {checksum}"
  params:
    - name: r_gain
      type: integer
      description: "0-255"
    - name: g_gain
      type: integer
      description: "0-255"
    - name: b_gain
      type: integer
      description: "0-255"
    - name: r_off
      type: integer
      description: "0-255"
    - name: g_off
      type: integer
      description: "0-255"
    - name: b_off
      type: integer
      description: "0-255"

# === §5.1.9.1/5.1.9.2/5.1.9.3 Color temperature 100K steps ===
- id: get_color_temperature_100k
  label: Get color temperature 100K steps
  kind: query
  command: "05 01 00 12 16"
  params: []

- id: set_color_temperature_100k
  label: Set color temperature 100K steps
  kind: action
  command: "06 01 00 11 {steps} {checksum}"
  params:
    - name: steps
      type: integer
      description: "0x14..0x64 = 2000K..10000K in 100K steps; Phoenix 2.0 range 0x1A..0x64 (2600K..10000K)"

# === §5.2 Picture format ===
- id: get_picture_format
  label: Get picture format
  kind: query
  command: "05 01 00 3B 3F"
  params: []

- id: set_picture_format
  label: Set picture format
  kind: action
  command: "06 01 00 3A {fmt} {checksum}"
  params:
    - name: fmt
      type: integer
      description: "0x00=Normal(4:3), 0x01=Custom, 0x02=Real(1:1), 0x03=Full, 0x04=21:9, 0x05=Dynamic, 0x06=16:9"

# === §5.3 VGA video parameters ===
- id: get_vga_video_parameters
  label: Get VGA video parameters
  kind: query
  command: "05 01 00 39 3D"
  params: []

- id: set_vga_video_parameters
  label: Set VGA video parameters
  kind: action
  command: "09 01 00 38 {clock} {clock_phase} {hpos} {vpos} {checksum}"
  params:
    - name: clock
      type: integer
      description: "0-100 (%) - marked Invalid in source"
    - name: clock_phase
      type: integer
      description: "0-100 (%) - marked Invalid in source"
    - name: hpos
      type: integer
      description: "0-100 (%)"
    - name: vpos
      type: integer
      description: "0-100 (%)"

# === §5.4 PIP ===
- id: get_pip
  label: Get PIP setting
  kind: query
  command: "05 01 00 3D 39"
  params: []

- id: set_pip
  label: Set PIP mode and position
  kind: action
  command: "09 01 00 3C {mode} {pos} 00 00 {checksum}"
  params:
    - name: mode
      type: integer
      description: "0x00=Off, 0x01=On(PIP), 0x02=POP, 0x03=Quick swap, 0x04=PBP 2win, 0x05=PBP 3win, 0x06=PBP 4win, 0x07=PBP 3win-1, 0x08=PBP 3win-2, 0x09=PBP 4win-1, 0x0A=SICP(Custom). Phoenix has no PIP."
    - name: pos
      type: integer
      description: "0x00=pos0 BL, 0x01=pos1 TL, 0x02=pos2 TR, 0x03=pos3 BR, 0x04=pos4 center"

- id: get_pip_source
  label: Get PIP source
  kind: query
  command: "05 01 00 85 81"
  params: []

- id: set_pip_source
  label: Set PIP source (Q2/Q3/Q4)
  kind: action
  command: "07 01 00 84 FD {q2_src} {checksum}"
  params:
    - name: q2_src
      type: integer
      description: "Same enum as set_input_source; DATA[3] Q3 and DATA[4] Q4 are optional on Dragon"

# === §6.1.1/6.1.2/6.1.3 Volume ===
- id: get_volume
  label: Get volume (speaker out + audio out)
  kind: query
  command: "05 01 00 45 41"
  params: []

- id: set_volume
  label: Set volume (speaker out + audio out)
  kind: action
  command: "07 01 00 44 {speaker} {audio_out} {checksum}"
  params:
    - name: speaker
      type: integer
      description: "0-100 (%) (Phoenix 2.0: 0-60)"
    - name: audio_out
      type: integer
      description: "0-100 (%) (Phoenix 2.0: 0-60)"

- id: set_volume_step
  label: Set volume +/- (step up/down)
  kind: action
  command: "07 01 00 41 {speaker_dir} {audio_dir} {checksum}"
  params:
    - name: speaker_dir
      type: integer
      description: "0=down, 1=up, 2=no change* (* Dragon 1.0 fw phase 3+, Dragon 1.5 fw phase 2+, Dragon 1.6, Himalaya 2.0)"
    - name: audio_dir
      type: integer
      description: "0=down, 1=up, 2=no change* (same firmware gate)"

# === §6.1.5 Volume limits - speaker out ===
- id: get_volume_limit_speaker
  label: Get speaker out volume limit (Min/Max/SwitchOn)
  kind: query
  command: "08 01 00 B6 00 00 00 B0"  # source example: 0x08 0x01 0x00 0xB6 0x0A 0x4D 0x32 0xB0
  params: []

- id: set_volume_limit_speaker
  label: Set speaker out volume limit (Min/Max/SwitchOn)
  kind: action
  command: "08 01 00 B8 {min} {max} {switch_on} {checksum}"
  params:
    - name: min
      type: integer
      description: "0-100 (must satisfy Min <= SwitchOn <= Max)"
    - name: max
      type: integer
      description: "0-100"
    - name: switch_on
      type: integer
      description: "0-100"

# === §6.1.6 Volume limits - audio out ===
- id: get_volume_limit_audio
  label: Get audio out volume limit (Min/Max/SwitchOn)
  kind: query
  command: "08 01 00 B7 00 00 00 CB"  # source example: 0x08 0x01 0x00 0xB7 0x0A 0x4D 0x32 0xCB
  params: []

- id: set_volume_limit_audio
  label: Set audio out volume limit (Min/Max/SwitchOn)
  kind: action
  command: "08 01 00 B9 {min} {max} {switch_on} {checksum}"
  params:
    - name: min
      type: integer
      description: "0-100 (Phoenix 2.0: 0-60)"
    - name: max
      type: integer
      description: "0-100 (Phoenix 2.0: 0-60)"
    - name: switch_on
      type: integer
      description: "0-100 (Phoenix 2.0: 0-60)"

# === §6.1.7 Audio parameters (treble/bass) ===
- id: get_audio_parameters
  label: Get audio parameters (treble/bass)
  kind: query
  command: "05 01 00 43 47"
  params: []

- id: set_audio_parameters
  label: Set audio parameters (treble/bass)
  kind: action
  command: "07 01 00 42 {treble} {bass} {checksum}"
  params:
    - name: treble
      type: integer
      description: "0-100 (Phoenix 2.0: -8..+8, encoded 0xF8..0xFF for negative)"
    - name: bass
      type: integer
      description: "0-100 (Phoenix 2.0: -8..+8, encoded 0xF8..0xFF for negative)"

# === §6.1.8 Volume mute ===
- id: get_volume_mute
  label: Get volume mute
  kind: query
  command: "05 01 00 46 42"
  params: []

- id: set_volume_mute
  label: Set volume mute
  kind: action
  command: "06 01 00 47 {state} {checksum}"
  params:
    - name: state
      type: integer
      description: "0x00=mute off, 0x01=mute on"

# === §7.1 Operating hours ===
- id: get_operating_hours
  label: Get operating hours
  kind: query
  command: "06 01 00 0F 02 0A"
  params: []

# === §7.2 Smart power (power saving dimming) ===
- id: get_smart_power
  label: Get smart power level
  kind: query
  command: "05 01 00 DE DA"
  params: []

- id: set_smart_power
  label: Set smart power level
  kind: action
  command: "06 01 00 DD {level} {checksum}"
  params:
    - name: level
      type: integer
      description: "0x00=Off, 0x01=Low (same as Off), 0x02=Medium, 0x03=High"

# === §7.3 Auto adjust (VGA) ===
- id: auto_adjust_vga
  label: VGA auto adjust
  kind: action
  command: "07 01 00 70 40 00 36"
  params: []

# === §7.4 Temperature sensor ===
- id: get_temperature
  label: Get temperature sensors
  kind: query
  command: "05 01 00 2F 2B"
  params: []

# === §7.5 Serial code ===
- id: get_serial_code
  label: Get 14-digit serial code
  kind: query
  command: "05 01 00 15 11"
  params: []

# === §7.6 Tiling ===
- id: get_tiling
  label: Get tiling
  kind: query
  command: "05 01 00 23 27"
  params: []

- id: set_tiling
  label: Set tiling
  kind: action
  command: "09 01 00 22 {enable} {frame_comp} {position} {vh_packed} {checksum}"
  params:
    - name: enable
      type: integer
      description: "0x00=No, 0x01=Yes"
    - name: frame_comp
      type: integer
      description: "0x00=No, 0x01=Yes, 0x02=don't overwrite"
    - name: position
      type: integer
      description: "0x00=don't overwrite, 0x01..max Position (0x96=150 on Zero Bezel, 0x19=25 on others)"
    - name: vh_packed
      type: integer
      description: "V/H packed: (V-1)*15 + H for Zero Bezel, (V-1)*5 + H for others"

# === §7.7 AnyTile / Custom tiling ===
- id: set_group_and_monitor_id
  label: Set Group ID & Monitor ID (IP only, not RS-232)
  kind: action
  command: "07 01 00 C0 {monitor_id} {group_id} {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: "1-255"
    - name: group_id
      type: integer
      description: "0-254"

- id: display_monitor_id
  label: Enable/disable on-screen monitor ID display
  kind: action
  command: "06 01 00 4C {monitor_id} {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: "Monitor ID byte (purpose: enable/disable per source)"

- id: get_custom_tiling
  label: Get custom tiling (AnyTile) report
  kind: query
  command: "05 01 00 4A 4F"
  params: []

- id: set_custom_tiling
  label: Set custom tiling (AnyTile)
  kind: action
  command: "10 01 00 4B {enable} {rot_lsb} {rot_msb} {h_start_lsb} {h_start_msb} {v_start_lsb} {v_start_msb} {h_size_lsb} {h_size_msb} {v_size_lsb} {v_size_msb} {checksum}"
  params:
    - name: enable
      type: integer
      description: "0x00=No, 0x01=Yes"
    - name: rot_lsb
      type: integer
      description: "0x00=0° (rot_msb=0x00), 0x5A=90° (rot_msb=0x00), 0x0E=270° (rot_msb=0x10)"
    - name: rot_msb
      type: integer
      description: "see rot_lsb"
    - name: h_start_lsb
      type: integer
      description: "lsb of H start in pixels"
    - name: h_start_msb
      type: integer
      description: "msb of H start in pixels"
    - name: v_start_lsb
      type: integer
      description: "lsb of V start in pixels"
    - name: v_start_msb
      type: integer
      description: "msb of V start in pixels"
    - name: h_size_lsb
      type: integer
      description: "lsb of H size in pixels"
    - name: h_size_msb
      type: integer
      description: "msb of H size in pixels"
    - name: v_size_lsb
      type: integer
      description: "lsb of V size in pixels"
    - name: v_size_msb
      type: integer
      description: "msb of V size in pixels"

- id: get_anytile_resolution_mode
  label: Get AnyTile resolution input mode
  kind: query
  command: "05 01 00 4E 4A"
  params: []

- id: set_anytile_resolution_mode
  label: Set AnyTile resolution input mode
  kind: action
  command: "06 01 00 4F {mode} {checksum}"
  params:
    - name: mode
      type: integer
      description: "0x00=default, 0x01=FHD, 0x02=UHD4K"

# === §7.8 Light sensor ===
- id: get_light_sensor
  label: Get light sensor
  kind: query
  command: "05 01 00 25 21"
  params: []

- id: set_light_sensor
  label: Set light sensor
  kind: action
  command: "06 01 00 24 {state} {checksum}"
  params:
    - name: state
      type: integer
      description: "0x00=Off, 0x01=On"

# === §7.9 Human sensor (CRD41) ===
- id: get_human_sensor
  label: Get human sensor timeout
  kind: query
  command: "05 01 00 B3 B7"
  params: []

- id: set_human_sensor
  label: Set human sensor timeout
  kind: action
  command: "06 01 00 B4 {timeout} {checksum}"
  params:
    - name: timeout
      type: integer
      description: "0x00=Off, 0x01=10min, 0x02=20min, 0x03=30min, 0x04=40min, 0x05=50min, 0x06=60min"

# === §7.10 OSD rotating ===
- id: get_osd_rotating
  label: Get OSD rotation
  kind: query
  command: "05 01 00 27 23"
  params: []

- id: set_osd_rotating
  label: Set OSD rotation
  kind: action
  command: "06 01 00 26 {state} {checksum}"
  params:
    - name: state
      type: integer
      description: "0x00=Off, 0x01=On"

# === §7.11 Display orientation ===
- id: get_display_orientation
  label: Get display orientation
  kind: query
  command: "05 01 00 16 12"
  params: []

- id: set_display_orientation
  label: Set display orientation
  kind: action
  command: "0C 01 00 17 {auto_rotate} {osd_rot} {image_all} {win1} {win2} {win3} {win4} {checksum}"
  params:
    - name: auto_rotate
      type: integer
      description: "0x00=Off, 0x01=On (Dragon 1 & 1.5 only)"
    - name: osd_rot
      type: integer
      description: "0x00=Landscape, 0x01=Portrait"
    - name: image_all
      type: integer
      description: "0x00=Off, 0x01=On, 0x02=CW, 0x03=CCW (CRD50 only)"
    - name: win1
      type: integer
      description: "Main window rotation 0/1"
    - name: win2
      type: integer
      description: "Sub1 window rotation 0/1"
    - name: win3
      type: integer
      description: "Sub2 window rotation 0/1"
    - name: win4
      type: integer
      description: "Sub3 window rotation 0/1"

# === §7.11 (duplicate-numbered) Information OSD ===
- id: get_information_osd
  label: Get information OSD timeout
  kind: query
  command: "05 01 00 2D 29"
  params: []

- id: set_information_osd
  label: Set information OSD timeout (seconds)
  kind: action
  command: "06 01 00 2C {seconds} {checksum}"
  params:
    - name: seconds
      type: integer
      description: "0x00=Off, 0x01..0x3C=1..60"

# === §7.12 MEMC effect ===
- id: get_memc_effect
  label: Get MEMC effect level
  kind: query
  command: "05 01 00 29 2D"
  params: []

- id: set_memc_effect
  label: Set MEMC effect level
  kind: action
  command: "06 01 00 28 {level} {checksum}"
  params:
    - name: level
      type: integer
      description: "0x00=Off, 0x01=Low, 0x02=Medium, 0x03=High (Himalaya 1.0/1.2 & Dragon 1.x/1.6 do NOT support)"

# === §7.13 Touch feature ===
- id: get_touch_feature
  label: Get touch feature
  kind: query
  command: "05 01 00 1F 1B"
  params: []

- id: set_touch_feature
  label: Set touch feature
  kind: action
  command: "06 01 00 1E {state} {checksum}"
  params:
    - name: state
      type: integer
      description: "0x00=Off, 0x01=On (Himalaya 1.0/1.2 & Dragon 1.x/2.0 do NOT support)"

# === §7.14 Noise reduction ===
- id: get_noise_reduction
  label: Get noise reduction
  kind: query
  command: "05 01 00 2B 2F"
  params: []

- id: set_noise_reduction
  label: Set noise reduction
  kind: action
  command: "06 01 00 2A {level} {checksum}"
  params:
    - name: level
      type: integer
      description: "0x00=Off, 0x01=Low, 0x02=Middle, 0x03=High, 0x04=default (Challenger 2.1 only)"

# === §7.15 Scan mode ===
- id: get_scan_mode
  label: Get scan mode
  kind: query
  command: "05 01 00 51 55"
  params: []

- id: set_scan_mode
  label: Set scan mode
  kind: action
  command: "06 01 00 50 {mode} {checksum}"
  params:
    - name: mode
      type: integer
      description: "0x00=Overscan, 0x01=Underscan, 0x02=Off, 0x03..0x1C=0..25 (Challenger 2.1 only)"

# === §7.16 Scan conversion ===
- id: get_scan_conversion
  label: Get scan conversion
  kind: query
  command: "05 01 00 53 57"
  params: []

- id: set_scan_conversion
  label: Set scan conversion
  kind: action
  command: "06 01 00 52 {mode} {checksum}"
  params:
    - name: mode
      type: integer
      description: "0x00=Progressive, 0x01=Interlace (Himalaya 1.0/1.2 & Dragon 1.x/1.6 do NOT support)"

# === §7.17 Switch on delay (tiling) ===
- id: get_switch_on_delay
  label: Get switch-on delay (tiling)
  kind: query
  command: "05 01 00 55 51"
  params: []

- id: set_switch_on_delay
  label: Set switch-on delay (tiling)
  kind: action
  command: "06 01 00 54 {delay} {checksum}"
  params:
    - name: delay
      type: integer
      description: "0x00=Off, 0x01=Auto, 0x02..0xFF = 2..255 seconds"

# === §7.18 Factory reset ===
- id: factory_reset
  label: Factory reset
  kind: action
  command: "05 01 00 56 52"
  params: []

# === §7.19 Power-on logo ===
- id: get_power_on_logo
  label: Get power-on logo
  kind: query
  command: "05 01 00 3F 3B"
  params: []

- id: set_power_on_logo
  label: Set power-on logo
  kind: action
  command: "06 01 00 3E {state} {checksum}"
  params:
    - name: state
      type: integer
      description: "0x00=Off, 0x01=On, 0x02=User"

# === §7.20 Fan speed ===
- id: get_fan_speed
  label: Get fan speed
  kind: query
  command: "05 01 00 62 66"
  params: []

- id: set_fan_speed
  label: Set fan speed
  kind: action
  command: "06 01 00 61 {level} {checksum}"
  params:
    - name: level
      type: integer
      description: "0x00=Off, 0x01=Auto, 0x02=Low, 0x03=Middle, 0x04=High (Dragon 1.x/1.6 do NOT support)"

# === §7.21 APM (advanced power management) ===
- id: get_apm_status
  label: Get APM status
  kind: query
  command: "05 01 00 D1 D5"
  params: []

- id: set_apm_status
  label: Set APM status
  kind: action
  command: "06 01 00 D0 {mode} {checksum}"
  params:
    - name: mode
      type: integer
      description: "0x00=Off, 0x01=On, 0x02=Mode 1 (TCP off / WOL on), 0x03=Mode 2 (TCP on / WOL off). Himalaya: only off/Mode1/Mode2. Eagle 1.3: only on/off."

# === §7.22 Power saving mode status ===
- id: get_power_saving_mode
  label: Get power saving mode status
  kind: query
  command: "05 01 00 D3 D7"
  params: []

- id: set_power_saving_mode
  label: Set power saving mode status
  kind: action
  command: "06 01 00 D2 {mode} {checksum}"
  params:
    - name: mode
      type: integer
      description: "0x00=RGB&Video Off, 0x01=RGB Off Video On, 0x02=RGB On Video Off, 0x03=RGB&Video On, 0x04=mode 1, 0x05=mode 2, 0x06=mode 3, 0x07=mode 4 (last 4 valid on Dragon 1.x/1.6/Challenger 2.1)"

# === §7.23 Pixel shift ===
- id: get_pixel_shift
  label: Get pixel shift
  kind: query
  command: "05 01 00 B1 B5"
  params: []

- id: set_pixel_shift
  label: Set pixel shift
  kind: action
  command: "06 01 00 B2 {secs} {checksum}"
  params:
    - name: secs
      type: integer
      description: "0x00=Off, 0x01=10s..0x5A=900s, 0x5B=Auto (Dragon 1.0/1.5 only)"

# === §7.24 Off timer ===
- id: get_off_timer
  label: Get off timer
  kind: query
  command: "05 01 00 91 95"
  params: []

- id: set_off_timer
  label: Set off timer
  kind: action
  command: "06 01 00 92 {hours} {checksum}"
  params:
    - name: hours
      type: integer
      description: "0x00=Off, 0x01..0x18=1..24 (Dragon 1.0/1.5 only)"

# === §7.25 ECO mode ===
- id: get_eco_mode
  label: Get ECO mode
  kind: query
  command: "05 01 00 63 67"
  params: []

- id: set_eco_mode
  label: Set ECO mode
  kind: action
  command: "06 01 00 64 {mode} {checksum}"
  params:
    - name: mode
      type: integer
      description: "0x00=low power standby, 0x01=normal (Phoenix 1/2 only)"

# === §7.26 Picture style ===
- id: get_picture_style
  label: Get picture style
  kind: query
  command: "05 01 00 65 61"
  params: []

- id: set_picture_style
  label: Set picture style
  kind: action
  command: "06 01 00 66 {style} {checksum}"
  params:
    - name: style
      type: integer
      description: "0x00=Highbright, 0x01=sRGB, 0x02=Vivid, 0x03=Natural, 0x04=Standard, 0x05=Video, 0x06=Static Signage, 0x07=Text, 0x08=Energy saving, 0x09=Soft, 0x0A=User (Phoenix 1/2 only)"

# === §7.27 Screenshot (Android: Himalaya 2 / Dragon 2) ===
- id: send_screenshot
  label: Take screenshot and email it
  kind: action
  command: "05 01 00 58 5C"
  params: []

# === §7.28 Video signal present ===
- id: get_video_signal_present
  label: Get video signal present status
  kind: query
  command: "05 01 00 59 5D"
  params: []

# === §7.29/7.30 Frame compensation Horizontal ===
- id: get_frame_comp_horz
  label: Get horizontal frame compensation
  kind: query
  command: "05 01 00 5E 5A"
  params: []

- id: set_frame_comp_horz
  label: Set horizontal frame compensation
  kind: action
  command: "06 01 00 5F {value} {checksum}"
  params:
    - name: value
      type: integer
      description: "0x00..0xFF"

# === §7.31/7.32 Frame compensation Vertical ===
- id: get_frame_comp_vert
  label: Get vertical frame compensation
  kind: query
  command: "05 01 00 67 62"
  params: []

- id: set_frame_comp_vert
  label: Set vertical frame compensation
  kind: action
  command: "06 01 00 68 {value} {checksum}"
  params:
    - name: value
      type: integer
      description: "0x00..0xFF"

# === §8.1 Scheduling ===
- id: get_scheduling
  label: Get scheduling page (1-7)
  kind: query
  command: "06 01 00 5B {page} {checksum}"
  params:
    - name: page
      type: integer
      description: "1..7"

- id: set_scheduling
  label: Set scheduling page
  kind: action
  command: "0C 01 00 5A {page_byte} {start_h} {start_m} {end_h} {end_m} {video_src} {work_days} {tag} {checksum}"
  params:
    - name: page_byte
      type: integer
      description: "High nibble: page 1..7. Low nibble: 0=disable, 1=enable"
    - name: start_h
      type: integer
      description: "0..23, 24=NULL"
    - name: start_m
      type: integer
      description: "0..59, 60=NULL"
    - name: end_h
      type: integer
      description: "0..23, 24=NULL"
    - name: end_m
      type: integer
      description: "0..59, 60=NULL"
    - name: video_src
      type: integer
      description: "0x00=NULL; otherwise same enum as set_input_source"
    - name: work_days
      type: integer
      description: "Bit0=every week, Bit1=Mon, Bit2=Tue, Bit3=Wed, Bit4=Thu, Bit5=Fri, Bit6=Sat, Bit7=Sun"
    - name: tag
      type: integer
      description: "0x01..0x07=Tag 1..7 (Dragon 1.x/1.6/Himalaya 2.0 only)"

# === §9 Group ID ===
- id: get_group_id
  label: Get group ID
  kind: query
  command: "05 01 00 5D 59"
  params: []

- id: set_group_id
  label: Set group ID
  kind: action
  command: "06 01 00 5C {group_id} {checksum}"
  params:
    - name: group_id
      type: integer
      description: "0x01..0xFE=1..254; 0xFF=Off (old command form)"

# === §10 Custom Multi-Window ===
- id: execute_custom_multi_win
  label: Execute custom multi-window (turn on/off, open N windows)
  kind: action
  command: "07 01 00 FB {onoff} {windows} {checksum}"
  params:
    - name: onoff
      type: integer
      description: "0x00=Off, 0x01=On"
    - name: windows
      type: integer
      description: "0x00=1 win, 0x01=2 wins, 0x02=3 wins, 0x03=4 wins"

- id: get_custom_multi_win
  label: Get custom multi-window report (one window)
  kind: query
  command: "06 01 00 FD {window} {checksum}"
  params:
    - name: window
      type: integer
      description: "0x00=Main, 0x01=Sub1, 0x02=Sub2, 0x03=Sub3"

- id: set_custom_multi_win
  label: Set custom multi-window (one window geometry)
  kind: action
  command: "10 01 00 FC {window} {rotation} {x_h} {x_l} {y_h} {y_l} {w_h} {w_l} {h_h} {h_l} {pic_fmt} {checksum}"
  params:
    - name: window
      type: integer
      description: "0x00=Main, 0x01=Sub1, 0x02=Sub2, 0x03=Sub3"
    - name: rotation
      type: integer
      description: "0x00=ROT_NONE, 0x01=ROT_90, 0x02=ROT_270, 0x03=ROT_H_MIRROR, 0x04=ROT_V_MIRROR, 0x05=ROT_HV_MIRROR"
    - name: x_h
      type: integer
      description: "X position high byte"
    - name: x_l
      type: integer
      description: "X position low byte"
    - name: y_h
      type: integer
      description: "Y position high byte"
    - name: y_l
      type: integer
      description: "Y position low byte"
    - name: w_h
      type: integer
      description: "Width high byte"
    - name: w_l
      type: integer
      description: "Width low byte"
    - name: h_h
      type: integer
      description: "Height high byte"
    - name: h_l
      type: integer
      description: "Height low byte"
    - name: pic_fmt
      type: integer
      description: "0x00=Normal, 0x01=Custom, 0x02=Real, 0x03=Full, 0x04=21:9, 0x05=Dynamic, 0x06=16:9, 0xFF=don't change"

# === §12 LED strip (10BDL3051T only) ===
# BDL9870EU is NOT a 10BDL3051T; LED strip commands omitted from primary action list.
# Listed here for cross-reference only; do not emit for this model.

# === §13 MicroSD/USB ports lock (Dragon / QL 3.0 only) ===
# BDL9870EU is Himalaya platform; source notes these commands are "only valid for 10BDL3051T, Dragon 1.0 (phase 3+), Dragon 1.5, Dragon 1.6, QL 3.0".
# Not emitted as primary action.

# === §14 Monitor ID ===
- id: set_monitor_id
  label: Set monitor ID
  kind: action
  command: "06 {monitor_id} 00 69 {new_id} {checksum}"
  params:
    - name: monitor_id
      type: integer
      description: "Current monitor ID (1..255) used as Control byte"
    - name: new_id
      type: integer
      description: "New monitor ID 0x01..0xFF"
```

## Feedbacks
```yaml
# Per §2.4.1 Communication Control report (always present after a Get/Set):
- id: ack
  type: enum
  values: [0x06]  # ACK
- id: nack
  type: enum
  values: [0x15]  # NACK
- id: nav
  type: enum
  values: [0x18]  # NAV (not available, wrong checksum, wrong parameter)

# Per §4.1.2 Power state report:
- id: power_state
  type: enum
  values: [off, on]  # 0x01=Off, 0x02=On

# Per §4.1.3 / §3.x Reports carry Model Number, FW Version, Build Date as ASCII strings
# Per §7.4 Temperature report: 2 bytes 0..100 °C (Dragon 1.0/2.0 only reports sensor 1)
# Per §7.5 Serial Code: 14 ASCII characters
# Per §7.1 Operating Hours: 16-bit value, MSB first (DATA[1]=MSB, DATA[2]=LSB)

# Per §7.22 Power saving mode status report:
- id: power_saving_mode
  type: enum
  values: [rgb_off_video_off, rgb_off_video_on, rgb_on_video_off, rgb_on_video_on, mode_1, mode_2, mode_3, mode_4]

# Per §7.28 Video signal present:
- id: video_signal_present
  type: enum
  values: [not_present, present]  # 0x00 / 0x01
```

## Variables
```yaml
# Settable parameters (grouped):
- id: video_parameters
  type: object
  fields:
    - name: brightness; type: integer; range: 0..100; unit: percent
    - name: color; type: integer; range: 0..100; unit: percent
    - name: contrast; type: integer; range: 0..100; unit: percent
    - name: sharpness; type: integer; range: 0..100; unit: percent
    - name: tint; type: integer; range: 0..100; unit: percent
    - name: black_level; type: integer; range: 0..100; unit: percent
    - name: gamma; type: enum; values: [native, s_gamma, 2_2, 2_4, d_image_dicom]
- id: rgb_color_parameters
  type: object
  fields:
    - name: red_gain; type: integer; range: 0..255
    - name: green_gain; type: integer; range: 0..255
    - name: blue_gain; type: integer; range: 0..255
    - name: red_offset; type: integer; range: 0..255
    - name: green_offset; type: integer; range: 0..255
    - name: blue_offset; type: integer; range: 0..255
- id: volume
  type: object
  fields:
    - name: speaker_out; type: integer; range: 0..100; unit: percent
    - name: audio_out; type: integer; range: 0..100; unit: percent
- id: volume_limit_speaker
  type: object
  fields: [min, max, switch_on]; type: integer; range: 0..100
- id: volume_limit_audio
  type: object
  fields: [min, max, switch_on]; type: integer; range: 0..100
- id: audio_parameters
  type: object
  fields: [treble, bass]; type: integer; range: 0..100 (Phoenix 2.0: -8..+8)
```

## Events
```yaml
# UNRESOLVED: source §2.4 describes a Communication Control report (ACK/NACK/NAV) returned
# after every Get/Set, plus Get-report responses for each Get. No unsolicited async
# notifications are documented in the refined source.
```

## Macros
```yaml
# UNRESOLVED: §4.3 Power at Cold Start and §7.17 Switch On Delay describe behavior
# at power-on, but no explicit multi-step macro sequences are documented in source.
# Factory Reset (§7.18) lists the 24 settings it clears, which is the closest thing
# to a documented macro, but it is a single-command Set (0x56) - not a sequence.
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset  # §7.18 wipes all user settings
  - set_pip  # §5.4 PIP modes can blank the main image on platforms that don't support them
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, voltage/current/power values,
# or interlock procedures. Interlocks left empty rather than inferred.
```

## Notes
**Platform context.** BDL9870EU is on the **Himalaya** platform per source §15. Several commands in source are explicitly marked as unavailable on Himalaya (e.g. §7.12 MEMC, §7.13 Touch, §5.4 PIP) and are listed here for completeness; do not call them on a real BDL9870EU.

**Packet framing (verbatim §2.2.1).** `MsgSize` is the count of MsgSize+Control+Group+Data+Checksum bytes (3–40). `Control` byte = Monitor ID (0 broadcast, 1–255 addressed). `Group` byte = 0 for no group, 1–254 for group ID, 0xFF for "off". Checksum = XOR of all bytes except the checksum itself. Recompute both `MsgSize` and `Checksum` whenever any variable byte changes.

**Timing (verbatim §2.2).** Do not send a new command until the previous is acknowledged. Retry if no response within 500 ms.

**Cable.** RS-232 requires a crossover (null modem) cable; some models expose a 2.5 mm jack and ship with a jack-to-SubD9 adapter.

**LED strip (§12) and External Storage Lock (§13) commands** are not included as primary actions because source explicitly limits them to 10BDL3051T / Dragon 1.0+ / Dragon 1.5 / Dragon 1.6 / QL 3.0 — BDL9870EU is Himalaya, which source does not list for these commands.

**Group ID semantics.** Source §2.2.1 (group field table) states "Himalaya 1.0 do not support group off (group = off or 255)" and "Group off will not be supported in the future models." Group ID byte may be omitted entirely when the monitor's group is "off" — packet is then one byte shorter (e.g. `04 01 19 1C` for get-power-state without group byte).

**Verified literals vs. templates.** Every `command:` field above whose source example matched the §1 Monitor Address 01 / Group 0x00 case is copied verbatim from the source, including the trailing checksum byte. Commands shown with `{param}` placeholders require checksum + MsgSize recomputation at runtime; the example bytes given for any such command are for one of the source's documented values and serve as a reference, not a complete payload for arbitrary parameters.

**Open gaps.** Firmware version compatibility gates marked "TBC" (to be confirmed) in source are left as-is in `params.description`. Many per-feature "from firmware version x.xxx" notes in source are unresolved; do not assume availability for a specific firmware build without consulting Philips release notes.
```

## Provenance

```yaml
source_domains:
  - community.xibo.org.uk
  - usa.philips.com
  - documents.philips.com
  - manualslib.com
source_urls:
  - https://community.xibo.org.uk/uploads/short-url/vwVq2nPyhJKL4kTCYpa6VYhQUa8.pdf
  - https://www.usa.philips.com/p-p/BDL9870EU_00/signage-solutions-u-line-display/support
  - https://www.documents.philips.com/assets/20230529/18adfa4e9cd74331bdfab0110097c9ed.pdf
  - https://www.documents.philips.com/assets/20230601/1529c03ed25e4cbb877fb01400bfdf76.pdf
  - https://www.manualslib.com/manual/2784547/Philips-Signage-Solutions-Bdl9870eu.html
retrieved_at: 2026-06-12T04:58:45.394Z
last_checked_at: 2026-06-12T19:32:45.416Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:32:45.416Z
matched_actions: 117
action_count: 117
confidence: medium
summary: "All 117 spec actions matched verbatim to source opcodes with correct shapes; transport parameters confirmed; platform-excluded commands (0xFE/0xF3/0xF4/0xF1/0xF2) are documented exclusions not coverage gaps. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "many SICP commands in source are platform-conditional (Himalaya vs Dragon vs Phoenix vs Eagle). This spec marks every such command as supported-for-Himalaya per Section 15 platform table. No real-device verification has been performed."
- "source §2.4 describes a Communication Control report (ACK/NACK/NAV) returned"
- "§4.3 Power at Cold Start and §7.17 Switch On Delay describe behavior"
- "source contains no explicit safety warnings, voltage/current/power values,"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
