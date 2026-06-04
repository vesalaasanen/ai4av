---
spec_id: admin/hisense-5u8k
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 5U8K Control Spec"
manufacturer: HiSense
model_family: 5U8K
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - 5U8K
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:44.773Z
last_checked_at: 2026-06-03T07:09:45.104Z
generated_at: 2026-06-03T07:09:45.104Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "User-stated protocol was TCP/IP, but the source only documents RS-232/IR. The \"Ethernet MAC address\" referenced by the source is used as a client-identifier value inside the RS-232 frame, not as a network control protocol."
  - "Specific HiSense 5U8K model identifier is not stated in the source; the source covers the \"Prosumer TV\" line in general."
  - "source does not document other safety warnings, electrical interlocks,"
verification:
  verdict: verified
  checked_at: 2026-06-03T07:09:45.104Z
  matched_actions: 68
  action_count: 68
  confidence: medium
  summary: "All actions and transport parameters verified (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# HiSense 5U8K Control Spec

## Summary
The HiSense 5U8K is a prosumer-class television controllable via an RS-232 serial interface on a DB9 connector. The source document (V3.6, 17-Apr-2017, "RS-232/IR Protocol for Hisense® Prosumer TV") describes a fixed-length ASCII command protocol with 4-character opcodes, an optional per-TV client identifier, a configurable parameter field, and a 1-byte checksum terminated by CR. It also documents a large catalogue of discrete IR codes, but those are out of scope for a serial-control spec.

<!-- UNRESOLVED: User-stated protocol was TCP/IP, but the source only documents RS-232/IR. The "Ethernet MAC address" referenced by the source is used as a client-identifier value inside the RS-232 frame, not as a network control protocol. -->
<!-- UNRESOLVED: Specific HiSense 5U8K model identifier is not stated in the source; the source covers the "Prosumer TV" line in general. -->

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
  type: none  # inferred: no login/password/auth procedure in source
```

**Frame format (per source):**
- Set:    `S [CLIENT_ID(3)] [COMMAND(4)] [DATA(4)] [CHECKSUM(1)] CR`
- Query:  `Q [CLIENT_ID(3)] [COMMAND(4)] ???? [CHECKSUM(1)] CR`
- Ack:    `[CLIENT_ID(3)] : ACK [DATA(4)] [CHECKSUM(1)] CR`
- `CLIENT_ID` = `ALL` for broadcast, or the last 3 bytes of the TV's Ethernet MAC address (e.g. `5FA`) for a single unit.
- `COMMAND` = 4 ASCII letters, e.g. `POWR`, `INPT`, `PMOD`.
- `DATA` = 4 ASCII characters (0-9, A-Z, `#`, `?`). `????` is the query placeholder.
- `CHECKSUM` = 1 byte; the 8-bit sum of every byte in the frame including the checksum byte equals zero.
- Termination = carriage return (HEX `0x0D`). Colon separator = `0x3A`. Communication code is ASCII. Protocol is case sensitive.

## Traits
```yaml
- powerable   # inferred from POWR/PWRE/PBTN command examples
- routable    # inferred from INPT/INPM/POIS input-routing command examples
- queryable   # inferred from query command examples (? INPT, ? PMOD, ? VOLM, etc.)
- levelable   # inferred from VOLM/BRIT/CONT/COLR/TINT/SHRP/BKLV/MAVL/VLFL level-control examples
```

## Actions
```yaml
# === SET: power ===
- id: set_power_on_command_enable
  label: Set Power-On Command Enable
  kind: action
  command: "S{client_id}PWRE{value}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID; "ALL" for broadcast, or last 3 bytes of MAC e.g. "5FA"
    - name: value
      type: string
      description: "0000 = disable RS-232 remote power on, 0001 = enable"
    - name: checksum
      type: string
      description: 8-bit checksum; sum of all preceding bytes + this byte = 0 mod 256

- id: set_power
  label: Set Power On/Off
  kind: action
  command: "S{client_id}POWR{state}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID; "ALL" for broadcast, or last 3 bytes of MAC
    - name: state
      type: string
      description: "0000 = stand by, 0001 = power on"
    - name: checksum
      type: string
      description: 8-bit checksum; sum of all preceding bytes + this byte = 0 mod 256

- id: set_power_off_control_mode
  label: Set Power Off Control Mode
  kind: action
  command: "S{client_id}PBTN{mode}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: mode
      type: string
      description: "0000 = AC ONLY, 0001 = ALL"
    - name: checksum
      type: string
      description: 8-bit checksum

- id: set_power_on_input
  label: Set Power-On Input Source
  kind: action
  command: "S{client_id}POIS{input}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: input
      type: string
      description: "0000 = LAST, 0001 = Air, 0002 = AV, 0003 = Component"
    - name: checksum
      type: string
      description: 8-bit checksum

# === SET: input / routing ===
- id: set_input_source
  label: Set Input Source
  kind: action
  command: "S{client_id}INPT{input}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: input
      type: string
      description: "0000 = next input (one at a time), 0001 = TV, 0003 = Component, 0004 = AV, 0006 = VGA, 0009 = HDMI1, 0010 = HDMI2, 0011 = HDMI3, 0012 = HDMI4"
    - name: checksum
      type: string
      description: 8-bit checksum

- id: set_input_mode
  label: Set Input Mode
  kind: action
  command: "S{client_id}INPM{mode}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: mode
      type: string
      description: "0000 = LOCKED, 0001 = SELECTABLE, 0002 = AC RESET, 0003 = STANDBY RESET"
    - name: checksum
      type: string
      description: 8-bit checksum

- id: channel_switch
  label: Channel Up / Down
  kind: action
  command: "S{client_id}CHAN{direction}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: direction
      type: string
      description: "0000 = channel down, 0001 = channel up"
    - name: checksum
      type: string
      description: 8-bit checksum

- id: start_autosearch
  label: Start Automatic Channel Search
  kind: action
  command: "S{client_id}TSCN0001{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: checksum
      type: string
      description: 8-bit checksum

- id: set_tuner_mode
  label: Set Tuner Mode
  kind: action
  command: "S{client_id}TUNR{mode}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: mode
      type: string
      description: "0000 = Antenna, 0002 = Cable"
    - name: checksum
      type: string
      description: 8-bit checksum

# === SET: picture ===
- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  command: "S{client_id}PMOD{mode}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: mode
      type: string
      description: "0000 = Standard, 0002 = Vivid, 0003 = EnergySaving, 0004 = Theater, 0005 = Game, 0006 = Sport"
    - name: checksum
      type: string
      description: 8-bit checksum

- id: set_brightness
  label: Set Brightness
  kind: action
  command: "S{client_id}BRIT{value}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: value
      type: string
      description: 4-digit hex value in range 0000-0100 (0-100 decimal)
    - name: checksum
      type: string
      description: 8-bit checksum

- id: set_contrast
  label: Set Contrast
  kind: action
  command: "S{client_id}CONT{value}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: value
      type: string
      description: 4-digit hex value in range 0000-0100 (0-100 decimal)
    - name: checksum
      type: string
      description: 8-bit checksum

- id: set_color_saturation
  label: Set Color Saturation
  kind: action
  command: "S{client_id}COLR{value}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: value
      type: string
      description: 4-digit hex value in range 0000-0100 (0-100 decimal)
    - name: checksum
      type: string
      description: 8-bit checksum

- id: set_tint
  label: Set Tint
  kind: action
  command: "S{client_id}TINT{value}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: value
      type: string
      description: 4-digit hex value in range 0000-0100 (0-100 decimal)
    - name: checksum
      type: string
      description: 8-bit checksum

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: "S{client_id}SHRP{value}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: value
      type: string
      description: 4-digit hex value in range 0000-0020 (0-32 decimal)
    - name: checksum
      type: string
      description: 8-bit checksum

- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  command: "S{client_id}ASPT{ratio}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: ratio
      type: string
      description: "0000 = Auto, 0002 = Normal, 0003 = Zoom, 0004 = Wide, 0005 = Direct, 0006 = 1-to-1 pixel map, 0007 = Panoramic, 0008 = Cinema"
    - name: checksum
      type: string
      description: 8-bit checksum

- id: set_overscan
  label: Set Overscan
  kind: action
  command: "S{client_id}OVSN{state}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: state
      type: string
      description: "0000 = On, 0002 = Off"
    - name: checksum
      type: string
      description: 8-bit checksum

- id: set_color_temp
  label: Set Color Temperature
  kind: action
  command: "S{client_id}CTEM{temp}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: temp
      type: string
      description: "0000 = High, 0002 = Middle, 0003 = Mid-Low, 0004 = Low"
    - name: checksum
      type: string
      description: 8-bit checksum

- id: set_backlight
  label: Set Backlight
  kind: action
  command: "S{client_id}BKLV{value}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: value
      type: string
      description: 4-digit hex value in range 0000-0100 (0-100 decimal)
    - name: checksum
      type: string
      description: 8-bit checksum

- id: reset_picture_settings
  label: Reset Picture Settings
  kind: action
  command: "S{client_id}RSTP1000{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: checksum
      type: string
      description: 8-bit checksum

# === SET: sound ===
- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  command: "S{client_id}AMOD{mode}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: mode
      type: string
      description: "0000 = Standard, 0002 = Theater, 0003 = Music, 0004 = Speech, 0005 = Late night"
    - name: checksum
      type: string
      description: 8-bit checksum

- id: reset_audio_settings
  label: Reset Audio Settings
  kind: action
  command: "S{client_id}RSTA2000{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: checksum
      type: string
      description: 8-bit checksum

- id: set_volume
  label: Set Volume
  kind: action
  command: "S{client_id}VOLM{value}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: value
      type: string
      description: 4-digit hex value in range 0000-0100 (0-100 decimal)
    - name: checksum
      type: string
      description: 8-bit checksum

- id: set_mute
  label: Set Mute
  kind: action
  command: "S{client_id}MUTE{state}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: state
      type: string
      description: "0000 = mute off, 0001 = mute on"
    - name: checksum
      type: string
      description: 8-bit checksum

- id: set_tv_speaker
  label: Set TV Speaker
  kind: action
  command: "S{client_id}ASPK{state}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: state
      type: string
      description: "0000 = off, 0002 = on"
    - name: checksum
      type: string
      description: 8-bit checksum

# === SET: volume lock / control ===
- id: set_volume_range
  label: Set Volume Range (Max)
  kind: action
  command: "S{client_id}MAVL{value}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: value
      type: string
      description: 4-digit hex value in range 0000-0100 (0-100 decimal)
    - name: checksum
      type: string
      description: 8-bit checksum

- id: set_volume_control
  label: Set Volume Control Behavior
  kind: action
  command: "S{client_id}SVOL{mode}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: mode
      type: string
      description: "0000 = LOCKED, 0001 = LAST VOLUME, 0002 = AC RESET, 0003 = STANDBY RESET"
    - name: checksum
      type: string
      description: 8-bit checksum

- id: set_volume_locked_level
  label: Set Volume Locked Level
  kind: action
  command: "S{client_id}VLFL{value}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: value
      type: string
      description: 4-digit hex value in range 0000-0100 (0-100 decimal)
    - name: checksum
      type: string
      description: 8-bit checksum

# === SET: install / lock / panel ===
- id: set_remote_key
  label: Set Remote Key Lockout
  kind: action
  command: "S{client_id}RMOT{mode}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: mode
      type: string
      description: "0000 = ENABLE, 0001 = DISABLE, 0002 = PARTIAL"
    - name: checksum
      type: string
      description: 8-bit checksum

- id: set_panel_key
  label: Set Panel (Button) Key Lockout
  kind: action
  command: "S{client_id}PANL{state}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: state
      type: string
      description: "0000 = ENABLE, 0001 = DISABLE"
    - name: checksum
      type: string
      description: 8-bit checksum

- id: set_menu_access
  label: Set Menu Access
  kind: action
  command: "S{client_id}MENU{state}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: state
      type: string
      description: "0000 = ENABLE, 0001 = DISABLE"
    - name: checksum
      type: string
      description: 8-bit checksum

- id: set_av_setting_menu
  label: Set AV Setting Menu
  kind: action
  command: "S{client_id}AVMN{state}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: state
      type: string
      description: "0000 = DISABLE, 0001 = ENABLE"
    - name: checksum
      type: string
      description: 8-bit checksum

- id: set_osd_mode
  label: Set OSD Mode
  kind: action
  command: "S{client_id}OSD#{state}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: state
      type: string
      description: "0000 = ENABLE, 0001 = DISABLE"
    - name: checksum
      type: string
      description: 8-bit checksum

# === SET: caption / OSD / LED / factory ===
- id: set_caption_control
  label: Set Closed Caption
  kind: action
  command: "S{client_id}CC##{value}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: value
      type: string
      description: "0000 = CC off, 0002 = CC on, 0003 = CC on when mute"
    - name: checksum
      type: string
      description: 8-bit checksum

- id: set_osd_language
  label: Set OSD Language
  kind: action
  command: "S{client_id}LANG{language}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: language
      type: string
      description: "0000 = English, 0002 = Español, 0003 = Français"
    - name: checksum
      type: string
      description: 8-bit checksum

- id: set_standby_led
  label: Set Standby LED
  kind: action
  command: "S{client_id}PLED{state}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: state
      type: string
      description: "0000 = off, 0002 = on"
    - name: checksum
      type: string
      description: 8-bit checksum

- id: restore_factory_settings
  label: Restore Factory Settings
  kind: action
  command: "S{client_id}RSET9999{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: checksum
      type: string
      description: 8-bit checksum

# === Remote-control button simulator ===
- id: simulate_remote_button
  label: Simulate Remote Button
  kind: action
  command: "S{client_id}BTTN{code}{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: code
      type: string
      description: |
        4-digit button code. Documented values:
        1000-1009 = digit 0-9; 1010 = dash; 1012 = POWER; 1015 = FRW<<;
        1016 = PLAY; 1017 = FFW>>; 1018 = PAUSE; 1019 = PREVIOUS<<;
        1020 = STOP; 1021 = NEXT>>; 1023 = Media Player (HiMedia);
        1024 = SLEEP; 1027 = CC; 1031 = MUTE; 1032 = VOL-; 1033 = VOL+;
        1034 = CH+; 1035 = CH-; 1036 = INPUT; 1038 = MENU; 1039 = Connected Home (HiSmart);
        1040 = OK/ENTER; 1041 = UP; 1042 = DOWN; 1043 = LEFT; 1044 = RIGHT;
        1045 = BACK; 1046 = EXIT; 1050 = Red; 1051 = Green; 1052 = Blue;
        1053 = Yellow; 1054 = MTS/SAP; 1055 = Live TV
    - name: checksum
      type: string
      description: 8-bit checksum

# === QUERIES ===
- id: query_power_on_command_enable
  label: Query Power-On Command Enable
  kind: query
  command: "Q{client_id}PWRE????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: checksum
      type: string
      description: 8-bit checksum

- id: query_input_source
  label: Query Current Input Source
  kind: query
  command: "Q{client_id}INPT????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: checksum
      type: string
      description: 8-bit checksum

- id: query_picture_mode
  label: Query Picture Mode
  kind: query
  command: "Q{client_id}PMOD????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: checksum
      type: string
      description: 8-bit checksum

- id: query_brightness
  label: Query Brightness
  kind: query
  command: "Q{client_id}BRIT????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: checksum
      type: string
      description: 8-bit checksum

- id: query_contrast
  label: Query Contrast
  kind: query
  command: "Q{client_id}CONT????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: checksum
      type: string
      description: 8-bit checksum

- id: query_color_saturation
  label: Query Color Saturation
  kind: query
  command: "Q{client_id}COLR????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: checksum
      type: string
      description: 8-bit checksum

- id: query_tint
  label: Query Tint
  kind: query
  command: "Q{client_id}TINT????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: checksum
      type: string
      description: 8-bit checksum

- id: query_sharpness
  label: Query Sharpness
  kind: query
  command: "Q{client_id}SHRP????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: checksum
      type: string
      description: 8-bit checksum

- id: query_aspect_ratio
  label: Query Aspect Ratio
  kind: query
  command: "Q{client_id}ASPT????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: checksum
      type: string
      description: 8-bit checksum

- id: query_overscan
  label: Query Overscan
  kind: query
  command: "Q{client_id}OVSN????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: checksum
      type: string
      description: 8-bit checksum

- id: query_color_temp
  label: Query Color Temperature
  kind: query
  command: "Q{client_id}CTEM????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: checksum
      type: string
      description: 8-bit checksum

- id: query_backlight
  label: Query Backlight
  kind: query
  command: "Q{client_id}BKLV????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: checksum
      type: string
      description: 8-bit checksum

- id: query_sound_mode
  label: Query Sound Mode
  kind: query
  command: "Q{client_id}AMOD????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: checksum
      type: string
      description: 8-bit checksum

- id: query_volume
  label: Query Volume
  kind: query
  command: "Q{client_id}VOLM????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: checksum
      type: string
      description: 8-bit checksum

- id: query_mute
  label: Query Mute Status
  kind: query
  command: "Q{client_id}MUTE????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: checksum
      type: string
      description: 8-bit checksum

- id: query_tv_speaker
  label: Query TV Speaker
  kind: query
  command: "Q{client_id}ASPK????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: checksum
      type: string
      description: 8-bit checksum

- id: query_tuner_mode
  label: Query Tuner Mode
  kind: query
  command: "Q{client_id}TUNR????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: checksum
      type: string
      description: 8-bit checksum

- id: query_caption_control
  label: Query Caption Control
  kind: query
  command: "Q{client_id}CC##????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: checksum
      type: string
      description: 8-bit checksum

- id: query_osd_language
  label: Query OSD Language
  kind: query
  command: "Q{client_id}LANG????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: checksum
      type: string
      description: 8-bit checksum

- id: query_standby_led
  label: Query Standby LED
  kind: query
  command: "Q{client_id}PLED????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: checksum
      type: string
      description: 8-bit checksum

- id: query_power_off_control_mode
  label: Query Power Off Control Mode
  kind: query
  command: "Q{client_id}PBTN????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: checksum
      type: string
      description: 8-bit checksum

- id: query_volume_range
  label: Query Volume Range (Max)
  kind: query
  command: "Q{client_id}MAVL????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: checksum
      type: string
      description: 8-bit checksum

- id: query_volume_control
  label: Query Volume Control Behavior
  kind: query
  command: "Q{client_id}SVOL????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: checksum
      type: string
      description: 8-bit checksum

- id: query_volume_locked_level
  label: Query Volume Locked Level
  kind: query
  command: "Q{client_id}VLFL????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: checksum
      type: string
      description: 8-bit checksum

- id: query_remote_key
  label: Query Remote Key Lockout
  kind: query
  command: "Q{client_id}RMOT????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: checksum
      type: string
      description: 8-bit checksum

- id: query_panel_key
  label: Query Panel Key Lockout
  kind: query
  command: "Q{client_id}PANL????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: checksum
      type: string
      description: 8-bit checksum

- id: query_menu_access
  label: Query Menu Access
  kind: query
  command: "Q{client_id}MENU????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: checksum
      type: string
      description: 8-bit checksum

- id: query_av_setting_menu
  label: Query AV Setting Menu
  kind: query
  command: "Q{client_id}AVMN????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: checksum
      type: string
      description: 8-bit checksum

- id: query_osd_mode
  label: Query OSD Mode
  kind: query
  command: "Q{client_id}OSD#????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: checksum
      type: string
      description: 8-bit checksum

- id: query_input_mode
  label: Query Input Mode
  kind: query
  command: "Q{client_id}INPM????{checksum}\r"
  params:
    - name: client_id
      type: string
      description: 3-byte client ID
    - name: checksum
      type: string
      description: 8-bit checksum
```

## Feedbacks
```yaml
# Responses follow the pattern: {CLIENT_ID}:ACK{DATA}{CHECKSUM}{CR}
# where ACK is OKAY (success), WAIT (pending), or EROR (error).
# DATA is 4 ASCII characters; its meaning mirrors the corresponding SET command.
- id: power_state
  type: enum
  values: [standby, on]
  notes: Read via POWR query. 0000=standby, 0001=on.

- id: current_input
  type: enum
  values: [tv, component, av, vga, hdmi1, hdmi2, hdmi3, hdmi4]
  notes: Read via INPT query. 0001=TV, 0003=Component, 0004=AV, 0006=VGA, 0009=HDMI1, 0010=HDMI2, 0011=HDMI3, 0012=HDMI4.

- id: picture_mode
  type: enum
  values: [standard, vivid, energysaving, theater, game, sport]
  notes: Read via PMOD query.

- id: brightness
  type: integer
  range: 0-100
  notes: Read via BRIT query.

- id: contrast
  type: integer
  range: 0-100
  notes: Read via CONT query.

- id: color_saturation
  type: integer
  range: 0-100
  notes: Read via COLR query.

- id: tint
  type: integer
  range: 0-100
  notes: Read via TINT query.

- id: sharpness
  type: integer
  range: 0-32
  notes: Read via SHRP query.

- id: aspect_ratio
  type: enum
  values: [auto, normal, zoom, wide, direct, pixel_map, panoramic, cinema]
  notes: Read via ASPT query.

- id: overscan
  type: enum
  values: [on, off]
  notes: Read via OVSN query. 0000=on, 0002=off.

- id: color_temp
  type: enum
  values: [high, middle, mid_low, low]
  notes: Read via CTEM query.

- id: backlight
  type: integer
  range: 0-100
  notes: Read via BKLV query.

- id: sound_mode
  type: enum
  values: [standard, theater, music, speech, late_night]
  notes: Read via AMOD query.

- id: volume
  type: integer
  range: 0-100
  notes: Read via VOLM query.

- id: mute_status
  type: enum
  values: [muted, unmuted]
  notes: Read via MUTE query. 0000=unmuted, 0001=muted.

- id: tv_speaker
  type: enum
  values: [on, off]
  notes: Read via ASPK query. 0000=off, 0002=on.

- id: tuner_mode
  type: enum
  values: [antenna, cable]
  notes: Read via TUNR query.

- id: caption_control
  type: enum
  values: [off, on, on_when_mute]
  notes: Read via CC## query.

- id: osd_language
  type: enum
  values: [english, spanish, french]
  notes: Read via LANG query. 0000=English, 0002=Español, 0003=Français.

- id: standby_led
  type: enum
  values: [on, off]
  notes: Read via PLED query. 0000=off, 0002=on.

- id: power_on_command_enable
  type: enum
  values: [disabled, enabled]
  notes: Read via PWRE query. Note: per source, this command is not available in STANDBY mode.

- id: power_off_control_mode
  type: enum
  values: [ac_only, all]
  notes: Read via PBTN query.

- id: volume_range
  type: integer
  range: 0-100
  notes: Read via MAVL query.

- id: volume_control
  type: enum
  values: [locked, last_volume, ac_reset, standby_reset]
  notes: Read via SVOL query.

- id: volume_locked_level
  type: integer
  range: 0-100
  notes: Read via VLFL query.

- id: remote_key_lockout
  type: enum
  values: [enable, disable, partial]
  notes: Read via RMOT query.

- id: panel_key_lockout
  type: enum
  values: [enable, disable]
  notes: Read via PANL query.

- id: menu_access
  type: enum
  values: [enable, disable]
  notes: Read via MENU query.

- id: av_setting_menu
  type: enum
  values: [enable, disable]
  notes: Read via AVMN query.

- id: osd_mode
  type: enum
  values: [enable, disable]
  notes: Read via OSD# query.

- id: input_mode
  type: enum
  values: [locked, selectable, ac_reset, standby_reset]
  notes: Read via INPM query.
```

## Variables
```yaml
# No additional continuous variables beyond those exposed as discrete actions
# (BRIT, CONT, COLR, TINT, SHRP, BKLV, VOLM, MAVL, VLFL). Source documents
# only fixed-step set/query commands; no separate "set-without-action" variables.
```

## Safety
```yaml
confirmation_required_for:
  - restore_factory_settings  # RSET9999 - wipes all custom settings
interlocks: []
# UNRESOLVED: source does not document other safety warnings, electrical interlocks,
# or power-on sequencing requirements beyond the "Power On Command Enable" install flag.
```

## Notes
- **TV setup requirement (per source):** RS-232 control is not enabled by default. The user must enter the Custom Install menu (Quick Settings → enter `7 3 1 0` → set `Custom Installation = Enable`). For RS-232 to power the TV on from standby, the `Power On Command` setting must also be set to `Enable` in that menu.
- **Multiple-TV addressing:** The source documents two addressing modes — `ALL` (broadcast to every TV on the serial bus) and the last 3 bytes of the TV's Ethernet MAC address (e.g. `5FA`). The TV's MAC is found via `Menu > Network > Network Information`.
- **Power-on command enable is not available in STANDBY mode** (per source V3.1 release note for the PWRE command).
- **Example sequence from source (ASCII form):** `S5FAPOWRON##[chk]\r` enables remote power-on; the TV replies `5FA:WAIT####[chk]\r` then `5FA:OKAY####[chk]\r`. `S5FAPOWR0001[chk]\r` then turns the TV on. The "POWR" command alone (without `PWRE` first) will fail to wake a TV that is in standby.
- **Discrete IR codes:** The source also documents a large catalogue of discrete IR codes (NEC protocol, 32-bit custom codes with `04 FB` prefix) covering power, input select, digits, navigation, picture/sound mode toggles, aspect ratio, channel list, sleep, menu, and the colored buttons. These are an alternative control path; the source does not specify a transport layer that delivers them over IP.
- **No TCP/IP control documented.** The user's "Known protocol: TCP/IP" hint is not supported by the source — the Ethernet reference is limited to MAC-derived client IDs and the TV's network info menu. Any TCP control would require a separate, uncataloged command set.
- **Cable note:** For PC/controller connection without a DB9 port, the source specifies a USB-to-Serial adapter (sold separately).
- **DB9 pinout (TV female chassis-mount, DCE):** 1=RI, 2=TXD, 3=RXD, 4=DSR, 5=GND, 6=DTR, 7=CTS, 8=RTS, 9=Power Input/DCD. The "Power Input" pin is not a serial signal and should not be driven.
- **Command mnemonics are case-sensitive** (per source).

## Provenance

```yaml
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:44.773Z
last_checked_at: 2026-06-03T07:09:45.104Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-03T07:09:45.104Z
matched_actions: 68
action_count: 68
confidence: medium
summary: "All actions and transport parameters verified (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "User-stated protocol was TCP/IP, but the source only documents RS-232/IR. The \"Ethernet MAC address\" referenced by the source is used as a client-identifier value inside the RS-232 frame, not as a network control protocol."
- "Specific HiSense 5U8K model identifier is not stated in the source; the source covers the \"Prosumer TV\" line in general."
- "source does not document other safety warnings, electrical interlocks,"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
