---
spec_id: admin/avocation-systems-hx-1616had-r
schema_version: ai4av-public-spec-v1
revision: 1
title: "Avocation Systems HX-1616HAD/R Control Spec"
manufacturer: "Avocation Systems"
model_family: HX-1616HAD/R
aliases: []
compatible_with:
  manufacturers:
    - "Avocation Systems"
  models:
    - HX-1616HAD/R
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - snapav.com
  - avace.com
source_urls:
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/ManualsAndGuides/AV-HX-8X8-HA-16_Manual.pdf
  - https://www.avace.com/pdf/HX-1616-HDBT_PDF.pdf
retrieved_at: 2026-05-19T22:17:09.303Z
last_checked_at: 2026-06-02T21:40:22.021Z
generated_at: 2026-06-02T21:40:22.021Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source documents commands only; full power-on sequencing, voltage/current specs, and fault-recovery behavior are not specified."
  - "source does not separately enumerate a \"variables\" concept;"
  - "source describes only request/response commands. No unsolicited"
  - "source does not document any multi-step command sequences or"
  - "source does not document safety warnings, power-on sequencing,"
  - "firmware version compatibility not stated in source; voltage/current/power specs not stated; fault and error-recovery behavior not stated; the Z50/Z51 vs Z61/Z62/Z63 discrepancy should be resolved against a physical unit before relying on either."
verification:
  verdict: verified
  checked_at: 2026-06-02T21:40:22.021Z
  matched_actions: 83
  action_count: 83
  confidence: medium
  summary: "All 83 spec commands matched verbatim in source; transport parameters verified; coverage is complete. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Avocation Systems HX-1616HAD/R Control Spec

## Summary
The HX-1616HAD/R is a 16x16 HDMI/audio/digital matrix switcher. The source document is the IP (TCP) and RS-232 control command reference for the HX series, listing audio/digital/video/A-V routing commands, level (volume, balance, sensitivity, mute) commands, status queries, configuration commands, and HDMI/EDID read commands. All commands are ASCII terminated with `<CR>` and follow the framing `MX{xx}<opcode><params>` where `xx` is the 2-digit unit ID (default `00`).

<!-- UNRESOLVED: source documents commands only; full power-on sequencing, voltage/current specs, and fault-recovery behavior are not specified. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9760
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - routable       (inferred: audio/digital/video/A-V routing commands)
# - levelable      (inferred: volume, balance, sensitivity, mute commands)
# - queryable      (inferred: SA/SD/SV/SB/SAA status queries and Z* read commands)
# - configurable   (inferred: Z20/Z64-Z71 read/set commands for baud rate and IP settings)
```

## Actions
```yaml
# All commands are ASCII, terminated with <CR>, and follow the framing:
#   MX{xx}{opcode}{params}<CR>
# where {xx} is the 2-digit unit ID (default 00).
#
# Placeholders used in command templates below:
#   xx = unit ID (2 digits, default 00)
#   ii = input number (2 digits, 01-16)
#   oo = output number (2 digits, 01-16)
#   yy = level/value data (2 digits for levels; variable-length dotted-quad for IP)
#   y  = optional single-value flag
#   f  = debug interface flag (S, U, or T)
#   <CR> = carriage return (0x0D) - included verbatim per source examples.

# ---------- Audio routing ----------
- id: audio_route_input_to_output
  label: Audio route input to output
  kind: action
  command: "MX{xx}A{ii}{oo}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: ii
      type: integer
      description: Input number (2 digits)
    - name: oo
      type: integer
      description: Output number (2 digits)
- id: audio_route_input_to_multiple_outputs
  label: Audio route input to multiple outputs
  kind: action
  command: "MX{xx}A{ii}{o1,o2,o3,o4,o5,o6,o7,o8,o9,o10}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: ii
      type: integer
      description: Input number (2 digits)
    - name: outputs
      type: string
      description: Comma-separated output list (up to 10 outputs)
- id: audio_route_input_to_all_outputs
  label: Audio route input to all outputs
  kind: action
  command: "MX{xx}AA{ii}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: ii
      type: integer
      description: Input number (2 digits)
- id: audio_set_balance
  label: Audio set balance for output
  kind: action
  command: "MX{xx}AB{oo}{yy}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: oo
      type: integer
      description: Output number (2 digits)
    - name: yy
      type: integer
      description: Balance value 00-99 (00=full left, 49=center, 99=full right)
- id: audio_set_balance_all_outputs
  label: Audio set balance for all outputs
  kind: action
  command: "MX{xx}ABA{yy}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: yy
      type: integer
      description: Balance value 00-99 (00=full left, 49=center, 98=full right per source typo)
- id: audio_output_off
  label: Audio output off
  kind: action
  command: "MX{xx}AF{oo}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: oo
      type: integer
      description: Output number (2 digits)
- id: audio_mute
  label: Audio mute output
  kind: action
  command: "MX{xx}AM{oo}{y}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: oo
      type: integer
      description: Output number (2 digits)
    - name: y
      type: integer
      description: Optional mute state (0=off, 1=on); omit to toggle
- id: audio_mute_all
  label: Audio mute all outputs
  kind: action
  command: "MX{xx}AMA{y}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: y
      type: integer
      description: Mute state (0=off, 1=on)
- id: audio_set_sensitivity
  label: Audio set input sensitivity
  kind: action
  command: "MX{xx}AP{ii}{yy}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: ii
      type: integer
      description: Input number (2 digits)
    - name: yy
      type: integer
      description: Sensitivity 00-48 (32=0dB pass-through, 0.5dB steps)
- id: audio_set_sensitivity_all
  label: Audio set sensitivity for all inputs
  kind: action
  command: "MX{xx}APA{yy}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: yy
      type: integer
      description: Sensitivity 00-48 (32=0dB pass-through, 0.5dB steps)
- id: audio_set_volume
  label: Audio set output volume
  kind: action
  command: "MX{xx}AU{oo}{yy}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: oo
      type: integer
      description: Output number (2 digits)
    - name: yy
      type: integer
      description: Volume 00-48 (00=-64dB min, 32=0dB pass, 48=+32dB max)
- id: audio_set_volume_all
  label: Audio set volume for all outputs
  kind: action
  command: "MX{xx}AUA{yy}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: yy
      type: integer
      description: Volume 00-48 (00=-64dB min, 32=0dB pass, 48=+32dB max)
- id: audio_volume_step_up
  label: Audio step volume up
  kind: action
  command: "MX{xx}AY{oo}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: oo
      type: integer
      description: Output number (2 digits)
- id: audio_volume_step_down
  label: Audio step volume down
  kind: action
  command: "MX{xx}AZ{oo}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: oo
      type: integer
      description: Output number (2 digits)
- id: audio_volume_step_up_all
  label: Audio step volume up all outputs
  kind: action
  command: "MX{xx}AYA<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
- id: audio_volume_step_down_all
  label: Audio step volume down all outputs
  kind: action
  command: "MX{xx}AZA<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)

# ---------- Audio status queries ----------
- id: audio_route_status
  label: Audio route status query
  kind: query
  command: "MX{xx}SA{oo}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: oo
      type: integer
      description: Output number (2 digits); omit to query all
- id: audio_all_status
  label: Audio all-items status query
  kind: query
  command: "MX{xx}SAA<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
- id: audio_balance_status
  label: Audio balance status query
  kind: query
  command: "MX{xx}SAB{oo}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: oo
      type: integer
      description: Output number (2 digits); omit to query all
- id: audio_mute_status
  label: Audio mute status query
  kind: query
  command: "MX{xx}SAM{oo}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: oo
      type: integer
      description: Output number (2 digits); omit to query all
- id: audio_sensitivity_status
  label: Audio sensitivity status query
  kind: query
  command: "MX{xx}SAP{ii}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: ii
      type: integer
      description: Input number (2 digits); omit to query all
- id: audio_volume_status
  label: Audio volume status query
  kind: query
  command: "MX{xx}SAU{oo}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: oo
      type: integer
      description: Output number (2 digits); omit to query all
- id: audio_set_max_volume_z50
  label: Set maximum volume for output (Z50 mnemonic per summary)
  kind: action
  command: "MX{xx}Z50{oo}{yy}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: oo
      type: integer
      description: Output number (2 digits)
    - name: yy
      type: integer
      description: Max volume 00-48
- id: audio_read_max_volume_z51
  label: Read maximum volume (Z51 mnemonic per summary)
  kind: query
  command: "MX{xx}Z51{oo}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: oo
      type: integer
      description: Output number (2 digits)
- id: audio_set_max_volume_z61
  label: Set maximum volume for output (Z61 per detail)
  kind: action
  command: "MX{xx}Z61{oo}{yy}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: oo
      type: integer
      description: Output number (2 digits)
    - name: yy
      type: integer
      description: Max volume 00-48
- id: audio_read_max_volume_z62
  label: Read maximum volume for output (Z62 per detail)
  kind: query
  command: "MX{xx}Z62{oo}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: oo
      type: integer
      description: Output number (2 digits)
- id: audio_read_max_volume_all_z63
  label: Read maximum volume for all outputs (Z63)
  kind: query
  command: "MX{xx}Z63<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)

# ---------- Digital audio routing ----------
- id: digital_route_input_to_output
  label: Digital audio route input to output
  kind: action
  command: "MX{xx}D{ii}{oo}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: ii
      type: integer
      description: Input number (2 digits)
    - name: oo
      type: integer
      description: Output number (2 digits)
- id: digital_route_input_to_multiple_outputs
  label: Digital audio route input to multiple outputs
  kind: action
  command: "MX{xx}D{ii}{o1,o2,o3,o4,o5,o6,o7,o8,o9,o10}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: ii
      type: integer
      description: Input number (2 digits)
    - name: outputs
      type: string
      description: Comma-separated output list (up to 10)
- id: digital_route_input_to_all_outputs
  label: Digital audio route input to all outputs
  kind: action
  command: "MX{xx}DA{ii}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: ii
      type: integer
      description: Input number (2 digits)
- id: digital_output_off
  label: Digital audio output off
  kind: action
  command: "MX{xx}DF{oo}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: oo
      type: integer
      description: Output number (2 digits)
- id: digital_route_status
  label: Digital audio route status query
  kind: query
  command: "MX{xx}SD{oo}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: oo
      type: integer
      description: Output number (2 digits); omit to query all
- id: digital_select_with_analog
  label: Set/Read digital switches with analog
  kind: action
  command: "MX{xx}Z53{y}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: y
      type: integer
      description: 0=does not switch with analog, 1=switches with analog; omit to read
- id: digital_select_with_video
  label: Set/Read digital switches with video
  kind: action
  command: "MX{xx}Z54{y}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: y
      type: integer
      description: 0=does not switch with video, 1=switches with video; omit to read

# ---------- Video routing ----------
- id: video_route_input_to_output
  label: Video route input to output
  kind: action
  command: "MX{xx}V{ii}{oo}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: ii
      type: integer
      description: Input number (2 digits)
    - name: oo
      type: integer
      description: Output number (2 digits)
- id: video_route_input_to_multiple_outputs
  label: Video route input to multiple outputs
  kind: action
  command: "MX{xx}V{ii}{o1,o2,o3,o4,o5,o6,o7,o8,o9,o10}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: ii
      type: integer
      description: Input number (2 digits)
    - name: outputs
      type: string
      description: Comma-separated output list (up to 10)
- id: video_route_input_to_all_outputs
  label: Video route input to all outputs
  kind: action
  command: "MX{xx}VA{ii}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: ii
      type: integer
      description: Input number (2 digits)
- id: video_output_off
  label: Video output off
  kind: action
  command: "MX{xx}VF{oo}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: oo
      type: integer
      description: Output number (2 digits)
- id: video_route_status
  label: Video route status query
  kind: query
  command: "MX{xx}SV{oo}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: oo
      type: integer
      description: Output number (2 digits); omit to query all

# ---------- A/V (combined) routing ----------
- id: av_route_input_to_output
  label: A/V route input to output
  kind: action
  command: "MX{xx}B{ii}{oo}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: ii
      type: integer
      description: Input number (2 digits)
    - name: oo
      type: integer
      description: Output number (2 digits)
- id: av_route_input_to_multiple_outputs
  label: A/V route input to multiple outputs
  kind: action
  command: "MX{xx}B{ii}{o1,o2,o3,o4,o5,o6,o7,o8,o9,o10}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: ii
      type: integer
      description: Input number (2 digits)
    - name: outputs
      type: string
      description: Comma-separated output list (up to 10)
- id: av_route_input_to_all_outputs
  label: A/V route input to all outputs
  kind: action
  command: "MX{xx}BA{ii}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: ii
      type: integer
      description: Input number (2 digits)
- id: av_output_off
  label: A/V output off
  kind: action
  command: "MX{xx}BF{oo}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: oo
      type: integer
      description: Output number (2 digits)
- id: av_straight_through
  label: A/V straight through (route input i to output i for all)
  kind: action
  command: "MX{xx}BS<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
- id: av_route_status
  label: A/V route status query
  kind: query
  command: "MX{xx}SB{oo}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: oo
      type: integer
      description: Output number (2 digits); omit to query all

# ---------- General status ----------
- id: general_all_status
  label: All status returned
  kind: query
  command: "MX{xx}S<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)

# ---------- Misc ----------
- id: misc_reboot
  label: Reboot matrix (soft reboot)
  kind: action
  command: "MX{xx}Z98<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
- id: misc_search_for_unit
  label: Search for matrix on bus
  kind: query
  command: "MX{xx}Z99<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)

# ---------- Configuration read/set ----------
- id: cfg_read_audio_inputs
  label: Read how many audio inputs installed
  kind: query
  command: "MX{xx}Z01<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
- id: cfg_read_video_inputs
  label: Read how many video inputs installed
  kind: query
  command: "MX{xx}Z02<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
- id: cfg_read_audio_outputs
  label: Read how many audio outputs installed
  kind: query
  command: "MX{xx}Z03<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
- id: cfg_read_video_outputs
  label: Read how many video outputs installed
  kind: query
  command: "MX{xx}Z04<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
- id: cfg_read_option_flags
  label: Read option flags
  kind: query
  command: "MX{xx}Z05<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
- id: cfg_read_hardware_type
  label: Read hardware type (model number)
  kind: query
  command: "MX{xx}Z06<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
- id: cfg_read_hardware_code
  label: Read hardware code
  kind: query
  command: "MX{xx}Z07<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
- id: cfg_read_hardware_revision
  label: Read hardware revision
  kind: query
  command: "MX{xx}Z08<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
- id: cfg_read_software_revision
  label: Read software revision
  kind: query
  command: "MX{xx}Z09<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
- id: cfg_read_serial_number
  label: Read serial number
  kind: query
  command: "MX{xx}Z10<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
- id: cfg_read_mfg_date
  label: Read date of manufacture
  kind: query
  command: "MX{xx}Z11<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
- id: cfg_front_panel_control
  label: Read/Set front panel control status
  kind: action
  command: "MX{xx}Z13{y}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: y
      type: integer
      description: Omit to read; 0=disable (lock), 1=enable (unlock, default)
- id: cfg_serial_baud_rate
  label: Read/Set serial baud rate
  kind: action
  command: 'MX{xx}Z20"{baud}"<CR>'
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: baud
      type: string
      description: Quoted baud rate string; omit quotes to read. Valid: 4800, 9600, 19200, 38400, 57600, 115200
- id: cfg_ip_address
  label: Read/Set matrix IP address
  kind: action
  command: "MX{xx}Z64{xxx.xxx.xxx.xxx}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: address
      type: string
      description: Dotted-quad IP address; omit to read current
- id: cfg_ip_netmask
  label: Read/Set matrix IP netmask
  kind: action
  command: "MX{xx}Z65{xxx.xxx.xxx.xxx}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: netmask
      type: string
      description: Dotted-quad netmask; omit to read current
- id: cfg_ip_gateway
  label: Read/Set matrix IP gateway
  kind: action
  command: "MX{xx}Z66{xxx.xxx.xxx.xxx}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: gateway
      type: string
      description: Dotted-quad gateway; omit to read current
- id: cfg_primary_dns
  label: Read/Set primary DNS
  kind: action
  command: "MX{xx}Z67{xxx.xxx.xxx.xxx}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: dns
      type: string
      description: Dotted-quad primary DNS; omit to read current
- id: cfg_secondary_dns
  label: Read/Set secondary DNS
  kind: action
  command: "MX{xx}Z68{xxx.xxx.xxx.xxx}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: dns
      type: string
      description: Dotted-quad secondary DNS; omit to read current
- id: cfg_read_mac_address
  label: Read MAC address
  kind: query
  command: "MX{xx}Z69<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
- id: cfg_reset_ethernet_defaults
  label: Reset matrix Ethernet configuration to default
  kind: action
  command: "MX{xx}Z70<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
- id: cfg_read_current_ethernet
  label: Read current operating Ethernet settings
  kind: query
  command: "MX{xx}Z71<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
- id: cfg_hdmi_debug_level
  label: Set HDMI debug level
  kind: action
  command: "MX{xx}Z72{f}{yy}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: f
      type: string
      description: Interface flag: S=Serial, U=USB, T=Telnet
    - name: yy
      type: integer
      description: Debug level: 00=off, 01=on

# ---------- HDMI status / debug ----------
- id: hdmi_read_software_version
  label: Read HDMI software version
  kind: query
  command: "MX{xx}H01<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
- id: hdmi_read_software_release
  label: Read HDMI software release
  kind: query
  command: "MX{xx}H02<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
- id: hdmi_read_software_release_revision
  label: Read HDMI software release revision
  kind: query
  command: "MX{xx}H03<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
- id: hdmi_read_input_port_software_version
  label: Read HDMI input port processor software version
  kind: query
  command: "MX{xx}H04S<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
- id: hdmi_read_output_port_software_version
  label: Read HDMI output port processor software version
  kind: query
  command: "MX{xx}H04Z<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
- id: hdmi_read_input_port_software_release
  label: Read HDMI input port processor software release
  kind: query
  command: "MX{xx}H05S<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
- id: hdmi_read_output_port_software_release
  label: Read HDMI output port processor software release
  kind: query
  command: "MX{xx}H05Z<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
- id: hdmi_read_input_port_software_release_rev
  label: Read HDMI input port processor software release revision
  kind: query
  command: "MX{xx}H06S<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
- id: hdmi_read_output_port_software_release_rev
  label: Read HDMI output port processor software release revision
  kind: query
  command: "MX{xx}H06Z<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
- id: hdmi_read_source_port_input_status
  label: Read source port input A/V status (HIS)
  kind: query
  command: "MX{xx}HIS{ii}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: ii
      type: integer
      description: Input port number
- id: hdmi_read_zone_port_input_status_hos
  label: Read zone port input A/V status (HOS)
  kind: query
  command: "MX{xx}HOS{oo}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: oo
      type: integer
      description: Output number (per source example, despite description typo)
- id: hdmi_read_zone_port_input_status_hiz
  label: Read zone port input A/V status (HIZ)
  kind: query
  command: "MX{xx}HIZ{ii}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: ii
      type: integer
      description: Input port number
- id: hdmi_read_zone_port_output_status
  label: Read zone port output A/V status (HOZ)
  kind: query
  command: "MX{xx}HOZ{oo}<CR>"
  params:
    - name: xx
      type: string
      description: Unit ID (2 digits, default 00)
    - name: oo
      type: integer
      description: Output port number
```

## Feedbacks
```yaml
- id: audio_route
  type: string
  description: "Response format: MX{xx}-Audio={ii} to {oo}<CR>"
- id: audio_balance
  type: string
  description: "Response format: MX{xx}-Balance {oo} set to {yy}<CR>"
- id: audio_mute
  type: enum
  values: [muted, unmuted]
  description: "Response format: MX{xx}-Output {oo} is Muted<CR> (per-output)"
- id: audio_sensitivity
  type: string
  description: "Response format: MX{xx}-Sensitivity {ii} set to {yy}<CR>"
- id: audio_volume
  type: string
  description: "Response format: MX{xx}-Volume {oo} to {yy}<CR>"
- id: audio_max_volume
  type: string
  description: "Response format: MX{xx}-Max Out Level for {oo} = {yy}<CR>"
- id: digital_route
  type: string
  description: "Response format: MX{xx}-Digital={ii} to {oo}<CR>"
- id: video_route
  type: string
  description: "Response format: MX{xx}-Video={ii} to {oo}<CR>"
- id: av_route
  type: string
  description: "Response format: MX{xx}-A/V={ii} to {oo}<CR>"
- id: digital_with_analog
  type: enum
  values: [disconnected, connected]
  description: "Response: MX{xx}-Digital will not switch with audio<CR> or its positive equivalent"
- id: digital_with_video
  type: enum
  values: [disconnected, connected]
  description: "Response: MX{xx}-Digital will switch with video<CR> or its negative equivalent"
- id: rs232_baud_rate
  type: integer
  description: "Response: MX{xx}-RS-232 baud = {value}<CR>"
- id: ip_address
  type: string
  description: "Response: MX{xx}-IP Address is {a.b.c.d}<CR>"
- id: ip_netmask
  type: string
  description: "Response: MX{xx}-IP Netmask is {a.b.c.d}<CR>"
- id: ip_gateway
  type: string
  description: "Response: MX{xx}-IP Gateway is {a.b.c.d}<CR>"
- id: primary_dns
  type: string
  description: "Response: MX{xx}-Primary DNS is {a.b.c.d}<CR>"
- id: secondary_dns
  type: string
  description: "Response: MX{xx}-Secondary DNS is {a.b.c.d}<CR>"
- id: mac_address
  type: string
  description: "Response: MX{xx}-MAC Address is {xx:xx:xx:xx:xx:xx}<CR>"
- id: hardware_revision
  type: string
  description: "Response: MX{xx}-Hardware revision = {version}<CR> (example: 1.000)"
- id: software_revision
  type: string
  description: "Response: MX{xx}-Software revision = {version}<CR> (example: 1.000)"
- id: serial_number
  type: string
  description: "Response: MX{xx}-Serial No. = {value}<CR> (example: HX11A1000)"
- id: mfg_date
  type: string
  description: "Response: MX{xx}-Date Mfg. = {mm/dd/yy}<CR> (example: 01/01/12)"
- id: audio_input_count
  type: integer
  description: "Response: MX{xx}-Audio inputs = {yy}<CR>"
- id: video_input_count
  type: integer
  description: "Response: MX{xx}-Video inputs = {yy}<CR>"
- id: front_panel_control
  type: enum
  values: [locked, unlocked]
  description: "Response: MX{xx}-Front Panel is locked<CR> or MX{xx}-Front Panel is unlocked<CR>"
- id: hdmi_software_version
  type: string
  description: "Response: MX{xx}-Software Version: {nnn}<CR> (example: 017)"
- id: hdmi_software_release
  type: string
  description: "Response: MX{xx}-Software Release: {nnn}<CR> (example: 008)"
- id: hdmi_software_release_rev
  type: string
  description: "Response: MX{xx}-Software Release Rev: {nnn}<CR> (example: 016)"
- id: hdmi_input_port_software_version
  type: string
  description: "Response: MX{xx}-Input Port Processor - Software Version: {nnn}<CR>"
- id: hdmi_output_port_software_version
  type: string
  description: "Response: MX{xx}-Output Port Processor - Software Version: {nnn}<CR>"
- id: hdmi_input_port_software_release
  type: string
  description: "Response: MX{xx}-Input Port Processor - Software Release: {nnn}<CR>"
- id: hdmi_output_port_software_release
  type: string
  description: "Response: MX{xx}-Output Port Processor - Software Release: {nnn}<CR>"
- id: hdmi_input_port_software_release_rev
  type: string
  description: "Response: MX{xx}-Input Port Processor - Software Release Rev: {nnn}<CR>"
- id: hdmi_output_port_software_release_rev
  type: string
  description: "Response: MX{xx}-Output Port Processor - Software Release Rev: {nnn}<CR>"
- id: hdmi_input_av_status
  type: string
  description: "Response: MX{xx}-OK<CR> followed by MX{xx}-HDMI {edid-hex}<CR>"
- id: unit_alive
  type: enum
  values: [ok, missing]
  description: "Response to Z99 search: MX{xx}-OK<CR>"
- id: debug_level_status
  type: string
  description: "Response to Z72: MX{xx}-Serial Debug Level is {nn}<CR>, MX{xx}-USB Debug Level is {nn}<CR>, MX{xx}-Telnet Debug Level is {nn}<CR>"
```

## Variables
```yaml
# Settable parameters are exposed via discrete action commands (Z64-Z71, Z20, Z72, Z13).
# No implicit "variables" beyond what the action commands already parameterize.
# UNRESOLVED: source does not separately enumerate a "variables" concept;
# the action commands cover IP, baud rate, DNS, front-panel lock, and debug level.
```

## Events
```yaml
# UNRESOLVED: source describes only request/response commands. No unsolicited
# notification mechanism (no async status pushes, no heartbeat, no async events)
# is documented in the source.
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step command sequences or
# named macros; routing is performed via the per-input/per-output action
# commands listed above.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, power-on sequencing,
# interlock procedures, or fault-recovery behavior.
```

## Notes
- Default Ethernet: IP `192.168.0.75`, TCP port `9760`. Default serial: `19200` baud, 8N1. Both transports use the same ASCII command set terminated with `<CR>`.
- Unit ID is a 2-digit field `xx` in every command (default `00`); to address a different unit on a multi-drop RS-232 bus, change the leading two digits (e.g. `MX01A0103<CR>` for unit 01).
- The source has an internal inconsistency in the maximum-volume commands: the command summary lists `Z50` (set) and `Z51` (read), while the detailed command table lists `Z61` (set), `Z62` (read single), and `Z63` (read all). Both sets are populated above; the `Z50/Z51` pair should be treated as suspect until validated against a real unit.
- Multi-output routing commands list up to 8 outputs in the source summary header, but the detailed description and worked example for the audio variant routes to 10 outputs (`MX00A0101,02,03,04,05,06,07,08,09,10`). The detailed text is taken as authoritative; maximum outputs per multi-route command is 10 per the source text.
- `MXxxHOSii` source description says "Read Zone Port Input A/V Status" with parameter `oo`, but the worked example uses `MX00HOS01` with `oo` syntax; spec follows the example.
- Balance range typo: the source states `yy=99 full right` in the per-output table but `yy=98 full right` in the all-outputs table; the all-outputs value (98) is the smaller of the two and likely a typo. Spec lists both ranges verbatim.
- `Z20` (baud rate set) uses a quoted-argument form `MX{xx}Z20"{baud}"<CR>` per the source's worked example. The quoted form is unusual vs. the bare-argument form used elsewhere.
- `Z70` and `Z71` appear to share response payloads in the source (both return the full Ethernet config block); spec treats them as separate commands per the source's table layout.
<!-- UNRESOLVED: firmware version compatibility not stated in source; voltage/current/power specs not stated; fault and error-recovery behavior not stated; the Z50/Z51 vs Z61/Z62/Z63 discrepancy should be resolved against a physical unit before relying on either. -->

## Provenance

```yaml
source_domains:
  - snapav.com
  - avace.com
source_urls:
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/ManualsAndGuides/AV-HX-8X8-HA-16_Manual.pdf
  - https://www.avace.com/pdf/HX-1616-HDBT_PDF.pdf
retrieved_at: 2026-05-19T22:17:09.303Z
last_checked_at: 2026-06-02T21:40:22.021Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:40:22.021Z
matched_actions: 83
action_count: 83
confidence: medium
summary: "All 83 spec commands matched verbatim in source; transport parameters verified; coverage is complete. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source documents commands only; full power-on sequencing, voltage/current specs, and fault-recovery behavior are not specified."
- "source does not separately enumerate a \"variables\" concept;"
- "source describes only request/response commands. No unsolicited"
- "source does not document any multi-step command sequences or"
- "source does not document safety warnings, power-on sequencing,"
- "firmware version compatibility not stated in source; voltage/current/power specs not stated; fault and error-recovery behavior not stated; the Z50/Z51 vs Z61/Z62/Z63 discrepancy should be resolved against a physical unit before relying on either."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
