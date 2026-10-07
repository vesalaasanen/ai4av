---
spec_id: admin/rotel-rdv-1092-north-america
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel RDV-1092 Control Spec"
manufacturer: Rotel
model_family: RDV-1092
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - RDV-1092
    - RDV-1093
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RDV1092%20Protocol.pdf"
  - https://www.rotel.com/manuals-resources/rs232-protocols
retrieved_at: 2026-07-25T13:57:27.838Z
last_checked_at: 2026-10-07T16:11:48.124Z
generated_at: 2026-10-07T16:11:48.124Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "IP/Ethernet control, network port, and any other transport interfaces are not documented in the supplied source."
  - "authentication requirements and any control-interface login procedure are not described in the supplied source."
  - "source 6.1.64 lists count 3, ID 0x01 and opcode 0x4B, but sections 5.1.3 and 6.1 identify controller commands with ID 0x02. The Rotel command list does not resolve this conflict. The applicable ID byte and complete wire command remain unresolved.\""
  - "the ID byte used in this calculation is disputed in the source.\""
  - "exact payload length and bytes not specified in source.\""
  - "table count 13 conflicts with the described variable track-name payload.\""
  - "complete wire encoding must resolve the source count/payload conflict.\""
  - "parameter range not stated.\""
  - "source 5.1.6 omits opcode from its checksum prose, while fixed-command tables include it.\""
  - "version-component ranges not stated.\""
  - "memory-content range not stated.\""
  - "complete parameter range not stated.\""
  - "range depends on the device and parameter.\""
  - "contents depend on the requested device and parameter.\""
  - "IP/Ethernet control not documented in the supplied source."
  - "Port number, auth credentials, and network configuration are not described in the supplied source."
  - "Voltage, current, and power specifications not stated."
  - "Firmware version compatibility range not stated."
  - "Initialize External Data (0x4D) payload length and bytes marked <TBD> in source."
verification:
  verdict: verified
  checked_at: 2026-10-07T16:11:48.124Z
  matched_actions: 107
  action_count: 107
  confidence: medium
  summary: "All 107 action units match source opcodes and checksums and serial parameters are confirmed; only device-parameter sub-tables (about 4) are unmodeled, within the 0.9 floor. (19 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-25
---

# Rotel RDV-1092 Control Spec

## Summary
The Rotel RDV-1092 is a DVD-Audio/Video player with a Computer I/O (RS-232) control port. This spec covers the RS-232 protocol used by an external controller to operate the unit's transport, playback, OSD, and disc-handling functions. Frames are fixed-length byte sequences with sync byte 0xFE, count, device ID (0x01 decoder -> controller, 0x02 controller -> decoder), opcode, optional two data bytes, and a checksum. The protocol is shared with the RDV-1093 sibling; the underlying byte-level command set is the CS98200 reference design (Videon Central, Serial Interface Design Specification rev 1.22, 2005/05/19).

<!-- UNRESOLVED: IP/Ethernet control, network port, and any other transport interfaces are not documented in the supplied source. -->
<!-- UNRESOLVED: authentication requirements and any control-interface login procedure are not described in the supplied source. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED  # source does not state authentication requirements
```

## Traits
```yaml
- powerable       # inferred from Power On / Power Off commands
- queryable       # inferred from Get Status and unsolicited status messages
```

## Actions
```yaml
# Standard commands (5-byte frames). All hex bytes verbatim from Rotel
# RDV 1092 / RDV 1093 RS232 Controller Command List. Source: Videon Central
# Serial Interface Design Specification rev 1.22 (2005/05/19), CS98200.

- id: eject
  label: Eject
  kind: action
  command: "FE 02 02 01 05"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "FE 02 02 02 06"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "FE 02 02 03 07"
  params: []

- id: play
  label: Play
  kind: action
  command: "FE 02 02 04 08"
  params: []

- id: stop
  label: Stop
  kind: action
  command: "FE 02 02 05 09"
  params: []

- id: pause
  label: Pause
  kind: action
  command: "FE 02 02 06 0A"
  params: []

- id: track_up
  label: Track Up
  kind: action
  command: "FE 02 02 07 0B"
  params: []

- id: track_down
  label: Track Down
  kind: action
  command: "FE 02 02 08 0C"
  params: []

- id: slow_forward
  label: Slow Forward
  kind: action
  command: "FE 02 02 09 0D"
  params: []

- id: fast_forward
  label: Fast Forward
  kind: action
  command: "FE 02 02 0A 0E"
  params: []

- id: angle_toggle
  label: Angle Toggle
  kind: action
  command: "FE 02 02 0C 10"
  params: []

- id: display
  label: Display (OSD status bar)
  kind: action
  command: "FE 02 02 0D 11"
  params: []

- id: restore_factory_defaults
  label: Restore Factory Defaults
  kind: action
  command: "FE 02 02 0E 12"
  params: []

- id: frame_forward
  label: Frame Forward
  kind: action
  command: "FE 02 02 10 14"
  params: []

- id: slow_reverse
  label: Slow Reverse
  kind: action
  command: "FE 02 02 11 15"
  params: []

- id: fast_reverse
  label: Fast Reverse
  kind: action
  command: "FE 02 02 12 16"
  params: []

- id: cursor_up
  label: Cursor Up
  kind: action
  command: "FE 02 02 13 17"
  params: []

- id: cursor_left
  label: Cursor Left
  kind: action
  command: "FE 02 02 14 18"
  params: []

- id: cursor_right
  label: Cursor Right
  kind: action
  command: "FE 02 02 15 19"
  params: []

- id: cursor_down
  label: Cursor Down
  kind: action
  command: "FE 02 02 16 1A"
  params: []

- id: enter
  label: Enter
  kind: action
  command: "FE 02 02 17 1B"
  params: []

- id: disc_menu
  label: Disc Menu
  kind: action
  command: "FE 02 02 18 1C"
  params: []

- id: repeat_cycle
  label: Repeat (cycle)
  kind: action
  command: "FE 02 02 19 1D"
  params: []

- id: repeat_track
  label: Repeat Track
  kind: action
  command: "FE 02 02 1A 1E"
  params: []

- id: random_toggle
  label: Random (toggle)
  kind: action
  command: "FE 02 02 1B 1F"
  params: []

- id: audio_next
  label: Audio (next track)
  kind: action
  command: "FE 02 02 1C 20"
  params: []

- id: subtitle_next
  label: Subtitle (next)
  kind: action
  command: "FE 02 02 1D 21"
  params: []

- id: help
  label: Help
  kind: action
  command: "FE 02 02 1F 23"
  params: []

- id: return
  label: Return
  kind: action
  command: "FE 02 02 20 24"
  params: []

- id: title_menu
  label: Title Menu
  kind: action
  command: "FE 02 02 21 25"
  params: []

- id: repeat_chapter
  label: Repeat Chapter
  kind: action
  command: "FE 02 02 22 26"
  params: []

- id: repeat_title
  label: Repeat Title
  kind: action
  command: "FE 02 02 23 27"
  params: []

- id: repeat_disc
  label: Repeat Disc
  kind: action
  command: "FE 02 02 24 28"
  params: []

- id: ab_repeat
  label: A-B Repeat
  kind: action
  command: "FE 02 02 25 29"
  params: []

- id: repeat_off
  label: Repeat Off
  kind: action
  command: "FE 02 02 26 2A"
  params: []

- id: random_on
  label: Random On
  kind: action
  command: "FE 02 02 27 2B"
  params: []

- id: random_off
  label: Random Off
  kind: action
  command: "FE 02 02 28 2C"
  params: []

- id: number_0
  label: Number 0
  kind: action
  command: "FE 02 02 29 2D"
  params: []

- id: number_1
  label: Number 1
  kind: action
  command: "FE 02 02 2A 2E"
  params: []

- id: number_2
  label: Number 2
  kind: action
  command: "FE 02 02 30 34"
  params: []

- id: number_3
  label: Number 3
  kind: action
  command: "FE 02 02 31 35"
  params: []

- id: number_4
  label: Number 4
  kind: action
  command: "FE 02 02 32 36"
  params: []

- id: number_5
  label: Number 5
  kind: action
  command: "FE 02 02 33 37"
  params: []

- id: number_6
  label: Number 6
  kind: action
  command: "FE 02 02 34 38"
  params: []

- id: number_7
  label: Number 7
  kind: action
  command: "FE 02 02 35 39"
  params: []

- id: number_8
  label: Number 8
  kind: action
  command: "FE 02 02 36 3A"
  params: []

- id: number_9
  label: Number 9
  kind: action
  command: "FE 02 02 37 3B"
  params: []

- id: zoom
  label: Zoom
  kind: action
  command: "FE 02 02 2E 32"
  params: []

- id: plus_10
  label: +10
  kind: action
  command: "FE 02 02 2F 33"
  params: []

- id: page_up
  label: Page Up
  kind: action
  command: "FE 02 02 38 3C"
  params: []

- id: page_down
  label: Page Down
  kind: action
  command: "FE 02 02 39 3D"
  params: []

- id: set_tv_mode
  label: Set TV Mode
  kind: action
  command: "FE 03 02 3B {mode} {checksum}"
  params:
    - name: mode
      type: integer
      description: "0 = interlaced, 1 = progressive"
    - name: checksum
      type: integer
      description: "Sum of count (0x03) + ID (0x02) + opcode (0x3B) + mode, masked to 0xFF"

- id: osd_menu_toggle
  label: OSD Setup Menu (toggle)
  kind: action
  command: "FE 02 02 41 45"
  params: []

- id: osd_menu_hide
  label: OSD Menu Hide (internal)
  kind: action
  command: "FE 02 02 42 46"
  params: []

- id: configure_serial_interface
  label: Configure Serial Interface
  kind: action
  command: "FE 06 02 43 {rx_status_ms} {req_timeout_ms} {status_bar_s} {menu_s} {checksum}"
  params:
    - name: rx_status_ms
      type: integer
      description: "Receive status interval in 100 ms units. 0xFF = default (500 ms)."
    - name: req_timeout_ms
      type: integer
      description: "Response timeout in 100 ms units. 0xFF = default (1000 ms)."
    - name: status_bar_s
      type: integer
      description: "Status bar view time in seconds. Default 5."
    - name: menu_s
      type: integer
      description: "Menu view time in seconds. Default 30."
    - name: checksum
      type: integer
      description: "Sum of count + ID + opcode + 4 data bytes, masked to 0xFF"

- id: set_volume_level
  label: Set Volume Level
  kind: action
  command: "FE 03 02 45 {level} {checksum}"
  params:
    - name: level
      type: integer
      description: "0-100. Per source note: only updates the OSD status bar, does not actually set decoder-board analog volume."
    - name: checksum
      type: integer
      description: "Sum of count + ID + opcode + level, masked to 0xFF"

- id: set_mute_mode
  label: Set Mute Mode
  kind: action
  command: UNRESOLVED
  description: "UNRESOLVED: source 6.1.64 lists count 3, ID 0x01 and opcode 0x4B, but sections 5.1.3 and 6.1 identify controller commands with ID 0x02. The Rotel command list does not resolve this conflict. The applicable ID byte and complete wire command remain unresolved."
  params:
    - name: mode
      type: integer
      description: "0 = mute, 1 = un-mute. Per source note: only updates OSD status bar, does not actually set decoder mute state."
    - name: checksum
      type: integer
      description: "Sum of count + ID + opcode + mode, masked to 0xFF. UNRESOLVED: the ID byte used in this calculation is disputed in the source."

- id: clear_osd
  label: Clear (OSD)
  kind: action
  command: "FE 02 02 4C 50"
  params: []

- id: initialize_external_data
  label: Initialize External Data
  kind: action
  command: "FE {count} 02 4D {data...} {checksum}"
  params:
    - name: data
      type: bytes
      description: "Source marks payload as <TBD>; all parameters stored external to decoder board. UNRESOLVED: exact payload length and bytes not specified in source."

- id: parental_lock
  label: Parental Lock (internal)
  kind: action
  command: "FE 02 02 4E 52"
  params: []

- id: display_password
  label: Display Password
  kind: action
  command: "FE 02 02 4F 53"
  params: []

- id: get_software_version
  label: Get Software Version
  kind: query
  command: "FE 02 02 50 54"
  params: []

- id: disable_auto_status
  label: Disable Auto-Status
  kind: action
  command: "FE 02 02 51 55"
  params: []

- id: get_status
  label: Get Status
  kind: query
  command: "FE 02 02 52 56"
  params: []

- id: enable_auto_status
  label: Enable Auto-Status
  kind: action
  command: "FE 02 02 53 57"
  params: []

- id: request_acknowledgement
  label: Request Acknowledgement
  kind: action
  command: "FE 04 02 54 {status} {opcode} {checksum}"
  params:
    - name: status
      type: integer
      description: "0 = pass, 1 = fail"
    - name: opcode
      type: integer
      description: "Opcode of the request being acknowledged"
    - name: checksum
      type: integer
      description: "Sum of count + ID + opcode + 2 data bytes, masked to 0xFF"

- id: set_audio_format
  label: Set Audio Format
  kind: action
  command: "FE 03 02 5B {format} {checksum}"
  params:
    - name: format
      type: integer
      description: "Audio format code 0-102 (e.g. 0=Direct, 2=Stereo, 11=Dolby Digital, 73=DVD, 91=DVD-A, 102=Auto)."
    - name: checksum
      type: integer
      description: "Sum of count + ID + opcode + format, masked to 0xFF"

- id: time_search
  label: Time Search
  kind: action
  command: "FE 02 02 5C 60"
  params: []

- id: dlist_next
  label: DLIST Next
  kind: action
  command: "FE 02 02 78 7B"
  params: []

- id: dlist_previous
  label: DLIST Previous
  kind: action
  command: "FE 02 02 79 7C"
  params: []

- id: dlist_goto
  label: DLIST Go-To
  kind: action
  command: "FE 04 02 7A {dlist_msb} {dlist_lsb} {checksum}"
  params:
    - name: dlist_msb
      type: integer
      description: "DLIST number MSB"
    - name: dlist_lsb
      type: integer
      description: "DLIST number LSB"
    - name: checksum
      type: integer
      description: "Sum of count + ID + opcode + 2 data bytes, masked to 0xFF"

- id: dlist_home
  label: DLIST Home
  kind: action
  command: "FE 02 02 7B 7F"
  params: []

- id: memset
  label: MemSet (DVDV bookmark)
  kind: action
  command: "FE 02 02 7C 80"
  params: []

- id: memrecall
  label: MemRecall (DVDV bookmark)
  kind: action
  command: "FE 02 02 7D 81"
  params: []

- id: is_alive
  label: Is Alive
  kind: query
  command: "FE 02 02 80 84"
  params: []

- id: repeat_last_message
  label: Repeat Last Message
  kind: action
  command: "FE 02 02 81 85"
  params: []

- id: memory_write
  label: Memory Write (debug)
  kind: action
  command: "FE 0A 02 82 {addr_msb} {addr2} {addr3} {addr_lsb} {data_msb} {data2} {data3} {data_lsb} {checksum}"
  params:
    - name: addr_msb
      type: integer
      description: "Address MSB"
    - name: addr2
      type: integer
      description: "Address byte 2"
    - name: addr3
      type: integer
      description: "Address byte 3"
    - name: addr_lsb
      type: integer
      description: "Address LSB"
    - name: data_msb
      type: integer
      description: "Data MSB"
    - name: data2
      type: integer
      description: "Data byte 2"
    - name: data3
      type: integer
      description: "Data byte 3"
    - name: data_lsb
      type: integer
      description: "Data LSB"
    - name: checksum
      type: integer
      description: "Sum of count + ID + opcode + 8 data bytes, masked to 0xFF"

- id: memory_read
  label: Memory Read (debug)
  kind: query
  command: "FE 06 02 83 {addr_msb} {addr2} {addr3} {addr_lsb} {checksum}"
  params:
    - name: addr_msb
      type: integer
      description: "Address MSB"
    - name: addr2
      type: integer
      description: "Address byte 2"
    - name: addr3
      type: integer
      description: "Address byte 3"
    - name: addr_lsb
      type: integer
      description: "Address LSB"
    - name: checksum
      type: integer
      description: "Sum of count + ID + opcode + 4 data bytes, masked to 0xFF"

- id: device_set
  label: Device Set
  kind: action
  command: "FE {count} 02 2B {device_id} {parameter} {data_length} {data...} {checksum}"
  params:
    - name: device_id
      type: integer
      description: "0 = CS98200, 1 = Scalar, 3 = MCU"
    - name: parameter
      type: integer
      description: "Device parameter selector"
    - name: data_length
      type: integer
      description: "Length of data payload"
    - name: data
      type: bytes
      description: "Device-specific data"
    - name: checksum
      type: integer
      description: "Sum of count + ID + opcode + data bytes, masked to 0xFF"

- id: device_get
  label: Device Get
  kind: query
  command: "FE {count} 02 2C {device_id} {parameter} {checksum}"
  params:
    - name: device_id
      type: integer
      description: "0 = CS98200, 1 = Scalar, 3 = MCU"
    - name: parameter
      type: integer
      description: "Device parameter selector"
    - name: checksum
      type: integer
      description: "Sum of count + ID + opcode + 2 data bytes, masked to 0xFF"

- id: jump
  label: Jump (chapter/track/title)
  kind: action
  command: "FE 04 02 1E {data1} {data2} {checksum}"
  params:
    - name: data1
      type: integer
      description: "DVDV: chapter. DVDA/CD/MP3: track. MSB; low byte typically 0x00 for 1-255."
    - name: data2
      type: integer
      description: "DVDV: title. DVDA: group. CD/MP3: index (not referenced)."
    - name: checksum
      type: integer
      description: "Sum of count (0x04) + ID (0x02) + opcode (0x1E) + data1 + data2, masked to 0xFF"

- id: un_rated_disc
  label: Un-Rated Disc
  kind: action
  command: "0xFE           2           0x02          0x0B          -------        0x0F"
  description: "Source 6.1.11 table copied verbatim; ------- denotes no data. Internal use when the decoder manages the OSD; external use when the external controller manages the OSD."
  params: []

- id: status_timer_expired
  label: Status Timer Expired
  kind: action
  command: "0xFE            2      0x02         0x5D         -------         0x61"
  description: "Source 6.1.82 table copied verbatim; ------- denotes no data. Internal use only. The command table specifies ID 0x02."
  params: []

- id: show_source
  label: Show Source
  kind: action
  command: "0xFE           2           0x02          0x5E          -------        0x62"
  description: "Source 6.1.83 table copied verbatim; ------- denotes no data. Internal use only. The command table specifies ID 0x02."
  params: []

- id: mcu_set_mp3_track_name
  label: MCU Set MP3 Track Name
  kind: action
  command: "0xFE          13            0x01        0x6D                  Data       Varies"
  description: "Source 6.2.13 table copied verbatim. Decoder -> controller request. Data and Varies are source table placeholders. UNRESOLVED: table count 13 conflicts with the described variable track-name payload."
  params:
    - name: data
      type: bytes
      description: "Data[0-50]: MP3 Track Name (includes the terminating null character)"
    - name: checksum
      type: integer
      description: "UNRESOLVED: complete wire encoding must resolve the source count/payload conflict."

- id: mcu_command_acknowledgement
  label: MCU Command Acknowledgement
  kind: action
  command: "0xFE             4         0x01           0x70             Data       Varies"
  description: "Source 6.2.16 table copied verbatim. Decoder -> controller acknowledgement. Data and Varies are source table placeholders."
  params:
    - name: status
      type: integer
      description: "Pass (command in processing queue) =0; Fail (incorrect check sum) =1; Busy (processing queue is full) =2; Not Supported (command invalid) =3"
    - name: opcode
      type: integer
      description: "Opcode of the command being acknowledged. UNRESOLVED: parameter range not stated."
    - name: checksum
      type: integer
      description: "UNRESOLVED: source 5.1.6 omits opcode from its checksum prose, while fixed-command tables include it."

- id: mcu_unsolicited_status
  label: MCU Unsolicited Status
  kind: action
  command: "0xFE            16         0x01           0x72             Data       Varies"
  description: "Source 6.2.17 table copied verbatim. Decoder -> controller status; no acknowledgement expected. Data and Varies are source table placeholders. See Feedbacks.unsolicited_status for the 14-byte payload."
  params:
    - name: data
      type: bytes
      description: "14 data bytes. See Feedbacks.unsolicited_status and its decoded fields."
    - name: checksum
      type: integer
      description: "UNRESOLVED: source 5.1.6 omits opcode from its checksum prose, while fixed-command tables include it."

- id: mcu_send_software_version
  label: MCU Send Software Version
  kind: action
  command: "0xFE          6          0x01         0x73        Version         Varies"
  description: "Source 6.2.18 table copied verbatim. Decoder -> controller reply to Get Software Version. Version and Varies are source table placeholders."
  params:
    - name: version
      type: bytes
      description: "Four data bytes: Cirrus Code Version First Number, Cirrus Code Version Middle Number, Cirrus Code Version Last Number, Revision Number. UNRESOLVED: version-component ranges not stated."
    - name: checksum
      type: integer
      description: "UNRESOLVED: source 5.1.6 omits opcode from its checksum prose, while fixed-command tables include it."

- id: mcu_menu_up
  label: MCU Menu Up
  kind: action
  command: "0xFE          2          0x01         0x74         -------        0x77"
  description: "Source 6.2.19 table copied verbatim; ------- denotes no data. Internal use only."
  params: []

- id: mcu_status_bar_up
  label: MCU Status Bar Up
  kind: action
  command: "0xFE          2          0x01         0x75         -------        0x78"
  description: "Source 6.2.20 table copied verbatim; ------- denotes no data. Internal use only."
  params: []

- id: mcu_restrict_content_on
  label: MCU Restrict Content On
  kind: action
  command: "0xFE          2          0x01         0x76         -------        0x79"
  description: "Source 6.2.21 table copied verbatim; ------- denotes no data. Internal use only."
  params: []

- id: mcu_restrict_content_off
  label: MCU Restrict Content Off
  kind: action
  command: "0xFE            2         0x01       0x77         -------        0x7A"
  description: "Source 6.2.22 table copied verbatim; ------- denotes no data. Internal use only."
  params: []

- id: mcu_send_memory_read_result
  label: MCU Send Memory Read Result
  kind: action
  command: "0xFE            6         0x01       0x84         Data           Varies"
  description: "Source 6.2.23 table copied verbatim. Decoder -> controller reply to Memory Read; debugging only. Data and Varies are source table placeholders."
  params:
    - name: data
      type: bytes
      description: "Data[0-3]: Contents of memory location, where Data[0] is the MSB and Data[3] is the LSB. UNRESOLVED: memory-content range not stated."
    - name: checksum
      type: integer
      description: "UNRESOLVED: source 5.1.6 omits opcode from its checksum prose, while fixed-command tables include it."

- id: mcu_set_unsolicited_error
  label: MCU Set Unsolicited Error
  kind: action
  command: "0xFE            3         0x01       0x7E         Data           Varies"
  description: "Source 6.2.24 table copied verbatim. Decoder -> controller unsolicited error. Data and Varies are source table placeholders."
  params:
    - name: error_code
      type: integer
      description: "Invalid Region Code =0; Operation Not Possible =1; Unsupported Disc =2"
    - name: checksum
      type: integer
      description: "UNRESOLVED: source 5.1.6 omits opcode from its checksum prose, while fixed-command tables include it."

- id: device_send_get_result
  label: Device Send Get Result
  kind: action
  command: "0xFE       Varies    0x01/0x02         0x2D          Data        Varies"
  description: "Source 6.3.3 table copied verbatim. Sends the result of the previous Device Get in either direction. Varies, 0x01/0x02, and Data are source table notation requiring substitution."
  params:
    - name: device_id
      type: integer
      description: "DEVICE_98200 = 0, DEVICE_SCALAR = 1, RESERVED = 2, DEVICE_MCU = 3"
    - name: parameter
      type: integer
      description: "Parameter (Output Format, Video Format, etc.). UNRESOLVED: complete parameter range not stated."
    - name: data_length
      type: integer
      description: "Device data length. UNRESOLVED: range depends on the device and parameter."
    - name: data
      type: bytes
      description: "Device data. UNRESOLVED: contents depend on the requested device and parameter."
    - name: checksum
      type: integer
      description: "UNRESOLVED: source 5.1.6 omits opcode from its checksum prose, while fixed-command tables include it."
```

## Feedbacks
```yaml
- id: command_ack
  label: Command Acknowledgement
  type: object
  description: "Decoder -> controller. ID 0x01, opcode 0x70. Data[0] = status (0=pass queued, 1=fail bad checksum, 2=busy queue full, 3=not supported). Data[1] = opcode being acknowledged. Sent after every received command."

- id: unsolicited_status
  label: Unsolicited Status
  type: object
  description: "Decoder -> controller. ID 0x01, opcode 0x72. 14 data bytes: system status byte (byte 1), disc type (byte 2), sampling frequency (byte 3), transport state (byte 4), audio format (byte 5), chapter (byte 6), title/track (byte 7), time hours/format (byte 8), time minutes (byte 9), time seconds (byte 10), angle (byte 11), repeat/random mode (byte 12), audio channel config (byte 13), video status (byte 14). Sent periodically when auto-status is enabled (default). Decoder does not expect ack."
  query_command: "0xFE          2          0x02         0x52         -------        0x56"

- id: software_version
  label: Software Version
  type: object
  description: "Decoder -> controller. ID 0x01, opcode 0x73. Four bytes: Cirrus code major, middle, minor, revision number (e.g. 1.2.3.4 = Cirrus 1.2.3, revision 4). Sent in response to Get Software Version."
  query_command: "0xFE          2          0x02         0x50         -------        0x54"

- id: mp3_track_name
  label: MP3 Track Name
  type: string
  description: "Decoder -> controller. ID 0x01, opcode 0x6D. Up to 50 data bytes plus null terminator (Data[0-50]). Sent to controller for VFD display during MP3 playback."

- id: memory_read_result
  label: Memory Read Result
  type: object
  description: "Decoder -> controller. ID 0x01, opcode 0x84. Four data bytes (MSB..LSB) containing memory contents from previous Memory Read command. Sent in response to Memory Read (debug)."
  query_command: "0xFE         6          0x02        0x83         Data           Varies"

- id: device_get_result
  label: Device Get Result
  type: object
  description: "Source 6.3.3: opcode 0x2D sends the result of a previous Device Get in either direction (ID 0x01 from decoder, ID 0x02 from controller). Data[0] = device ID, Data[1] = parameter, Data[2] = device data length, Data[3...n] = device data. Count varies with payload length. Device-specific result contents depend on the requested parameter; unspecified contents remain UNRESOLVED."
  query_command: "0xFE       Varies    0x01/0x02         0x2C          Data        Varies"

- id: unsolicited_error
  label: Unsolicited Error
  type: enum
  values: [invalid_region_code, operation_not_possible, unsupported_disc]
  description: "Decoder -> controller. ID 0x01, opcode 0x7E. Data[0] error code: 0=Invalid Region Code, 1=Operation Not Possible, 2=Unsupported Disc."

- id: transport_state
  label: Transport State
  type: enum
  values: [stop, play, pause, forward_step, reverse_step, forward_1_8, reverse_1_8, forward_1_4, reverse_1_4, forward_1_2, reverse_1_2, forward_2x, reverse_2x, forward_4x, reverse_4x, forward_8x, reverse_8x, forward_16x, reverse_16x, forward_30x, reverse_30x, forward_60x, reverse_60x, reading_new_disc]
  description: "From unsolicited status byte 4 of data payload. Codes 0-23."
  query_command: "0xFE          2          0x02         0x52         -------        0x56"

- id: disc_type
  label: Disc Type
  type: enum
  values: [dvd_video, dvd_audio, cdda, file, file_urd, update, bad, none, unknown, vcd]
  description: "From unsolicited status byte 2 of data payload. Codes 0-9."
  query_command: "0xFE          2          0x02         0x52         -------        0x56"

- id: audio_sampling_frequency
  label: Audio Sampling Frequency
  type: enum
  values: [unknown, fs_8000, fs_11025, fs_12000, fs_16000, fs_22050, fs_24000, fs_32000, fs_44100, fs_48000, fs_64000, fs_88200, fs_96000, fs_128000, fs_176400, fs_192000, spdif]
  description: "From unsolicited status byte 3 of data payload. Codes 0-16."
  query_command: "0xFE          2          0x02         0x52         -------        0x56"

- id: audio_format
  label: Audio Format
  type: enum
  values: [unknown, ac3, mpeg1, mpeg2, pcm, dts, sdds, mp3, wma, dvd_audio_pcm, mlp, aac, png, hdcd, mp3enc, none]
  description: "From unsolicited status byte 5 of data payload. Codes 0-15."
  query_command: "0xFE          2          0x02         0x52         -------        0x56"

- id: repeat_random_mode
  label: Repeat / Random Mode
  type: enum
  values: [off, repeat_set_a, repeat_ab, repeat_disc, repeat_title, repeat_chapter, repeat_track, random_title, random_chapter, random_track]
  description: "From unsolicited status byte 12 of data payload. Codes 0-9."
  query_command: "0xFE          2          0x02         0x52         -------        0x56"

- id: audio_channel_configuration
  label: Audio Channel Configuration
  type: object
  description: "From unsolicited status byte 13 of data payload. Bits 0-3 = input channel configuration (0=dual mono 1/0+1/0, 1=mono 1/0, 2=L,R 2/0, 3=L,C,R 3/0, 4=L,R,S 2/1, 5=L,C,R,S 3/1, 6=L,R,Ls,Rs 2/2, 7=L,C,R,Ls,Rs 3/2). Bit 7 = LFE input (0=absent, 1=present)."
  query_command: "0xFE          2          0x02         0x52         -------        0x56"

- id: video_status
  label: Video Status
  type: object
  description: "From unsolicited status byte 14 of data payload. Bits 0-1 = aspect ratio (0=16:9 WS, 1=4:3 LB, 2=4:3 PS). Bit 2 = composite (0=off, 1=on). Bit 3 = output format (0=NTSC, 1=PAL). Bit 4 = CDDA navigator queue (0=empty, 1=full)."
  query_command: "0xFE          2          0x02         0x52         -------        0x56"

- id: system_status
  label: System Status
  type: object
  description: "From unsolicited status byte 1 of data payload. Bit 0 = power (0=off, 1=on). Bit 1 = disc (0=no disc, 1=disc). Bit 2 = drawer (0=open, 1=closed). Bit 3 = OSD slider bar (0=off, 1=on). Bit 4 = OSD status bar (0=off, 1=on). Bit 5 = digital audio output (0=DVD audio, 1=encoded). Bit 6 = skipping (0=not skipping, 1=skipping). Bit 7 = OSD menu (0=off, 1=on)."
  query_command: "0xFE          2          0x02         0x52         -------        0x56"
```

## Events
```yaml
- id: command_ack_event
  label: Command Acknowledgement
  description: "Sent by decoder after every received command. Status: pass / fail (bad checksum) / busy (queue full) / not supported. See Feedbacks.command_ack."

- id: unsolicited_status_event
  label: Periodic Status Update
  description: "Sent by decoder when auto-status is enabled (default). 14 data bytes describing system, disc, audio, time, repeat, video state. Decoder does not require ack. See Feedbacks.unsolicited_status."

- id: mp3_track_name_event
  label: MP3 Track Name
  description: "Sent by decoder to controller for VFD display during MP3 playback. Up to 50 bytes + null. See Feedbacks.mp3_track_name."

- id: unsolicited_error_event
  label: Unsolicited Error
  description: "Sent by decoder for region, operation, or disc errors. See Feedbacks.unsolicited_error."

- id: software_version_event
  label: Software Version Reply
  description: "Sent by decoder in response to Get Software Version command. Four bytes (Cirrus major/minor/minor + revision)."

- id: status_timer_expired_internal
  label: Status Timer Expired
  description: "Internal use only. Decoder -> decoder serial task notification that auto-status timer fired (ID 0x01, opcode 0x5D)."

- id: show_source_internal
  label: Show Source
  description: "Internal use only. Decoder -> decoder serial task notification that the active source was set (ID 0x01, opcode 0x5E)."

- id: mcu_menu_up_internal
  label: MCU Menu Up
  description: "Internal use only. Decoder -> decoder serial task notification that OSD menu is active (ID 0x01, opcode 0x74)."

- id: mcu_status_bar_up_internal
  label: MCU Status Bar Up
  description: "Internal use only. Decoder -> decoder serial task notification that OSD status bar is active (ID 0x01, opcode 0x75)."

- id: mcu_restrict_content_on_internal
  label: MCU Restrict Content On
  description: "Internal use only. Decoder -> decoder serial task notification to begin restricting un-rated content (ID 0x01, opcode 0x76)."

- id: mcu_restrict_content_off_internal
  label: MCU Restrict Content Off
  description: "Internal use only. Decoder -> decoder serial task notification to stop restricting content (ID 0x01, opcode 0x77)."

- id: unrated_disc_inserted
  label: Un-rated Disc Inserted
  description: "Controller -> decoder (ID 0x02, opcode 0x0B). Notifies of un-rated disc insertion. Internal use only when OSD is on the decoder board; external use when OSD is on the external controller."
```

## Macros
```yaml
- id: system_startup_sync
  label: System Startup Synchronization
  description: "External controller sends repeated 'Is Alive' commands until a Command Acknowledgement is received. Only then may normal commands proceed. Default behavior is auto-status ON (decoder emits periodic unsolicited status)."
  steps:
    - send: "FE 02 02 80 84"
    - wait_for: command_ack_event
    - on_timeout: "Retry 'Is Alive' until response. Source 7.4: if no ack after pre-determined timeout interval, begin re-issuing 'Is Alive' to verify decoder health; if no response after a pre-determined count, assume decoder is offline. Exception: decoder in firmware update mode will not ack any command."
```

## Safety
```yaml
confirmation_required_for:
  - restore_factory_defaults  # source 6.1.14: only valid when no disc in drive
interlocks:
  - "Do not reset decoder board during firmware update; it will not acknowledge commands and will appear unresponsive. (Source 6.1.86 / 7.4)"
  - "Frame Forward command requires system to be in Pause mode; ignored otherwise. (Source 6.1.15)"
  - "Restore Factory Defaults only valid when no disc is in the drive. (Source 6.1.14)"
  - "Angle Toggle command is only valid for DVDV discs with multi-angle scenes; ignored if any OSD is present. (Source 6.1.12)"
  - "External controller must receive a Command Acknowledgement for each issued command; if not, time out and re-issue Is Alive to confirm decoder health. (Source 7.4)"
  - "If decoder does not acknowledge a request, it times out and re-issues the request; meanwhile it rejects new commands and ACKs them with 'busy' status. (Source 7.5)"
  - "Set Volume Level and Set Mute Mode only update the OSD status bar; they do not actually change decoder-board analog volume or mute state. (Source 6.1.61, 6.1.64)"
  - "Help command only valid when the settings-level OSD menu is active. (Source 6.1.30)"
```

## Notes
- Source documents: Rotel first-party RS232 protocol PDF (`RDV1092 Protocol.pdf`, 200 OK on rotel.com) plus the embedded Videon Central CS98200 Serial Interface Design Specification (rev 1.22, 2005/05/19). The Rotel-published "RDV 1092 / RDV 1093 RS232 Controller Command List" is a subset of the underlying CS98200 command space; this spec enumerates both Rotel's published subset and the full CS98200 command set with hex bytes verbatim from the spec, except that the conflicting Set Mute Mode wire command remains UNRESOLVED.
- Frame format: `0xFE | COUNT | ID | OPCODE | [DATA1..DATA_n] | CHECKSUM`. Standard commands = 5 bytes (count = 0x02, no data); Data commands vary by data length. Checksum = sum of COUNT through last data byte, masked to 0xFF.
- ID byte: 0x01 = decoder -> controller, 0x02 = controller -> decoder. 0x00 reserved. Set Mute Mode is UNRESOLVED because its table in source 6.1.64 lists ID 0x01 despite its placement in the controller-to-decoder command list; the Rotel table supplies no resolving entry.
- Rotel RS232 command list omits: Help (0x1F), Un-rated Disc (0x0B), OSD Menu Hide internal (0x42), Configure Serial Interface (0x43), Set Volume Level (0x45), Set Mute Mode (0x4B), Initialize External Data (0x4D), Parental Lock internal (0x4E), Display Password (0x4F), Get Software Version (0x50), Disable Auto-Status (0x51), Get Status (0x52), Enable Auto-Status (0x53), Request Acknowledgement (0x54), Set Audio Format (0x5B), Status Timer Expired internal (0x5D), Show Source internal (0x5E), Is Alive (0x80), Repeat Last Message (0x81), Memory Write debug (0x82), Memory Read debug (0x83), DLIST Next/Previous/Go-To/Home (0x78/0x79/0x7A/0x7B), MemSet/MemRecall (0x7C/0x7D), Device Set/Get (0x2B/0x2C), Device Send Get Result (0x2D), and the Set TV Mode (0x3B). These are included here per the underlying CS98200 spec, with Device Send Get Result represented as Feedbacks.device_get_result and Set Mute Mode's wire command UNRESOLVED, but a Rotel-published integrator should be aware that the unit's response surface may be narrower.
- RDV-1092 shares the Computer I/O behavior with RDV-1093 (Rotel table covers both models).
- UART electrical: LVTTL RS-232 via MAX232 transceiver; RX and TX only, no CTS/RTS (source 8.1).
- Several "internal use only" messages (0x42, 0x4E, 0x5D, 0x5E, 0x74, 0x75, 0x76, 0x77) are decoder-internal signals and are not useful to a third-party controller.
- "Initialize External Data" (0x4D) source marks payload as `<TBD>` - exact data length and bytes not specified.
- "Device Set" / "Device Get" (0x2B / 0x2C) use generic device/parameter addressing; parameter list and behaviors are in the CS98200 Device Interface Specification, not in the Serial Interface Design Specification. Only Video Format, Memory Access, Audio Hardware Status, and Video DAC Control are explicitly enumerated in the supplied source.
- Auto-status default is ON. Disable via Disable Auto-Status (0x51); re-enable via Enable Auto-Status (0x53); one-shot poll via Get Status (0x52).
<!-- UNRESOLVED: IP/Ethernet control not documented in the supplied source. -->
<!-- UNRESOLVED: Port number, auth credentials, and network configuration are not described in the supplied source. -->
<!-- UNRESOLVED: Voltage, current, and power specifications not stated. -->
<!-- UNRESOLVED: Firmware version compatibility range not stated. -->
<!-- UNRESOLVED: Initialize External Data (0x4D) payload length and bytes marked <TBD> in source. -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RDV1092%20Protocol.pdf"
  - https://www.rotel.com/manuals-resources/rs232-protocols
retrieved_at: 2026-07-25T13:57:27.838Z
last_checked_at: 2026-10-07T16:11:48.124Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T16:11:48.124Z
matched_actions: 107
action_count: 107
confidence: medium
summary: "All 107 action units match source opcodes and checksums and serial parameters are confirmed; only device-parameter sub-tables (about 4) are unmodeled, within the 0.9 floor. (19 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "IP/Ethernet control, network port, and any other transport interfaces are not documented in the supplied source."
- "authentication requirements and any control-interface login procedure are not described in the supplied source."
- "source 6.1.64 lists count 3, ID 0x01 and opcode 0x4B, but sections 5.1.3 and 6.1 identify controller commands with ID 0x02. The Rotel command list does not resolve this conflict. The applicable ID byte and complete wire command remain unresolved.\""
- "the ID byte used in this calculation is disputed in the source.\""
- "exact payload length and bytes not specified in source.\""
- "table count 13 conflicts with the described variable track-name payload.\""
- "complete wire encoding must resolve the source count/payload conflict.\""
- "parameter range not stated.\""
- "source 5.1.6 omits opcode from its checksum prose, while fixed-command tables include it.\""
- "version-component ranges not stated.\""
- "memory-content range not stated.\""
- "complete parameter range not stated.\""
- "range depends on the device and parameter.\""
- "contents depend on the requested device and parameter.\""
- "IP/Ethernet control not documented in the supplied source."
- "Port number, auth credentials, and network configuration are not described in the supplied source."
- "Voltage, current, and power specifications not stated."
- "Firmware version compatibility range not stated."
- "Initialize External Data (0x4D) payload length and bytes marked <TBD> in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
