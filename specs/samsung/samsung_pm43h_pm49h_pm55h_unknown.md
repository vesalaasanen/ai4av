---
spec_id: admin/samsung-pm43h-pm49h-pm55h
schema_version: ai4av-public-spec-v1
revision: 1
title: "Samsung PM43H / PM49H / PM55H Control Spec"
manufacturer: Samsung
model_family: PM43H
aliases: []
compatible_with:
  manufacturers:
    - Samsung
  models:
    - PM43H
    - PM49H
    - PM55H
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - aca.im
  - manualslib.com
  - samsung.com
  - vgavro.github.io
source_urls:
  - "https://aca.im/driver_docs/Samsung/MDC%20Protocol%202015%20v13.7c.pdf"
  - https://www.manualslib.com/manual/2378610/Samsung-Pmh-Series.html
  - https://www.samsung.com/us/business/support/ownercare/p-m-h-series-digital-signage-pm43h/
  - https://www.samsung.com/us/business/displays/
  - https://vgavro.github.io/samsung-mdc/MDC-Protocol.pdf
retrieved_at: 2026-07-27T07:30:15.158Z
last_checked_at: 2026-08-05T08:40:08.389Z
generated_at: 2026-08-05T08:40:08.389Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is shared MDC manual, not PMH-specific. Exact command subset supported on PM43H/PM49H/PM55H not enumerated. Firmware version coverage not stated."
  - "source does not enumerate the ERR code values returned in NAK."
  - "no async event mechanism documented."
  - "no formal safety interlock procedures or power-on sequencing"
  - "firmware version compatibility not stated in source."
  - "exact subset of MDC commands supported on PM43H/PM49H/PM55H not enumerated by source."
  - "NAK ERR code values not enumerated in source."
  - "0xC0 sub 0x10 / 0x13 / 0x1F data fields marked \"TBD\" in source itself."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:40:08.389Z
  matched_actions: 166
  action_count: 166
  confidence: medium
  summary: "Every spec action's wire-literal opcode (0x00..0xFF plus Annex A 0xC0 subs) appears verbatim in the source command table and per-opcode sections; transport values 9600/1515/192.168.0.10 supported. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-27
---

# Samsung PM43H / PM49H / PM55H Control Spec

## Summary
Samsung PMH-series LFD digital signage displays (PM43H/PM49H/PM55H). Controlled via Samsung MDC (Multiple Display Control) protocol over RS-232 or RJ45 TCP/IP. Source: SEC-VD-DSW Multiple Display Control spec Ver. 13.7c (2016-02-23) — shared MDC manual covering many Samsung LFD models. Per-command model support varies per source note.

<!-- UNRESOLVED: source is shared MDC manual, not PMH-specific. Exact command subset supported on PM43H/PM49H/PM55H not enumerated. Firmware version coverage not stated. -->

## Transport
```yaml
# Source doc title: "SEC-VD-DSW Multiple Display Control Ver. 13.7c 2016-02-23".
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600      # Table 2-1 RS232 Network spec
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 1515           # stated: "default ip : 192.168.0.10 PORT : 1515"
  base_url: "192.168.0.10"  # stated default IP
auth:
  type: none  # inferred: no auth procedure in source
# Packet: Header(0xAA) Command ID DataLength Data1..DataN Checksum
# ID 0xFE = broadcast all sets, no ACK returned.
# Checksum = (sum of Command+ID+DataLength+Data bytes) mod 256.
```

## Traits
```yaml
traits:
  - powerable    # inferred: 0x11 Power Control (off/on/reboot)
  - queryable    # inferred: many Get-status opcodes (0x00,0x04,0x0E,...)
  - levelable    # inferred: volume/brightness/contrast 0-100 set commands
  - routable     # inferred: 0x14 Input Source Control
```

## Actions
```yaml
# Command template legend (verbatim from source packet format):
#   AA <CMD> <ID> <DataLength> <Data1> ... <Checksum>
# <ID> = device display ID (0xFE broadcasts to all, no ACK).
# <Checksum> = sum of bytes from CMD through last Data byte, mod 256.
# Get form = DataLength 0x00 (no Data). Set form = DataLength N + Data bytes.
# Each entry below: one source-documented opcode (or sub-CMD row) = one action.

- id: status_control
  label: Status Control
  kind: query
  command: "AA 00 {id} 00 {checksum}"
  params:
    - { name: id, type: string, description: "Display ID hex (0xFE=all)" }
  description: "Get Status (0x00). Returns Power/Volume/Mute/Input/Aspect/N Time/F Time."

- id: video_control
  label: Video Control
  kind: query
  command: "AA 04 {id} 00 {checksum}"
  params:
    - { name: id, type: string, description: "Display ID hex" }
  description: "Get Video Status (0x04): Contrast/Brightness/Sharpness/Color/Tint/ColorTone/ColorTemp."

- id: rgb_control
  label: RGB Control
  kind: query
  command: "AA 06 {id} 00 {checksum}"
  params:
    - { name: id, type: string, description: "Display ID hex" }
  description: "Get RGB Status (0x06). PC/BNC/DVI only."

- id: pip_status_control
  label: PIP Status Control
  kind: query
  command: "AA 07 {id} 00 {checksum}"
  params:
    - { name: id, type: string, description: "Display ID hex" }
  description: "Get PIP Status (0x07): P.Size, P.Source."

- id: maintenance_control
  label: Maintenance Control
  kind: query
  command: "AA 08 {id} 00 {checksum}"
  params:
    - { name: id, type: string, description: "Display ID hex" }
  description: "Get Maintenance Status (0x08). Data length 0x15 or 0x19 per model."

- id: sound_control
  label: Sound Control
  kind: query
  command: "AA 09 {id} 00 {checksum}"
  params:
    - { name: id, type: string, description: "Display ID hex" }
  description: "Get Audio Status (0x09): Vol/Balance/EQ bands/SRS."

- id: serial_number_control
  label: Serial Number Control
  kind: query
  command: "AA 0B {id} 00 {checksum}"
  params:
    - { name: id, type: string, description: "Display ID hex" }
  description: "Get SerialNum (0x0B). Returns 15-byte serial + 3 reserved."

- id: display_status_control
  label: Display Status Control
  kind: query
  command: "AA 0D {id} 00 {checksum}"
  params:
    - { name: id, type: string, description: "Display ID hex" }
  description: "Get Display Status (0x0D): Lamp/Temperature/Bright_Sensor/No_Sync/Cur_Temp/FAN error codes."

- id: sw_version_control
  label: SW Version Control
  kind: query
  command: "AA 0E {id} 00 {checksum}"
  params:
    - { name: id, type: string, description: "Display ID hex" }
  description: "Get Version (0x0E). Variable data length 2-52."

- id: auto_motion_plus
  label: Auto Motion Plus
  kind: action
  command: "AA 0F {id} 03 {mode} {blur_reduction} {judder_reduction} {checksum}"
  params:
    - { name: id, type: string }
    - { name: mode, type: integer, description: "0=Off 1=Clear 2=Standard 3=Smooth 4=Custom 5=Demo" }
    - { name: blur_reduction, type: integer, description: "0-10, Custom only" }
    - { name: judder_reduction, type: integer, description: "0-10, Custom only" }
  description: "Set/Get Auto Motion Plus (0x0F). 120Hz panel dependent. Get: AA 0F {id} 00 {checksum}."

- id: model_number_control
  label: Model Number Control
  kind: query
  command: "AA 10 {id} 00 {checksum}"
  params:
    - { name: id, type: string }
  description: "Get Model Number (0x10): Species panel type + Model code."

- id: power_control
  label: Power Control
  kind: action
  command: "AA 11 {id} 01 {power} {checksum}"
  params:
    - { name: id, type: string }
    - { name: power, type: integer, description: "0=OFF 1=ON 2=Reboot" }
  description: "Set/Get Power (0x11). RJ45 power-on needs WOL when Network Standby Off. Retry 3x/2s until ACK. Get: AA 11 {id} 00 {checksum}."

- id: volume_control
  label: Volume Control
  kind: action
  command: "AA 12 {id} 01 {volume} {checksum}"
  params:
    - { name: id, type: string }
    - { name: volume, type: integer, description: "0-100" }
  description: "Set/Get Volume (0x12). Get: AA 12 {id} 00 {checksum}."

- id: mute_control
  label: Mute Control
  kind: action
  command: "AA 13 {id} 01 {mute} {checksum}"
  params:
    - { name: id, type: string }
    - { name: mute, type: integer, description: "0=OFF 1=ON" }
  description: "Set/Get Mute (0x13). Get: AA 13 {id} 00 {checksum}."

- id: input_source_control
  label: Input Source Control
  kind: action
  command: "AA 14 {id} 01 {input} {checksum}"
  params:
    - { name: id, type: string }
    - { name: input, type: integer, description: "0x04=S-Video 0x08=Component 0x0C=AV1 0x0D=AV2 0x0E=Ext/SCART 0x18=DVI 0x14=PC 0x1E=BNC 0x1F=DVI_VIDEO 0x20=Magicinfo 0x21=HDMI1 0x22=HDMI1_PC 0x23=HDMI2 0x24=HDMI2_PC 0x25=DisplayPort1 0x26=DisplayPort2 0x27=DisplayPort3 0x31=HDMI3 0x32=HDMI3_PC 0x33=HDMI4 0x34=HDMI4_PC 0x40=TV(DTV) 0x50=Plug In Module 0x55=HDBaseT 0x60=Media/MagicInfo S 0x61=WiDi 0x62=Internal/USB 0x63=URL Launcher 0x64=IWB" }
  description: "Set/Get Input Source (0x14). Get: AA 14 {id} 00 {checksum}. DVI_VIDEO/HDMI*_PC = Get only."

- id: picture_size_control
  label: Picture Size Control
  kind: action
  command: "AA 15 {id} 01 {aspect} {checksum}"
  params:
    - { name: id, type: string }
    - { name: aspect, type: integer, description: "PC: 0x10=16:9 0x18=4:3 0x20=Original 0x21=21:9. Video: 0x00=Auto/Wide 0x01=16:9 0x04=Zoom 0x05=Zoom1 0x06=Zoom2 0x09=Just Scan 0x0B=4:3 0x0C=Wide Fit 0x0D=Custom 0x0E=Smart View1 0x0F=Smart View2 0x31=Wide Zoom 0x32=21:9" }
  description: "Set/Get Picture Size (0x15). Not with Video Wall On. Get: AA 15 {id} 00 {checksum}."

- id: direct_channel_control
  label: Direct Channel Control (DTV)
  kind: action
  command: "AA 17 {id} 08 {country} {atv_dtv} {aircable} {ch_high} {ch_low} {sel_minor} {minor_high} {minor_low} {checksum}"
  params:
    - { name: id, type: string }
    - { name: country, type: integer, description: "0=Korea 1=USA ..." }
    - { name: atv_dtv, type: integer, description: "0=Analog 1=Digital" }
    - { name: aircable, type: integer, description: "0=Air 1=Cable" }
    - { name: ch_high, type: integer }
    - { name: ch_low, type: integer, description: "CH_NUM analog 1-135 / digital 0-999" }
    - { name: sel_minor, type: integer, description: "0=none 1=selected" }
    - { name: minor_high, type: integer }
    - { name: minor_low, type: integer, description: "0-999" }
  description: "Set/Get Channel (0x17). TV models only. Get: AA 17 {id} 00 {checksum}."

- id: screen_mode_control
  label: Screen Mode Control
  kind: action
  command: "AA 18 {id} 01 {scrmode} {checksum}"
  params:
    - { name: id, type: string }
    - { name: scrmode, type: integer, description: "0x01=16:9 0x04=Zoom 0x0B=4:3 0x31=Wide Zoom" }
  description: "Set/Get Screen Mode (0x18). Video Wall Off / Landscape / Auto Wide only. Get: AA 18 {id} 00 {checksum}."

- id: screen_size_control
  label: Screen Size Control
  kind: query
  command: "AA 19 {id} 00 {checksum}"
  params:
    - { name: id, type: string }
  description: "Get Screen Size (0x19). 0-255 inch."

- id: mdc_connection_type
  label: MDC Connection Type
  kind: query
  command: "AA 1D {id} 00 {checksum}"
  params:
    - { name: id, type: string }
  description: "Get MDC Connection Type (0x1D). 0=RS232C 1=RJ45. RJ45 models only, Get only."

- id: contrast_control
  label: Contrast Control
  kind: action
  command: "AA 24 {id} 01 {contrast} {checksum}"
  params:
    - { name: id, type: string }
    - { name: contrast, type: integer, description: "0-100" }
  description: "Set/Get Contrast (0x24). Get: AA 24 {id} 00 {checksum}."

- id: brightness_control
  label: Brightness Control
  kind: action
  command: "AA 25 {id} 01 {brightness} {checksum}"
  params:
    - { name: id, type: string }
    - { name: brightness, type: integer, description: "0-100" }
  description: "Set/Get Brightness (0x25). Get: AA 25 {id} 00 {checksum}."

- id: sharpness_control
  label: Sharpness Control
  kind: action
  command: "AA 26 {id} 01 {sharpness} {checksum}"
  params:
    - { name: id, type: string }
    - { name: sharpness, type: integer, description: "0-100" }
  description: "Set/Get Sharpness (0x26). Get: AA 26 {id} 00 {checksum}."

- id: color_control
  label: Color Control
  kind: action
  command: "AA 27 {id} 01 {color} {checksum}"
  params:
    - { name: id, type: string }
    - { name: color, type: integer, description: "0-100" }
  description: "Set/Get Color (0x27). Get: AA 27 {id} 00 {checksum}."

- id: tint_control
  label: Tint Control
  kind: action
  command: "AA 28 {id} 01 {tint} {checksum}"
  params:
    - { name: id, type: string }
    - { name: tint, type: integer, description: "0-100, 50 steps (0,2,4...100). NTSC only." }
  description: "Set/Get Tint (0x28). Get: AA 28 {id} 00 {checksum}."

- id: coarse_control
  label: Coarse Control
  kind: action
  command: "AA 2F {id} 01 {coarse} {checksum}"
  params:
    - { name: id, type: string }
    - { name: coarse, type: integer, description: "0=Decrease 1=Increase" }
  description: "Set Coarse (0x2F). Not with Video Wall On."

- id: fine_control
  label: Fine Control
  kind: action
  command: "AA 30 {id} 01 {fine} {checksum}"
  params:
    - { name: id, type: string }
    - { name: fine, type: integer, description: "0=Decrease 1=Increase" }
  description: "Set Fine (0x30). Not with Video Wall On."

- id: h_position_control
  label: H-Position Control
  kind: action
  command: "AA 31 {id} 01 {hpos} {checksum}"
  params:
    - { name: id, type: string }
    - { name: hpos, type: integer, description: "0=Left 1=Right" }
  description: "Set H-Position (0x31). Not with Video Wall On / Zoom."

- id: v_position_control
  label: V-Position Control
  kind: action
  command: "AA 32 {id} 01 {vpos} {checksum}"
  params:
    - { name: id, type: string }
    - { name: vpos, type: integer, description: "0=Up 1=Down" }
  description: "Set V-Position (0x32). Not with Video Wall On / Zoom."

- id: auto_power
  label: Auto Power
  kind: action
  command: "AA 33 {id} 01 {auto_power} {checksum}"
  params:
    - { name: id, type: string }
    - { name: auto_power, type: integer, description: "0=Auto Power Off 1=Auto Power On" }
  description: "Set/Get Auto Power (0x33). Get: AA 33 {id} 00 {checksum}."

- id: clear_menu_control
  label: Clear Menu Control
  kind: action
  command: "AA 34 {id} 01 00 {checksum}"
  params:
    - { name: id, type: string }
  description: "Set Clear Menu (0x34). Data always 0x00. Removes OSD."

- id: remote_control_ir_lock
  label: Remote Control (IR Lock)
  kind: action
  command: "AA 36 {id} 01 {rmc} {checksum}"
  params:
    - { name: id, type: string }
    - { name: rmc, type: integer, description: "0=Remocon Disable 1=Remocon Enable" }
  description: "Set/Get IR Lock (0x36). Works regardless of power. Get: AA 36 {id} 00 {checksum}."

- id: rgb_contrast_control
  label: RGB Contrast Control
  kind: action
  command: "AA 37 {id} 01 {contrast} {checksum}"
  params:
    - { name: id, type: string }
    - { name: contrast, type: integer, description: "0-100" }
  description: "Set/Get RGB Contrast (0x37). PC/BNC/DVI only. Get: AA 37 {id} 00 {checksum}."

- id: rgb_brightness_control
  label: RGB Brightness Control
  kind: action
  command: "AA 38 {id} 01 {brightness} {checksum}"
  params:
    - { name: id, type: string }
    - { name: brightness, type: integer, description: "0-100" }
  description: "Set/Get RGB Brightness (0x38). PC/BNC/DVI only. Get: AA 38 {id} 00 {checksum}."

- id: pip_onoff_control
  label: PIP On/Off Control
  kind: action
  command: "AA 3C {id} 01 {pip} {checksum}"
  params:
    - { name: id, type: string }
    - { name: pip, type: integer, description: "0=OFF 1=ON" }
  description: "Set/Get PIP On/Off (0x3C). Not in MagicNet / Video Wall. Get: AA 3C {id} 00 {checksum}."

- id: auto_adjustment_control
  label: Auto Adjustment Control
  kind: action
  command: "AA 3D {id} 01 00 {checksum}"
  params:
    - { name: id, type: string }
  description: "Set Auto Adjustment (0x3D). Data always 0x00. Not with Video Wall/Zoom."

- id: color_tone_control
  label: Color Tone Control
  kind: action
  command: "AA 3E {id} 01 {color_tone} {checksum}"
  params:
    - { name: id, type: string }
    - { name: color_tone, type: integer, description: "0=Cool2 1=Cool1 2=Normal 3=Warm1 4=Warm2 0x50=Off" }
  description: "Set/Get Color Tone (0x3E). Get: AA 3E {id} 00 {checksum}."

- id: color_temperature_control
  label: Color Temperature Control
  kind: action
  command: "AA 3F {id} 01 {c_temp} {checksum}"
  params:
    - { name: id, type: string }
    - { name: c_temp, type: integer, description: "0x00-0x10=5000K-15000K (extended 0x1C-0xA0=2800K-16000K), 0xFD=2800K 0xFE=3000K 0xFF=4000K" }
  description: "Set/Get Color Temperature (0x3F). Only when Color Tone Off. Get: AA 3F {id} 00 {checksum}."

- id: pip_source_control
  label: PIP Source Control
  kind: action
  command: "AA 40 {id} 01 {p_source} {checksum}"
  params:
    - { name: id, type: string }
    - { name: p_source, type: integer, description: "Input source code, see 0x14" }
  description: "Set/Get PIP Source (0x40). PIP must be On. Get: AA 40 {id} 00 {checksum}."

- id: pip_size_control
  label: PIP Size Control
  kind: action
  command: "AA 42 {id} 01 {p_size} {checksum}"
  params:
    - { name: id, type: string }
    - { name: p_size, type: integer, description: "0=Off 4=Double1 5=Double2 6=Medium 7=Large 8=Small 9=Double3/POP 0x10=Custom" }
  description: "Set/Get PIP Size (0x42). Get: AA 42 {id} 00 {checksum}."

- id: pip_locate_control
  label: PIP Locate Control
  kind: action
  command: "AA 43 {id} 01 {p_locate} {checksum}"
  params:
    - { name: id, type: string }
    - { name: p_locate, type: integer, description: "0=Off(Get) 1=UpperLeft 2=UpperRight 3=LowerRight 4=LowerLeft" }
  description: "Set/Get PIP Locate (0x43). PIP On required. Get: AA 43 {id} 00 {checksum}."

- id: fan_speed_setting
  label: Fan Speed Setting
  kind: action
  command: "AA 44 {id} 01 {fan_speed} {checksum}"
  params:
    - { name: id, type: string }
    - { name: fan_speed, type: integer, description: "0-100. Forces Fan Control=Manual (see 0x8F)." }
  description: "Set/Get Fan Speed (0x44). Get: AA 44 {id} 00 {checksum}."

- id: user_auto_color
  label: User Auto Color
  kind: action
  command: "AA 45 {id} 01 {auto_color_cmd} {checksum}"
  params:
    - { name: id, type: string }
    - { name: auto_color_cmd, type: integer, description: "0=Reset 1=Auto Color" }
  description: "Set User Auto Color (0x45). PC(D-Sub) scaler models only. Get returns NAK."

- id: sound_select_47
  label: Sound Select Control (0x47)
  kind: action
  command: "AA 47 {id} 01 {s_select} {checksum}"
  params:
    - { name: id, type: string }
    - { name: s_select, type: integer, description: "0=Sub 1=Main" }
  description: "Set/Get Sound Select (0x47). PIP On. Duplicate of 0x65. Get: AA 47 {id} 00 {checksum}."

- id: auto_volume
  label: Auto Volume
  kind: action
  command: "AA 48 {id} 01 {a_vol} {checksum}"
  params:
    - { name: id, type: string }
    - { name: a_vol, type: integer, description: "0=Off 1=Normal/On 2=Night" }
  description: "Set/Get Auto Volume (0x48). Get: AA 48 {id} 00 {checksum}."

- id: standby_control
  label: Standby Control
  kind: action
  command: "AA 4A {id} 01 {standby} {checksum}"
  params:
    - { name: id, type: string }
    - { name: standby, type: integer, description: "0=Off 1=On 2=Auto" }
  description: "Set/Get Standby (0x4A). PC/DVI/HDMI/DisplayPort. Get: AA 4A {id} 00 {checksum}."

- id: video_picture_position_size
  label: Video Picture Position & Size
  kind: action
  command: "AA 4B {id} 02 {type_cmd} {direction_cmd} {checksum}"
  params:
    - { name: id, type: string }
    - { name: type_cmd, type: integer, description: "0=Reset 1=Position 2=Size 3=Reserved" }
    - { name: direction_cmd, type: integer, description: "Position: 0=Down 1=Up 2=Left 3=Right. Size: 0=VScaleDown 1=VScaleUp 2=HScaleDown 3=HScaleUp" }
  description: "Set Video Picture Position & Size (0x4B). Zoom1/2/ScreenFit/Custom. Get returns NAK."

- id: pixel_shift_control
  label: Pixel Shift Control
  kind: action
  command: "AA 4C {id} 04 {shift} {h_dot} {v_line} {s_time} {checksum}"
  params:
    - { name: id, type: string }
    - { name: shift, type: integer, description: "0=OFF 1=ON" }
    - { name: h_dot, type: integer, description: "0-4" }
    - { name: v_line, type: integer, description: "0-4" }
    - { name: s_time, type: integer, description: "1-4" }
  description: "Set/Get Pixel Shift (0x4C). Get: AA 4C {id} 00 {checksum}."

- id: eq_100hz_control
  label: EQ 100Hz Control
  kind: action
  command: "AA 51 {id} 01 {v100} {checksum}"
  params:
    - { name: id, type: string }
    - { name: v100, type: integer, description: "0-20" }
  description: "Set/Get EQ 100Hz (0x51). Get: AA 51 {id} 00 {checksum}."

- id: eq_300hz_control
  label: EQ 300Hz Control
  kind: action
  command: "AA 52 {id} 01 {v300} {checksum}"
  params:
    - { name: id, type: string }
    - { name: v300, type: integer, description: "0-20" }
  description: "Set/Get EQ 300Hz (0x52). Get: AA 52 {id} 00 {checksum}."

- id: eq_1khz_control
  label: EQ 1kHz Control
  kind: action
  command: "AA 53 {id} 01 {v1k} {checksum}"
  params:
    - { name: id, type: string }
    - { name: v1k, type: integer, description: "0-20" }
  description: "Set/Get EQ 1kHz (0x53). Get: AA 53 {id} 00 {checksum}."

- id: eq_3khz_control
  label: EQ 3kHz Control
  kind: action
  command: "AA 54 {id} 01 {v3k} {checksum}"
  params:
    - { name: id, type: string }
    - { name: v3k, type: integer, description: "0-20" }
  description: "Set/Get EQ 3kHz (0x54). Get: AA 54 {id} 00 {checksum}."

- id: eq_10khz_control
  label: EQ 10kHz Control
  kind: action
  command: "AA 55 {id} 01 {v10k} {checksum}"
  params:
    - { name: id, type: string }
    - { name: v10k, type: integer, description: "0-20" }
  description: "Set/Get EQ 10kHz (0x55). Get: AA 55 {id} 00 {checksum}."

- id: auto_lamp_control
  label: Auto Lamp Control
  kind: action
  command: "AA 57 {id} 08 {lmax_h} {lmax_m} {lmax_ap} {lmax_value} {lmin_h} {lmin_m} {lmin_ap} {lmin_value} {checksum}"
  params:
    - { name: id, type: string }
    - { name: lmax_h, type: integer, description: "1-12" }
    - { name: lmax_m, type: integer, description: "0-59" }
    - { name: lmax_ap, type: integer, description: "1=AM 0=PM" }
    - { name: lmax_value, type: integer, description: "0-100" }
    - { name: lmin_h, type: integer, description: "1-12" }
    - { name: lmin_m, type: integer, description: "0-59" }
    - { name: lmin_ap, type: integer, description: "1=AM 0=PM" }
    - { name: lmin_value, type: integer, description: "0-100, 0xFF=Off" }
  description: "Set/Get Auto Lamp (0x57). Get: AA 57 {id} 00 {checksum}."

- id: manual_lamp_control
  label: Manual Lamp Control
  kind: action
  command: "AA 58 {id} 01 {lamp_value} {checksum}"
  params:
    - { name: id, type: string }
    - { name: lamp_value, type: integer, description: "0-100, 0xFF=Off" }
  description: "Set/Get Manual Lamp (0x58). Get: AA 58 {id} 00 {checksum}."

- id: safety_screen_run_control
  label: Safety Screen Run Control
  kind: action
  command: "AA 59 {id} 01 {safety_screen_type} {checksum}"
  params:
    - { name: id, type: string }
    - { name: safety_screen_type, type: integer, description: "0=Off 1=SignalPattern 2=AllWhite 3=Scroll 4=Bar 6=Eraser 7=Pixel 0x10=RollingBar 0x11=FadingScreen (1,2 PDP only)" }
  description: "Set Safety Screen Run (0x59). Immediate run, not timer."

- id: inverse_control
  label: Inverse Control
  kind: action
  command: "AA 5A {id} 01 {inverse} {checksum}"
  params:
    - { name: id, type: string }
    - { name: inverse, type: integer, description: "0=OFF 1=ON" }
  description: "Set/Get Inverse (0x5A). Get: AA 5A {id} 00 {checksum}."

- id: safety_screen_control
  label: Safety Screen Control (MFM)
  kind: action
  command: "AA 5B {id} 03 {type} {t_period} {t_time} {checksum}"
  params:
    - { name: id, type: string }
    - { name: type, type: integer, description: "Repeat: 0x03=Scroll 0x04=Pixel 0x05=Bar 0x06=Eraser 0x09=AllWhite 0x0A=Pattern 0x10=RollingBar 0x11=FadingScreen. Interval: set MSB (0x83/0x84/...)." }
    - { name: t_period, type: integer, description: "1-10 hr (Repeat)" }
    - { name: t_time, type: integer, description: "1=10s 2=20s 3=30s 4=40s 5=50s (Repeat)" }
  description: "Set/Get Safety Screen Timer (0x5B). Repeat=DataLen3 / Interval=DataLen7. Get: AA 5B {id} 00 {checksum}."

- id: video_wall_mode_control
  label: Video Wall Mode Control
  kind: action
  command: "AA 5C {id} 01 {wall_mode} {checksum}"
  params:
    - { name: id, type: string }
    - { name: wall_mode, type: integer, description: "0=Full 1=Natural" }
  description: "Set/Get Video Wall Mode (0x5C). Video Wall On required. Get: AA 5C {id} 00 {checksum}."

- id: safety_lock
  label: Safety Lock
  kind: action
  command: "AA 5D {id} 01 {lock} {checksum}"
  params:
    - { name: id, type: string }
    - { name: lock, type: integer, description: "0=Off 1=On" }
  description: "Set/Get Safety Lock (0x5D). Works regardless of power. Get: AA 5D {id} 00 {checksum}."

- id: panel_lock
  label: Panel Lock (Key Lock)
  kind: action
  command: "AA 5F {id} 01 {button_lock} {checksum}"
  params:
    - { name: id, type: string }
    - { name: button_lock, type: integer, description: "0=Unlock 1=Lock" }
  description: "Set/Get Panel/Button Lock (0x5F). Works regardless of power. Get: AA 5F {id} 00 {checksum}."

- id: channel_updown
  label: Channel Up/Down
  kind: action
  command: "AA 61 {id} 01 {channel_updown} {checksum}"
  params:
    - { name: id, type: string }
    - { name: channel_updown, type: integer, description: "0=Up 1=Down" }
  description: "Set Channel Up/Down (0x61). TV models only."

- id: volume_updown
  label: Volume Up/Down
  kind: action
  command: "AA 62 {id} 01 {volume_updown} {checksum}"
  params:
    - { name: id, type: string }
    - { name: volume_updown, type: integer, description: "0=Up 1=Down" }
  description: "Set Volume Up/Down (0x62)."

- id: ticker_control
  label: Ticker
  kind: action
  command: "AA 63 {id} {length} {ticker_onoff} {start_h} {start_m} {start_ap} {end_h} {end_m} {end_ap} {pos_h} {pos_v} {motion_onoff} {motion_dir} {motion_speed} {font_size} {fg_color} {bg_color} {fg_opacity} {bg_opacity} {msg_data} {checksum}"
  params:
    - { name: id, type: string }
    - { name: length, type: integer, description: "variable data length" }
    - { name: ticker_onoff, type: integer, description: "0=Off 1=On" }
    - { name: start_h, type: integer, description: "1-12" }
    - { name: start_m, type: integer, description: "0-59" }
    - { name: start_ap, type: integer, description: "0=PM 1=AM" }
    - { name: end_h, type: integer, description: "1-12" }
    - { name: end_m, type: integer, description: "0-59" }
    - { name: end_ap, type: integer }
    - { name: pos_h, type: integer, description: "0=Center 1=Left 2=Right" }
    - { name: pos_v, type: integer, description: "0=Center 1=Left 2=Right" }
    - { name: motion_onoff, type: integer }
    - { name: motion_dir, type: integer, description: "0=Left 1=Right 2=Up 3=Down" }
    - { name: motion_speed, type: integer, description: "0=Normal 1=Slow 2=Fast" }
    - { name: font_size, type: integer, description: "0=Normal 1=Slow 2=Fast" }
    - { name: fg_color, type: integer, description: "0-7 color" }
    - { name: bg_color, type: integer, description: "0-7 color" }
    - { name: fg_opacity, type: integer, description: "0-5" }
    - { name: bg_opacity, type: integer, description: "0-5" }
    - { name: msg_data, type: string, description: "hex unicode message, up to 111 words" }
  description: "Set/Get Ticker (0x63). Get: AA 63 {id} 00 {checksum}."

- id: sound_select_65
  label: Sound Select Control (0x65)
  kind: action
  command: "AA 65 {id} 01 {s_select} {checksum}"
  params:
    - { name: id, type: string }
    - { name: s_select, type: integer, description: "0=Sub 1=Main" }
  description: "Set/Get Sound Select (0x65). Duplicate of 0x47. Get: AA 65 {id} 00 {checksum}."

- id: pc_module_detect
  label: PC Module Detect
  kind: query
  command: "AA 66 {id} 00 {checksum}"
  params:
    - { name: id, type: string }
  description: "Get PC Module connection (0x66). 0=NotDetected 1=MagicInfo 2=PlugInModule. Get only."

- id: device_name
  label: Device Name
  kind: query
  command: "AA 67 {id} 00 {checksum}"
  params:
    - { name: id, type: string }
  description: "Get Device Name (0x67). Up to 15 chars. Get only."

- id: speaker_select
  label: Speaker Select
  kind: action
  command: "AA 68 {id} 01 {s_select} {checksum}"
  params:
    - { name: id, type: string }
    - { name: s_select, type: integer, description: "0=Internal 1=External" }
  description: "Set/Get Speaker Select (0x68). Get: AA 68 {id} 00 {checksum}."

- id: osd_onoff
  label: OSD On/Off
  kind: action
  command: "AA 70 {id} 01 {osd} {checksum}"
  params:
    - { name: id, type: string }
    - { name: osd, type: integer, description: "0=Off 1=On" }
  description: "Set/Get OSD (0x70). Get: AA 70 {id} 00 {checksum}."

- id: pmode_control
  label: P.Mode Control
  kind: action
  command: "AA 71 {id} 01 {pmode} {checksum}"
  params:
    - { name: id, type: string }
    - { name: pmode, type: integer, description: "AV: 0x00=Dynamic 0x01=Standard 0x02=Movie 0x03=Custom 0x04=Natural 0x05=Calibration 0x50=Off. PC: 0x10=Entertain 0x11=Internet 0x12=Text 0x13=Custom 0x14=Advertisement 0x15=Information 0x16=Calibration 0x50=Off. All: 0x20-0x27 Shop& Mall / Office / Terminal / Videowall." }
  description: "Set/Get Picture Mode (0x71). Get: AA 71 {id} 00 {checksum}."

- id: smode_control
  label: S.Mode Control
  kind: action
  command: "AA 72 {id} 01 {smode} {checksum}"
  params:
    - { name: id, type: string }
    - { name: smode, type: integer, description: "0=Standard 1=Music 2=Movie 3=Speech 4=Custom 5=Amplify" }
  description: "Set/Get Sound Mode (0x72). Get: AA 72 {id} 00 {checksum}."

- id: digital_nr
  label: Digital NR
  kind: action
  command: "AA 73 {id} 01 {nr_mode} {checksum}"
  params:
    - { name: id, type: string }
    - { name: nr_mode, type: integer, description: "0=Off 1=Low 2=Medium 3=High 4=Auto 5=Auto Visualization" }
  description: "Set/Get Digital NR (0x73). Get: AA 73 {id} 00 {checksum}."

- id: pc_color_tone
  label: PC Color Tone Control
  kind: action
  command: "AA 75 {id} 01 {color_tone} {checksum}"
  params:
    - { name: id, type: string }
    - { name: color_tone, type: integer, description: "0=Custom 1=Cool 2=Normal 3=Warm 0x50=Off" }
  description: "Set/Get PC Color Tone (0x75). PC/BNC/DVI. Get: AA 75 {id} 00 {checksum}."

- id: auto_auto_adjustment
  label: Auto Auto Adjustment
  kind: action
  command: "AA 76 {id} 01 {a_adjustment} {checksum}"
  params:
    - { name: id, type: string }
    - { name: a_adjustment, type: integer, description: "0=Disable 1=Enable" }
  description: "Set/Get Auto Adjustment Enable (0x76). Get: AA 76 {id} 00 {checksum}."

- id: all_keys_lock
  label: All Keys Lock
  kind: action
  command: "AA 77 {id} 01 {akl} {checksum}"
  params:
    - { name: id, type: string }
    - { name: akl, type: integer, description: "0=OFF 1=ON (Remocon + Panel)" }
  description: "Set/Get All Keys Lock (0x77). Works regardless of power. Get: AA 77 {id} 00 {checksum}."

- id: srs_tsxt
  label: SRS TSXT Control
  kind: action
  command: "AA 78 {id} 01 {srs} {checksum}"
  params:
    - { name: id, type: string }
    - { name: srs, type: integer, description: "0=OFF 1=ON" }
  description: "Set/Get SRS TS XT (0x78). Get: AA 78 {id} 00 {checksum}."

- id: film_mode
  label: Film Mode
  kind: action
  command: "AA 79 {id} 01 {fmode} {checksum}"
  params:
    - { name: id, type: string }
    - { name: fmode, type: integer, description: "0=Off 1=Auto1 2=Auto2 3=Cinema Smooth" }
  description: "Set/Get Film Mode (0x79). Get: AA 79 {id} 00 {checksum}."

- id: panel_on_time
  label: Panel On Time
  kind: query
  command: "AA 83 {id} 00 {checksum}"
  params:
    - { name: id, type: string }
  description: "Get Panel On Time (0x83). PTime_H + PTime_L."

- id: video_wall_on
  label: Video Wall On
  kind: action
  command: "AA 84 {id} 01 {v_wall_on} {checksum}"
  params:
    - { name: id, type: string }
    - { name: v_wall_on, type: integer, description: "0=OFF 1=ON" }
  description: "Set/Get Video Wall On/Off (0x84). Not in MagicNet. Get: AA 84 {id} 00 {checksum}."

- id: temperature_control
  label: Temperature Control
  kind: action
  command: "AA 85 {id} 01 {temperature} {checksum}"
  params:
    - { name: id, type: string }
    - { name: temperature, type: integer, description: "75-124 (deg C max threshold)" }
  description: "Set/Get Temperature threshold (0x85). Temp-notification models. Get: AA 85 {id} 00 {checksum}."

- id: brightness_sensor
  label: Brightness Sensor
  kind: action
  command: "AA 86 {id} 01 {br_sensor} {checksum}"
  params:
    - { name: id, type: string }
    - { name: br_sensor, type: integer, description: "0=OFF 1=ON" }
  description: "Set/Get Brightness Sensor (0x86). Get: AA 86 {id} 00 {checksum}."

- id: dynamic_contrast
  label: Dynamic Contrast
  kind: action
  command: "AA 87 {id} 01 {dy_cont} {checksum}"
  params:
    - { name: id, type: string }
    - { name: dy_cont, type: integer, description: "0=Off 1=Low 2=Medium 3=High" }
  description: "Set/Get Dynamic Contrast (0x87). Get: AA 87 {id} 00 {checksum}."

- id: video_wall_user_control
  label: Video Wall User Control
  kind: action
  command: "AA 89 {id} 02 {wall_div} {wall_sno} {checksum}"
  params:
    - { name: id, type: string }
    - { name: wall_div, type: integer, description: "Video Wall Divider code (see 0x89 H/V table 1-15)" }
    - { name: wall_sno, type: integer, description: "Serial number: 5x5=1-25, 10x10=1-100, 15x15=1-225" }
  description: "Set/Get Video Wall divider+serial (0x89). Get: AA 89 {id} 00 {checksum}."

- id: model_name
  label: Model Name
  kind: query
  command: "AA 8A {id} 00 {checksum}"
  params:
    - { name: id, type: string }
  description: "Get Model Name string (0x8A). Variable length."

- id: video_wall_direct_user_control
  label: Video Wall Direct User Control
  kind: action
  command: "AA 8B {id} 05 {v_wall_on} {wall_mode} {wall_div} {wall_sno} {input} {checksum}"
  params:
    - { name: id, type: string }
    - { name: v_wall_on, type: integer, description: "0=OFF 1=ON" }
    - { name: wall_mode, type: integer, description: "0=Natural 1=Full" }
    - { name: wall_div, type: integer }
    - { name: wall_sno, type: integer }
    - { name: input, type: integer, description: "source code per 0x14" }
  description: "Set/Get Video Wall direct (0x8B). Not while PIP operating. Get: AA 8B {id} 00 {checksum}."

- id: fan_control
  label: Fan Control
  kind: action
  command: "AA 8F {id} 01 {fan} {checksum}"
  params:
    - { name: id, type: string }
    - { name: fan, type: integer, description: "0=Manual 1=Auto" }
  description: "Set/Get Fan Control mode (0x8F). Get: AA 8F {id} 00 {checksum}."

- id: energy_saving
  label: Energy Saving
  kind: action
  command: "AA 92 {id} 01 {e_sav} {checksum}"
  params:
    - { name: id, type: string }
    - { name: e_sav, type: integer, description: "0=Off 1=Low 2=Medium 3=High 4=Picture Off" }
  description: "Set/Get Energy Saving (0x92). Get: AA 92 {id} 00 {checksum}."

- id: hdmi_black_level
  label: HDMI Black Level
  kind: action
  command: "AA 94 {id} 01 {hdmi_b} {checksum}"
  params:
    - { name: id, type: string }
    - { name: hdmi_b, type: integer, description: "0=Normal 1=Low 2=Auto" }
  description: "Set/Get HDMI Black Level (0x94). Get: AA 94 {id} 00 {checksum}."

- id: black_adjust
  label: Black Adjust
  kind: action
  command: "AA 95 {id} 01 {b_adj} {checksum}"
  params:
    - { name: id, type: string }
    - { name: b_adj, type: integer, description: "0=Off 1=Low/Dark 2=Medium/Darker 3=High/Darkest" }
  description: "Set/Get Black Adjust (0x95). Get: AA 95 {id} 00 {checksum}."

- id: gamma_control
  label: Gamma Control
  kind: action
  command: "AA 96 {id} 01 {gamma} {checksum}"
  params:
    - { name: id, type: string }
    - { name: gamma, type: integer, description: "0=Natural 1-5=Mode1-5 0x11-0x15=-1 to -5 0x20=Custom" }
  description: "Set/Get Gamma (0x96). Get: AA 96 {id} 00 {checksum}."

- id: edge_enhancement
  label: Edge Enhancement
  kind: action
  command: "AA 9C {id} 01 {edge} {checksum}"
  params:
    - { name: id, type: string }
    - { name: edge, type: integer, description: "0=OFF 1=ON" }
  description: "Set/Get Edge Enhancement (0x9C). Get: AA 9C {id} 00 {checksum}."

- id: color_space
  label: Color Space
  kind: action
  command: "AA 9D {id} 01 {cos} {checksum}"
  params:
    - { name: id, type: string }
    - { name: cos, type: integer, description: "0=Auto 1=Native 2=Custom" }
  description: "Set/Get Color Space (0x9D). Get: AA 9D {id} 00 {checksum}."

- id: xvycc
  label: xvYCC
  kind: action
  command: "AA 9E {id} 01 {xvycc} {checksum}"
  params:
    - { name: id, type: string }
    - { name: xvycc, type: integer, description: "0=OFF 1=ON" }
  description: "Set/Get xvYCC (0x9E). Get: AA 9E {id} 00 {checksum}."

- id: reset_control
  label: Reset Control
  kind: action
  command: "AA 9F {id} 01 {rst} {checksum}"
  params:
    - { name: id, type: string }
    - { name: rst, type: integer, description: "0=Picture 1=Sound 2=Setup(System) 3=All 4=Screen Display" }
  description: "Set Reset (0x9F). Get always returns NAK."

- id: ambient_brightness_mode
  label: Ambient Brightness Mode
  kind: action
  command: "AA A1 {id} 03 {ab_mode} {valid_lampvalue} {lamp_value} {checksum}"
  params:
    - { name: id, type: string }
    - { name: ab_mode, type: integer, description: "0=Off 1=On" }
    - { name: valid_lampvalue, type: integer, description: "0=Invalid(Don't apply) 1=Valid(Apply)" }
    - { name: lamp_value, type: integer, description: "0-100" }
  description: "Set/Get Ambient Brightness Mode + Lamp (0xA1). Get: AA A1 {id} 00 {checksum}."

- id: osd_display_type
  label: OSD Display Type On/Off
  kind: action
  command: "AA A3 {id} 02 {osd_type} {osd_onoff} {checksum}"
  params:
    - { name: id, type: string }
    - { name: osd_type, type: integer, description: "0=Source 1=NotOptimum 2=NoSignal 3=MDC 4=ScheduleChannelInfo" }
    - { name: osd_onoff, type: integer, description: "0=Off 1=On" }
  description: "Set/Get OSD Display Type (0xA3). Get: AA A3 {id} 00 {checksum}."

- id: timer1_control
  label: Timer1 Control (MFM)
  kind: action
  command: "AA A4 {id} 0F {on_h} {on_m} {on_ap} {on_act} {off_h} {off_m} {off_ap} {off_act} {repeat_on} {manual_weekday_on} {repeat_off} {manual_weekday_off} {volume} {source} {holiday_apply} {checksum}"
  params:
    - { name: id, type: string }
    - { name: on_h, type: integer, description: "1-12" }
    - { name: on_m, type: integer, description: "0-59" }
    - { name: on_ap, type: integer, description: "0=PM 1=AM" }
    - { name: on_act, type: integer, description: "0=off 1=on" }
    - { name: off_h, type: integer, description: "1-12" }
    - { name: off_m, type: integer, description: "0-59" }
    - { name: off_ap, type: integer }
    - { name: off_act, type: integer }
    - { name: repeat_on, type: integer }
    - { name: manual_weekday_on, type: integer }
    - { name: repeat_off, type: integer }
    - { name: manual_weekday_off, type: integer }
    - { name: volume, type: integer }
    - { name: source, type: integer }
    - { name: holiday_apply, type: integer, description: "0=All 1=Off 2=On only 3=Off only" }
  description: "Set/Get Timer1 (0xA4). DataLen 0x0D or 0x0F per model. Get: AA A4 {id} 00 {checksum}."

- id: timer2_control
  label: Timer2 Control (MFM)
  kind: action
  command: "AA A5 {id} 0F {on_h} {on_m} {on_ap} {on_act} {off_h} {off_m} {off_ap} {off_act} {repeat_on} {manual_weekday_on} {repeat_off} {manual_weekday_off} {volume} {source} {holiday_apply} {checksum}"
  params:
    - { name: id, type: string }
    - { name: on_h, type: integer }
    - { name: on_m, type: integer }
    - { name: on_ap, type: integer }
    - { name: on_act, type: integer }
    - { name: off_h, type: integer }
    - { name: off_m, type: integer }
    - { name: off_ap, type: integer }
    - { name: off_act, type: integer }
    - { name: repeat_on, type: integer }
    - { name: manual_weekday_on, type: integer }
    - { name: repeat_off, type: integer }
    - { name: manual_weekday_off, type: integer }
    - { name: volume, type: integer }
    - { name: source, type: integer }
    - { name: holiday_apply, type: integer }
  description: "Set/Get Timer2 (0xA5). Same shape as Timer1. Get: AA A5 {id} 00 {checksum}."

- id: timer3_control
  label: Timer3 Control (MFM)
  kind: action
  command: "AA A6 {id} 0F {on_h} {on_m} {on_ap} {on_act} {off_h} {off_m} {off_ap} {off_act} {repeat_on} {manual_weekday_on} {repeat_off} {manual_weekday_off} {volume} {source} {holiday_apply} {checksum}"
  params:
    - { name: id, type: string }
    - { name: on_h, type: integer }
    - { name: on_m, type: integer }
    - { name: on_ap, type: integer }
    - { name: on_act, type: integer }
    - { name: off_h, type: integer }
    - { name: off_m, type: integer }
    - { name: off_ap, type: integer }
    - { name: off_act, type: integer }
    - { name: repeat_on, type: integer }
    - { name: manual_weekday_on, type: integer }
    - { name: repeat_off, type: integer }
    - { name: manual_weekday_off, type: integer }
    - { name: volume, type: integer }
    - { name: source, type: integer }
    - { name: holiday_apply, type: integer }
  description: "Set/Get Timer3 (0xA6). Get: AA A6 {id} 00 {checksum}."

- id: clock_control_a7
  label: Clock Control (MFM, 0xA7)
  kind: action
  command: "AA A7 {id} 07 {day} {h_time} {m_time} {month} {year1} {year2} {ap_time} {checksum}"
  params:
    - { name: id, type: string }
    - { name: day, type: integer, description: "1-31" }
    - { name: h_time, type: integer, description: "1-12" }
    - { name: m_time, type: integer, description: "0-59" }
    - { name: month, type: integer, description: "1-12" }
    - { name: year1, type: integer, description: "year high byte" }
    - { name: year2, type: integer, description: "year low byte" }
    - { name: ap_time, type: integer, description: "0-1" }
  description: "Set/Get Clock (0xA7). Pre-2014 models. Get: AA A7 {id} 00 {checksum}."

- id: holiday_add_delete
  label: Holiday Add/Delete Control
  kind: action
  command: "AA A8 {id} 05 {management} {month1} {day1} {month2} {day2} {checksum}"
  params:
    - { name: id, type: string }
    - { name: management, type: integer, description: "0=Add 1=Delete 2=DeleteAll" }
    - { name: month1, type: integer }
    - { name: day1, type: integer }
    - { name: month2, type: integer }
    - { name: day2, type: integer }
  description: "Set Holiday (0xA8). DeleteAll: data2-5 must be 0."

- id: holiday_get
  label: Holiday Get Control
  kind: query
  command: "AA A9 {id} 00 {checksum}"
  params:
    - { name: id, type: string }
  description: "Get Holiday count (0xA9). Per-index: AA A9 {id} 01 {index} {checksum}."

- id: timer4_control
  label: Timer4 Control
  kind: action
  command: "AA AB {id} 0F {on_h} {on_m} {on_ap} {on_act} {off_h} {off_m} {off_ap} {off_act} {repeat_on} {manual_weekday_on} {repeat_off} {manual_weekday_off} {volume} {source} {holiday_apply} {checksum}"
  params:
    - { name: id, type: string }
    - { name: on_h, type: integer }
    - { name: on_m, type: integer }
    - { name: on_ap, type: integer }
    - { name: on_act, type: integer }
    - { name: off_h, type: integer }
    - { name: off_m, type: integer }
    - { name: off_ap, type: integer }
    - { name: off_act, type: integer }
    - { name: repeat_on, type: integer }
    - { name: manual_weekday_on, type: integer }
    - { name: repeat_off, type: integer }
    - { name: manual_weekday_off, type: integer }
    - { name: volume, type: integer }
    - { name: source, type: integer }
    - { name: holiday_apply, type: integer }
  description: "Set/Get Timer4 (0xAB). Get: AA AB {id} 00 {checksum}."

- id: timer5_control
  label: Timer5 Control
  kind: action
  command: "AA AC {id} 0F {on_h} {on_m} {on_ap} {on_act} {off_h} {off_m} {off_ap} {off_act} {repeat_on} {manual_weekday_on} {repeat_off} {manual_weekday_off} {volume} {source} {holiday_apply} {checksum}"
  params:
    - { name: id, type: string }
    - { name: on_h, type: integer }
    - { name: on_m, type: integer }
    - { name: on_ap, type: integer }
    - { name: on_act, type: integer }
    - { name: off_h, type: integer }
    - { name: off_m, type: integer }
    - { name: off_ap, type: integer }
    - { name: off_act, type: integer }
    - { name: repeat_on, type: integer }
    - { name: manual_weekday_on, type: integer }
    - { name: repeat_off, type: integer }
    - { name: manual_weekday_off, type: integer }
    - { name: volume, type: integer }
    - { name: source, type: integer }
    - { name: holiday_apply, type: integer }
  description: "Set/Get Timer5 (0xAC). Get: AA AC {id} 00 {checksum}."

- id: timer6_control
  label: Timer6 Control
  kind: action
  command: "AA AD {id} 0F {on_h} {on_m} {on_ap} {on_act} {off_h} {off_m} {off_ap} {off_act} {repeat_on} {manual_weekday_on} {repeat_off} {manual_weekday_off} {volume} {source} {holiday_apply} {checksum}"
  params:
    - { name: id, type: string }
    - { name: on_h, type: integer }
    - { name: on_m, type: integer }
    - { name: on_ap, type: integer }
    - { name: on_act, type: integer }
    - { name: off_h, type: integer }
    - { name: off_m, type: integer }
    - { name: off_ap, type: integer }
    - { name: off_act, type: integer }
    - { name: repeat_on, type: integer }
    - { name: manual_weekday_on, type: integer }
    - { name: repeat_off, type: integer }
    - { name: manual_weekday_off, type: integer }
    - { name: volume, type: integer }
    - { name: source, type: integer }
    - { name: holiday_apply, type: integer }
  description: "Set/Get Timer6 (0xAD). Get: AA AD {id} 00 {checksum}."

- id: timer7_control
  label: Timer7 Control
  kind: action
  command: "AA AE {id} 0F {on_h} {on_m} {on_ap} {on_act} {off_h} {off_m} {off_ap} {off_act} {repeat_on} {manual_weekday_on} {repeat_off} {manual_weekday_off} {volume} {source} {holiday_apply} {checksum}"
  params:
    - { name: id, type: string }
    - { name: on_h, type: integer }
    - { name: on_m, type: integer }
    - { name: on_ap, type: integer }
    - { name: on_act, type: integer }
    - { name: off_h, type: integer }
    - { name: off_m, type: integer }
    - { name: off_ap, type: integer }
    - { name: off_act, type: integer }
    - { name: repeat_on, type: integer }
    - { name: manual_weekday_on, type: integer }
    - { name: repeat_off, type: integer }
    - { name: manual_weekday_off, type: integer }
    - { name: volume, type: integer }
    - { name: source, type: integer }
    - { name: holiday_apply, type: integer }
  description: "Set/Get Timer7 (0xAE). Get: AA AE {id} 00 {checksum}."

- id: edit_name_control
  label: Edit Name Control
  kind: action
  command: "AA AF {id} 01 {ename} {checksum}"
  params:
    - { name: id, type: string }
    - { name: ename, type: integer, description: "0x00=NONE 0x01=VCR 0x02=DVD 0x03=CableSTB 0x04=SatelliteSTB 0x05=PVRSTB 0x06=AVReceiver 0x07=Game 0x08=Camcorder 0x09=PC 0x0A=DVIPC 0x0B=DVIDevices 0x0C=TV 0x0D=IPTV 0x0E=Blu-ray 0x0F=HDDVD 0x10=DMA 0x11=DVDReceiver 0x12=HDSTB 0x13=DVDCombo 0x14=DHR" }
  description: "Set/Get Edit Name (0xAF). Get: AA AF {id} 00 {checksum}."

- id: virtual_remote_control
  label: Virtual Remote Control
  kind: action
  command: "AA B0 {id} 01 {keycode} {checksum}"
  params:
    - { name: id, type: string }
    - { name: keycode, type: integer, description: "0x01=SOURCE 0x02=POWER 0x04=KEY_1 0x05=KEY_2 0x06=KEY_3 0x07=VOL_UP 0x08=KEY_4 0x09=KEY_5 0x0A=KEY_6 0x0B=VOL_DOWN 0x0C=KEY_7 0x0D=KEY_8 0x0E=KEY_9 0x0F=MUTE 0x10=CH_DOWN 0x11=KEY_0 0x12=CH_UP 0x14=GREEN 0x15=YELLOW 0x16=CYAN 0x1A=MENU 0x1F=DISPLAY 0x23=DIGIT 0x24=PIP_TV_VIDEO 0x2D=EXIT 0x45=REW 0x46=STOP 0x47=PLAY 0x48=FF 0x4A=PAUSE 0x4B=TOOLS 0x58=RETURN 0x5B=MAGICINFO_LITE 0x60=CURSOR_UP 0x61=CURSOR_DOWN 0x62=CURSOR_RIGHT 0x65=CURSOR_LEFT 0x68=ENTER 0x6C=RED 0x77=LOCK 0x79=CONTENT 0x98=DISCRET_POWER_OFF 0x9F=KEY_3D" }
  description: "Set Virtual Remote (0xB0). Emulates remote key."

- id: displayport_daisychain
  label: Display Port Daisy Chain
  kind: action
  command: "AA B1 {id} 01 {value} {checksum}"
  params:
    - { name: id, type: string }
    - { name: value, type: integer, description: "0=Clone 1=Expand" }
  description: "Set/Get DP Daisy Chain (0xB1). Get: AA B1 {id} 00 {checksum}."

- id: video_conference_sound
  label: Video Conference Sound Mode
  kind: action
  command: "AA B3 {id} 01 {c_sound} {checksum}"
  params:
    - { name: id, type: string }
    - { name: c_sound, type: integer, description: "0=Off 1=On" }
  description: "Set/Get Video Conference Sound (0xB3). Get: AA B3 {id} 00 {checksum}."

- id: network_standby
  label: Network Standby Control
  kind: action
  command: "AA B5 {id} 01 {network_standby} {checksum}"
  params:
    - { name: id, type: string }
    - { name: network_standby, type: integer, description: "0=Off 1=On" }
  description: "Set/Get Network Standby (0xB5). Get: AA B5 {id} 00 {checksum}."

- id: dst_control
  label: DST (Daylight Saving Time) Control
  kind: action
  command: "AA B6 {id} 0C {dst_onoff} {month_start} {v1_day_start} {v2_day_start} {time_h_start} {time_m_start} {month_end} {v1_day_end} {v2_day_end} {time_h_end} {time_m_end} {time_offset} {checksum}"
  params:
    - { name: id, type: string }
    - { name: dst_onoff, type: integer, description: "Tunerless: 0=Off 1=-- 2=On. Tuner: 0=Off 1=Auto 2=Manual" }
    - { name: month_start, type: integer, description: "0x00=Jan...0x0B=Dec" }
    - { name: v1_day_start, type: integer, description: "0=1st 1=2nd 2=3rd 3=4th 4=Last" }
    - { name: v2_day_start, type: integer, description: "day of week 0x00-0x0B" }
    - { name: time_h_start, type: integer, description: "0-23" }
    - { name: time_m_start, type: integer, description: "0-59" }
    - { name: month_end, type: integer }
    - { name: v1_day_end, type: integer }
    - { name: v2_day_end, type: integer }
    - { name: time_h_end, type: integer }
    - { name: time_m_end, type: integer }
    - { name: time_offset, type: integer, description: "0=+1:00 1=+2:00" }
  description: "Set/Get DST (0xB6). Get: AA B6 {id} 00 {checksum}."

- id: custom_pip
  label: Custom PIP Control
  kind: action
  command: "AA B7 {id} 08 {h_pos_hi} {h_pos_lo} {v_pos_hi} {v_pos_lo} {h_size_hi} {h_size_lo} {v_size_hi} {v_size_lo} {checksum}"
  params:
    - { name: id, type: string }
    - { name: h_pos_hi, type: integer }
    - { name: h_pos_lo, type: integer }
    - { name: v_pos_hi, type: integer }
    - { name: v_pos_lo, type: integer }
    - { name: h_size_hi, type: integer }
    - { name: h_size_lo, type: integer }
    - { name: v_size_hi, type: integer }
    - { name: v_size_lo, type: integer }
  description: "Set/Get Custom PIP (0xB7). Size 512x288..1632x918. Get: AA B7 {id} 00 {checksum}."

- id: auto_id_setting_status
  label: Auto ID Setting Status Control
  kind: action
  command: "AA B8 {id} 01 {status} {checksum}"
  params:
    - { name: id, type: string }
    - { name: status, type: integer, description: "0=START 1=END" }
  description: "Set/Get Auto ID Setting (0xB8). Get: AA B8 {id} 00 {checksum}."

- id: display_id_info
  label: Display ID Information
  kind: action
  command: "AA B9 {id} 01 {id_display} {checksum}"
  params:
    - { name: id, type: string }
    - { name: id_display, type: integer, description: "0=Off 1=On" }
  description: "Set Monitor ID display (0xB9)."

- id: clock_control_c5
  label: Clock Control (MFM, 0xC5)
  kind: action
  command: "AA C5 {id} 08 {day} {h_time} {m_time} {s_time} {month} {year1} {year2} {ap_time} {checksum}"
  params:
    - { name: id, type: string }
    - { name: day, type: integer, description: "1-31" }
    - { name: h_time, type: integer, description: "1-12" }
    - { name: m_time, type: integer, description: "0-59" }
    - { name: s_time, type: integer, description: "0-59 seconds" }
    - { name: month, type: integer, description: "1-12" }
    - { name: year1, type: integer }
    - { name: year2, type: integer }
    - { name: ap_time, type: integer, description: "0-1" }
  description: "Set/Get Clock w/ seconds (0xC5). Post-2013 signage. Get: AA C5 {id} 00 {checksum}."

# --- 0xC6 Eco Solution sub-commands ---
- id: eco_solution_auto_power_off
  label: Eco Solution - Auto Power Off
  kind: action
  command: "AA C6 {id} 02 81 {auto_power_off_mode} {checksum}"
  params:
    - { name: id, type: string }
    - { name: auto_power_off_mode, type: integer, description: "0=Off 1=4Hour 2=6Hour 3=8Hour" }
  description: "Set/Get Eco Solution Auto Power Off (0xC6 sub 0x81). Get: AA C6 {id} 01 81 {checksum}."

# --- 0xC7 Launcher sub-commands ---
- id: launcher_play_via
  label: Launcher - Play Via Mode
  kind: action
  command: "AA C7 {id} 02 81 {play_via_mode} {checksum}"
  params:
    - { name: id, type: string }
    - { name: play_via_mode, type: integer, description: "0=MagicInfo 1=URL Launcher 2=MagicIWB" }
  description: "Set/Get Launcher Play Via (0xC7 sub 0x81). NAK if app running. Get: AA C7 {id} 01 81 {checksum}."

- id: launcher_url
  label: Launcher - URL Address
  kind: action
  command: "AA C7 {id} {variable} 82 {url_address} {checksum}"
  params:
    - { name: id, type: string }
    - { name: url_address, type: string, description: "ASCII URL, up to 200 chars" }
  description: "Set/Get Launcher URL (0xC7 sub 0x82). Get: AA C7 {id} 01 82 {checksum}."

# --- 0xC8 OnScreen Display Menu sub-commands ---
- id: osd_menu_orientation
  label: OSD - Menu Orientation
  kind: action
  command: "AA C8 {id} 02 81 {menu_orientation} {checksum}"
  params:
    - { name: id, type: string }
    - { name: menu_orientation, type: integer, description: "0=Landscape 1=Portrait(270) 2=180 3=90" }
  description: "Set/Get Menu Orientation (0xC8 sub 0x81). Get: AA C8 {id} 01 81 {checksum}."

- id: osd_source_orientation
  label: OSD - Source Content Orientation
  kind: action
  command: "AA C8 {id} 02 82 {source_orientation} {checksum}"
  params:
    - { name: id, type: string }
    - { name: source_orientation, type: integer, description: "0=Landscape 1=Portrait(270) 2=180 3=90" }
  description: "Set/Get Source Orientation (0xC8 sub 0x82). Get: AA C8 {id} 01 82 {checksum}."

- id: osd_aspect_ratio
  label: OSD - Aspect Ratio (Rotated)
  kind: action
  command: "AA C8 {id} 02 83 {aspect_ratio_mode} {checksum}"
  params:
    - { name: id, type: string }
    - { name: aspect_ratio_mode, type: integer, description: "0=Full Screen 1=Original" }
  description: "Set/Get Aspect Ratio (0xC8 sub 0x83). Get: AA C8 {id} 01 83 {checksum}."

- id: osd_pip_rotation
  label: OSD - PIP Rotation
  kind: action
  command: "AA C8 {id} 02 84 {pip_rotation} {checksum}"
  params:
    - { name: id, type: string }
    - { name: pip_rotation, type: integer, description: "0=Landscape 1=Portrait(270) 2=180 3=90" }
  description: "Set/Get PIP Rotation (0xC8 sub 0x84). Turn PIP off first. Get: AA C8 {id} 01 84 {checksum}."

# --- 0xCA System Menu sub-commands ---
- id: system_auto_source_switch_onoff
  label: System - Auto Source Switch On/Off
  kind: action
  command: "AA CA {id} 02 81 {auto_source_onoff} {checksum}"
  params:
    - { name: id, type: string }
    - { name: auto_source_onoff, type: integer, description: "0=Off 1=On" }
  description: "Set/Get Auto Source Switch On/Off (0xCA sub 0x81). Get: AA CA {id} 01 81 {checksum}."

- id: system_auto_source_switch_control
  label: System - Auto Source Switch Control
  kind: action
  command: "AA CA {id} 04 82 {primary_recovery} {primary_source} {secondary_source} {checksum}"
  params:
    - { name: id, type: string }
    - { name: primary_recovery, type: integer, description: "0=Off 1=On" }
    - { name: primary_source, type: integer, description: "source code per 0x14 (0x00=All)" }
    - { name: secondary_source, type: integer, description: "source code per 0x14" }
  description: "Set/Get Auto Source Control (0xCA sub 0x82). Get: AA CA {id} 01 82 {checksum}."

- id: system_power_button
  label: System - Power Button
  kind: action
  command: "AA CA {id} 02 91 {power_button} {checksum}"
  params:
    - { name: id, type: string }
    - { name: power_button, type: integer, description: "0=Power On Only 1=Power On/Off" }
  description: "Set/Get Power Button mode (0xCA sub 0x91). Get: AA CA {id} 01 91 {checksum}."

- id: system_no_signal_power_off
  label: System - No Signal Power Off
  kind: action
  command: "AA CA {id} 02 A1 {no_signal_power_off} {checksum}"
  params:
    - { name: id, type: string }
    - { name: no_signal_power_off, type: integer, description: "0=Off 1=15min 2=30min 3=60min" }
  description: "Set/Get No Signal Power Off (0xCA sub 0xA1). Get: AA CA {id} 01 A1 {checksum}."

- id: net_pip
  label: Net PIP (MagicInfo)
  kind: action
  command: "AA E0 {id} 14 01 {h_pos_hi} {h_pos_lo} {v_pos_hi} {v_pos_lo} {h_size_hi} {h_size_lo} {v_size_hi} {v_size_lo} {p_source} {tv_channel} {s_select} {country} {atv_dtv} {aircable} {ch_hi} {ch_lo} {sel_minor} {minor_hi} {minor_lo} {checksum}"
  params:
    - { name: id, type: string }
    - { name: h_pos_hi, type: integer }
    - { name: h_pos_lo, type: integer }
    - { name: v_pos_hi, type: integer }
    - { name: v_pos_lo, type: integer }
    - { name: h_size_hi, type: integer }
    - { name: h_size_lo, type: integer }
    - { name: v_size_hi, type: integer }
    - { name: v_size_lo, type: integer }
    - { name: p_source, type: integer }
    - { name: tv_channel, type: integer, description: "0-99" }
    - { name: s_select, type: integer, description: "0=MagicInfo 1=PIP" }
    - { name: country, type: integer }
    - { name: atv_dtv, type: integer }
    - { name: aircable, type: integer }
    - { name: ch_hi, type: integer }
    - { name: ch_lo, type: integer }
    - { name: sel_minor, type: integer }
    - { name: minor_hi, type: integer }
    - { name: minor_lo, type: integer }
  description: "Set MagicInfo Net PIP On (0xE0). Off: AA E0 {id} 01 00 {checksum}. Get unsupported."

- id: apply_to_control
  label: Apply To Control
  kind: action
  command: "AA E4 {id} 01 {status} {checksum}"
  params:
    - { name: id, type: string }
    - { name: status, type: integer, description: "0=Current Source 1=MagicInfo Player S" }
  description: "Set/Get Apply To (0xE4). Get: AA E4 {id} 00 {checksum}."

- id: panel_onoff
  label: Panel On/Off
  kind: action
  command: "AA F9 {id} 01 {pn_state} {checksum}"
  params:
    - { name: id, type: string }
    - { name: pn_state, type: integer, description: "0=PANEL ON 1=PANEL OFF" }
  description: "Set/Get Panel On/Off (0xF9). Get: AA F9 {id} 00 {checksum}."

- id: auto_id
  label: Auto ID
  kind: action
  command: "AA FD {id} 02 {rs_status} {m_id} {checksum}"
  params:
    - { name: id, type: string }
    - { name: rs_status, type: integer, description: "bit0 RS232 loopout (1=disable 0=enable); bit4 init monitor ID" }
    - { name: m_id, type: integer, description: "ID 1-99 (bit7=change)" }
  description: "Set/Get Auto ID (0xFD). Get: AA FD {id} 00 {checksum}."

# --- 0xFF ACK/NAK ---
- id: ack_nak
  label: ACK/NAK
  kind: action
  command: "AA FF {id} {length} {a_n} {r_cmd} {val1} {checksum}"
  params:
    - { name: id, type: string }
    - { name: length, type: integer }
    - { name: a_n, type: string, description: "'A'=ACK 'N'=NAK" }
    - { name: r_cmd, type: integer, description: "echoed command byte" }
    - { name: val1, type: integer }
  description: "ACK/NAK packet (0xFF) returned by device per command."

# --- Annex A: Reference TV (RTV) MDC Command 0xC0 sub-commands ---
# Note: Annex A labeled "Reference TV MDC Command". Targets TV-capable models;
# applicability to PMH LFD signage uncertain. Included for completeness per source.
- id: rtv_status
  label: RTV Status (0xC0 sub 0x00)
  kind: action
  command: "AA C0 {id} 02 00 {sub_cmd_data1} {checksum}"
  params:
    - { name: id, type: string }
    - { name: sub_cmd_data1, type: integer }
  description: "RTV Set/Get Status. Get: AA C0 {id} 01 00 {checksum}."

- id: rtv_3d_mode
  label: RTV 3D Mode (0xC0 sub 0x01)
  kind: action
  command: "AA C0 {id} 02 01 {three_d_mode} {checksum}"
  params:
    - { name: id, type: string }
    - { name: three_d_mode, type: integer, description: "0=3D 1=2D->3D 2=SBS 3=TNB 4=LBL 5=VS 6=CheckerBD 7=FrameSeq" }
  description: "RTV Set/Get 3D Mode. Get: AA C0 {id} 01 01 {checksum}."

- id: rtv_3d_effect
  label: RTV 3D Effect (0xC0 sub 0x02)
  kind: action
  command: "AA C0 {id} 02 02 {three_d_effect} {checksum}"
  params:
    - { name: id, type: string }
    - { name: three_d_effect, type: integer, description: "0=Auto 1=Manual" }
  description: "RTV Set/Get 3D Effect. Get: AA C0 {id} 01 02 {checksum}."

- id: rtv_3d_perspective
  label: RTV 3D Perspective (0xC0 sub 0x03)
  kind: action
  command: "AA C0 {id} 02 03 {three_d_perspective} {checksum}"
  params:
    - { name: id, type: string }
    - { name: three_d_perspective, type: integer, description: "0-10" }
  description: "RTV Set/Get 3D Perspective. Get: AA C0 {id} 01 03 {checksum}."

- id: rtv_3d_effect_depth
  label: RTV 3D Effect Depth (0xC0 sub 0x04)
  kind: action
  command: "AA C0 {id} 02 04 {three_d_effect_depth} {checksum}"
  params:
    - { name: id, type: string }
    - { name: three_d_effect_depth, type: integer, description: "1-10" }
  description: "RTV Set/Get 3D Effect Depth. Get: AA C0 {id} 01 04 {checksum}."

- id: rtv_3d_lr_change
  label: RTV 3D L/R Change (0xC0 sub 0x05)
  kind: action
  command: "AA C0 {id} 02 05 {three_d_lr_change} {checksum}"
  params:
    - { name: id, type: string }
    - { name: three_d_lr_change, type: integer, description: "0=L/R 1=R/L" }
  description: "RTV Set/Get 3D L/R Change. Get: AA C0 {id} 01 05 {checksum}."

- id: rtv_3d_to_2d
  label: RTV 3D->2D (0xC0 sub 0x06)
  kind: action
  command: "AA C0 {id} 02 06 {three_d_to_2d} {checksum}"
  params:
    - { name: id, type: string }
    - { name: three_d_to_2d, type: integer, description: "0=Off 1=On" }
  description: "RTV Set/Get 3D->2D. Get: AA C0 {id} 01 06 {checksum}."

- id: rtv_3d_auto_view
  label: RTV 3D Auto View (0xC0 sub 0x07)
  kind: action
  command: "AA C0 {id} 02 07 {three_d_auto_view} {checksum}"
  params:
    - { name: id, type: string }
    - { name: three_d_auto_view, type: integer, description: "0=Off 1=MessageNotice 2=On" }
  description: "RTV Set/Get 3D Auto View. Get: AA C0 {id} 01 07 {checksum}."

- id: rtv_3d_optimization
  label: RTV 3D Optimization (0xC0 sub 0x08)
  kind: action
  command: "AA C0 {id} 02 08 {three_d_optimization} {checksum}"
  params:
    - { name: id, type: string }
    - { name: three_d_optimization, type: integer, description: "0-2" }
  description: "RTV Set/Get 3D Optimization. Get: AA C0 {id} 01 08 {checksum}."

- id: rtv_expert_pattern
  label: RTV Expert Pattern (0xC0 sub 0x09)
  kind: action
  command: "AA C0 {id} 02 09 {expert_pattern} {checksum}"
  params:
    - { name: id, type: string }
    - { name: expert_pattern, type: integer, description: "0=Off 1=Pattern1 2=Pattern2 3=ColorBar 4=HRamp 5=VRamp 6=White 7=Red 8=Blue 9=Green" }
  description: "RTV Set/Get Expert Pattern. Get: AA C0 {id} 01 09 {checksum}."

- id: rtv_rgb_mode_only
  label: RTV RGB Mode Only (0xC0 sub 0x0A)
  kind: action
  command: "AA C0 {id} 02 0A {rgb_mode_only} {checksum}"
  params:
    - { name: id, type: string }
    - { name: rgb_mode_only, type: integer, description: "0=Off 1=Red 2=Green 3=Blue" }
  description: "RTV Set/Get RGB Mode Only. Get: AA C0 {id} 01 0A {checksum}."

- id: rtv_color_space
  label: RTV Color Space (0xC0 sub 0x0B)
  kind: action
  command: "AA C0 {id} 02 0B {color_space} {checksum}"
  params:
    - { name: id, type: string }
    - { name: color_space, type: integer, description: "0=Auto 1=Native 2=Custom" }
  description: "RTV Set/Get Color Space. Get: AA C0 {id} 01 0B {checksum}."

- id: rtv_color_space_color
  label: RTV Color Space Color (0xC0 sub 0x0C)
  kind: action
  command: "AA C0 {id} 02 0C {color_space_color} {checksum}"
  params:
    - { name: id, type: string }
    - { name: color_space_color, type: integer, description: "0=Red 1=Green 2=Blue 3=Yellow 4=Cyan 5=Magenta" }
  description: "RTV Set/Get Color Space Color. Get: AA C0 {id} 01 0C {checksum}."

- id: rtv_color_space_red
  label: RTV Color Space Red (0xC0 sub 0x0D)
  kind: action
  command: "AA C0 {id} 02 0D {color_space_red} {checksum}"
  params:
    - { name: id, type: string }
    - { name: color_space_red, type: integer, description: "0-100" }
  description: "RTV Set/Get Color Space Red. Get: AA C0 {id} 01 0D {checksum}."

- id: rtv_color_space_green
  label: RTV Color Space Green (0xC0 sub 0x0E)
  kind: action
  command: "AA C0 {id} 02 0E {color_space_green} {checksum}"
  params:
    - { name: id, type: string }
    - { name: color_space_green, type: integer, description: "0-100" }
  description: "RTV Set/Get Color Space Green. Get: AA C0 {id} 01 0E {checksum}."

- id: rtv_color_space_blue
  label: RTV Color Space Blue (0xC0 sub 0x0F)
  kind: action
  command: "AA C0 {id} 02 0F {color_space_blue} {checksum}"
  params:
    - { name: id, type: string }
    - { name: color_space_blue, type: integer, description: "0-100" }
  description: "RTV Set/Get Color Space Blue. Get: AA C0 {id} 01 0F {checksum}."

- id: rtv_color_space_reset
  label: RTV Color Space Reset (0xC0 sub 0x10)
  kind: action
  command: "AA C0 {id} 02 10 {tbd} {checksum}"
  params:
    - { name: id, type: string }
    - { name: tbd, type: integer }
  description: "RTV Color Space Reset. Data field marked TBD in source."

- id: rtv_white_balance_rgb_offset
  label: RTV White Balance RGB Offset (0xC0 sub 0x11)
  kind: action
  command: "AA C0 {id} 04 11 {r_offset} {g_offset} {b_offset} {checksum}"
  params:
    - { name: id, type: string }
    - { name: r_offset, type: integer, description: "0-50" }
    - { name: g_offset, type: integer, description: "0-50" }
    - { name: b_offset, type: integer, description: "0-50" }
  description: "RTV Set/Get White Balance RGB Offset. Get: AA C0 {id} 01 11 {checksum}."

- id: rtv_white_balance_rgb_gain
  label: RTV White Balance RGB Gain (0xC0 sub 0x12)
  kind: action
  command: "AA C0 {id} 04 12 {r_gain} {g_gain} {b_gain} {checksum}"
  params:
    - { name: id, type: string }
    - { name: r_gain, type: integer, description: "0-50" }
    - { name: g_gain, type: integer, description: "0-50" }
    - { name: b_gain, type: integer, description: "0-50" }
  description: "RTV Set/Get White Balance RGB Gain. Get: AA C0 {id} 01 12 {checksum}."

- id: rtv_white_balance_reset
  label: RTV White Balance Reset (0xC0 sub 0x13)
  kind: action
  command: "AA C0 {id} 02 13 {tbd} {checksum}"
  params:
    - { name: id, type: string }
    - { name: tbd, type: integer }
  description: "RTV White Balance Reset. Data field marked TBD in source."

- id: rtv_flesh_tone
  label: RTV Flesh Tone (0xC0 sub 0x14)
  kind: action
  command: "AA C0 {id} 02 14 {flesh_tone} {checksum}"
  params:
    - { name: id, type: string }
    - { name: flesh_tone, type: integer, description: "0-30" }
  description: "RTV Set/Get Flesh Tone. Get: AA C0 {id} 01 14 {checksum}."

- id: rtv_motion_lighting
  label: RTV Motion Lighting (0xC0 sub 0x15)
  kind: action
  command: "AA C0 {id} 02 15 {motion_lighting} {checksum}"
  params:
    - { name: id, type: string }
    - { name: motion_lighting, type: integer, description: "0=Off 1=On" }
  description: "RTV Set/Get Motion Lighting. Get: AA C0 {id} 01 15 {checksum}."

- id: rtv_led_motion_plus
  label: RTV LED Motion Plus (0xC0 sub 0x16)
  kind: action
  command: "AA C0 {id} 02 16 {led_motion_plus} {checksum}"
  params:
    - { name: id, type: string }
    - { name: led_motion_plus, type: integer, description: "0=Off 1=Normal 2=Cinema 3=Ticker" }
  description: "RTV Set/Get LED Motion Plus. Get: AA C0 {id} 01 16 {checksum}."

- id: rtv_mpeg_noise_filter
  label: RTV MPEG Noise Filter (0xC0 sub 0x17)
  kind: action
  command: "AA C0 {id} 02 17 {mpeg_noise_filter} {checksum}"
  params:
    - { name: id, type: string }
    - { name: mpeg_noise_filter, type: integer, description: "0=Off 1=Low 2=Medium 3=High 4=Auto" }
  description: "RTV Set/Get MPEG Noise Filter. Get: AA C0 {id} 01 17 {checksum}."

- id: rtv_smart_led
  label: RTV Smart LED (0xC0 sub 0x18)
  kind: action
  command: "AA C0 {id} 02 18 {smart_led} {checksum}"
  params:
    - { name: id, type: string }
    - { name: smart_led, type: integer, description: "0=Off 1=Low 2=Standard 3=High 4=Demo" }
  description: "RTV Set/Get Smart LED. Get: AA C0 {id} 01 18 {checksum}."

- id: rtv_cinema_black
  label: RTV Cinema Black (0xC0 sub 0x19)
  kind: action
  command: "AA C0 {id} 02 19 {cinema_black} {checksum}"
  params:
    - { name: id, type: string }
    - { name: cinema_black, type: integer, description: "0=Off 1=On" }
  description: "RTV Set/Get Cinema Black. Get: AA C0 {id} 01 19 {checksum}."

- id: rtv_marker_onoff
  label: RTV Marker On/Off (0xC0 sub 0x1A)
  kind: action
  command: "AA C0 {id} 02 1A {marker_onoff} {checksum}"
  params:
    - { name: id, type: string }
    - { name: marker_onoff, type: integer, description: "0=Off 1=On" }
  description: "RTV Set/Get Marker. Get: AA C0 {id} 01 1A {checksum}."

- id: rtv_overlay_aspect_ratio
  label: RTV Overlay Aspect Ratio (0xC0 sub 0x1B)
  kind: action
  command: "AA C0 {id} 02 1B {overlay_aspect_ratio} {checksum}"
  params:
    - { name: id, type: string }
    - { name: overlay_aspect_ratio, type: integer, description: "0=Off 1=16:9 2=4:3 3=15:9 4=14:9 5=13:9 6=1.85:1 7=2.35:1 8=1.85:1&4:3" }
  description: "RTV Set/Get Overlay Aspect Ratio. Get: AA C0 {id} 01 1B {checksum}."

- id: rtv_cross_marker
  label: RTV Cross Marker (0xC0 sub 0x1C)
  kind: action
  command: "AA C0 {id} 02 1C {cross_marker} {checksum}"
  params:
    - { name: id, type: string }
    - { name: cross_marker, type: integer, description: "0=Off 1=On" }
  description: "RTV Set/Get Cross Marker. Get: AA C0 {id} 01 1C {checksum}."

- id: rtv_safety_area
  label: RTV Safety Area (0xC0 sub 0x1D)
  kind: action
  command: "AA C0 {id} 02 1D {safety_area} {checksum}"
  params:
    - { name: id, type: string }
    - { name: safety_area, type: integer, description: "0-5" }
  description: "RTV Set/Get Safety Area. Get: AA C0 {id} 01 1D {checksum}."

- id: rtv_black_matte
  label: RTV Black Matte (0xC0 sub 0x1E)
  kind: action
  command: "AA C0 {id} 02 1E {black_matte} {checksum}"
  params:
    - { name: id, type: string }
    - { name: black_matte, type: integer, description: "0-2" }
  description: "RTV Set/Get Black Matte. Get: AA C0 {id} 01 1E {checksum}."

- id: rtv_marker_color
  label: RTV Marker Color (0xC0 sub 0x1F)
  kind: action
  command: "AA C0 {id} 02 1F {marker_color} {checksum}"
  params:
    - { name: id, type: string }
    - { name: marker_color, type: integer }
  description: "RTV Set/Get Marker Color. Val marked TBD in source. Get: AA C0 {id} 01 1F {checksum}."

- id: rtv_marker_thickness
  label: RTV Marker Thickness (0xC0 sub 0x20)
  kind: action
  command: "AA C0 {id} 02 20 {marker_thickness} {checksum}"
  params:
    - { name: id, type: string }
    - { name: marker_thickness, type: integer, description: "0-7" }
  description: "RTV Set/Get Marker Thickness. Get: AA C0 {id} 01 20 {checksum}."

- id: rtv_calibration_command
  label: RTV Calibration Command (0xC0 sub 0xA0)
  kind: action
  command: "AA C0 {id} 02 A0 {start_command} {checksum}"
  params:
    - { name: id, type: string }
    - { name: start_command, type: integer, description: "0=Start 1=Stop 2=Finish" }
  description: "RTV Set/Get Calibration. Get: AA C0 {id} 01 A0 {checksum}."
```

## Feedbacks
```yaml
# Each command returns ACK (0xFF 'A') echoing the value, or NAK (0xFF 'N' + ERR code).
- id: ack
  type: ack
  description: "ACK packet AA FF {id} {len} 'A' {r_cmd} {vals...} {checksum}"
- id: nak
  type: nak
  description: "NAK packet AA FF {id} 03 'N' {r_cmd} {ERR} {checksum}. ERR = error code."
# UNRESOLVED: source does not enumerate the ERR code values returned in NAK.
```

## Variables
```yaml
# Settable continuous parameters are represented as params on their owning action
# (e.g. volume 0-100, brightness 0-100, contrast 0-100, EQ bands 0-20, fan speed 0-100).
# No separate variable registry beyond action params is described in source.
```

## Events
```yaml
# Source describes no unsolicited notifications. Device only responds to polls (request/ACK).
# UNRESOLVED: no async event mechanism documented.
```

## Macros
```yaml
# Source documents explicit multi-step sequences:
- id: pip_rotation_sequence
  steps:
    - "PIP Off (AA 3C {id} 01 00 {checksum})"
    - "PIP Rotation set (AA C8 {id} 02 84 {mode} {checksum})"
    - "PIP On (AA 3C {id} 01 01 {checksum})"
  description: "Required sequence to rotate PIP while PIP is on (per 0xC8 note)."
- id: power_on_retry
  steps:
    - "Send PowerOn (AA 11 {id} 01 01 {checksum}); retry up to 3x every 2s until ACK"
  description: "Per 0x11 note: PowerOn/PowerOff must retry 3x/2s until ACK, else fail."
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes (not formal interlocks, but operational constraints):
#   - Power commands over RJ45: after power-on, reconnect socket after 10s.
#   - Network Standby Off (DMD/DBD/DHD/UED/DMD-S): use WOL instead of MDC for power-on.
#   - Several commands no-op while Video Wall is On (Picture Size, Coarse/Fine, PIP, etc.).
#   - Safety Lock / Panel Lock / All Keys Lock operate regardless of power state.
# UNRESOLVED: no formal safety interlock procedures or power-on sequencing
# requirements documented beyond the operational notes above.
```

## Notes
- Source = shared Samsung MDC manual "SEC-VD-DSW Multiple Display Control Ver. 13.7c 2016-02-23", not PMH-specific. Model coverage per command varies: source note says "Depends on each model spec, a certain command will be supported or not."
- Packet format: `Header(0xAA) | Command | ID | DataLength | Data1..DataN | Checksum`. Checksum = sum of bytes after Header, mod 256 (discard carry beyond two hex digits).
- ID 0xFE = broadcast to all sets on the serial/TCP chain; broadcast commands return no ACK.
- RS232 uses DB-9 pins 2 (RxD), 3 (TxD), 5 (GND) only; max cable length 4 m.
- RJ45 (TCP/IP) default IP 192.168.0.10, port 1515; MDC payload carried in TCP data area, same frame format as RS232.
- Get vs Set share one opcode; distinguished by DataLength (0x00 = Get, >0 = Set). Each action above lists the Set `command:` and the Get form in its description.
- Annex A (0xC0 RTV sub-commands) targets Reference TV models; PMH-series are tunerless LFD signage so RTV commands likely unsupported — verify against device.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: exact subset of MDC commands supported on PM43H/PM49H/PM55H not enumerated by source. -->
<!-- UNRESOLVED: NAK ERR code values not enumerated in source. -->
<!-- UNRESOLVED: 0xC0 sub 0x10 / 0x13 / 0x1F data fields marked "TBD" in source itself. -->
````

## Provenance

```yaml
source_domains:
  - aca.im
  - manualslib.com
  - samsung.com
  - vgavro.github.io
source_urls:
  - "https://aca.im/driver_docs/Samsung/MDC%20Protocol%202015%20v13.7c.pdf"
  - https://www.manualslib.com/manual/2378610/Samsung-Pmh-Series.html
  - https://www.samsung.com/us/business/support/ownercare/p-m-h-series-digital-signage-pm43h/
  - https://www.samsung.com/us/business/displays/
  - https://vgavro.github.io/samsung-mdc/MDC-Protocol.pdf
retrieved_at: 2026-07-27T07:30:15.158Z
last_checked_at: 2026-08-05T08:40:08.389Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:40:08.389Z
matched_actions: 166
action_count: 166
confidence: medium
summary: "Every spec action's wire-literal opcode (0x00..0xFF plus Annex A 0xC0 subs) appears verbatim in the source command table and per-opcode sections; transport values 9600/1515/192.168.0.10 supported. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is shared MDC manual, not PMH-specific. Exact command subset supported on PM43H/PM49H/PM55H not enumerated. Firmware version coverage not stated."
- "source does not enumerate the ERR code values returned in NAK."
- "no async event mechanism documented."
- "no formal safety interlock procedures or power-on sequencing"
- "firmware version compatibility not stated in source."
- "exact subset of MDC commands supported on PM43H/PM49H/PM55H not enumerated by source."
- "NAK ERR code values not enumerated in source."
- "0xC0 sub 0x10 / 0x13 / 0x1F data fields marked \"TBD\" in source itself."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
