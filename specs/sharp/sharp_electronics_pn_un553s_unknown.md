---
spec_id: admin/sharp-electronics-pn-un553s
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp Electronics PN-UN553S Control Spec"
manufacturer: Sharp
model_family: PN-UN553S
aliases: []
compatible_with:
  manufacturers:
    - Sharp
    - "Sharp Electronics"
  models:
    - PN-UN553S
    - PN-UN553V
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - smj.jp.sharp
  - business.sharpusa.com
source_urls:
  - https://smj.jp.sharp/bs/lcd-display/lineup/pnun/download_files/pn-un553s_un553v_external_control_jp.pdf
  - https://business.sharpusa.com/large-format-displays/models/details/pn-un553s
  - https://smj.jp.sharp/bs/lcd-display/lineup/pnun/
retrieved_at: 2026-08-05T06:52:50.556Z
last_checked_at: 2026-10-07T12:50:33.175Z
generated_at: 2026-10-07T12:50:33.175Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - CTL-CA19
  - CTL-CA1A
  - CTL-CA0A-01
  - "hardware verification and firmware compatibility range not provided."
  - "flow control not stated in source"
  - "transport authentication requirements not stated; absence of an authentication procedure does not establish auth.type none."
  - "serial flow-control setting not stated."
  - "firmware compatibility range not stated."
verification:
  verdict: verified
  checked_at: 2026-10-07T12:50:33.175Z
  matched_actions: 304
  action_count: 304
  confidence: medium
  summary: "All 304 spec action units match source CTL and VCP codes with correct shapes and transport values; only 3 table-only references (CA19, CA1A, CA0A-01) lack spec entries. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-05
---

# Sharp Electronics PN-UN553S Control Spec

## Summary

Sharp PN-UN553S and PN-UN553V LCD monitors support external control over RS-232C and TCP/IP. Both transports use ASCII VCP and CTL packets containing a header, message, XOR block check code, and carriage-return delimiter.

<!-- UNRESOLVED: hardware verification and firmware compatibility range not provided. -->

## Transport

```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  # UNRESOLVED: flow control not stated in source
auth:
  type: UNRESOLVED  # Source does not state transport authentication requirements.
```

CTL `command` strings below represent message payloads, not complete wire packets. Serialize each CTL request as: raw SOH (`01h`), Reserved (`30h`), one destination-address byte, controller Source (`30h`), message type A (`41h`), two ASCII hexadecimal digits encoding the message length, raw STX (`02h`), the expanded command payload, raw ETX (`03h`), one raw BCC byte, and raw CR (`0Dh`). Message length counts all bytes from STX through ETX inclusive. Compute BCC by XOR of the serialized bytes from Reserved through ETX inclusive. The destination comes from `destination_address`; no default destination is specified. Monitor IDs 1 through 100 map to destination bytes `40h + ID`; groups A through J map to `31h` through `3Ah`; all monitors use `2Ah`. These are single wire bytes, not hexadecimal text.

CTL replies use the same framing with Destination `30h`, the responding monitor's address as Source, and message type B (`42h`). Decode the reply payload according to its command-specific layout rather than treating every CTL reply as a VCP parameter reply.

## Traits

```yaml
- powerable  # inferred from power control commands
- queryable  # inferred from status query commands
- routable  # inferred from input-selection commands
- levelable  # inferred from level-setting commands
```

## Actions

```yaml
- id: get_vcp_parameter
  label: Get VCP Parameter
  kind: query
  command: "SOH-'0'-{destination}-'0'-'C'-'0'-'6'-STX-{op_page_hi}-{op_page_lo}-{op_code_hi}-{op_code_lo}-ETX-{bcc}-CR"
  params:
    - name: destination
      type: string
      description: Monitor or group destination address
    - name: op_page
      type: string
      description: Two ASCII hexadecimal digits
    - name: op_code
      type: string
      description: Two ASCII hexadecimal digits
    - name: bcc
      type: string
      description: XOR of bytes from Reserved through ETX

- id: set_vcp_parameter
  label: Set VCP Parameter
  kind: action
  command: "SOH-'0'-{destination}-'0'-'E'-'0'-'A'-STX-{op_page_hi}-{op_page_lo}-{op_code_hi}-{op_code_lo}-{value_msb}...{value_lsb}-ETX-{bcc}-CR"
  params:
    - name: destination
      type: string
      description: Monitor or group destination address
    - name: op_page
      type: string
      description: Two ASCII hexadecimal digits
    - name: op_code
      type: string
      description: Two ASCII hexadecimal digits
    - name: value
      type: integer
      description: 16-bit value encoded as four ASCII hexadecimal digits
    - name: bcc
      type: string
      description: XOR of bytes from Reserved through ETX

- id: save_current_settings
  label: Save Current Settings
  kind: action
  command: "0C"
  description: CTL payload; apply the Transport framing with message type A and length 04. The type B reply has length 06 and payload 000C.
  params: []

- id: get_timing_report
  label: Get Timing Report
  kind: query
  command: "07"
  description: CTL payload; apply the Transport framing with message type A and length 04. The type B reply has length 0E and payload 4E followed by status, horizontal frequency, and vertical frequency.
  params: []

- id: power_status_read
  label: Power Status Read
  kind: query
  command: "01D6"
  description: CTL payload; apply the Transport framing and calculate message length from STX through ETX. Decode the type B reply using the power_state layout; its documented message length is 12.
  params: []

- id: power_control
  label: Power Control
  kind: action
  command: "C203D6{power_mode}"
  params:
    - name: power_mode
      type: enum
      values:
        "0001": on
        "0004": standby

- id: date_time_read
  label: Date and Time Read
  kind: query
  command: "C211"
  params: []

- id: date_time_write
  label: Date and Time Write
  kind: action
  command: "C212{year}{month}{day}{weekday}{hour}{minute}00"
  params:
    - name: year
      type: string
      description: Two ASCII hexadecimal digits representing year offset from 2000
    - name: month
      type: string
      description: Two ASCII hexadecimal digits
    - name: day
      type: string
      description: Two ASCII hexadecimal digits
    - name: weekday
      type: string
      description: 00 Sunday through 06 Saturday
    - name: hour
      type: string
      description: Two ASCII hexadecimal digits
    - name: minute
      type: string
      description: Two ASCII hexadecimal digits

- id: time_zone_read
  label: Time Zone Read
  kind: query
  command: "C230"
  params: []

- id: time_zone_write
  label: Time Zone Write
  kind: action
  command: "C231{time_zone}"
  params:
    - name: time_zone
      type: string
      description: 00 through 30, representing UTC -12:00 through UTC +12:00 in 30-minute steps

- id: time_server_read
  label: Time Server Read
  kind: query
  command: "C21A"
  params: []

- id: time_server_write
  label: Time Server Write
  kind: action
  command: "C21B{enabled}{server_name}"
  params:
    - name: enabled
      type: enum
      values:
        "00": off
        "01": on
    - name: server_name
      type: string
      description: Time-server name, maximum 32 characters

- id: schedule_read
  label: Schedule Read
  kind: query
  command: "C23D{program}"
  params:
    - name: program
      type: string
      description: 00 through 0D for program 1 through 14

- id: schedule_write
  label: Schedule Write
  kind: action
  command: "C23E{program}{event}{hour}{minute}{input}{weekdays}{type}{picture_mode}{year}{month}{day}{execution_order}{extension1}{extension2}{extension3}"
  params:
    - name: program
      type: string
      description: 00 through 0D for program 1 through 14
    - name: event
      type: enum
      values:
        "01": power_on
        "02": power_off
    - name: hour
      type: string
    - name: minute
      type: string
    - name: input
      type: string
    - name: weekdays
      type: string
      description: Bit field, Monday bit 0 through Sunday bit 6
    - name: type
      type: string
      description: Weekly, enabled, and date-specific bit field
    - name: picture_mode
      type: string
      description: Unsupported; source specifies reserved field
    - name: year
      type: string
    - name: month
      type: string
    - name: day
      type: string
    - name: execution_order
      type: string
      description: Unsupported; source specifies reserved field
    - name: extension1
      type: string
      description: Must be 00
    - name: extension2
      type: string
      description: Must be 00
    - name: extension3
      type: string
      description: Must be 00

- id: self_diagnosis_status_read
  label: Self-Diagnosis Status Read
  kind: query
  command: "B1"
  params: []

- id: serial_number_read
  label: Serial Number Read
  kind: query
  command: "C216"
  params: []

- id: model_name_read
  label: Model Name Read
  kind: query
  command: "C217"
  params: []

- id: security_lock_control
  label: Security Lock Control
  kind: action
  command: "C21D{mode}{digit1}{digit2}{digit3}{digit4}"
  params:
    - name: mode
      type: enum
      values:
        "00": disabled
        "01": startup_lock
        "02": control_lock
        "03": both_lock
    - name: digit1
      type: integer
      minimum: 0
      maximum: 9
    - name: digit2
      type: integer
      minimum: 0
      maximum: 9
    - name: digit3
      type: integer
      minimum: 0
      maximum: 9
    - name: digit4
      type: integer
      minimum: 0
      maximum: 9

- id: mac_address_read
  label: MAC Address Read
  kind: query
  command: "C22000"
  params: []

- id: daylight_saving_read
  label: Daylight Saving Rules Read
  kind: query
  command: "CA0100"
  params: []

- id: daylight_saving_write
  label: Daylight Saving Rules Write
  kind: action
  command: "CA0101{start_month}{start_week}{start_weekday}{start_hour}{start_minute}{end_month}{end_week}{end_weekday}{end_hour}{end_minute}{offset}"
  params:
    - name: start_month
      type: string
    - name: start_week
      type: string
    - name: start_weekday
      type: string
    - name: start_hour
      type: string
    - name: start_minute
      type: string
    - name: end_month
      type: string
    - name: end_week
      type: string
    - name: end_weekday
      type: string
    - name: end_hour
      type: string
    - name: end_minute
      type: string
    - name: offset
      type: enum
      values:
        "00": "+01:00"
        "01": "+00:30"
        "02": "-00:30"
        "03": "-01:00"

- id: daylight_saving_enable_read
  label: Daylight Saving Enable Read
  kind: query
  command: "CA0102"
  params: []

- id: daylight_saving_enable_write
  label: Daylight Saving Enable Write
  kind: action
  command: "CA0103{enabled}"
  params:
    - name: enabled
      type: enum
      values:
        "00": off
        "01": on

- id: firmware_version_read
  label: Firmware Version Read
  kind: query
  command: "CA0200"
  params: []

- id: input_name_read
  label: Input Name Read
  kind: query
  command: "CA0400"
  params: []

- id: input_name_write
  label: Input Name Write
  kind: action
  command: "CA0401{input_name}"
  params:
    - name: input_name
      type: string
      description: Maximum 14 characters, each byte encoded as two ASCII hexadecimal digits

- id: input_name_reset
  label: Input Name Reset
  kind: action
  command: "CA0402"
  params: []

- id: proof_of_play_mode
  label: Set Proof of Play Operation Mode
  kind: action
  command: "CA1500{mode}"
  params:
    - name: mode
      type: enum
      values:
        "00": stop
        "01": start
        "02": clear_log

- id: proof_of_play_current
  label: Get Current Proof of Play Log
  kind: query
  command: "CA1501"
  params: []

- id: proof_of_play_status
  label: Get Proof of Play Status
  kind: query
  command: "CA1502"
  params: []

- id: proof_of_play_range
  label: Get Proof of Play Range
  kind: query
  command: "CA1503{start_number}{end_number}"
  params:
    - name: start_number
      type: string
      description: Four ASCII hexadecimal digits
    - name: end_number
      type: string
      description: Four ASCII hexadecimal digits

- id: power_save_mode_read
  label: Power Save Mode Read
  kind: query
  command: "CA0B00"
  params: []

- id: power_save_mode_write
  label: Power Save Mode Write
  kind: action
  command: "CA0B01{mode}"
  params:
    - name: mode
      type: enum
      values:
        "00": auto_power_save
        "02": power_save_disabled

- id: auto_power_save_time_read
  label: Auto Power Save Time Read
  kind: query
  command: "CA0B02"
  params: []

- id: auto_power_save_time_write
  label: Auto Power Save Time Write
  kind: action
  command: "CA0B03{interval}"
  params:
    - name: interval
      type: string
      description: 01 through 78, representing 5 through 600 seconds in five-second steps

- id: pd_security_enable_read
  label: PD Security Enable Read
  kind: query
  command: "CA0C02"
  params: []

- id: shipment_flag_read
  label: Shipment Flag Read
  kind: query
  command: "CA0D00"
  params: []

- id: schedule_enable_read
  label: Schedule Enable Read
  kind: query
  command: "CA0E00"
  params: []

- id: terminal_list_read
  label: Get Terminal List
  kind: query
  command: "CA0F00"
  params: []

- id: firmware_revision_read
  label: Firmware Revision Read
  kind: query
  command: "C03F"
  params: []

- id: auto_tile_matrix_execute
  label: Auto Tile Matrix Execute
  kind: action
  command: "CA0301{horizontal}{vertical}{pattern}{input}{save_mode}{displayport_mode}"
  params:
    - name: horizontal
      type: string
    - name: vertical
      type: string
    - name: pattern
      type: string
    - name: input
      type: string
    - name: save_mode
      type: enum
      values:
        "00": common
        "01": per_input
    - name: displayport_mode
      type: enum
      values:
        "00": not_applicable
        "01": "1.1a"
        "02": "1.2"

- id: auto_tile_matrix_complete_notify
  label: Auto Tile Matrix Complete Notify
  kind: action
  command: "CA0302{result}"
  params:
    - name: result
      type: enum
      values:
        "00": no_error
        "01": error

- id: auto_tile_matrix_reset
  label: Auto Tile Matrix Reset
  kind: action
  command: "CA0303"
  params: []

- id: auto_tile_matrix_monitors_read
  label: Auto Tile Matrix Monitors Read
  kind: query
  command: "CA0304"
  params: []

- id: auto_tile_matrix_monitors_write
  label: Auto Tile Matrix Monitors Write
  kind: action
  command: "CA0305{horizontal}{vertical}"
  params:
    - name: horizontal
      type: string
      description: 00 through 0A
    - name: vertical
      type: string
      description: 00 through 0A

- id: lock_settings_read
  label: Lock Settings Read
  kind: query
  command: "CA32"
  params: []

- id: lock_settings_write
  label: Lock Settings Write
  kind: action
  command: "CA33{select}{mode}{power}{volume}{minimum_volume}{maximum_volume}{input}"
  params:
    - name: select
      type: enum
      values:
        "00": keys
        "01": infrared
        "02": keys_and_infrared
    - name: mode
      type: enum
      values:
        "00": unlock
        "01": custom_lock
        "02": all_lock
    - name: power
      type: string
    - name: volume
      type: string
    - name: minimum_volume
      type: string
    - name: maximum_volume
      type: string
    - name: input
      type: string

- id: frame_lock_read
  label: Frame Lock Read
  kind: query
  command: "CA3400"
  params: []

- id: frame_lock_write
  label: Frame Lock Write
  kind: action
  command: "CA3401{mode}"
  params:
    - name: mode
      type: enum
      values:
        "00": off
        "01": on
        "02": auto

- id: auto_id_extended_execute
  label: Auto ID Extended Execute
  kind: action
  command: "CA0A05"
  params: []

- id: auto_id_extended_apply
  label: Auto ID Extended Apply
  kind: action
  command: "CA0A06"
  params: []

- id: auto_id_extended_status
  label: Auto ID Extended Status
  kind: query
  command: "CA0A07"
  params: []

- id: auto_id_extended_reset
  label: Auto ID Extended Reset
  kind: action
  command: "CA0A08"
  params: []

- id: auto_id_reset_item_set
  label: Auto ID Reset Item Set
  kind: action
  command: "CA0A0B{function_type}"
  params:
    - name: function_type
      type: enum
      values:
        "00": monitor_id
        "01": ip_address
        "02": monitor_id_and_ip_address

- id: auto_id_reset_item_get
  label: Auto ID Reset Item Get
  kind: query
  command: "CA0A0C"
  params: []

- id: auto_id_item_set
  label: Auto ID Item Set
  kind: action
  command: "CA0A0E{function_type}{ip1}{ip2}{ip3}01{base_number}"
  params:
    - name: function_type
      type: enum
      values:
        "00": monitor_id
        "01": ip_address
        "02": monitor_id_and_ip_address
    - name: ip1
      type: string
    - name: ip2
      type: string
    - name: ip3
      type: string
    - name: base_number
      type: string
      description: 01 through 63

- id: auto_id_item_get
  label: Auto ID Item Get
  kind: query
  command: "CA0A0F"
  params: []

- id: vcp_input_source
  label: Input Source Select
  kind: action
  command: "VCP-00-60"
  params:
    - name: value
      type: string
      description: "0001 VGA, 0003 DVI, 0005 Video1, 000C DVD/HD1, 000D OPTION, 000F DisplayPort1, 0010 DisplayPort2, 0011 HDMI1, 0012 HDMI2, 0087 MP, or 0088 COMPUTE MODULE"

- id: vcp_picture_mode
  label: Picture Mode
  kind: action
  command: "VCP-02-1A"
  params:
    - name: value
      type: string

- id: vcp_backlight
  label: Backlight
  kind: action
  command: "VCP-00-10"
  params:
    - name: value
      type: integer
      minimum: 0
      maximum: 100

- id: vcp_brightness
  label: Brightness
  kind: action
  command: "VCP-00-92"
  params:
    - name: value
      type: integer
      minimum: 0
      maximum: 100

- id: vcp_gamma
  label: Gamma
  kind: action
  command: "VCP-02-68"
  params:
    - name: value
      type: string

- id: vcp_auto_hdr_select
  label: Auto HDR Select
  kind: action
  command: "VCP-11-B2"
  params:
    - name: value
      type: enum
      values:
        "0001": on
        "0002": off

- id: vcp_color_saturation_y
  label: Color Saturation Y
  kind: action
  command: "VCP-02-1F"
  params:
    - name: value
      type: integer
      minimum: 0
      maximum: 100

- id: vcp_color_saturation
  label: Color Saturation
  kind: action
  command: "VCP-00-8A"
  params:
    - name: value
      type: integer
      minimum: 0
      maximum: 100

- id: vcp_color_temperature_increment
  label: Color Temperature Increment
  kind: action
  command: "VCP-00-0C"
  params:
    - name: value
      type: string

- id: vcp_color_temperature_kelvin
  label: Color Temperature Kelvin
  kind: action
  command: "VCP-00-54"
  params:
    - name: value
      type: string
      description: 0000 through 004A representing 2600 K through 10000 K in 100 K steps

- id: vcp_color_temperature_preset
  label: Color Temperature Preset
  kind: action
  command: "VCP-00-14"
  params:
    - name: value
      type: string

- id: vcp_red_gain
  label: Red Gain
  kind: action
  command: "VCP-00-16"
  params:
    - name: value
      type: string
      description: 0000 through 00FF

- id: vcp_green_gain
  label: Green Gain
  kind: action
  command: "VCP-00-18"
  params:
    - name: value
      type: string
      description: 0000 through 00FF

- id: vcp_blue_gain
  label: Blue Gain
  kind: action
  command: "VCP-00-1A"
  params:
    - name: value
      type: string
      description: 0000 through 00FF

- id: vcp_color_control_red
  label: Color Control Red
  kind: action
  command: "VCP-00-9B"
  params:
    - name: value
      type: string

- id: vcp_color_control_yellow
  label: Color Control Yellow
  kind: action
  command: "VCP-00-9C"
  params:
    - name: value
      type: string

- id: vcp_color_control_green
  label: Color Control Green
  kind: action
  command: "VCP-00-9D"
  params:
    - name: value
      type: string

- id: vcp_color_control_cyan
  label: Color Control Cyan
  kind: action
  command: "VCP-00-9E"
  params:
    - name: value
      type: string

- id: vcp_color_control_blue
  label: Color Control Blue
  kind: action
  command: "VCP-00-9F"
  params:
    - name: value
      type: string

- id: vcp_color_control_magenta
  label: Color Control Magenta
  kind: action
  command: "VCP-00-A0"
  params:
    - name: value
      type: string

- id: vcp_hue
  label: Hue
  kind: action
  command: "VCP-00-90"
  params:
    - name: value
      type: integer
      minimum: 0
      maximum: 100

- id: vcp_contrast
  label: Contrast
  kind: action
  command: "VCP-00-12"
  params:
    - name: value
      type: integer
      minimum: 0
      maximum: 100

- id: vcp_sve_picture_mode
  label: SpectraView Picture Mode
  kind: action
  command: "VCP-10-50"
  params:
    - name: value
      type: string

- id: vcp_sve_preset
  label: SpectraView Preset
  kind: action
  command: "VCP-10-51"
  params:
    - name: value
      type: string

- id: vcp_luminance
  label: Luminance
  kind: action
  command: "VCP-02-B3"
  params:
    - name: value
      type: string
      description: 0014 through 03E8, representing 20 through 1000

- id: vcp_black
  label: Black
  kind: action
  command: "VCP-10-54"
  params:
    - name: value
      type: string
      description: 0000 through 0032

- id: vcp_custom_value
  label: Custom Value
  kind: action
  command: "VCP-02-E8"
  params:
    - name: value
      type: string

- id: vcp_system_gamma
  label: System Gamma
  kind: action
  command: "VCP-11-B8"
  params:
    - name: value
      type: string

- id: vcp_peak_luminance
  label: Peak Luminance
  kind: action
  command: "VCP-11-B9"
  params:
    - name: value
      type: string

- id: vcp_white_x
  label: White X
  kind: action
  command: "VCP-10-52"
  params:
    - name: value
      type: string

- id: vcp_white_y
  label: White Y
  kind: action
  command: "VCP-10-53"
  params:
    - name: value
      type: string

- id: vcp_red_x
  label: Red X
  kind: action
  command: "VCP-10-55"
  params:
    - name: value
      type: string

- id: vcp_red_y
  label: Red Y
  kind: action
  command: "VCP-10-56"
  params:
    - name: value
      type: string

- id: vcp_green_x
  label: Green X
  kind: action
  command: "VCP-10-57"
  params:
    - name: value
      type: string

- id: vcp_green_y
  label: Green Y
  kind: action
  command: "VCP-10-58"
  params:
    - name: value
      type: string

- id: vcp_blue_x
  label: Blue X
  kind: action
  command: "VCP-10-59"
  params:
    - name: value
      type: string

- id: vcp_blue_y
  label: Blue Y
  kind: action
  command: "VCP-10-5A"
  params:
    - name: value
      type: string

- id: vcp_3d_lut_emulation
  label: 3D LUT Emulation
  kind: action
  command: "VCP-10-69"
  params:
    - name: value
      type: string

- id: vcp_color_vision_emulation
  label: Color Vision Emulation
  kind: action
  command: "VCP-10-5B"
  params:
    - name: value
      type: string

- id: vcp_red_saturation
  label: Red Saturation
  kind: action
  command: "VCP-02-12"
  params:
    - name: value
      type: string

- id: vcp_yellow_saturation
  label: Yellow Saturation
  kind: action
  command: "VCP-02-13"
  params:
    - name: value
      type: string

- id: vcp_green_saturation
  label: Green Saturation
  kind: action
  command: "VCP-02-14"
  params:
    - name: value
      type: string

- id: vcp_cyan_saturation
  label: Cyan Saturation
  kind: action
  command: "VCP-02-15"
  params:
    - name: value
      type: string

- id: vcp_blue_saturation
  label: Blue Saturation
  kind: action
  command: "VCP-02-16"
  params:
    - name: value
      type: string

- id: vcp_magenta_saturation
  label: Magenta Saturation
  kind: action
  command: "VCP-02-17"
  params:
    - name: value
      type: string

- id: vcp_red_brightness
  label: Red Brightness
  kind: action
  command: "VCP-02-F1"
  params:
    - name: value
      type: string

- id: vcp_yellow_brightness
  label: Yellow Brightness
  kind: action
  command: "VCP-02-F2"
  params:
    - name: value
      type: string

- id: vcp_green_brightness
  label: Green Brightness
  kind: action
  command: "VCP-02-F3"
  params:
    - name: value
      type: string

- id: vcp_cyan_brightness
  label: Cyan Brightness
  kind: action
  command: "VCP-02-F4"
  params:
    - name: value
      type: string

- id: vcp_blue_brightness
  label: Blue Brightness
  kind: action
  command: "VCP-02-F5"
  params:
    - name: value
      type: string

- id: vcp_magenta_brightness
  label: Magenta Brightness
  kind: action
  command: "VCP-02-F6"
  params:
    - name: value
      type: string

- id: vcp_uniformity
  label: Uniformity
  kind: action
  command: "VCP-02-EE"
  params:
    - name: value
      type: string

- id: vcp_sharpness
  label: Sharpness
  kind: action
  command: "VCP-00-87"
  params:
    - name: value
      type: string

- id: vcp_sharpness_alternate
  label: Sharpness Alternate
  kind: action
  command: "VCP-00-8C"
  params:
    - name: value
      type: string

- id: vcp_uhd_upscaling
  label: UHD Upscaling
  kind: action
  command: "VCP-11-09"
  params:
    - name: value
      type: string

- id: vcp_auto_setup
  label: Auto Setup
  kind: action
  command: "VCP-00-1E"
  params:
    - name: value
      type: string
      description: "0001 executes operation"

- id: vcp_auto_adjust_status
  label: Auto Adjust Status
  kind: query
  command: "VCP-10-B7"
  params: []

- id: vcp_horizontal_position
  label: Horizontal Position
  kind: action
  command: "VCP-00-20"
  params:
    - name: value
      type: string

- id: vcp_vertical_position
  label: Vertical Position
  kind: action
  command: "VCP-00-30"
  params:
    - name: value
      type: string

- id: vcp_clock_frequency
  label: Clock Frequency
  kind: action
  command: "VCP-00-0E"
  params:
    - name: value
      type: string

- id: vcp_phase
  label: Phase
  kind: action
  command: "VCP-00-3E"
  params:
    - name: value
      type: string

- id: vcp_horizontal_resolution
  label: Horizontal Resolution
  kind: query
  command: "VCP-02-50"
  params: []

- id: vcp_vertical_resolution
  label: Vertical Resolution
  kind: query
  command: "VCP-02-51"
  params: []

- id: vcp_color_system
  label: Color System
  kind: action
  command: "VCP-02-21"
  params:
    - name: value
      type: string

- id: vcp_input_resolution
  label: Input Resolution
  kind: action
  command: "VCP-02-DA"
  params:
    - name: value
      type: string

- id: vcp_aspect
  label: Aspect
  kind: action
  command: "VCP-02-70"
  params:
    - name: value
      type: string

- id: vcp_zoom
  label: Zoom
  kind: action
  command: "VCP-02-6F"
  params:
    - name: value
      type: string

- id: vcp_zoom_horizontal
  label: Zoom Horizontal
  kind: action
  command: "VCP-02-6C"
  params:
    - name: value
      type: string

- id: vcp_zoom_vertical
  label: Zoom Vertical
  kind: action
  command: "VCP-02-6D"
  params:
    - name: value
      type: string

- id: vcp_zoom_h_position
  label: Zoom Horizontal Position
  kind: action
  command: "VCP-02-CC"
  params:
    - name: value
      type: string

- id: vcp_zoom_v_position
  label: Zoom Vertical Position
  kind: action
  command: "VCP-02-CD"
  params:
    - name: value
      type: string

- id: vcp_overscan
  label: Overscan
  kind: action
  command: "VCP-02-E3"
  params:
    - name: value
      type: string

- id: vcp_deinterlace
  label: Deinterlace
  kind: action
  command: "VCP-02-25"
  params:
    - name: value
      type: string

- id: vcp_noise_reduction
  label: Noise Reduction
  kind: action
  command: "VCP-02-20"
  params:
    - name: value
      type: string

- id: vcp_telecine
  label: Telecine
  kind: action
  command: "VCP-02-23"
  params:
    - name: value
      type: string

- id: vcp_adaptive_contrast
  label: Adaptive Contrast
  kind: action
  command: "VCP-02-8D"
  params:
    - name: value
      type: string

- id: vcp_advanced_uniformity
  label: Advanced Uniformity
  kind: action
  command: "VCP-02-C2"
  params:
    - name: value
      type: string

- id: vcp_image_flip
  label: Image Flip
  kind: action
  command: "VCP-02-D7"
  params:
    - name: value
      type: string

- id: vcp_osd_flip
  label: OSD Flip
  kind: action
  command: "VCP-10-B8"
  params:
    - name: value
      type: string

- id: vcp_spectraview_engine
  label: SpectraView Engine
  kind: action
  command: "VCP-11-47"
  params:
    - name: value
      type: string

- id: vcp_picture_mode_count
  label: Picture Mode Count
  kind: action
  command: "VCP-11-B0"
  params:
    - name: value
      type: string

- id: vcp_metamerism
  label: Metamerism
  kind: action
  command: "VCP-10-5C"
  params:
    - name: value
      type: string

- id: vcp_color_stabilizer
  label: Color Stabilizer
  kind: action
  command: "VCP-10-ED"
  params:
    - name: value
      type: string

- id: vcp_reset_picture
  label: Reset Picture
  kind: action
  command: "VCP-02-CB"
  params:
    - name: value
      type: string
      description: "0002 resets picture settings"

- id: vcp_volume
  label: Volume
  kind: action
  command: "VCP-00-62"
  params:
    - name: value
      type: integer
      minimum: 0
      maximum: 100

- id: vcp_stereo_mono
  label: Stereo or Mono
  kind: action
  command: "VCP-00-94"
  params:
    - name: value
      type: string

- id: vcp_balance
  label: Balance
  kind: action
  command: "VCP-00-93"
  params:
    - name: value
      type: string

- id: vcp_surround
  label: Surround
  kind: action
  command: "VCP-02-34"
  params:
    - name: value
      type: string

- id: vcp_treble
  label: Treble
  kind: action
  command: "VCP-00-8F"
  params:
    - name: value
      type: string

- id: vcp_bass
  label: Bass
  kind: action
  command: "VCP-00-91"
  params:
    - name: value
      type: string

- id: vcp_sound_input
  label: Sound Input
  kind: action
  command: "VCP-02-2E"
  params:
    - name: value
      type: string

- id: vcp_multi_picture_sound
  label: Multi-Picture Sound
  kind: action
  command: "VCP-10-80"
  params:
    - name: value
      type: string

- id: vcp_line_out
  label: Line Out
  kind: action
  command: "VCP-10-81"
  params:
    - name: value
      type: string

- id: vcp_audio_delay
  label: Audio Delay
  kind: action
  command: "VCP-10-CA"
  params:
    - name: value
      type: string

- id: vcp_audio_delay_time
  label: Audio Delay Time
  kind: action
  command: "VCP-10-CB"
  params:
    - name: value
      type: string

- id: vcp_schedule_enable
  label: Schedule Enable
  kind: action
  command: "VCP-02-E5"
  params:
    - name: value
      type: string

- id: vcp_schedule_disable
  label: Schedule Disable
  kind: action
  command: "VCP-02-E6"
  params:
    - name: value
      type: string

- id: vcp_off_timer
  label: Off Timer
  kind: action
  command: "VCP-02-2B"
  params:
    - name: value
      type: string

- id: vcp_multi_picture_mode_hold
  label: Multi-Picture Mode Hold
  kind: action
  command: "VCP-10-82"
  params:
    - name: value
      type: string

- id: vcp_multi_picture_mode
  label: Multi-Picture Mode
  kind: action
  command: "VCP-02-72"
  params:
    - name: value
      type: string

- id: vcp_selected_window
  label: Selected Window
  kind: action
  command: "VCP-11-0B"
  params:
    - name: value
      type: string

- id: vcp_selection_frame
  label: Selection Frame
  kind: action
  command: "VCP-11-0D"
  params:
    - name: value
      type: string

- id: vcp_window1_input
  label: Window 1 Input
  kind: action
  command: "VCP-11-0E"
  params:
    - name: value
      type: string

- id: vcp_window2_input
  label: Window 2 Input
  kind: action
  command: "VCP-11-0F"
  params:
    - name: value
      type: string

- id: vcp_window_size
  label: Window Size
  kind: action
  command: "VCP-10-B9"
  params:
    - name: value
      type: string

- id: vcp_window_size_preset
  label: Window Size Preset
  kind: action
  command: "VCP-02-71"
  params:
    - name: value
      type: string

- id: vcp_window_h_position
  label: Window Horizontal Position
  kind: action
  command: "VCP-02-74"
  params:
    - name: value
      type: string

- id: vcp_window_v_position
  label: Window Vertical Position
  kind: action
  command: "VCP-02-75"
  params:
    - name: value
      type: string

- id: vcp_multi_picture_aspect
  label: Multi-Picture Aspect
  kind: action
  command: "VCP-10-83"
  params:
    - name: value
      type: string

- id: vcp_text_ticker_mode
  label: Text Ticker Mode
  kind: action
  command: "VCP-10-08"
  params:
    - name: value
      type: string

- id: vcp_text_ticker_position
  label: Text Ticker Position
  kind: action
  command: "VCP-10-09"
  params:
    - name: value
      type: string

- id: vcp_text_ticker_size
  label: Text Ticker Size
  kind: action
  command: "VCP-10-0A"
  params:
    - name: value
      type: string

- id: vcp_text_ticker_signal_detect
  label: Text Ticker Signal Detect
  kind: action
  command: "VCP-10-0C"
  params:
    - name: value
      type: string

- id: vcp_input_signal_detect
  label: Input Signal Detect
  kind: action
  command: "VCP-02-40"
  params:
    - name: value
      type: string

- id: vcp_input_priority_1
  label: Input Priority 1
  kind: action
  command: "VCP-10-2E"
  params:
    - name: value
      type: string

- id: vcp_input_priority_2
  label: Input Priority 2
  kind: action
  command: "VCP-10-2F"
  params:
    - name: value
      type: string

- id: vcp_input_priority_3
  label: Input Priority 3
  kind: action
  command: "VCP-10-30"
  params:
    - name: value
      type: string

- id: vcp_input_switch_speed
  label: Input Switch Speed
  kind: action
  command: "VCP-10-86"
  params:
    - name: value
      type: string

- id: vcp_input_1
  label: Input 1
  kind: action
  command: "VCP-10-CE"
  params:
    - name: value
      type: string

- id: vcp_input_2
  label: Input 2
  kind: action
  command: "VCP-10-CF"
  params:
    - name: value
      type: string

- id: vcp_dvi_mode
  label: DVI Mode
  kind: action
  command: "VCP-02-CF"
  params:
    - name: value
      type: string

- id: vcp_vga_mode
  label: VGA Mode
  kind: action
  command: "VCP-10-8E"
  params:
    - name: value
      type: string

- id: vcp_sync_type
  label: Sync Type
  kind: action
  command: "VCP-11-95"
  params:
    - name: value
      type: string

- id: vcp_displayport1_version
  label: DisplayPort 1 Version
  kind: action
  command: "VCP-10-F1"
  params:
    - name: value
      type: string

- id: vcp_displayport2_version
  label: DisplayPort 2 Version
  kind: action
  command: "VCP-10-F2"
  params:
    - name: value
      type: string

- id: vcp_displayport_bit_rate
  label: DisplayPort Bit Rate
  kind: action
  command: "VCP-11-19"
  params:
    - name: value
      type: string

- id: vcp_hdmi_mode
  label: HDMI Mode
  kind: action
  command: "VCP-11-68"
  params:
    - name: value
      type: string

- id: vcp_video_level
  label: Video Level
  kind: action
  command: "VCP-10-40"
  params:
    - name: value
      type: string

- id: vcp_signal_format
  label: Signal Format
  kind: action
  command: "VCP-11-A3"
  params:
    - name: value
      type: string

- id: vcp_language
  label: Language
  kind: action
  command: "VCP-00-68"
  params:
    - name: value
      type: string

- id: vcp_osd_time
  label: OSD Time
  kind: action
  command: "VCP-00-FC"
  params:
    - name: value
      type: string

- id: vcp_osd_h_position
  label: OSD Horizontal Position
  kind: action
  command: "VCP-02-38"
  params:
    - name: value
      type: string

- id: vcp_osd_v_position
  label: OSD Vertical Position
  kind: action
  command: "VCP-02-39"
  params:
    - name: value
      type: string

- id: vcp_information_osd
  label: Information OSD
  kind: action
  command: "VCP-02-3D"
  params:
    - name: value
      type: string

- id: vcp_ip_id_information
  label: IP and ID Information
  kind: action
  command: "VCP-11-17"
  params:
    - name: value
      type: string

- id: vcp_osd_transparency
  label: OSD Transparency
  kind: action
  command: "VCP-02-B8"
  params:
    - name: value
      type: string

- id: vcp_osd_orientation
  label: OSD Orientation
  kind: action
  command: "VCP-02-41"
  params:
    - name: value
      type: string

- id: vcp_key_guide
  label: Key Guide
  kind: action
  command: "VCP-11-7A"
  params:
    - name: value
      type: string

- id: vcp_service_information
  label: Service Information
  kind: action
  command: "VCP-10-BA"
  params:
    - name: value
      type: string

- id: vcp_closed_caption
  label: Closed Caption
  kind: action
  command: "VCP-10-84"
  params:
    - name: value
      type: string

- id: vcp_tile_horizontal_count
  label: Tile Horizontal Monitor Count
  kind: action
  command: "VCP-02-D0"
  params:
    - name: value
      type: string

- id: vcp_tile_vertical_count
  label: Tile Vertical Monitor Count
  kind: action
  command: "VCP-02-D1"
  params:
    - name: value
      type: string

- id: vcp_tile_position
  label: Tile Position
  kind: action
  command: "VCP-02-D2"
  params:
    - name: value
      type: string

- id: vcp_tile_compensation
  label: Tile Compensation
  kind: action
  command: "VCP-02-D5"
  params:
    - name: value
      type: string

- id: vcp_tile_horizontal_size
  label: Tile Horizontal Size
  kind: action
  command: "VCP-11-96"
  params:
    - name: value
      type: string

- id: vcp_tile_vertical_size
  label: Tile Vertical Size
  kind: action
  command: "VCP-11-97"
  params:
    - name: value
      type: string

- id: vcp_tile_horizontal_adjust
  label: Tile Horizontal Adjust
  kind: action
  command: "VCP-11-98"
  params:
    - name: value
      type: string

- id: vcp_tile_vertical_adjust
  label: Tile Vertical Adjust
  kind: action
  command: "VCP-11-99"
  params:
    - name: value
      type: string

- id: vcp_tile_cut
  label: Tile Cut
  kind: action
  command: "VCP-11-C0"
  params:
    - name: value
      type: string

- id: vcp_tile_cut_horizontal_adjust
  label: Tile Cut Horizontal Adjust
  kind: action
  command: "VCP-11-C1"
  params:
    - name: value
      type: string

- id: vcp_tile_cut_vertical_adjust
  label: Tile Cut Vertical Adjust
  kind: action
  command: "VCP-11-C2"
  params:
    - name: value
      type: string

- id: vcp_tile_matrix_execute
  label: Tile Matrix Execute
  kind: action
  command: "VCP-02-D3"
  params:
    - name: value
      type: string

- id: vcp_frame_compensation
  label: Frame Compensation
  kind: action
  command: "VCP-11-01"
  params:
    - name: value
      type: string

- id: vcp_total_compensation
  label: Total Compensation Value
  kind: action
  command: "VCP-11-02"
  params:
    - name: value
      type: string

- id: vcp_compensation
  label: Compensation Value
  kind: action
  command: "VCP-11-03"
  params:
    - name: value
      type: string

- id: vcp_vertical_scan_reverse
  label: Vertical Scan Reverse
  kind: action
  command: "VCP-11-04"
  params:
    - name: value
      type: string

- id: vcp_vertical_scan_reverse_manual
  label: Vertical Scan Reverse Manual
  kind: action
  command: "VCP-11-05"
  params:
    - name: value
      type: string

- id: vcp_tile_settings_save
  label: Tile Matrix Settings Save
  kind: action
  command: "VCP-10-4A"
  params:
    - name: value
      type: string

- id: vcp_monitor_id
  label: Monitor ID
  kind: action
  command: "VCP-02-3E"
  params:
    - name: value
      type: string

- id: vcp_group_id
  label: Group ID
  kind: action
  command: "VCP-10-7F"
  params:
    - name: value
      type: string
      description: Bit 0 group A through bit 9 group J

- id: vcp_auto_id_ip
  label: Auto ID and IP
  kind: action
  command: "VCP-10-BB"
  params:
    - name: value
      type: string
      description: "0001 executes operation"

- id: vcp_auto_id_ip_reset
  label: Auto ID and IP Reset
  kind: action
  command: "VCP-10-BD"
  params:
    - name: value
      type: string
      description: "0001 executes operation"

- id: vcp_command_forwarding
  label: Command Forwarding
  kind: action
  command: "VCP-11-4F"
  params:
    - name: value
      type: string

- id: vcp_power_save_message
  label: Power Save Message
  kind: action
  command: "VCP-11-7B"
  params:
    - name: value
      type: string

- id: vcp_fan_control
  label: Fan Control
  kind: action
  command: "VCP-02-7D"
  params:
    - name: value
      type: string

- id: vcp_fan_speed
  label: Fan Speed
  kind: action
  command: "VCP-10-3F"
  params:
    - name: value
      type: string

- id: vcp_sensor_1
  label: Sensor 1
  kind: query
  command: "VCP-10-E0"
  params: []

- id: vcp_sensor_2
  label: Sensor 2
  kind: query
  command: "VCP-10-E1"
  params: []

- id: vcp_sensor_3
  label: Sensor 3
  kind: query
  command: "VCP-10-E2"
  params: []

- id: vcp_sensor_4
  label: Sensor 4
  kind: query
  command: "VCP-10-E3"
  params: []

- id: vcp_sensor_5
  label: Sensor 5
  kind: query
  command: "VCP-10-E4"
  params: []

- id: vcp_sensor_6
  label: Sensor 6
  kind: query
  command: "VCP-10-E5"
  params: []

- id: vcp_internal_temperature_fan_select
  label: Internal Temperature Fan Select
  kind: action
  command: "VCP-02-7A"
  params:
    - name: value
      type: string

- id: vcp_internal_temperature_fan_status
  label: Internal Temperature Fan Status
  kind: query
  command: "VCP-02-7B"
  params: []

- id: vcp_temperature_sensor_select
  label: Temperature Sensor Select
  kind: action
  command: "VCP-02-78"
  params:
    - name: value
      type: string
      description: "0001, 0002, or 0003 selects sensor 1, 2, or 3"

- id: vcp_temperature_read
  label: Temperature Read
  kind: query
  command: "VCP-02-79"
  params: []

- id: vcp_screen_saver_gamma
  label: Screen Saver Gamma
  kind: action
  command: "VCP-02-DB"
  params:
    - name: value
      type: string

- id: vcp_screen_saver_backlight
  label: Screen Saver Backlight
  kind: action
  command: "VCP-02-DC"
  params:
    - name: value
      type: string

- id: vcp_motion
  label: Motion
  kind: action
  command: "VCP-02-DD"
  params:
    - name: value
      type: string

- id: vcp_side_panel
  label: Side Panel
  kind: action
  command: "VCP-02-DF"
  params:
    - name: value
      type: string

- id: vcp_power_on_delay
  label: Power On Delay
  kind: action
  command: "VCP-02-D8"
  params:
    - name: value
      type: string

- id: vcp_id_link
  label: ID Link
  kind: action
  command: "VCP-10-BC"
  params:
    - name: value
      type: string

- id: vcp_remote_lock_mode
  label: Remote Lock Mode
  kind: action
  command: "VCP-10-D4"
  params:
    - name: value
      type: string

- id: vcp_remote_lock_power
  label: Remote Lock Power
  kind: action
  command: "VCP-10-D5"
  params:
    - name: value
      type: string

- id: vcp_remote_lock_volume
  label: Remote Lock Volume
  kind: action
  command: "VCP-10-D6"
  params:
    - name: value
      type: string

- id: vcp_remote_lock_input
  label: Remote Lock Input
  kind: action
  command: "VCP-10-D9"
  params:
    - name: value
      type: string

- id: vcp_remote_minimum_volume
  label: Remote Minimum Volume
  kind: action
  command: "VCP-10-D7"
  params:
    - name: value
      type: string

- id: vcp_remote_maximum_volume
  label: Remote Maximum Volume
  kind: action
  command: "VCP-10-D8"
  params:
    - name: value
      type: string

- id: vcp_remote_allowed_input_1
  label: Remote Allowed Input 1
  kind: action
  command: "VCP-10-DA"
  params:
    - name: value
      type: string

- id: vcp_remote_allowed_input_2
  label: Remote Allowed Input 2
  kind: action
  command: "VCP-10-DB"
  params:
    - name: value
      type: string

- id: vcp_remote_allowed_input_3
  label: Remote Allowed Input 3
  kind: action
  command: "VCP-10-DC"
  params:
    - name: value
      type: string

- id: vcp_channel_lock
  label: Channel Lock
  kind: action
  command: "VCP-11-69"
  params:
    - name: value
      type: string

- id: vcp_key_lock_mode
  label: Key Lock Mode
  kind: action
  command: "VCP-11-6A"
  params:
    - name: value
      type: string

- id: vcp_key_lock_power
  label: Key Lock Power
  kind: action
  command: "VCP-11-6B"
  params:
    - name: value
      type: string

- id: vcp_key_lock_volume
  label: Key Lock Volume
  kind: action
  command: "VCP-11-6C"
  params:
    - name: value
      type: string

- id: vcp_key_lock_input
  label: Key Lock Input
  kind: action
  command: "VCP-11-6F"
  params:
    - name: value
      type: string

- id: vcp_key_minimum_volume
  label: Key Minimum Volume
  kind: action
  command: "VCP-11-6D"
  params:
    - name: value
      type: string

- id: vcp_key_maximum_volume
  label: Key Maximum Volume
  kind: action
  command: "VCP-11-6E"
  params:
    - name: value
      type: string

- id: vcp_key_channel_lock
  label: Key Channel Lock
  kind: action
  command: "VCP-11-70"
  params:
    - name: value
      type: string

- id: vcp_ddcci
  label: DDC/CI Control
  kind: action
  command: "VCP-10-BE"
  params:
    - name: value
      type: string

- id: vcp_ip_address_reset
  label: IP Address Reset
  kind: action
  command: "VCP-10-BF"
  params:
    - name: value
      type: string
      description: "0001 executes operation"

- id: vcp_auto_brightness
  label: Auto Brightness
  kind: action
  command: "VCP-02-2D"
  params:
    - name: value
      type: string

- id: vcp_backlight_dimming
  label: Backlight Dimming
  kind: action
  command: "VCP-11-4E"
  params:
    - name: value
      type: string

- id: vcp_ambient_light_sensor_mode
  label: Ambient Light Sensor Mode
  kind: action
  command: "VCP-10-C8"
  params:
    - name: value
      type: string

- id: vcp_ambient_light_maximum
  label: Ambient Light Maximum
  kind: action
  command: "VCP-10-C9"
  params:
    - name: value
      type: string

- id: vcp_ambient_light_bright
  label: Ambient Light Bright Setting
  kind: action
  command: "VCP-10-34"
  params:
    - name: value
      type: string

- id: vcp_ambient_light_dark
  label: Ambient Light Dark Setting
  kind: action
  command: "VCP-10-33"
  params:
    - name: value
      type: string

- id: vcp_illuminance_1
  label: Illuminance 1
  kind: query
  command: "VCP-02-B4"
  params: []

- id: vcp_illuminance_2
  label: Illuminance 2
  kind: query
  command: "VCP-02-B5"
  params: []

- id: vcp_human_sensor_mode
  label: Human Sensor Mode
  kind: action
  command: "VCP-10-75"
  params:
    - name: value
      type: string

- id: vcp_human_sensor_backlight_enable
  label: Human Sensor Backlight Enable
  kind: action
  command: "VCP-10-DD"
  params:
    - name: value
      type: string

- id: vcp_human_sensor_backlight_value
  label: Human Sensor Backlight Value
  kind: action
  command: "VCP-10-C6"
  params:
    - name: value
      type: string

- id: vcp_human_sensor_volume_enable
  label: Human Sensor Volume Enable
  kind: action
  command: "VCP-10-DE"
  params:
    - name: value
      type: string

- id: vcp_human_sensor_volume_value
  label: Human Sensor Volume Value
  kind: action
  command: "VCP-10-C7"
  params:
    - name: value
      type: string

- id: vcp_human_sensor_input_enable
  label: Human Sensor Input Enable
  kind: action
  command: "VCP-10-DF"
  params:
    - name: value
      type: string

- id: vcp_human_sensor_input_source
  label: Human Sensor Input Source
  kind: action
  command: "VCP-10-D0"
  params:
    - name: value
      type: string

- id: vcp_human_sensor_wait_time
  label: Human Sensor Wait Time
  kind: action
  command: "VCP-10-78"
  params:
    - name: value
      type: string

- id: vcp_power_lamp
  label: Power Lamp
  kind: action
  command: "VCP-02-BE"
  params:
    - name: value
      type: string

- id: vcp_schedule_lamp
  label: Schedule Lamp
  kind: action
  command: "VCP-11-71"
  params:
    - name: value
      type: string

- id: vcp_network_functions_display
  label: Network Functions Display
  kind: action
  command: "VCP-11-CF"
  params:
    - name: value
      type: string

- id: vcp_compute_module
  label: Compute Module
  kind: action
  command: "VCP-11-D1"
  params:
    - name: value
      type: string

- id: vcp_media_player
  label: Media Player
  kind: action
  command: "VCP-11-D0"
  params:
    - name: value
      type: string

- id: vcp_touch_panel_power
  label: Touch Panel Power
  kind: action
  command: "VCP-11-72"
  params:
    - name: value
      type: string

- id: vcp_external_control
  label: External Control
  kind: action
  command: "VCP-11-73"
  params:
    - name: value
      type: string

- id: vcp_pc_source
  label: PC Source
  kind: action
  command: "VCP-11-74"
  params:
    - name: value
      type: string

- id: vcp_usb_power
  label: USB Power
  kind: action
  command: "VCP-11-75"
  params:
    - name: value
      type: string

- id: vcp_cec
  label: CEC
  kind: action
  command: "VCP-11-76"
  params:
    - name: value
      type: string

- id: vcp_auto_power_off
  label: Auto Power Off
  kind: action
  command: "VCP-11-77"
  params:
    - name: value
      type: string

- id: vcp_audio_receiver
  label: Audio Receiver
  kind: action
  command: "VCP-11-78"
  params:
    - name: value
      type: string

- id: vcp_device_search
  label: Device Search
  kind: action
  command: "VCP-11-79"
  params:
    - name: value
      type: string

- id: vcp_option_power
  label: Option Power
  kind: action
  command: "VCP-10-41"
  params:
    - name: value
      type: string

- id: vcp_audio_mode
  label: Audio Mode
  kind: action
  command: "VCP-10-B0"
  params:
    - name: value
      type: string

- id: vcp_off_warning
  label: Off Warning
  kind: action
  command: "VCP-10-C0"
  params:
    - name: value
      type: string

- id: vcp_auto_off
  label: Auto Off
  kind: action
  command: "VCP-10-C1"
  params:
    - name: value
      type: string

- id: vcp_start_up_pc
  label: Start Up PC
  kind: action
  command: "VCP-10-C2"
  params:
    - name: value
      type: string
      description: "0001 executes operation"

- id: vcp_force_quit
  label: Force Quit
  kind: action
  command: "VCP-10-C3"
  params:
    - name: value
      type: string
      description: "0001 executes operation"

- id: vcp_slot2_channel_mode
  label: Slot 2 Channel Mode
  kind: action
  command: "VCP-11-62"
  params:
    - name: value
      type: string

- id: vcp_slot2_channel_select
  label: Slot 2 Channel Select
  kind: action
  command: "VCP-11-63"
  params:
    - name: value
      type: string

- id: vcp_co2_reduction_high
  label: CO2 Reduction High Word
  kind: query
  command: "VCP-10-10"
  params: []

- id: vcp_co2_reduction_low
  label: CO2 Reduction Low Word
  kind: query
  command: "VCP-10-11"
  params: []

- id: vcp_co2_reduction_total_high
  label: CO2 Reduction Total High Word
  kind: query
  command: "VCP-10-28"
  params: []

- id: vcp_co2_reduction_total_low
  label: CO2 Reduction Total Low Word
  kind: query
  command: "VCP-10-29"
  params: []

- id: vcp_co2_emission_high
  label: CO2 Emission High Word
  kind: query
  command: "VCP-10-2A"
  params: []

- id: vcp_co2_emission_low
  label: CO2 Emission Low Word
  kind: query
  command: "VCP-10-2B"
  params: []

- id: vcp_co2_emission_total_high
  label: CO2 Emission Total High Word
  kind: query
  command: "VCP-10-26"
  params: []

- id: vcp_co2_emission_total_low
  label: CO2 Emission Total Low Word
  kind: query
  command: "VCP-10-27"
  params: []

- id: vcp_all_reset
  label: All Reset
  kind: action
  command: "VCP-00-04"
  params:
    - name: value
      type: string
      description: "0001 executes operation"
```

## Feedbacks

```yaml
- id: command_result
  type: enum
  values:
    "00": no_error
    "01": unsupported_or_error

- id: vcp_parameter_reply
  type: object
  fields:
    result: ascii_hex_byte
    op_page: ascii_hex_byte
    op_code: ascii_hex_byte
    parameter_type: ascii_hex_byte
    maximum: ascii_hex_uint16
    current_or_requested: ascii_hex_uint16

- id: timing_report
  type: object
  command: "4E"
  description: CTL type B reply with message length 0E. Payload begins with 4E, followed by two ASCII hexadecimal status digits, four horizontal-frequency digits in 0.01 kHz units, and four vertical-frequency digits in 0.01 Hz units.
  fields:
    status: ascii_hex_byte
    horizontal_frequency: ascii_hex_uint16
    vertical_frequency: ascii_hex_uint16

- id: power_state
  type: enum
  description: CTL type B reply with message length 12. Payload positions D01-D02 contain reserved 02; D03-D04 contain result 00 for no error or 01 for unsupported; D05-D06 contain D6; D07-D08 contain parameter type 00; D09-D12 contain maximum 0004; D13-D16 contain the power-state value below. Interpret the state only after checking the result.
  values:
    "0001": on
    "0002": power_save
    "0003": reserved
    "0004": standby

- id: null_message
  type: string
  value: "BE"

- id: self_diagnosis
  type: enum
  values:
    "00": normal
    "70": standby_3_3v_fault
    "71": standby_5v_fault
    "78": inverter_or_option_slot_24v_fault
    "7A": usb_c_overvoltage
    "7B": usb_c_overcurrent
    "80": cooling_fan_1_fault
    "81": cooling_fan_2_fault
    "82": cooling_fan_3_fault
    "90": inverter_fault
    "A0": temperature_shutdown
    "A1": temperature_brightness_reduction
    "B0": no_signal
    "D0": proof_of_play_log_memory_low
    "D1": rtc_fault
    "E4": cpld_fault
    "ED": l2_switch_fault
    "EE": fan_control_fault
    "EF": audio_amplifier_fault

- id: serial_number
  type: string

- id: model_name
  type: string

- id: mac_address
  type: string

- id: firmware_version
  type: string

- id: temperature
  type: integer
  description: Signed 16-bit two's-complement value in 0.5-degree Celsius units

- id: proof_of_play_status
  type: object
  fields:
    error_state: ascii_hex_byte
    log_count: ascii_hex_uint16
    log_capacity: ascii_hex_uint16
    operating_state: ascii_hex_byte

- id: auto_id_status
  type: object
  fields:
    progress: ascii_hex_byte
    detected_monitors: ascii_hex_byte
```

## Variables

```yaml
- id: destination_address
  type: string
  description: Monitor ID 1 through 100, group A through J, or all-monitors address

- id: block_check_code
  type: integer
  description: XOR of packet bytes from Reserved through ETX

- id: input_source
  type: string
  description: VCP-00-60 source code

- id: backlight
  type: integer
  minimum: 0
  maximum: 100

- id: volume
  type: integer
  minimum: 0
  maximum: 100

- id: time_zone
  type: string
  description: 00 through 30, representing UTC -12:00 through UTC +12:00

- id: frame_lock
  type: enum
  values:
    "00": off
    "01": on
    "02": auto
```

## Events

```yaml
- id: auto_tile_matrix_complete
  command: "CA0302{result}"
  description: Auto Tile Matrix completion notification

- id: null_message_received
  command: "BE"
  description: Monitor cannot reply, received unsupported message type, or Proof of Play sequence is invalid
```

## Macros

```yaml
- id: set_and_save_vcp_parameter
  label: Set and Save VCP Parameter
  steps:
    - action: get_vcp_parameter
    - action: set_vcp_parameter
    - action: get_vcp_parameter
    - action: save_current_settings
```

## Safety

```yaml
confirmation_required_for:
  - power_control
  - vcp_all_reset
  - security_lock_control
  - auto_id_extended_reset
  - auto_id_ip_reset
  - input_name_reset
  - proof_of_play_mode
interlocks:
  - action: power_control
    requirement: Use only power modes 0001 or 0004; source explicitly says not to set 0002 or 0003.
  - action: proof_of_play_current
    requirement: Monitor must be powered on before Proof of Play logs can be retrieved.
  - action: lock_settings_write
    requirement: Fields D09 through D18 are ignored unless mode is CUSTOM LOCK; volume limits are ignored unless volume is locked.
```

## Notes

RS-232C uses a 9-pin D-Sub connector and crossover cable. LAN uses RJ-45 10/100BASE-T and fixed TCP port 7142.

Each packet consists of Header, Message, Check Code, and Delimiter. Header SOH is `01h`; Reserved and controller Source are `30h`; message types are `A` command, `B` command reply, `C` get current parameter, `D` get parameter reply, `E` set parameter, and `F` set parameter reply. Message data is ASCII hexadecimal. Delimiter is CR (`0Dh`). BCC is XOR of bytes from Reserved through ETX.

The CTL payload codes `0C`, `07`, and `01D6` require the Transport framing; sending those strings alone is not a complete request. The save reply payload is `000C`; timing replies begin with `4E`; power-status replies use the layout described in `power_state`.

The additional tokens identified by review are CTL reply payload identifiers: `C311`/`C312` for date/time read/write, `C330`/`C331` for time-zone read/write, `C31A`/`C31B` for time-server read/write, `C33D`/`C33E` for schedule read/write, `A1` for self-diagnosis, `C316` for serial number, `C317` for model name, `C31D` for security lock, `C320` for MAC address, `CB01` for daylight saving, `CB02` for firmware version, `CB04` for input name, `CB15` for Proof of Play, `CB0B` for power-save settings, `CB0D` for shipment flag, and `CB0E` for schedule enable. They identify responses to existing requests and do not define additional controller Actions.

Keep command-byte intervals within 100 ms. Send next command only after receiving monitor reply. Wait about 15 seconds after power on or standby. Wait about 10 seconds after input switching, sub-picture input switching, auto setup, or all reset. TCP connections are closed by monitor after 15 minutes without communication.

<!-- UNRESOLVED: transport authentication requirements not stated; absence of an authentication procedure does not establish auth.type none. -->
<!-- UNRESOLVED: serial flow-control setting not stated. -->
<!-- UNRESOLVED: firmware compatibility range not stated. -->

## Provenance

```yaml
source_domains:
  - smj.jp.sharp
  - business.sharpusa.com
source_urls:
  - https://smj.jp.sharp/bs/lcd-display/lineup/pnun/download_files/pn-un553s_un553v_external_control_jp.pdf
  - https://business.sharpusa.com/large-format-displays/models/details/pn-un553s
  - https://smj.jp.sharp/bs/lcd-display/lineup/pnun/
retrieved_at: 2026-08-05T06:52:50.556Z
last_checked_at: 2026-10-07T12:50:33.175Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T12:50:33.175Z
matched_actions: 304
action_count: 304
confidence: medium
summary: "All 304 spec action units match source CTL and VCP codes with correct shapes and transport values; only 3 table-only references (CA19, CA1A, CA0A-01) lack spec entries. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- CTL-CA19
- CTL-CA1A
- CTL-CA0A-01
- "hardware verification and firmware compatibility range not provided."
- "flow control not stated in source"
- "transport authentication requirements not stated; absence of an authentication procedure does not establish auth.type none."
- "serial flow-control setting not stated."
- "firmware compatibility range not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
