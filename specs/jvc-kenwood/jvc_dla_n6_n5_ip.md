---
spec_id: admin/jvc-kenwood-dla-n6-n5
schema_version: ai4av-public-spec-v1
revision: 1
title: "JVC KENWOOD DLA-N6/N5 Control Spec"
manufacturer: "JVC KENWOOD"
model_family: DLA-N6
aliases: []
compatible_with:
  manufacturers:
    - "JVC KENWOOD"
  models:
    - DLA-N6
    - DLA-N5
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - us.jvc.com
  - support.jvc.com
source_urls:
  - http://www.us.jvc.com/projectors/pdf/2018_ILA-FPJ_Ext_Command_List_v1.2.pdf
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
retrieved_at: 2026-09-02T20:42:53.067Z
last_checked_at: 2026-09-11T22:19:16.562Z
generated_at: 2026-09-11T22:19:16.562Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "PMSV (isf save)"
  - "PMIE (isf Adjust mode)"
  - "PMLD (isf load)"
  - "Special15 HDR10/HLG Picture Mode data"
  - "ANMO-trigger detailed mapping"
  - "default TCP control port not stated in source (an example exchange shows a unit set to 20554); LAN transport section of the vendor doc (connection procedure over TCP) not included in the refined source text"
  - "default control port not stated in source; source example shows a unit configured with 20554 (settable via LSPT command)"
  - "command 53 53 listed in source command table but no sub-commands or payload documented in source"
  - "value table (Table 4-26) empty in source"
  - "value table (Table 4-27) empty in source"
  - "value table (Table 4-31) empty in source; command only on RS3000/NX9/NX11/V9-class models"
  - "value table (Table 4-58) empty in source"
  - "value table (Table 4-39) empty in source"
  - "value table (Table 4-42) empty in source"
  - "value table (Table 4-43) empty in source"
  - "value table (Table 4-46) empty in source"
  - "value table (Table 4-50) empty in source"
  - "value table (Table 4-51) empty in source"
  - "no additional settable parameters outside Actions documented in source"
verification:
  verdict: verified
  checked_at: 2026-09-11T22:19:16.562Z
  matched_actions: 187
  action_count: 187
  confidence: medium
  summary: "All 187 spec actions trace to source command/subcommand tables (3.5, 4-18, 4-62); transport parameters match section 3.1; bidirectional coverage ≈ 187/189 ≥ 0.99. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# JVC KENWOOD DLA-N6/N5 Control Spec

## Summary
JVC KENWOOD D-ILA home cinema projectors (DLA-N6, DLA-N5; spec doc PJ09020002B Ver.1.2, 9/Oct/2018 also covers DLA-RS3000/NX9/NX11/V9R, DLA-RS2000/NX7/N8/V7, DLA-RS1000/NX5/V5 series). Covers external control via RS-232C (19200 8N1, ASCII framing) using the JVC packet protocol (Header '!'/'?'/'@'/ACK, fixed unit ID 89 01, 0x0A end byte). The source additionally documents LAN setup commands (IP, subnet, gateway, MAC, control port, network reboot), implying the same command set is carried over the projector's network interface.

<!-- UNRESOLVED: default TCP control port not stated in source (an example exchange shows a unit set to 20554); LAN transport section of the vendor doc (connection procedure over TCP) not included in the refined source text -->

## Transport
```yaml
protocols:
  - serial
  - tcp  # inferred: source documents LAN setup commands (IP address, subnet mask, gateway, port setting, network reboot); command framing identical
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: null  # UNRESOLVED: default control port not stated in source; source example shows a unit configured with 20554 (settable via LSPT command)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: PW power on/off commands present
  - queryable    # inferred: reference commands ('?' header) with '@' responses present
  - levelable    # inferred: numeric adjustment commands (contrast, brightness, gain, etc.)
  - routable     # inferred: input switching command (HDMI-1/HDMI-2)
```

## Actions
```yaml
# Frame: Header(1) + UnitID(89 01) + Command(2) + Data(n) + End(0x0A).
# Operation header '!' = 0x21, Reference header '?' = 0x3F, Response '@' = 0x40, ACK = 0x06.
# For every action below whose source row marks Reference supported (Table 4-18),
# the query frame is: "3F 89 01 <command+subcommand bytes> 0A".
# Numeric params: signed 16-bit value as 4 ASCII hex chars (0014 = +20, FFFD = -3).

# --- Top level ---
- id: null_command_test
  label: "NULL Command (connection check)"
  kind: action
  command: "21 89 01 00 00 0A"
  params: []

- id: power_set
  label: "Power Set (PW)"
  kind: action
  command: "21 89 01 50 57 {state} 0A"
  params:
    - name: state
      type: enum
      values: ["0=Power OFF", "1=Power ON"]

- id: power_query
  label: "Power State Query (PW?)"
  kind: query
  command: "3F 89 01 50 57 0A"
  params: []

- id: input_select
  label: "Input Select (IP)"
  kind: action
  command: "21 89 01 49 50 {input} 0A"
  params:
    - name: input
      type: enum
      values: ["6=HDMI-1", "7=HDMI-2"]

- id: input_query
  label: "Input State Query (IP?)"
  kind: query
  command: "3F 89 01 49 50 0A"
  params: []

- id: remote_code_send
  label: "Remote Control Pass-Through (RC)"
  kind: action
  command: "21 89 01 52 43 {code} 0A"
  params:
    - name: code
      type: string
      description: "2-byte JVC remote code (custom + function) as 4 ASCII hex chars, e.g. 732E = MENU"

- id: setup_protocol_switch
  label: "External Control Protocol Switch (SURS)"
  kind: action
  command: "21 89 01 53 55 52 53 {mode} 0A"
  params:
    - name: mode
      type: enum
      values: ["1=Compatible command system"]

- id: setup_ir_code_set
  label: "IR Code Set (SURC)"
  kind: action
  command: "21 89 01 53 55 52 43 {code} 0A"
  params:
    - name: code
      type: enum
      values: ["0=A code (0x73)", "1=B code (0x63)"]

- id: setup_ir_code_query
  label: "IR Code Query (SURC?)"
  kind: query
  command: "3F 89 01 53 55 52 43 0A"
  params: []

# --- Gamma table data (512-byte binary, little endian, 256 points) ---
- id: gamma_red_send
  label: "Gamma Table Custom Red Data Send (GR)"
  kind: action
  command: "21 89 01 47 52 0A"
  params:
    - name: data
      type: string
      description: "512 bytes binary sent after first ACK; second ACK confirms; valid only when gamma table is Custom1/2/3 and power on"

- id: gamma_red_query
  label: "Gamma Table Custom Red Data Query (GR?)"
  kind: query
  command: "3F 89 01 47 52 0A"
  params: []

- id: gamma_green_send
  label: "Gamma Table Custom Green Data Send (GG)"
  kind: action
  command: "21 89 01 47 47 0A"
  params:
    - name: data
      type: string
      description: "512 bytes binary sent after first ACK"

- id: gamma_green_query
  label: "Gamma Table Custom Green Data Query (GG?)"
  kind: query
  command: "3F 89 01 47 47 0A"
  params: []

- id: gamma_blue_send
  label: "Gamma Table Custom Blue Data Send (GB)"
  kind: action
  command: "21 89 01 47 42 0A"
  params:
    - name: data
      type: string
      description: "512 bytes binary sent after first ACK"

- id: gamma_blue_query
  label: "Gamma Table Custom Blue Data Query (GB?)"
  kind: query
  command: "3F 89 01 47 42 0A"
  params: []

# --- Panel Alignment (zone) data (256-byte binary, 11x11 zones H/V, -31..+31, little endian) ---
- id: panel_align_red_send
  label: "Panel Alignment Zone Red Data Send (PR)"
  kind: action
  command: "21 89 01 50 52 0A"
  params:
    - name: data
      type: string
      description: "256 bytes binary sent after first ACK; 121 zones x 2 (H/V) + 13 reserved"

- id: panel_align_red_query
  label: "Panel Alignment Zone Red Data Query (PR?)"
  kind: query
  command: "3F 89 01 50 52 0A"
  params: []

- id: panel_align_blue_send
  label: "Panel Alignment Zone Blue Data Send (PB)"
  kind: action
  command: "21 89 01 50 42 0A"
  params:
    - name: data
      type: string
      description: "256 bytes binary sent after first ACK"

- id: panel_align_blue_query
  label: "Panel Alignment Zone Blue Data Query (PB?)"
  kind: query
  command: "3F 89 01 50 42 0A"
  params: []

# --- Source / model ---
- id: source_signal_query
  label: "Input Signal Status Query (SC?)"
  kind: query
  command: "3F 89 01 53 43 0A"
  params: []

- id: model_status_query
  label: "Model Status Query (MD?)"
  kind: query
  command: "3F 89 01 4D 44 0A"
  params: []

# --- Service setup: listed in command table without payload details ---
- id: service_setup
  label: "Service Setup (SS)"
  kind: action
  command: null  # UNRESOLVED: command 53 53 listed in source command table but no sub-commands or payload documented in source
  params: []

# --- Picture Adjust (PM 50 4D) ---
- id: pm_picture_mode
  label: "Picture Mode Switch (PMPM)"
  kind: action
  command: "21 89 01 50 4D 50 4D {code} 0A"
  params:
    - name: code
      type: enum
      values: ["00=Film", "01=Cinema", "03=Natural", "04=HDR10", "06=THX", "0C=User1", "0D=User2", "0E=User3", "0F=User4", "10=User5", "11=User6", "14=HLG"]

- id: pm_intelligent_lens_aperture
  label: "Intelligent Lens Aperture (PMDI)"
  kind: action
  command: "21 89 01 50 4D 44 49 {code} 0A"
  params:
    - name: code
      type: enum
      values: ["0=Off", "1=Auto1", "2=Auto2"]

- id: pm_color_profile
  label: "Color Profile Switch (PMPR)"
  kind: action
  command: "21 89 01 50 4D 50 52 {code} 0A"
  params:
    - name: code
      type: enum
      description: "only parameters valid for current Picture Mode accepted"
      values: ["00=Off", "01=Film1", "02=Film2", "03=BT.709", "04=Cinema", "06=Anime", "08=Video", "0A=HDR", "0B=BT.2020", "0D=THX", "0E=Custom1", "0F=Custom2", "10=Custom3", "11=Custom4", "12=Custom5", "22=Custom6", "21=DCI"]

- id: pm_color_temp_table
  label: "Color Temperature Table Switch (PMCL)"
  kind: action
  command: "21 89 01 50 4D 43 4C {code} 0A"
  params:
    - name: code
      type: enum
      description: "source table lists 2-char codes; source worked example uses single char '2' for 6500K"
      values: ["00=5500K", "02=6500K", "04=7500K", "08=9300K", "09=High Bright", "0A=Custom1", "0B=Custom2", "0C=HDR10", "0D=Xenon1", "0E=Xenon2", "14=HLG"]

- id: pm_color_temp_correction
  label: "Color Temperature Correction Switch (PMCC)"
  kind: action
  command: "21 89 01 50 4D 43 43 {code} 0A"
  params:
    - name: code
      type: enum
      values: ["00=5500K", "02=6500K", "04=7500K", "08=9300K", "09=High Bright", "0D=Xenon1", "0E=Xenon2"]

- id: pm_color_temp_gain_red
  label: "Color Temperature Gain Red (PMGR)"
  kind: action
  command: "21 89 01 50 4D 47 52 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_color_temp_gain_green
  label: "Color Temperature Gain Green (PMGG)"
  kind: action
  command: "21 89 01 50 4D 47 47 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_color_temp_gain_blue
  label: "Color Temperature Gain Blue (PMGB)"
  kind: action
  command: "21 89 01 50 4D 47 42 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_color_temp_offset_red
  label: "Color Temperature Offset Red (PMOR)"
  kind: action
  command: "21 89 01 50 4D 4F 52 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_color_temp_offset_green
  label: "Color Temperature Offset Green (PMOG)"
  kind: action
  command: "21 89 01 50 4D 4F 47 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_color_temp_offset_blue
  label: "Color Temperature Offset Blue (PMOB)"
  kind: action
  command: "21 89 01 50 4D 4F 42 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_gamma_table
  label: "Gamma Table Switch (PMGT)"
  kind: action
  command: "21 89 01 50 4D 47 54 {code} 0A"
  params:
    - name: code
      type: enum
      values: ["00=2.2", "01=Cinema1", "02=Cinema2", "04=Custom1", "05=Custom2", "06=Custom3", "07=HDR(HLG)", "08=2.4", "09=2.6", "0A=Film1", "0B=Film2", "0C=HDR(PQ)", "10=THX"]

- id: pm_picture_tone_white
  label: "Picture Tone White (PMFW)"
  kind: action
  command: "21 89 01 50 4D 46 57 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_picture_tone_red
  label: "Picture Tone Red (PMFR)"
  kind: action
  command: "21 89 01 50 4D 46 52 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_picture_tone_green
  label: "Picture Tone Green (PMFG)"
  kind: action
  command: "21 89 01 50 4D 46 47 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_picture_tone_blue
  label: "Picture Tone Blue (PMFB)"
  kind: action
  command: "21 89 01 50 4D 46 42 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_contrast
  label: "Contrast (PMCN)"
  kind: action
  command: "21 89 01 50 4D 43 4E {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars (0014 = +20)"

- id: pm_brightness
  label: "Brightness (PMBR)"
  kind: action
  command: "21 89 01 50 4D 42 52 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars (FFFD = -3)"

- id: pm_color
  label: "Color (PMCO)"
  kind: action
  command: "21 89 01 50 4D 43 4F {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_tint
  label: "Tint (PMTI)"
  kind: action
  command: "21 89 01 50 4D 54 49 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_nr
  label: "NR Adjustment (PMRN)"
  kind: action
  command: "21 89 01 50 4D 52 4E {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_gamma_correction
  label: "Gamma Correction Switch (PMGC)"
  kind: action
  command: "21 89 01 50 4D 47 43 {code} 0A"
  params:
    - name: code
      type: enum
      values: ["01=Cinema1", "02=Cinema2", "04=Import", "05=1.8", "06=1.9", "07=2.0", "08=2.1", "09=2.2", "0A=2.3", "0B=2.4", "0C=2.5", "0D=2.6", "0E=Film1", "0F=Film2", "14=HDR(HLG)", "15=HDR(PQ)"]

- id: pm_gamma_red_data
  label: "Gamma Red Data via PM (PMDR)"
  kind: action
  command: "21 89 01 50 4D 44 52 0A"
  params:
    - name: data
      type: string
      description: "512 bytes binary sent after ACK (Special2, same format as GR)"

- id: pm_gamma_green_data
  label: "Gamma Green Data via PM (PMDG)"
  kind: action
  command: "21 89 01 50 4D 44 47 0A"
  params:
    - name: data
      type: string
      description: "512 bytes binary sent after ACK (Special2)"

- id: pm_gamma_blue_data
  label: "Gamma Blue Data via PM (PMDB)"
  kind: action
  command: "21 89 01 50 4D 44 42 0A"
  params:
    - name: data
      type: string
      description: "512 bytes binary sent after ACK (Special2)"

- id: pm_bright_level_white
  label: "Bright Level White (PMRW)"
  kind: action
  command: "21 89 01 50 4D 52 57 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_bright_level_red
  label: "Bright Level Red (PMRR)"
  kind: action
  command: "21 89 01 50 4D 52 52 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_dark_level_green_rg
  label: "Dark Level Green (PMRG row)"
  kind: action
  command: "21 89 01 50 4D 52 47 {value} 0A"
  params:
    - name: value
      type: string
      description: "labeled 'Dark Level Green' in source table (likely Bright Level Green); signed 16-bit as 4 ASCII hex chars"

- id: pm_dark_level_blue_rb
  label: "Dark Level Blue (PMRB row)"
  kind: action
  command: "21 89 01 50 4D 52 42 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_dark_level_white
  label: "Dark Level White (PMKW)"
  kind: action
  command: "21 89 01 50 4D 4B 57 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_dark_level_red
  label: "Dark Level Red (PMKR)"
  kind: action
  command: "21 89 01 50 4D 4B 52 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_dark_level_green_kg
  label: "Dark Level Green (PMKG)"
  kind: action
  command: "21 89 01 50 4D 4B 47 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_dark_level_blue
  label: "Dark Level Blue (PMKB)"
  kind: action
  command: "21 89 01 50 4D 4B 42 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_color_management
  label: "Color Management Table (PMCB)"
  kind: action
  command: "21 89 01 50 4D 43 42 {code} 0A"
  params:
    - name: code
      type: string
      description: null  # UNRESOLVED: value table (Table 4-26) empty in source

- id: pm_axis_position_red
  label: "Axis Position Red (PMAR)"
  kind: action
  command: "21 89 01 50 4D 41 52 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_axis_position_yellow
  label: "Axis Position Yellow (PMAY)"
  kind: action
  command: "21 89 01 50 4D 41 59 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_axis_position_green
  label: "Axis Position Green (PMAG)"
  kind: action
  command: "21 89 01 50 4D 41 47 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_axis_position_cyan
  label: "Axis Position Cyan (PMAC)"
  kind: action
  command: "21 89 01 50 4D 41 43 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_axis_position_blue
  label: "Axis Position Blue (PMAB)"
  kind: action
  command: "21 89 01 50 4D 41 42 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_axis_position_magenta
  label: "Axis Position Magenta (PMAM)"
  kind: action
  command: "21 89 01 50 4D 41 4D {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_hue_red
  label: "HUE Red (PMHR)"
  kind: action
  command: "21 89 01 50 4D 48 52 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_hue_yellow
  label: "HUE Yellow (PMHY)"
  kind: action
  command: "21 89 01 50 4D 48 59 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_hue_green
  label: "HUE Green (PMHG)"
  kind: action
  command: "21 89 01 50 4D 48 47 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_hue_cyan
  label: "HUE Cyan (PMHC)"
  kind: action
  command: "21 89 01 50 4D 48 43 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_hue_blue
  label: "HUE Blue (PMHB)"
  kind: action
  command: "21 89 01 50 4D 48 42 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_hue_magenta
  label: "HUE Magenta (PMHM)"
  kind: action
  command: "21 89 01 50 4D 48 4D {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_saturation_red
  label: "SATURATION Red (PMSR)"
  kind: action
  command: "21 89 01 50 4D 53 52 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_saturation_yellow
  label: "SATURATION Yellow (PMSY)"
  kind: action
  command: "21 89 01 50 4D 53 59 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_saturation_green
  label: "SATURATION Green (PMSG)"
  kind: action
  command: "21 89 01 50 4D 53 47 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_saturation_cyan
  label: "SATURATION Cyan (PMSC)"
  kind: action
  command: "21 89 01 50 4D 53 43 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_saturation_blue
  label: "SATURATION Blue (PMSB)"
  kind: action
  command: "21 89 01 50 4D 53 42 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_saturation_magenta
  label: "SATURATION Magenta (PMSM)"
  kind: action
  command: "21 89 01 50 4D 53 4D {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_cms_brightness_red
  label: "CMS BRIGHTNESS Red (PMLR)"
  kind: action
  command: "21 89 01 50 4D 4C 52 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_cms_brightness_yellow
  label: "CMS BRIGHTNESS Yellow (PMLY)"
  kind: action
  command: "21 89 01 50 4D 4C 59 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_cms_brightness_green
  label: "CMS BRIGHTNESS Green (PMLG)"
  kind: action
  command: "21 89 01 50 4D 4C 47 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_cms_brightness_cyan
  label: "CMS BRIGHTNESS Cyan (PMLC)"
  kind: action
  command: "21 89 01 50 4D 4C 43 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_cms_brightness_blue
  label: "CMS BRIGHTNESS Blue (PMLB)"
  kind: action
  command: "21 89 01 50 4D 4C 42 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_cms_brightness_magenta
  label: "CMS BRIGHTNESS Magenta (PMLM)"
  kind: action
  command: "21 89 01 50 4D 4C 4D {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_low_latency
  label: "Low Latency (PMLL)"
  kind: action
  command: "21 89 01 50 4D 4C 4C {code} 0A"
  params:
    - name: code
      type: string
      description: null  # UNRESOLVED: value table (Table 4-27) empty in source

- id: pm_clear_motion_drive
  label: "Clear Motion Drive (PMCM)"
  kind: action
  command: "21 89 01 50 4D 43 4D {code} 0A"
  params:
    - name: code
      type: enum
      values: ["3=Low", "4=High", "5=Inverse Telecine"]

- id: pm_motion_enhance
  label: "Motion Enhance (PMME)"
  kind: action
  command: "21 89 01 50 4D 4D 45 {code} 0A"
  params:
    - name: code
      type: enum
      values: ["1=Low", "2=High"]

- id: pm_lens_aperture
  label: "Lens Aperture (PMLA)"
  kind: action
  command: "21 89 01 50 4D 4C 41 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_lamp_power
  label: "Lamp Power (PMLP)"
  kind: action
  command: "21 89 01 50 4D 4C 50 {code} 0A"
  params:
    - name: code
      type: enum
      values: ["0=Normal", "1=High"]

- id: pm_8k_eshift
  label: "8K e-shift (PMUS)"
  kind: action
  command: "21 89 01 50 4D 55 53 {code} 0A"
  params:
    - name: code
      type: string
      description: null  # UNRESOLVED: value table (Table 4-31) empty in source; command only on RS3000/NX9/NX11/V9-class models

- id: pm_original_resolution
  label: "Original Resolution (PMRP)"
  kind: action
  command: "21 89 01 50 4D 52 50 {code} 0A"
  params:
    - name: code
      type: string
      description: "1 ASCII char switch value; code table not given in source"

- id: pm_graphic_mode
  label: "Graphic Mode (PMGM)"
  kind: action
  command: "21 89 01 50 4D 47 4D {code} 0A"
  params:
    - name: code
      type: enum
      values: ["0=Standard", "1=High-res"]

- id: pm_enhance
  label: "Enhance (PMEN)"
  kind: action
  command: "21 89 01 50 4D 45 4E {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_smoothing
  label: "Smoothing (PMST)"
  kind: action
  command: "21 89 01 50 4D 53 54 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: pm_name_edit_user1
  label: "Name Edit Picture Mode User1 (PMU1)"
  kind: action
  command: "21 89 01 50 4D 55 31 {name} 0A"
  params:
    - name: name
      type: string
      description: "10 ASCII characters (Special10)"

- id: pm_name_edit_user2
  label: "Name Edit Picture Mode User2 (PMU2)"
  kind: action
  command: "21 89 01 50 4D 55 32 {name} 0A"
  params:
    - name: name
      type: string
      description: "10 ASCII characters (Special10)"

- id: pm_name_edit_user3
  label: "Name Edit Picture Mode User3 (PMU3)"
  kind: action
  command: "21 89 01 50 4D 55 33 {name} 0A"
  params:
    - name: name
      type: string
      description: "10 ASCII characters (Special10)"

- id: pm_name_edit_user4
  label: "Name Edit Picture Mode User4 (PMU4)"
  kind: action
  command: "21 89 01 50 4D 55 34 {name} 0A"
  params:
    - name: name
      type: string
      description: "10 ASCII characters (Special10)"

- id: pm_name_edit_user5
  label: "Name Edit Picture Mode User5 (PMU5)"
  kind: action
  command: "21 89 01 50 4D 55 35 {name} 0A"
  params:
    - name: name
      type: string
      description: "10 ASCII characters (Special10)"

- id: pm_name_edit_user6
  label: "Name Edit Picture Mode User6 (PMU6)"
  kind: action
  command: "21 89 01 50 4D 55 36 {name} 0A"
  params:
    - name: name
      type: string
      description: "10 ASCII characters (Special10)"

- id: pm_auto_tone_mapping
  label: "Auto Tone Mapping (PMTM)"
  kind: action
  command: "21 89 01 50 4D 54 4D {code} 0A"
  params:
    - name: code
      type: string
      description: null  # UNRESOLVED: value table (Table 4-58) empty in source

- id: pm_mapping_level
  label: "Mapping Level (PMTL)"
  kind: action
  command: "21 89 01 50 4D 54 4C {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

# --- Input Signal (IS 49 53) ---
- id: is_hdmi_input_level
  label: "HDMI Input Level (ISIL)"
  kind: action
  command: "21 89 01 49 53 49 4C {code} 0A"
  params:
    - name: code
      type: enum
      values: ["0=Standard(16-235)", "1=Enhanced(0-255)", "2=Super White(16-255)", "3=Auto"]

- id: is_hdmi_color_space
  label: "HDMI Color Space (ISHS)"
  kind: action
  command: "21 89 01 49 53 48 53 {code} 0A"
  params:
    - name: code
      type: enum
      values: ["0=Auto", "1=YCbCr(4:4:4)", "2=YCbCr(4:2:2)", "3=RGB"]

- id: is_hdmi_2d3d
  label: "HDMI 2D/3D Switch (IS3D)"
  kind: action
  command: "21 89 01 49 53 33 44 {code} 0A"
  params:
    - name: code
      type: enum
      values: ["0=2D", "1=Auto", "3=Side By Side", "4=Top and Bottom"]

- id: is_hdmi_3d_phase
  label: "HDMI 3D Phase (IS3P)"
  kind: action
  command: "21 89 01 49 53 33 50 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: is_picture_position_horizontal
  label: "Picture Position Horizontal (ISPH)"
  kind: action
  command: "21 89 01 49 53 50 48 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: is_picture_position_vertical
  label: "Picture Position Vertical (ISPV)"
  kind: action
  command: "21 89 01 49 53 50 56 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: is_aspect
  label: "Aspect Switch (ISAS)"
  kind: action
  command: "21 89 01 49 53 41 53 {code} 0A"
  params:
    - name: code
      type: enum
      values: ["2=Zoom", "3=AUTO", "4=Native"]

- id: is_mask
  label: "Mask Switch (ISMA)"
  kind: action
  command: "21 89 01 49 53 4D 41 {code} 0A"
  params:
    - name: code
      type: enum
      values: ["2=Off"]

- id: is_mask_left
  label: "Mask Left (ISML)"
  kind: action
  command: "21 89 01 49 53 4D 4C {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit as 4 ASCII hex chars; effective only when Mask is Custom1-3"

- id: is_mask_right
  label: "Mask Right (ISMR)"
  kind: action
  command: "21 89 01 49 53 4D 52 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit as 4 ASCII hex chars; effective only when Mask is Custom1-3"

- id: is_mask_top
  label: "Mask Top (ISMT)"
  kind: action
  command: "21 89 01 49 53 4D 54 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit as 4 ASCII hex chars; effective only when Mask is Custom1-3"

- id: is_mask_bottom
  label: "Mask Bottom (ISMB)"
  kind: action
  command: "21 89 01 49 53 4D 42 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit as 4 ASCII hex chars; effective only when Mask is Custom1-3"

- id: is_parallax_3d
  label: "Parallax of 3D Conversion (ISLV)"
  kind: action
  command: "21 89 01 49 53 4C 56 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: is_crosstalk_cancel_white
  label: "Crosstalk Cancel White (ISCA)"
  kind: action
  command: "21 89 01 49 53 43 41 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

# --- Installation (IN 49 4E) ---
- id: in_focus_near
  label: "Focus Near (INFN)"
  kind: action
  command: "21 89 01 49 4E 46 4E {code} 0A"
  params:
    - name: code
      type: enum
      values: ["0=Stop", "1=Start"]

- id: in_focus_far
  label: "Focus Far (INFF)"
  kind: action
  command: "21 89 01 49 4E 46 46 {code} 0A"
  params:
    - name: code
      type: enum
      values: ["0=Stop", "1=Start"]

- id: in_zoom_tele
  label: "Zoom Tele (INZT)"
  kind: action
  command: "21 89 01 49 4E 5A 54 {code} 0A"
  params:
    - name: code
      type: enum
      values: ["0=Stop", "1=Start"]

- id: in_zoom_wide
  label: "Zoom Wide (INZW)"
  kind: action
  command: "21 89 01 49 4E 5A 57 {code} 0A"
  params:
    - name: code
      type: enum
      values: ["0=Stop", "1=Start"]

- id: in_shift_left
  label: "Shift Left (INSL)"
  kind: action
  command: "21 89 01 49 4E 53 4C {code} 0A"
  params:
    - name: code
      type: enum
      values: ["0=Stop", "1=Start"]

- id: in_shift_right
  label: "Shift Right (INSR)"
  kind: action
  command: "21 89 01 49 4E 53 52 {code} 0A"
  params:
    - name: code
      type: enum
      values: ["0=Stop", "1=Start"]

- id: in_shift_up
  label: "Shift Up (INSU)"
  kind: action
  command: "21 89 01 49 4E 53 55 {code} 0A"
  params:
    - name: code
      type: enum
      values: ["0=Stop", "1=Start"]

- id: in_shift_down
  label: "Shift Down (INSD)"
  kind: action
  command: "21 89 01 49 4E 53 44 {code} 0A"
  params:
    - name: code
      type: enum
      values: ["0=Stop", "1=Start"]

- id: in_focus_near_1shot
  label: "Focus Near One Shot (IN1N)"
  kind: action
  command: "21 89 01 49 4E 31 4E 0A"
  params: []

- id: in_focus_far_1shot
  label: "Focus Far One Shot (IN1F)"
  kind: action
  command: "21 89 01 49 4E 31 46 0A"
  params: []

- id: in_zoom_tele_1shot
  label: "Zoom Tele One Shot (IN1T)"
  kind: action
  command: "21 89 01 49 4E 31 54 0A"
  params: []

- id: in_zoom_wide_1shot
  label: "Zoom Wide One Shot (IN1W)"
  kind: action
  command: "21 89 01 49 4E 31 57 0A"
  params: []

- id: in_shift_left_1shot
  label: "Shift Left One Shot (IN1L)"
  kind: action
  command: "21 89 01 49 4E 31 4C 0A"
  params: []

- id: in_shift_right_1shot
  label: "Shift Right One Shot (IN1R)"
  kind: action
  command: "21 89 01 49 4E 31 52 0A"
  params: []

- id: in_shift_up_1shot
  label: "Shift Up One Shot (IN1U)"
  kind: action
  command: "21 89 01 49 4E 31 55 0A"
  params: []

- id: in_shift_down_1shot
  label: "Shift Down One Shot (IN1D)"
  kind: action
  command: "21 89 01 49 4E 31 44 0A"
  params: []

- id: in_image_pattern
  label: "Image Pattern Switch (INIP)"
  kind: action
  command: "21 89 01 49 4E 49 50 {code} 0A"
  params:
    - name: code
      type: string
      description: null  # UNRESOLVED: value table (Table 4-39) empty in source

- id: in_lens_lock
  label: "Lens Lock Switch (INLL)"
  kind: action
  command: "21 89 01 49 4E 4C 4C {code} 0A"
  params:
    - name: code
      type: string
      description: null  # UNRESOLVED: value table (Table 4-39) empty in source

- id: in_pixel_adjust_h_red
  label: "Pixel Adjust Horizontal Red (INXR)"
  kind: action
  command: "21 89 01 49 4E 58 52 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: in_pixel_adjust_h_blue
  label: "Pixel Adjust Horizontal Blue (INXB)"
  kind: action
  command: "21 89 01 49 4E 58 42 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: in_pixel_adjust_v_red
  label: "Pixel Adjust Vertical Red (INYR)"
  kind: action
  command: "21 89 01 49 4E 59 52 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: in_pixel_adjust_v_blue
  label: "Pixel Adjust Vertical Blue (INYB)"
  kind: action
  command: "21 89 01 49 4E 59 42 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: in_installation_style
  label: "Installation Style Switch (INIS)"
  kind: action
  command: "21 89 01 49 4E 49 53 {code} 0A"
  params:
    - name: code
      type: enum
      values: ["0=Front", "1=Ceiling Mount(F)", "2=Rear", "3=Ceiling Mount(R)"]

- id: in_keystone_vertical
  label: "Keystone Vertical (INKV)"
  kind: action
  command: "21 89 01 49 4E 4B 56 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: in_anamorphic
  label: "Anamorphic Switch (INVS)"
  kind: action
  command: "21 89 01 49 4E 56 53 {code} 0A"
  params:
    - name: code
      type: enum
      values: ["1=A", "2=B", "3=C"]

- id: in_screen_adjust_data
  label: "Screen Adjust Data (INSA)"
  kind: action
  command: "21 89 01 49 4E 53 41 {value} 0A"
  params:
    - name: value
      type: string
      description: "signed 16-bit value as 4 ASCII hex chars"

- id: in_screen_adjust_switch
  label: "Screen Adjust Switch (INSC)"
  kind: action
  command: "21 89 01 49 4E 53 43 {code} 0A"
  params:
    - name: code
      type: string
      description: null  # UNRESOLVED: value table (Table 4-39) empty in source

- id: in_panel_alignment_switch
  label: "Panel Alignment Switch (INPA)"
  kind: action
  command: "21 89 01 49 4E 50 41 {code} 0A"
  params:
    - name: code
      type: string
      description: null  # UNRESOLVED: value table (Table 4-42) empty in source

- id: in_installation_mode_load
  label: "Installation Mode Load / Lens Memory (INML)"
  kind: action
  command: "21 89 01 49 4E 4D 4C {code} 0A"
  params:
    - name: code
      type: enum
      description: "Special9 lens memory parameter; reference form returns 3 bytes"
      values: ["0=Mode1", "1=Mode2", "2=Mode3", "3=Mode4", "4=Mode5", "5=Mode6", "6=Mode7", "7=Mode8", "8=Mode9", "9=Mode10"]

- id: in_name_edit_mode1
  label: "Name Edit Installation Mode 1 (INM1)"
  kind: action
  command: "21 89 01 49 4E 4D 31 {name} 0A"
  params:
    - name: name
      type: string
      description: "10 ASCII characters (Special10)"

- id: in_name_edit_mode2
  label: "Name Edit Installation Mode 2 (INM2)"
  kind: action
  command: "21 89 01 49 4E 4D 32 {name} 0A"
  params:
    - name: name
      type: string
      description: "10 ASCII characters (Special10)"

- id: in_name_edit_mode3
  label: "Name Edit Installation Mode 3 (INM3)"
  kind: action
  command: "21 89 01 49 4E 4D 33 {name} 0A"
  params:
    - name: name
      type: string
      description: "10 ASCII characters (Special10)"

- id: in_name_edit_mode4
  label: "Name Edit Installation Mode 4 (INM4)"
  kind: action
  command: "21 89 01 49 4E 4D 34 {name} 0A"
  params:
    - name: name
      type: string
      description: "10 ASCII characters (Special10)"

- id: in_name_edit_mode5
  label: "Name Edit Installation Mode 5 (INM5)"
  kind: action
  command: "21 89 01 49 4E 4D 35 {name} 0A"
  params:
    - name: name
      type: string
      description: "10 ASCII characters (Special10)"

- id: in_name_edit_mode6
  label: "Name Edit Installation Mode 6 (INM6)"
  kind: action
  command: "21 89 01 49 4E 4D 36 {name} 0A"
  params:
    - name: name
      type: string
      description: "10 ASCII characters (Special10)"

- id: in_name_edit_mode7
  label: "Name Edit Installation Mode 7 (INM7)"
  kind: action
  command: "21 89 01 49 4E 4D 37 {name} 0A"
  params:
    - name: name
      type: string
      description: "10 ASCII characters (Special10)"

- id: in_name_edit_mode8
  label: "Name Edit Installation Mode 8 (INM8)"
  kind: action
  command: "21 89 01 49 4E 4D 38 {name} 0A"
  params:
    - name: name
      type: string
      description: "10 ASCII characters (Special10)"

- id: in_name_edit_mode9
  label: "Name Edit Installation Mode 9 (INM9)"
  kind: action
  command: "21 89 01 49 4E 4D 39 {name} 0A"
  params:
    - name: name
      type: string
      description: "10 ASCII characters (Special10)"

- id: in_name_edit_mode10
  label: "Name Edit Installation Mode 10 (INMA)"
  kind: action
  command: "21 89 01 49 4E 4D 41 {name} 0A"
  params:
    - name: name
      type: string
      description: "10 ASCII characters (Special10)"

- id: in_high_altitude
  label: "High Altitude Mode Switch (INHA)"
  kind: action
  command: "21 89 01 49 4E 48 41 {code} 0A"
  params:
    - name: code
      type: string
      description: null  # UNRESOLVED: value table (Table 4-43) empty in source

# --- Display Setup (DS 44 53) ---
- id: ds_back_color
  label: "Back Color Switch (DSBC)"
  kind: action
  command: "21 89 01 44 53 42 43 {code} 0A"
  params:
    - name: code
      type: enum
      values: ["0=Blue", "1=Black"]

- id: ds_menu_position
  label: "Menu Position Switch (DSMP)"
  kind: action
  command: "21 89 01 44 53 4D 50 {code} 0A"
  params:
    - name: code
      type: enum
      values: ["0=Left-Top", "1=Right-Top", "2=Center", "3=Left-Bottom", "4=Right-Bottom", "5=Left", "6=Right"]

- id: ds_source_display
  label: "Source Display Switch (DSSD)"
  kind: action
  command: "21 89 01 44 53 53 44 {code} 0A"
  params:
    - name: code
      type: string
      description: null  # UNRESOLVED: value table (Table 4-46) empty in source

- id: ds_logo
  label: "Logo Switch (DSLO)"
  kind: action
  command: "21 89 01 44 53 4C 4F {code} 0A"
  params:
    - name: code
      type: string
      description: null  # UNRESOLVED: value table (Table 4-46) empty in source

- id: ds_language
  label: "Language Switch (DSLA)"
  kind: action
  command: "21 89 01 44 53 4C 41 {code} 0A"
  params:
    - name: code
      type: enum
      values: ["0=Japanese", "1=English", "2=German", "3=Spanish", "4=Italian", "5=French", "6=Portuguese", "7=Dutch", "8=Polski", "9=Norwegian", "A=Russian", "B=Chinese(Simplified)", "C=Chinese(Traditional)"]

# --- Function (FU 46 55) ---
- id: fu_trigger
  label: "Trigger Switch (FUTR)"
  kind: action
  command: "21 89 01 46 55 54 52 {code} 0A"
  params:
    - name: code
      type: enum
      values: ["0=Off", "1=Power", "2=Anamo", "3=Inst.1", "4=Inst.2", "5=Inst.3", "6=Inst.4", "7=Inst.5", "8=Inst.6", "9=Inst.7", "A=Inst.8", "B=Inst.9", "C=Inst.10"]

- id: fu_off_timer
  label: "Off Timer Switch (FUOT)"
  kind: action
  command: "21 89 01 46 55 4F 54 {code} 0A"
  params:
    - name: code
      type: enum
      values: ["1=1 Hour", "2=2 Hours", "3=3 Hours", "4=4 Hours"]

- id: fu_eco_mode
  label: "Eco Mode Switch (FUEM)"
  kind: action
  command: "21 89 01 46 55 45 4D {code} 0A"
  params:
    - name: code
      type: string
      description: null  # UNRESOLVED: value table (Table 4-50) empty in source

- id: fu_control4
  label: "Control4 Switch (FUCF)"
  kind: action
  command: "21 89 01 46 55 43 46 {code} 0A"
  params:
    - name: code
      type: string
      description: null  # UNRESOLVED: value table (Table 4-51) empty in source

# --- Information queries (IF 49 46, reference only) ---
- id: if_input_display
  label: "Input Display Query (IFIN)"
  kind: query
  command: "3F 89 01 49 46 49 4E 0A"
  params: []

- id: if_source_display
  label: "Source Display Query (IFIS)"
  kind: query
  command: "3F 89 01 49 46 49 53 0A"
  params: []
  # response: 2-char resolution code per source Table 4-53 (480p=02 ... WQXGA=32)

- id: if_horizontal_resolution
  label: "Horizontal Resolution Query (IFRH)"
  kind: query
  command: "3F 89 01 49 46 52 48 0A"
  params: []

- id: if_vertical_resolution
  label: "Vertical Resolution Query (IFRV)"
  kind: query
  command: "3F 89 01 49 46 52 56 0A"
  params: []

- id: if_horizontal_frequency
  label: "Horizontal Frequency Query (IFFH)"
  kind: query
  command: "3F 89 01 49 46 46 48 0A"
  params: []
  # response value = actual frequency x 100 (6398 = 63.98 kHz)

- id: if_vertical_frequency
  label: "Vertical Frequency Query (IFFV)"
  kind: query
  command: "3F 89 01 49 46 46 56 0A"
  params: []
  # response value = actual frequency x 100

- id: if_deep_color
  label: "Deep Color Query (IFDC)"
  kind: query
  command: "3F 89 01 49 46 44 43 0A"
  params: []
  # response: 0=8bit 1=10bit 2=12bit

- id: if_colorspace
  label: "Colorspace Query (IFXV)"
  kind: query
  command: "3F 89 01 49 46 58 56 0A"
  params: []
  # response: 0=RGB 1=YUV

- id: if_lamp_time
  label: "Lamp Time Query (IFLT)"
  kind: query
  command: "3F 89 01 49 46 4C 54 0A"
  params: []

- id: if_software_version
  label: "Software Version Query (IFSV)"
  kind: query
  command: "3F 89 01 49 46 53 56 0A"
  params: []
  # response: 6 ASCII chars (Special14), e.g. 03-005

- id: if_colorimetry
  label: "Colorimetry Query (IFCM)"
  kind: query
  command: "3F 89 01 49 46 43 4D 0A"
  params: []
  # response: 0=No Data 1=BT.601 2=BT.709 3=xvYCC601 4=xvYCC709 5=sYCC601 6=Adobe YCC601 7=Adobe RGB 8=BT.2020CL 9=BT.2020NCL A=Other

- id: if_hdr
  label: "HDR Query (IFHR)"
  kind: query
  command: "3F 89 01 49 46 48 52 0A"
  params: []
  # response: 0=SDR 1=HDR 2=SMPTE ST 2084 F=None

- id: if_max_cll
  label: "Max CLL Query (IFMC)"
  kind: query
  command: "3F 89 01 49 46 4D 43 0A"
  params: []

- id: if_max_fall
  label: "Max FALL Query (IFMF)"
  kind: query
  command: "3F 89 01 49 46 4D 46 0A"
  params: []

# --- LAN setup (LS 4C 53) ---
- id: lan_dhcp_set
  label: "DHCP Client Set (LSDS)"
  kind: action
  command: "21 89 01 4C 53 44 53 {code} 0A"
  params:
    - name: code
      type: enum
      values: ["0=Off(Static)", "1=On"]

- id: lan_dhcp_query
  label: "DHCP Client Query (LSDS?)"
  kind: query
  command: "3F 89 01 4C 53 44 53 0A"
  params: []

- id: lan_ip_set
  label: "IP Address Set (LSIP)"
  kind: action
  command: "21 89 01 4C 53 49 50 {addr} 0A"
  params:
    - name: addr
      type: string
      description: "4 bytes as 8 ASCII hex chars, e.g. C0A8010A = 192.168.1.10; only when DHCP Off; effective after network reboot"

- id: lan_ip_query
  label: "IP Address Query (LSIP?)"
  kind: query
  command: "3F 89 01 4C 53 49 50 0A"
  params: []

- id: lan_subnet_set
  label: "Subnet Mask Set (LSSM)"
  kind: action
  command: "21 89 01 4C 53 53 4D {mask} 0A"
  params:
    - name: mask
      type: string
      description: "4 bytes as 8 ASCII hex chars; only when DHCP Off"

- id: lan_subnet_query
  label: "Subnet Mask Query (LSSM?)"
  kind: query
  command: "3F 89 01 4C 53 53 4D 0A"
  params: []

- id: lan_gateway_set
  label: "Default Gateway Set (LSDG)"
  kind: action
  command: "21 89 01 4C 53 44 47 {addr} 0A"
  params:
    - name: addr
      type: string
      description: "4 bytes as 8 ASCII hex chars; only when DHCP Off"

- id: lan_gateway_query
  label: "Default Gateway Query (LSDG?)"
  kind: query
  command: "3F 89 01 4C 53 44 47 0A"
  params: []

- id: lan_mac_query
  label: "MAC Address Query (LSMA)"
  kind: query
  command: "3F 89 01 4C 53 4D 41 0A"
  params: []

- id: lan_reboot
  label: "Network Reboot (LSRS)"
  kind: action
  command: "21 89 01 4C 53 52 53 31 0A"
  params: []

- id: lan_port_set
  label: "Control Port Set (LSPT)"
  kind: action
  command: "21 89 01 4C 53 50 54 {port} 0A"
  params:
    - name: port
      type: string
      description: "port number as 4 ASCII hex chars, e.g. 2710 = 10000; effective regardless of network reboot"

- id: lan_port_query
  label: "Control Port Query (LSPT?)"
  kind: query
  command: "3F 89 01 4C 53 50 54 0A"
  params: []
```

## Feedbacks
```yaml
- id: ack
  type: raw
  description: "ACK frame 06 89 01 <echoed command bytes> 0A returned when command reception is normal; no response (NACK absent) when invalid, ignored, or during user operation"

- id: power_state
  type: enum
  description: "response to PW query, '@' frame data byte"
  values: [standby, lampon, cooling, reserved, emergency]
  # codes: 0=Standby 1=LampOn 2=Cooling 3=Reserved 4=Emergency

- id: input_state
  type: enum
  description: "response to IP query"
  values: [hdmi1, hdmi2]
  # codes: 6=HDMI-1 7=HDMI-2

- id: signal_status
  type: enum
  description: "response to SC query"
  values: [no_signal_or_out_of_range, signal_available]
  # codes: 0=No signal or out of range 1=Available signal input

- id: model_status
  type: string
  description: "response to MD query, 14 bytes ASCII 'ILAFPJ -- XHR' + tier char (1=NX9-class, 2=NX7-class, 3=NX5-class incl. N5/N6)"

- id: query_response
  type: raw
  description: "generic reference response frame 40 89 01 <command+subcommand> <data> 0A; data format per command's data type (Numeric 4 ASCII hex / Special 1 char / Special2 512 binary / Special4 2 chars / Special10 10 chars / Special14 6 chars)"
```

## Variables
```yaml
# All settable parameters in this protocol are discrete framed commands (see Actions).
# UNRESOLVED: no additional settable parameters outside Actions documented in source
```

## Events
```yaml
# No unsolicited notifications documented in source; projector only responds to commands.
```

## Macros
```yaml
# No multi-step sequences documented in source beyond two-phase gamma/panel data transfer
# (command frame -> ACK -> 512/256 raw bytes -> ACK), captured in Actions.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Only one lens motor (focus/zoom/shift) can be driven at a time; requests while another motor is driving are rejected; motor stops automatically at its limit (source note *3)"
  - "Gamma data, panel alignment data, adjustment, and source asking commands are ignored without response when projector is not powered on"
  - "Gamma data commands ignored unless gamma table is Custom1/2/3; data larger than 512 bytes (gamma) or 256 bytes (panel alignment) judged invalid with no response"
  - "Power-ON operation in power cooling state may be ignored depending on projector state"
```

## Notes
- Source: JVCKENWOOD Corp. Projector Division, "D-ILA Projector External Command Communication Specification Ver. 1.2", 9/Oct/2018, Document No. PJ09020002B. Covers DLA-RS3000/NX9/NX11/V9R, DLA-RS2000/NX7/N8/V7, DLA-RS1000/NX5/N6/N5/V5 series.
- Frame = Header + UnitID(0x89 0x01 fixed, individual code fixed 0x01) + Command(2 ASCII) + Data + End(0x0A). Headers: '!'(0x21) operation, '?'(0x3F) reference, '@'(0x40) response, 0x06 ACK. All bytes ASCII-coded except gamma (512B) and panel alignment (256B) binary payloads.
- Controller must wait for ACK (matching unit ID + command) before sending next command. Timeout/retry specs are controller-dependent (not specified).
- If byte interval is blank >= 50 ms, transmit-receive sequence is initialized (received data discarded). Wrong unit ID, undefined header/command, or undefined parameter: silently ignored.
- Reference command during user operation: ACK returned immediately, '@' response sent after user operation completes. Operation command during user operation: no response.
- Power commands in same state are ignored (e.g. power-ON while already ON does nothing).
- Numeric parameters: signed 16-bit value as 4 ASCII hex chars

## Provenance

```yaml
source_domains:
  - us.jvc.com
  - support.jvc.com
source_urls:
  - http://www.us.jvc.com/projectors/pdf/2018_ILA-FPJ_Ext_Command_List_v1.2.pdf
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
retrieved_at: 2026-09-02T20:42:53.067Z
last_checked_at: 2026-09-11T22:19:16.562Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-11T22:19:16.562Z
matched_actions: 187
action_count: 187
confidence: medium
summary: "All 187 spec actions trace to source command/subcommand tables (3.5, 4-18, 4-62); transport parameters match section 3.1; bidirectional coverage ≈ 187/189 ≥ 0.99. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "PMSV (isf save)"
- "PMIE (isf Adjust mode)"
- "PMLD (isf load)"
- "Special15 HDR10/HLG Picture Mode data"
- "ANMO-trigger detailed mapping"
- "default TCP control port not stated in source (an example exchange shows a unit set to 20554); LAN transport section of the vendor doc (connection procedure over TCP) not included in the refined source text"
- "default control port not stated in source; source example shows a unit configured with 20554 (settable via LSPT command)"
- "command 53 53 listed in source command table but no sub-commands or payload documented in source"
- "value table (Table 4-26) empty in source"
- "value table (Table 4-27) empty in source"
- "value table (Table 4-31) empty in source; command only on RS3000/NX9/NX11/V9-class models"
- "value table (Table 4-58) empty in source"
- "value table (Table 4-39) empty in source"
- "value table (Table 4-42) empty in source"
- "value table (Table 4-43) empty in source"
- "value table (Table 4-46) empty in source"
- "value table (Table 4-50) empty in source"
- "value table (Table 4-51) empty in source"
- "no additional settable parameters outside Actions documented in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
