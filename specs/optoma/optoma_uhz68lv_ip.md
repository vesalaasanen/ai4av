---
spec_id: admin/optoma-uhz68lv
schema_version: ai4av-public-spec-v1
revision: 1
title: "Optoma UHZ68LV Control Spec"
manufacturer: Optoma
model_family: UHZ68LV
aliases: []
compatible_with:
  manufacturers:
    - Optoma
  models:
    - UHZ68LV
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - region-resource.optoma.com
  - optomaeurope.com
  - support.optomausa.com
source_urls:
  - https://region-resource.optoma.com/products/import/Documents/471bc1d6-63f6-4825-aeef-2414e9cc5f99.pdf
  - https://www.optomaeurope.com/ContentStorage/Documents/731aa26e-4842-4414-999a-422879b17cee.pdf
  - https://support.optomausa.com/hc/en-us/articles/50099394703515--Smart-Control-Advanced-Controls-Send-Messages-RS232-Commands
retrieved_at: 2026-06-20T12:34:23.495Z
last_checked_at: 2026-06-22T11:50:25.827Z
generated_at: 2026-06-22T11:50:25.827Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is the generic Optoma RS232 Protocol Function List; UHZ68LV is not enumerated in a supported-models list visible in this file. No IP/TCP command set, port, or auth procedure documented (file is named \"_ip\" but contents are RS-232 only). Voltage/current/power and firmware compatibility not stated."
  - "none additional identified."
  - "source documents no multi-step command sequences."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "TCP/IP control port / protocol not documented despite file being named \"_ip\" — only RS-232 command set is present."
  - "UHZ68LV is not enumerated in a supported-models list within this file (source is the generic Optoma RS232 list)."
  - "firmware version compatibility, voltage/current/power specs, fault recovery sequences, and authentication (if any over TCP) are not stated."
verification:
  verdict: verified
  checked_at: 2026-06-22T11:50:25.827Z
  matched_actions: 110
  action_count: 110
  confidence: medium
  summary: "All 110 spec actions matched literally against source commands with exact command codes, parameter ranges, and response formats; transport parameters fully supported. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-20
---

# Optoma UHZ68LV Control Spec

## Summary
Optoma UHZ68LV projector control via RS-232 serial. Source ("Optoma RS232 Protocol Function List") documents the full command catalogue: power/AV-state, source select, picture/color/color-matching adjustments, aspect/keystone/geometry, language/menu, standby options, 3D, network/SSI info queries, and IR remote-key simulation. Command frame `~<id><cmd> <value>CR` (id 00=all projectors); write ack `P`/`F`, read ack `Ok <value>`/`F`.

<!-- UNRESOLVED: source is the generic Optoma RS232 Protocol Function List; UHZ68LV is not enumerated in a supported-models list visible in this file. No IP/TCP command set, port, or auth procedure documented (file is named "_ip" but contents are RS-232 only). Voltage/current/power and firmware compatibility not stated. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200        # default per source; supports 9600-115200, "lower baud may be recommended for long cable runs"
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  # FIFO: UART16550 Disable (documented but not a spec field)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from Power On/Off command 000
  - queryable    # inferred from extensive read commands (124, 121, 127, 151, 122, 873, ...)
  - levelable    # inferred from continuous-range sets (brightness 0-100, volume 0-30, keystone ±40, color gains 1-199)
```

## Actions
```yaml
# Frame legend (from source, ASCII→HEX example "~00 195 1 CR" = 7E 30 30 31 39 35 20 31 0D):
#   ~            lead code (0x7E)
#   <id>         projector ID, 2 digits, 00 = all projectors (00-99)
#   <cmd>        command digits (3-4 digit mnemonic from source tables)
#   <space>      0x20
#   <value>      variable / sub-parameter
#   <CR>         0x0D
# Write pass=ack "P", fail="F". Read pass="Ok <value>", fail="F".
# Templates below hard-code id=00 (all projectors); substitute target id as needed.

actions:
  # ===== Power / A/V state =====
  - id: power_set
    label: Power On/Off
    kind: action
    command: "~00000 {value}CR"
    params:
      - name: value
        type: integer
        description: "0=Off (source also accepts 2 for Off), 1=On"

  - id: power_query
    label: Power Status Query
    kind: query
    command: "~00124 1CR"
    params: []

  - id: av_mute_set
    label: AV Mute
    kind: action
    command: "~00020 {value}CR"
    params:
      - name: value
        type: integer
        description: "0=Off (also 2), 1=On"

  - id: av_mute_query
    label: AV Mute Query
    kind: query
    command: "~00355 1CR"
    params: []

  - id: mute_set
    label: Audio Mute
    kind: action
    command: "~00030 {value}CR"
    params:
      - name: value
        type: integer
        description: "0=Off (also 2), 1=On"

  - id: mute_query
    label: Audio Mute Query
    kind: query
    command: "~00356 1CR"
    params: []

  - id: freeze_set
    label: Freeze
    kind: action
    command: "~00040 {value}CR"
    params:
      - name: value
        type: integer
        description: "0=Unfreeze (also 2), 1=Freeze"

  - id: resync
    label: Re-Sync
    kind: action
    command: "~00011 1CR"
    params: []

  # ===== Source / input =====
  - id: input_source_set
    label: Input Source Select
    kind: action
    command: "~00012 {value}CR"
    params:
      - name: value
        type: integer
        description: "0=no signal, 1=HDMI, 6=VGA2, 10=Video, 11=Multimedia, 15=HDMI2, 165=NetworkDisplay/VGA"

  - id: input_source_query
    label: Input Source Query
    kind: query
    command: "~00121 1CR"
    params: []

  - id: auto_source_set
    label: Auto Source
    kind: action
    command: "~00563 {value}CR"
    params:
      - name: value
        type: integer
        description: "0=Off, 1=On"

  # ===== Picture (Color Mode / Wall / Brightness / Contrast / etc.) =====
  - id: color_mode_set
    label: Color Mode
    kind: action
    command: "~00203 {value}CR"
    params:
      - name: value
        type: integer
        description: "0=None, 1=Bright, 2=PC, 3=Movie, 4=Blending, 5=Game, 6=User"

  - id: color_mode_query
    label: Color Mode Query
    kind: query
    command: "~00123 1CR"
    params: []

  - id: wall_color_set
    label: Wall Color
    kind: action
    command: "~00506 {value}CR"
    params:
      - name: value
        type: integer
        description: "0=White, 5=Pink, 6=Light Blue, 7=Light Yellow, 8=Dark Green"

  - id: brightness_set
    label: Brightness
    kind: action
    command: "~00210 {value}CR"
    params:
      - name: value
        type: integer
        description: "0-100 (Blending mode: 0-8)"

  - id: brightness_query
    label: Brightness Query
    kind: query
    command: "~00125 1CR"
    params: []

  - id: contrast_set
    label: Contrast
    kind: action
    command: "~00220 {value}CR"
    params:
      - name: value
        type: integer
        description: "0-100"

  - id: contrast_query
    label: Contrast Query
    kind: query
    command: "~00126 1CR"
    params: []

  - id: sharpness_set
    label: Sharpness
    kind: action
    command: "~00230 {value}CR"
    params:
      - name: value
        type: integer
        description: "0-31 (VGA Graphic only)"

  - id: saturation_set
    label: Saturation
    kind: action
    command: "~00450 {value}CR"
    params:
      - name: value
        type: integer
        description: "0-100 (VGA/Video only)"

  - id: hue_set
    label: Hue
    kind: action
    command: "~00440 {value}CR"
    params:
      - name: value
        type: integer
        description: "0-100 (VGA/Video only)"

  - id: gamma_set
    label: Gamma
    kind: action
    command: "~00035 {value}CR"
    params:
      - name: value
        type: integer
        description: "4=2.2, 12=2.4, 15=Enhphoto, 16=Cubit"

  - id: color_temperature_set
    label: Color Temperature
    kind: action
    command: "~00036 {value}CR"
    params:
      - name: value
        type: integer
        description: "10=6500K, 11=7500K, 12=8300K"

  - id: color_temperature_query
    label: Color Temperature Query
    kind: query
    command: "~00128 1CR"
    params: []

  # ===== Color Matching - one action per source row (each has distinct cmd) =====
  - id: cm_white_red_set
    label: Color Matching White Red
    kind: action
    command: "~00345 {value}CR"
    params:
      - { name: value, type: integer, description: "1-199" }

  - id: cm_white_green_set
    label: Color Matching White Green
    kind: action
    command: "~00346 {value}CR"
    params:
      - { name: value, type: integer, description: "1-199" }

  - id: cm_white_blue_set
    label: Color Matching White Blue
    kind: action
    command: "~00347 {value}CR"
    params:
      - { name: value, type: integer, description: "1-199" }

  - id: cm_red_saturation_set
    label: Color Matching Red Saturation
    kind: action
    command: "~00333 {value}CR"
    params:
      - { name: value, type: integer, description: "0-199" }

  - id: cm_red_hue_set
    label: Color Matching Red Hue
    kind: action
    command: "~00327 {value}CR"
    params:
      - { name: value, type: integer, description: "-99 to 99" }

  - id: cm_red_gain_set
    label: Color Matching Red Gain
    kind: action
    command: "~00339 {value}CR"
    params:
      - { name: value, type: integer, description: "1-199" }

  - id: cm_green_saturation_set
    label: Color Matching Green Saturation
    kind: action
    command: "~00334 {value}CR"
    params:
      - { name: value, type: integer, description: "0-199" }

  - id: cm_green_hue_set
    label: Color Matching Green Hue
    kind: action
    command: "~00328 {value}CR"
    params:
      - { name: value, type: integer, description: "-99 to 99" }

  - id: cm_green_gain_set
    label: Color Matching Green Gain
    kind: action
    command: "~00340 {value}CR"
    params:
      - { name: value, type: integer, description: "1-199" }

  - id: cm_blue_saturation_set
    label: Color Matching Blue Saturation
    kind: action
    command: "~00335 {value}CR"
    params:
      - { name: value, type: integer, description: "0-199" }

  - id: cm_blue_hue_set
    label: Color Matching Blue Hue
    kind: action
    command: "~00329 {value}CR"
    params:
      - { name: value, type: integer, description: "-99 to 99" }

  - id: cm_blue_gain_set
    label: Color Matching Blue Gain
    kind: action
    command: "~00341 {value}CR"
    params:
      - { name: value, type: integer, description: "1-199" }

  - id: cm_cyan_saturation_set
    label: Color Matching Cyan Saturation
    kind: action
    command: "~00336 {value}CR"
    params:
      - { name: value, type: integer, description: "0-199" }

  - id: cm_cyan_hue_set
    label: Color Matching Cyan Hue
    kind: action
    command: "~00330 {value}CR"
    params:
      - { name: value, type: integer, description: "-99 to 99" }

  - id: cm_cyan_gain_set
    label: Color Matching Cyan Gain
    kind: action
    command: "~00342 {value}CR"
    params:
      - { name: value, type: integer, description: "1-199" }

  - id: cm_yellow_saturation_set
    label: Color Matching Yellow Saturation
    kind: action
    command: "~00337 {value}CR"
    params:
      - { name: value, type: integer, description: "0-199" }

  - id: cm_yellow_hue_set
    label: Color Matching Yellow Hue
    kind: action
    command: "~00331 {value}CR"
    params:
      - { name: value, type: integer, description: "-99 to 99" }

  - id: cm_yellow_gain_set
    label: Color Matching Yellow Gain
    kind: action
    command: "~00343 {value}CR"
    params:
      - { name: value, type: integer, description: "1-199" }

  - id: cm_magenta_saturation_set
    label: Color Matching Magenta Saturation
    kind: action
    command: "~00338 {value}CR"
    params:
      - { name: value, type: integer, description: "0-199" }

  - id: cm_magenta_hue_set
    label: Color Matching Magenta Hue
    kind: action
    command: "~00332 {value}CR"
    params:
      - { name: value, type: integer, description: "-99 to 99" }

  - id: cm_magenta_gain_set
    label: Color Matching Magenta Gain
    kind: action
    command: "~00344 {value}CR"
    params:
      - { name: value, type: integer, description: "1-199" }

  # ===== Display geometry / aspect / position / zoom =====
  - id: aspect_ratio_set
    label: Aspect Ratio
    kind: action
    command: "~00060 {value}CR"
    params:
      - name: value
        type: integer
        description: "1=4:3, 2=16:9, 3=16:10, 7=Auto"

  - id: aspect_ratio_query
    label: Aspect Ratio Query
    kind: query
    command: "~00127 1CR"
    params: []

  - id: phase_set
    label: Phase
    kind: action
    command: "~00074 {value}CR"
    params:
      - { name: value, type: integer, description: "0-31" }

  - id: clock_set
    label: Clock
    kind: action
    command: "~00073 {value}CR"
    params:
      - { name: value, type: integer, description: "-5 to 5" }

  - id: h_position_set
    label: Horizontal Position
    kind: action
    command: "~00075 {value}CR"
    params:
      - { name: value, type: integer, description: "-5 to 5" }

  - id: v_position_set
    label: Vertical Position
    kind: action
    command: "~00076 {value}CR"
    params:
      - { name: value, type: integer, description: "-5 to 5" }

  - id: zoom_plus
    label: Zoom Plus
    kind: action
    command: "~00051 1CR"
    params: []

  - id: zoom_minus
    label: Zoom Minus
    kind: action
    command: "~00061 1CR"
    params: []

  - id: digital_zoom_set
    label: Digital Zoom
    kind: action
    command: "~00062 {value}CR"
    params:
      - { name: value, type: integer, description: "0-10" }

  - id: projection_set
    label: Projection Mode
    kind: action
    command: "~00071 {value}CR"
    params:
      - name: value
        type: integer
        description: "1=Front, 2=Ceiling Rear, 3=Front Ceiling, 4=Rear Ceiling"

  - id: projection_query
    label: Projection Mode Query
    kind: query
    command: "~00129 1CR"
    params: []

  - id: v_keystone_set
    label: Vertical Keystone
    kind: action
    command: "~00066 {value}CR"
    params:
      - { name: value, type: integer, description: "-40 to 40" }

  - id: v_keystone_query
    label: Vertical Keystone Query
    kind: query
    command: "~005433 1CR"
    params: []

  - id: h_keystone_set
    label: Horizontal Keystone
    kind: action
    command: "~00065 {value}CR"
    params:
      - { name: value, type: integer, description: "-40 to 40" }

  - id: h_keystone_query
    label: Horizontal Keystone Query
    kind: query
    command: "~005434 1CR"
    params: []

  - id: size_set
    label: Size
    kind: action
    command: "~00067 {value}CR"
    params:
      - { name: value, type: integer, description: "0 to -25" }

  - id: size_query
    label: Size Query
    kind: query
    command: "~005435 1CR"
    params: []

  - id: image_h_shift_set
    label: Image H Shift
    kind: action
    command: "~00068 {value}CR"
    params:
      - { name: value, type: integer, description: "250 to -250" }

  - id: image_h_shift_query
    label: Image H Shift Query
    kind: query
    command: "~005436 1CR"
    params: []

  - id: image_v_shift_set
    label: Image V Shift
    kind: action
    command: "~00069 {value}CR"
    params:
      - { name: value, type: integer, description: "100 to -100" }

  - id: image_v_shift_query
    label: Image V Shift Query
    kind: query
    command: "~005437 1CR"
    params: []

  # ===== Settings: language / menu / standby outputs =====
  - id: language_set
    label: OSD Language
    kind: action
    command: "~00070 {value}CR"
    params:
      - name: value
        type: integer
        description: "1=English, 2=Deutsch, 3=Français, 4=Italiano, 5=Español, 6=Português, 7=Polski, 8=Nederlands, 9=Svenska, 10=Norwegian, 11=Suomi, 12=ελληνικά, 13=繁體中文, 14=簡体中文, 15=日本語, 16=한국어, 17=Русский, 18=Magyar, 19=Čeština, 20=عربي, 21=ไทย, 22=Türkçe, 23=فارسی, 24=Dansk, 25=Vietnamese, 26=Indonesia, 27=Romanian, 28=Slovakian"

  - id: menu_location_set
    label: Menu Location
    kind: action
    command: "~00072 {value}CR"
    params:
      - name: value
        type: integer
        description: "1=Top left, 2=Top right, 3=Center, 4=Bottom left, 5=Bottom right"

  - id: vga_out_standby_set
    label: VGA Out (Standby)
    kind: action
    command: "~00309 {value}CR"
    params:
      - name: value
        type: integer
        description: "0=Off (also 2), 1=On"

  - id: lan_standby_set
    label: LAN (Standby)
    kind: action
    command: "~00450 {value}CR"   # NOTE: source lists same code "450" as Saturation - preserved verbatim
    params:
      - name: value
        type: integer
        description: "0=Off (also 2), 1=On"

  - id: input_output_set
    label: Input/Output (VGA2 Function)
    kind: action
    command: "~00308 {value}CR"
    params:
      - name: value
        type: integer
        description: "1=Input, 0=Output (also 2)"

  # ===== System / Options =====
  - id: test_pattern_set
    label: Test Pattern
    kind: action
    command: "~00195 {value}CR"
    params:
      - name: value
        type: integer
        description: "0=None, 1=Grid"

  - id: direct_power_on_set
    label: Direct Power On
    kind: action
    command: "~00105 {value}CR"
    params:
      - name: value
        type: integer
        description: "0=Off, 1=On"

  - id: signal_power_on_set
    label: Signal Power On
    kind: action
    command: "~00104 {value}CR"
    params:
      - name: value
        type: integer
        description: "0=Off, 1=On"

  - id: reset_to_default
    label: Reset to Default
    kind: action
    command: "~00112 {value}CR"
    params:
      - name: value
        type: integer
        description: "0=Cancel, 1=Yes"

  - id: speaker_set
    label: Speaker
    kind: action
    command: "~00310 {value}CR"
    params:
      - name: value
        type: integer
        description: "0=Off (also 2), 1=On"

  - id: audio_out_set
    label: Audio Out
    kind: action
    command: "~00510 {value}CR"
    params:
      - name: value
        type: integer
        description: "0=Off (also 2), 1=On"

  - id: volume_microphone_set
    label: Volume / Microphone
    kind: action
    command: "~00562 {value}CR"
    params:
      - name: value
        type: integer
        description: "0=Microphone Off (also 2), 1=On"

  - id: volume_set
    label: Volume
    kind: action
    command: "~00081 {value}CR"
    params:
      - { name: value, type: integer, description: "0-30" }

  - id: microphone_volume_set
    label: Microphone Volume
    kind: action
    command: "~00093 {value}CR"
    params:
      - { name: value, type: integer, description: "0-30" }

  - id: logo_set
    label: Logo
    kind: action
    command: "~00082 {value}CR"
    params:
      - name: value
        type: integer
        description: "1=Default, 2=User"

  - id: logo_capture
    label: Logo Capture
    kind: action
    command: "~00083 1CR"
    params: []

  - id: auto_power_off_set
    label: Auto Power Off (minutes)
    kind: action
    command: "~00106 {value}CR"
    params:
      - name: value
        type: integer
        description: "0-120 in 5-minute increments"

  - id: ssi_power_mode_set
    label: SSI Power Mode
    kind: action
    command: "~00110 {value}CR"
    params:
      - name: value
        type: integer
        description: "1=Normal, 2=Eco"

  - id: ssi_power_mode_query
    label: SSI Power Mode Query
    kind: query
    command: "~00150 15CR"
    params: []

  - id: high_altitude_set
    label: High Altitude
    kind: action
    command: "~00101 {value}CR"
    params:
      - name: value
        type: integer
        description: "0=Off (also 2), 1=On"

  - id: filter_reminder_set
    label: Filter Reminder
    kind: action
    command: "~00322 {value}CR"
    params:
      - { name: value, type: integer, description: "0-1000" }

  - id: filter_cleaning_reminder_set
    label: Optional Filter Cleaning Reminder
    kind: action
    command: "~00323 {value}CR"
    params:
      - name: value
        type: integer
        description: "0=No (also 2), 1=Yes"

  - id: open_info_menu
    label: Open/Close Info Menu
    kind: action
    command: "~00313 {value}CR"
    params:
      - name: value
        type: integer
        description: "1=Open, 0=Close (also 2)"

  # ===== 3D =====
  - id: td_set
    label: 3D Mode
    kind: action
    command: "~00230 {value}CR"
    params:
      - name: value
        type: integer
        description: "4=Auto, 5=On, 6=Off, 7=Frame Packing"

  - id: td_format_set
    label: 3D Format
    kind: action
    command: "~00405 {value}CR"
    params:
      - name: value
        type: integer
        description: "1=Side-by-Side (Half), 2=Top and Bottom, 3=Frame Sequential, 9=Field sequential"

  - id: td_invert_set
    label: 3D Invert
    kind: action
    command: "~00231 {value}CR"
    params:
      - name: value
        type: integer
        description: "0=Off, 1=On"

  # ===== Information / status queries =====
  - id: ssi_hours_normal_query
    label: SSI Hours Used (Normal)
    kind: query
    command: "~01083 1CR"
    params: []

  - id: ssi_hours_eco_query
    label: SSI Hours Used (Eco)
    kind: query
    command: "~01084 1CR"
    params: []

  - id: ssi_hours_query
    label: SSI Hours (Normal/Eco)
    kind: query
    command: "~00108 1CR"
    params: []

  - id: filter_usage_hours_query
    label: Filter Usage Hours
    kind: query
    command: "~00321 1CR"
    params: []

  - id: model_name_query
    label: Model Name
    kind: query
    command: "~00151 1CR"
    params: []

  - id: snid_query
    label: SNID
    kind: query
    command: "~00353 1CR"
    params: []

  - id: main_source_resolution_query
    label: Main Source Resolution
    kind: query
    command: "~01504 1CR"
    params: []

  - id: sw_version_query
    label: Software Version (DDP/MCU/LAN)
    kind: query
    command: "~00122 1CR"
    params: []

  - id: ip_address_query
    label: IP Address
    kind: query
    command: "~00873 1CR"
    params: []

  - id: network_status_query
    label: Network Status
    kind: query
    command: "~00871 1CR"
    params: []
    # response: 0=Disconnected, 1=Connected

  - id: dhcp_client_query
    label: DHCP Client
    kind: query
    command: "~00150 17CR"
    params: []
    # response: 0=Off, 1=On

  - id: mac_address_query
    label: MAC Address
    kind: query
    command: "~00555 1CR"
    params: []

  - id: sub_source_resolution_query
    label: Sub Source Resolution
    kind: query
    command: "~00010 1CR"
    params: []

  - id: light_source_mode_query
    label: Light Source Mode
    kind: query
    command: "~00150 15CR"
    params: []

  - id: standby_power_mode_query
    label: Standby Power Mode
    kind: query
    command: "~00150 16CR"
    params: []

  - id: system_temperature_query
    label: System Temperature
    kind: query
    command: "~00150 18CR"
    params: []

  - id: info_string_query
    label: Info String
    kind: query
    command: "~00001 1CR"
    params: []
    # response format "abbbbbccddddee", see Note *1 in Notes section.

  # ===== Remote Control Simulation =====
  # Source documents a single command "140" carrying an IR-remote keycode.
  # Confirmed verbatim by the "info" row: "~XX140 40 CR" → keycode 40.
  - id: remote_key
    label: Remote Control Key Simulation
    kind: action
    command: "~00140 {keycode}CR"
    params:
      - name: keycode
        type: integer
        description: >
          IR remote button code. 1=Power, 50=Power Off, 10=Up, 11=Left,
          12=Enter (Menu OK), 13=Right, 14=Down, 15=V Keystone+, 16=V Keystone-,
          17=Volume-, 18=Volume+, 20=Menu, 23=VGA-1, 24=AV Mute, 30=Freeze,
          32=Zoom+, 33=Zoom-, 36=Mode, 37=Format, 40=Info, 41=Re-sync,
          42=HDMI 1, 43=HDMI 2, 47=Source, 51-60=Number keys 1..0,
          63=PIP/PBP, 68=Geometric Correction, 70=F1, 71=F2, 72=F3, 74=Exit
```

## Feedbacks
```yaml
feedbacks:
  - id: write_ack
    type: enum
    values: ["P", "F"]
    description: "Acknowledge byte returned for every write command. P=pass, F=fail."

  - id: read_ack
    type: enum
    values: ["Ok", "F"]
    description: "Read command response. Pass='Ok <variable>', Fail='F'."

  - id: power_state
    type: enum
    values: [0, 1]
    description: "Returned by power_query (cmd 124). 0=Off, 1=On."

  - id: av_mute_state
    type: enum
    values: [0, 1]
    description: "Returned by av_mute_query (cmd 355)."

  - id: audio_mute_state
    type: enum
    values: [0, 1]
    description: "Returned by mute_query (cmd 356)."

  - id: input_source_state
    type: integer
    description: "Returned by input_source_query (cmd 121). Source code, see input_source_set."

  - id: color_mode_state
    type: integer
    description: "Returned by color_mode_query (cmd 123)."

  - id: network_status_state
    type: enum
    values: [0, 1]
    description: "Returned by network_status_query (cmd 871). 0=Disconnected, 1=Connected."

  - id: dhcp_client_state
    type: enum
    values: [0, 1]
    description: "Returned by dhcp_client_query (cmd 150 sub 17)."
```

## Variables
```yaml
# All settable parameters are exposed as discrete Actions above (e.g. brightness,
# contrast, keystone, volume, color gains). No additional non-action variables
# are documented in source.
# UNRESOLVED: none additional identified.
variables: []
```

## Events
```yaml
# Unsolicited "System Automatically Standby" notifications.
# Frame: "I N F O <n>" (literal ASCII "INFO" + code digit), sent by projector.
events:
  - id: system_auto_send
    type: enum
    description: "Unsolicited projector status notification. Frame: INFO<code>."
    values:
      - { code: 0,  meaning: "Standby" }
      - { code: 4,  meaning: "LD Fail" }
      - { code: 6,  meaning: "Fan Lock" }
      - { code: 7,  meaning: "Over Temperature" }
      - { code: 12, meaning: "Color Wheel Unexpected Stop" }
      - { code: 13, meaning: "Power Good Error" }
      - { code: 21, meaning: "LD NTC (1) Over Temperature" }
      - { code: 24, meaning: "System Ready" }
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step command sequences.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. (Lamp/light-source over-temperature events
# are reported via the System Auto Send INFO events above but no mitigation
# procedure is documented.)
```

## Notes
- **Baud rate flexibility:** source states the projector supports 9600–115200 bps; default 19200. "A lower baud rate may be recommended for long cable runs."
- **Projector ID:** frame byte `<id>` selects an individual projector (00–99); `00` broadcasts to all projectors on the bus.
- **`&` notation:** several set commands document `<value> & 2` (e.g. Power Off, AV Mute Off, Mute Off, Freeze Unfreeze, Speaker Off, Audio Out Off, High Altitude Off). This indicates both `0` and `2` are accepted Off/Cancel codes — semantics difference (if any) is not explained in source.
- **Code collisions preserved verbatim:** source reuses code `450` for both **Saturation** (Picture menu, VGA/Video) and **LAN (Standby)** (Settings menu), and code `150` for several Information sub-queries distinguished by their trailing sub-parameter (15=Light Source Mode, 16=Standby Power Mode, 17=DHCP, 18=System Temperature). These collisions are reproduced as documented; do not collapse.
- **Note \*1 — Info String format** (response to `~00001 1CR`): layout `abbbbbccddddee`:
  - `a` = Power state: `0`=Off, `1`=On
  - `bbbbb` = Light Source Life (hours) = `nnnn`
  - `cc` = Input Source: `00`=None, `01`=DVI, `02`=VGA1, `03`=VGA2, `04`=S-Video, `05`=Video, `06`=BNC, `07`=HDMI1, `08`=HDMI2, `09`=Wireless, `10`=Component, `11`=Flash drive, `12`=Network Display (Presenter), `13`=USB Display, `14`=HDMI3/Dongle, `15`=DisplayPort, `16`=HDBaseT
  - `dddd` = Firmware Version
  - `ee` = Display Mode: `00`=None, `01`=Presentation, `02`=Bright, `03`=Movie, `04`=sRGB, `05`=User, `06`=User2, `07`=Blackboard, `08`=Classroom, `09`=3D, `10`=DICOM SIM., `11`=Film, `12`=Game, `13`=Cinema, `14`=Vivid, `15`=ISF Day, `16`=ISF Night, `18`=Blending
- **Model-name info query (`cmd 151`)** additionally returns the Optoma model-series class code (`1`=SVGA, `2`=XGA, `3`=WXGA, `4`=1080P, `5`=WUXGA), not the literal "UHZ68LV" string — the UHZ68LV maps to one of these classes (resolution class); exact mapping not stated in source.

<!-- UNRESOLVED: TCP/IP control port / protocol not documented despite file being named "_ip" — only RS-232 command set is present. -->
<!-- UNRESOLVED: UHZ68LV is not enumerated in a supported-models list within this file (source is the generic Optoma RS232 list). -->
<!-- UNRESOLVED: firmware version compatibility, voltage/current/power specs, fault recovery sequences, and authentication (if any over TCP) are not stated. -->

## Provenance

```yaml
source_domains:
  - region-resource.optoma.com
  - optomaeurope.com
  - support.optomausa.com
source_urls:
  - https://region-resource.optoma.com/products/import/Documents/471bc1d6-63f6-4825-aeef-2414e9cc5f99.pdf
  - https://www.optomaeurope.com/ContentStorage/Documents/731aa26e-4842-4414-999a-422879b17cee.pdf
  - https://support.optomausa.com/hc/en-us/articles/50099394703515--Smart-Control-Advanced-Controls-Send-Messages-RS232-Commands
retrieved_at: 2026-06-20T12:34:23.495Z
last_checked_at: 2026-06-22T11:50:25.827Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-22T11:50:25.827Z
matched_actions: 110
action_count: 110
confidence: medium
summary: "All 110 spec actions matched literally against source commands with exact command codes, parameter ranges, and response formats; transport parameters fully supported. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is the generic Optoma RS232 Protocol Function List; UHZ68LV is not enumerated in a supported-models list visible in this file. No IP/TCP command set, port, or auth procedure documented (file is named \"_ip\" but contents are RS-232 only). Voltage/current/power and firmware compatibility not stated."
- "none additional identified."
- "source documents no multi-step command sequences."
- "source contains no explicit safety warnings, interlock procedures,"
- "TCP/IP control port / protocol not documented despite file being named \"_ip\" — only RS-232 command set is present."
- "UHZ68LV is not enumerated in a supported-models list within this file (source is the generic Optoma RS232 list)."
- "firmware version compatibility, voltage/current/power specs, fault recovery sequences, and authentication (if any over TCP) are not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
