---
spec_id: admin/jandy-aqualink-rs
schema_version: ai4av-public-spec-v1
revision: 1
title: "Jandy AquaLink RS Control Spec"
manufacturer: Jandy
model_family: "Aqualink RS8"
aliases: []
compatible_with:
  manufacturers:
    - Jandy
  models:
    - "Aqualink RS8"
    - "Aqualink RS12"
    - "Aqualink RS16"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - github.com
source_urls:
  - https://github.com/aqualinkd/AqualinkD/blob/master/JANDY_RS485_PROTOCOL.md
  - https://github.com/aqualinkd/AqualinkD/raw/refs/heads/master/JANDY_RS485_PROTOCOL.md
retrieved_at: 2026-06-02T02:18:33.684Z
last_checked_at: 2026-06-02T08:25:20.670Z
generated_at: 2026-06-02T08:25:20.670Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Pentair sub-protocol present on same bus but listed for reference only. Firmware version of controller not stated."
  - "source describes packet-level patterns but no explicit multi-step macro sequences named as such."
  - "source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements."
  - "firmware version compatibility not stated. Source originates from reverse-engineering AqualinkD project, not an official Jandy protocol document."
verification:
  verdict: verified
  checked_at: 2026-06-02T08:25:20.670Z
  matched_actions: 45
  action_count: 45
  confidence: medium
  summary: "All 45 spec actions map one-to-one to command tokens present verbatim in the source; transport parameters match exactly; source catalogue is fully covered. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Jandy AquaLink RS Control Spec

## Summary
Jandy AquaLink RS pool/spa controller talks RS485 to a bus of equipment (SWG, ePumps, heaters, lights, chem feeders, panels). This spec covers the Jandy DLE/STX/ETX framed protocol at 9600 8N1, including the bus-side device IDs and per-device command sets.

<!-- UNRESOLVED: Pentair sub-protocol present on same bus but listed for reference only. Firmware version of controller not stated. -->

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
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred from status query commands (0x02, 0x0D, 0x1F, 0x16, 0x07, 0x13)
- levelable  # inferred from SWG percent, ePump RPM/Watts, heater, light commands
- routable  # inferred from iAqualinkTouch page navigation + PDA menu commands
```

## Actions
```yaml
# === Core Jandy frame envelope ===
# All Jandy-protocol actions share the envelope:
#   [DLE 0x10] [STX 0x02] [DEST] [CMD] [DATA...] [CHKSUM] [DLE 0x10] [ETX 0x03]
# CHKSUM = (sum of DEST..last DATA byte) & 0xFF
# A 0x10 appearing in DATA is escaped as 0x10 0x00 (skip extra 0x00 on receive).
# Each action below lists DEST, CMD, DATA, then the literal payload with a placeholder checksum.

# --- Core commands (CMD byte 0x00-0x09) ---
- id: probe
  label: Probe (poll device)
  kind: action
  command: "10 02 {dest} 00 {chksum} 10 03"
  params:
    - name: dest
      type: integer
      description: Target device ID (0x00 = master; 0x08-0xF4 per device table)
  notes: CMD_PROBE (0x00). Polling/probe message.

- id: send_ack
  label: Send ACK response
  kind: action
  command: "10 02 00 01 80 00 {chksum} 10 03"
  params: []
  notes: CMD_ACK (0x01) with ACK_NORMAL (0x80), no command echoed. To acknowledge received packet to master (DEST=0x00).

- id: ack_screen_busy_scroll
  label: ACK (screen busy, cache next)
  kind: action
  command: "10 02 00 01 81 00 {chksum} 10 03"
  params: []
  notes: CMD_ACK with ACK_SCREEN_BUSY_SCROLL (0x81).

- id: ack_screen_busy_block
  label: ACK (screen busy, block)
  kind: action
  command: "10 02 00 01 83 00 {chksum} 10 03"
  params: []
  notes: CMD_ACK with ACK_SCREEN_BUSY_BLOCK (0x83).

- id: status
  label: Status (display panels)
  kind: action
  command: "10 02 {dest} 02 {chksum} 10 03"
  params:
    - name: dest
      type: integer
      description: Panel device ID
  notes: CMD_STATUS (0x02). Status info for display panels.

- id: message_short
  label: Display message (16 bytes)
  kind: action
  command: "10 02 {dest} 03 {message16} {chksum} 10 03"
  params:
    - name: dest
      type: integer
      description: Target device ID
    - name: message16
      type: string
      description: Up to 16 bytes of message payload
  notes: CMD_MSG (0x03). Display 16-byte message.

- id: message_long
  label: Display message (128 bytes)
  kind: action
  command: "10 02 {dest} 04 {message128} {chksum} 10 03"
  params:
    - name: dest
      type: integer
      description: Target device ID
    - name: message128
      type: string
      description: Up to 128 bytes of message payload
  notes: CMD_MSG_LONG (0x04).

- id: message_loop_start
  label: Message loop start
  kind: action
  command: "10 02 00 08 {chksum} 10 03"
  params: []
  notes: CMD_MSG_LOOP_ST (0x08). Sent by device to mark start of message loop cycle.

# --- Aquapure SWG (device IDs 0x50-0x53) ---
- id: swg_set_percent
  label: Set SWG chlorine generation percent
  kind: action
  command: "10 02 {swg_id} 11 {percent} {chksum} 10 03"
  params:
    - name: swg_id
      type: integer
      description: Aquapure device ID (0x50-0x53)
    - name: percent
      type: integer
      description: "0-100 percent; >100 (e.g. 0x65=101) enters boost mode; 0xFF=all-on service mode"
  notes: CMD_PERCENT (0x11). Example 75%: 10 02 50 11 4B 72 10 03.

- id: swg_query_ppm
  label: Query SWG PPM and status
  kind: action
  command: "10 02 {swg_id} 02 {chksum} 10 03"
  params:
    - name: swg_id
      type: integer
      description: Aquapure device ID (0x50-0x53)
  notes: CMD_STATUS (0x02) to SWG. Response: 10 02 00 16 PPM VAL STATUS chksum 10 03. PPM = PPM_VAL * 100. STATUS per SWG status byte table.

# --- ePump variable speed (device IDs 0x78-0x7B standard; 0xE0-0xE3 panel rev W+) ---
- id: epump_set_watts
  label: Set ePump Watts
  kind: action
  command: "10 02 {pump_id} 45 00 {hi_watts} {lo_watts} {chksum} 10 03"
  params:
    - name: pump_id
      type: integer
      description: ePump device ID (0x78-0x7B or 0xE0-0xE3)
    - name: hi_watts
      type: integer
      description: High byte of 16-bit watts
    - name: lo_watts
      type: integer
      description: Low byte of 16-bit watts
  notes: CMD_EPUMP_WATTS (0x45). Watts = hi*256 + lo. Example 1309W: 10 02 78 45 00 05 1D chksum 10 03.

- id: epump_set_rpm
  label: Set ePump RPM
  kind: action
  command: "10 02 {pump_id} 44 00 {hi_rpm} {lo_rpm} {chksum} 10 03"
  params:
    - name: pump_id
      type: integer
      description: ePump device ID
    - name: hi_rpm
      type: integer
      description: High byte of 16-bit RPM
    - name: lo_rpm
      type: integer
      description: Low byte of 16-bit RPM
  notes: CMD_EPUMP_RPM (0x44). RPM = hi*256 + lo.

- id: epump_status_request
  label: Request ePump status
  kind: action
  command: "10 02 {pump_id} 1F {chksum} 10 03"
  params:
    - name: pump_id
      type: integer
      description: ePump device ID
  notes: CMD_EPUMP_STATUS (0x1F). Bidirectional. Response structure: 10 02 00 1F Orig_CMD 0x00 Hi_W Lo_W Hi_RPM Lo_RPM ... chksum 10 03. Watts at bytes 7-8, RPM at bytes 9-10.

# --- JXi Heater (device IDs 0x68-0x6B) ---
- id: jxi_ping
  label: JXi heater ping
  kind: action
  command: "10 02 {heater_id} 0C {chksum} 10 03"
  params:
    - name: heater_id
      type: integer
      description: JXi heater device ID (0x68-0x6B)
  notes: CMD_JXI_PING (0x0C). Poll heater status.

- id: jxi_query_status
  label: JXi heater status
  kind: action
  command: "10 02 {heater_id} 0D {chksum} 10 03"
  params:
    - name: heater_id
      type: integer
      description: JXi heater device ID
  notes: CMD_JXI_STATUS (0x0D). Byte 6 == 0x10 indicates error condition. Example: 10 02 00 0D 00 00 00 1F 10 03.

# --- LX Heater (device IDs 0x38-0x3B) ---
- id: lx_ping
  label: LX heater ping
  kind: action
  command: "10 02 {heater_id} 0C {chksum} 10 03"
  params:
    - name: heater_id
      type: integer
      description: LX heater device ID (0x38-0x3B)
  notes: Same command as JXi ping, different device ID range.

- id: lx_query_status
  label: LX heater status
  kind: action
  command: "10 02 {heater_id} 0D {chksum} 10 03"
  params:
    - name: heater_id
      type: integer
      description: LX heater device ID
  notes: CMD_JXI_STATUS (0x0D) reused. Example: 10 02 00 0A 00 00 00 1F 10 03.

# --- iAqualinkTouch panels (device IDs 0x30-0x33) ---
- id: iaq_page_start
  label: iAqualinkTouch page start
  kind: action
  command: "10 02 {panel_id} 23 {chksum} 10 03"
  params:
    - name: panel_id
      type: integer
      description: iAqualinkTouch device ID (0x30-0x33)
  notes: CMD_IAQ_PAGE_START (0x23). Begin new menu page.

- id: iaq_page_button
  label: iAqualinkTouch page button
  kind: action
  command: "10 02 {panel_id} 24 {button_data} {chksum} 10 03"
  params:
    - name: panel_id
      type: integer
      description: iAqualinkTouch device ID
    - name: button_data
      type: string
      description: Button definition payload
  notes: CMD_IAQ_PAGE_BUTTON (0x24).

- id: iaq_page_message
  label: iAqualinkTouch page message
  kind: action
  command: "10 02 {panel_id} 25 {message_data} {chksum} 10 03"
  params:
    - name: panel_id
      type: integer
      description: iAqualinkTouch device ID
    - name: message_data
      type: string
      description: Page text/content payload
  notes: CMD_IAQ_PAGE_MSG (0x25).

- id: iaq_table_message
  label: iAqualinkTouch table message
  kind: action
  command: "10 02 {panel_id} 26 {table_data} {chksum} 10 03"
  params:
    - name: panel_id
      type: integer
      description: iAqualinkTouch device ID
    - name: table_data
      type: string
      description: Table data payload
  notes: CMD_IAQ_TABLE_MSG (0x26).

- id: iaq_page_end
  label: iAqualinkTouch page end
  kind: action
  command: "10 02 {panel_id} 28 {chksum} 10 03"
  params:
    - name: panel_id
      type: integer
      description: iAqualinkTouch device ID
  notes: CMD_IAQ_PAGE_END (0x28). Page complete.

- id: iaq_startup
  label: iAqualinkTouch startup
  kind: action
  command: "10 02 {panel_id} 29 {chksum} 10 03"
  params:
    - name: panel_id
      type: integer
      description: iAqualinkTouch device ID
  notes: CMD_IAQ_STARTUP (0x29).

- id: iaq_poll
  label: iAqualinkTouch poll (ready)
  kind: action
  command: "10 02 {panel_id} 30 {chksum} 10 03"
  params:
    - name: panel_id
      type: integer
      description: iAqualinkTouch device ID
  notes: CMD_IAQ_POLL (0x30). Panel ready to receive.

- id: iaq_ctrl_ready
  label: iAqualinkTouch control ready
  kind: action
  command: "10 02 {panel_id} 31 {chksum} 10 03"
  params:
    - name: panel_id
      type: integer
      description: iAqualinkTouch device ID
  notes: CMD_IAQ_CTRL_READY (0x31). Ready for big control command.

- id: iaq_page_continue
  label: iAqualinkTouch page continue
  kind: action
  command: "10 02 {panel_id} 40 {chksum} 10 03"
  params:
    - name: panel_id
      type: integer
      description: iAqualinkTouch device ID
  notes: CMD_IAQ_PAGE_CONTINUE (0x40). More pages follow.

- id: iaq_msg_long
  label: iAqualinkTouch long message (popup)
  kind: action
  command: "10 02 {panel_id} 2C {message} {chksum} 10 03"
  params:
    - name: panel_id
      type: integer
      description: iAqualinkTouch device ID
    - name: message
      type: string
      description: Popup message payload
  notes: CMD_IAQ_MSG_LONG (0x2C).

- id: iaq_main_status
  label: iAqualinkTouch main status
  kind: action
  command: "10 02 {panel_id} 70 {status_data} {chksum} 10 03"
  params:
    - name: panel_id
      type: integer
      description: iAqualinkTouch device ID
    - name: status_data
      type: string
      description: "100+ byte main status payload"
  notes: CMD_IAQ_MAIN_STATUS (0x70). Large status, full system view.

- id: iaq_1touch_status
  label: iAqualinkTouch OneTouch status
  kind: action
  command: "10 02 {panel_id} 71 {status_data} {chksum} 10 03"
  params:
    - name: panel_id
      type: integer
      description: iAqualinkTouch device ID
    - name: status_data
      type: string
      description: OneTouch emulation status payload
  notes: CMD_IAQ_1TOUCH_STATUS (0x71).

- id: iaq_aux_status
  label: iAqualinkTouch auxiliary status
  kind: action
  command: "10 02 {panel_id} 72 {aux_data} {chksum} 10 03"
  params:
    - name: panel_id
      type: integer
      description: iAqualinkTouch device ID
    - name: aux_data
      type: string
      description: "Large auxiliary equipment status (pumps, heaters, etc.)"
  notes: CMD_IAQ_AUX_STATUS (0x72).

- id: iaq_cmd_ready
  label: iAqualinkTouch command ready
  kind: action
  command: "10 02 {panel_id} 73 {chksum} 10 03"
  params:
    - name: panel_id
      type: integer
      description: iAqualinkTouch device ID
  notes: CMD_IAQ_CMD_READY (0x73).

- id: iaq_title_message
  label: iAqualinkTouch title message
  kind: action
  command: "10 02 {panel_id} 2D {title} {chksum} 10 03"
  params:
    - name: panel_id
      type: integer
      description: iAqualinkTouch device ID
    - name: title
      type: string
      description: Product name/title payload
  notes: CMD_IAQ_TITLE_MESSAGE (0x2D).

# --- PDA / AquaPalm (device IDs 0x60-0x63) ---
- id: pda_cmd_0x04
  label: PDA command 0x04 (menu building)
  kind: action
  command: "10 02 {pda_id} 04 {data} {chksum} 10 03"
  params:
    - name: pda_id
      type: integer
      description: PDA device ID (0x60-0x63)
    - name: data
      type: string
      description: Menu payload
  notes: CMD_PDA_0x04. Purpose not fully documented.

- id: pda_cmd_0x05
  label: PDA command 0x05
  kind: action
  command: "10 02 {pda_id} 05 {data} {chksum} 10 03"
  params:
    - name: pda_id
      type: integer
      description: PDA device ID
    - name: data
      type: string
      description: Payload bytes
  notes: CMD_PDA_0x05. Purpose unknown.

- id: pda_cmd_0x1b
  label: PDA command 0x1B
  kind: action
  command: "10 02 {pda_id} 1B {data} {chksum} 10 03"
  params:
    - name: pda_id
      type: integer
      description: PDA device ID
    - name: data
      type: string
      description: Payload bytes
  notes: CMD_PDA_0x1B. Purpose unknown.

- id: pda_highlight
  label: PDA highlight line
  kind: action
  command: "10 02 {pda_id} 08 {line} {chksum} 10 03"
  params:
    - name: pda_id
      type: integer
      description: PDA device ID
    - name: line
      type: integer
      description: Line number to highlight
  notes: CMD_PDA_HIGHLIGHT (0x08).

- id: pda_clear
  label: PDA clear display
  kind: action
  command: "10 02 {pda_id} 09 {chksum} 10 03"
  params:
    - name: pda_id
      type: integer
      description: PDA device ID
  notes: CMD_PDA_CLEAR (0x09).

- id: pda_shift_lines
  label: PDA shift display lines
  kind: action
  command: "10 02 {pda_id} 0F {shift} {chksum} 10 03"
  params:
    - name: pda_id
      type: integer
      description: PDA device ID
    - name: shift
      type: integer
      description: Line shift count
  notes: CMD_PDA_SHIFTLINES (0x0F).

- id: pda_highlight_chars
  label: PDA highlight characters
  kind: action
  command: "10 02 {pda_id} 10 {ch_start} {ch_count} {chksum} 10 03"
  params:
    - name: pda_id
      type: integer
      description: PDA device ID
    - name: ch_start
      type: integer
      description: Starting character index
    - name: ch_count
      type: integer
      description: Number of characters to highlight
  notes: CMD_PDA_HIGHLIGHTCHARS (0x10).

# --- RS Serial Adapter (device IDs 0x48-0x49) ---
- id: rssa_device_status
  label: RS Serial Adapter device status / error
  kind: action
  command: "10 02 {adapter_id} 13 {status_data} {chksum} 10 03"
  params:
    - name: adapter_id
      type: integer
      description: RS Serial Adapter device ID (0x48-0x49)
    - name: status_data
      type: string
      description: Status or error payload
  notes: RSSA_DEV_STATUS (0x13).

- id: rssa_device_ready
  label: RS Serial Adapter device ready
  kind: action
  command: "10 02 {adapter_id} 07 {chksum} 10 03"
  params:
    - name: adapter_id
      type: integer
      description: RS Serial Adapter device ID
  notes: RSSA_DEV_READY (0x07). Ready to receive command.

# --- Pentair protocol (separate framing, same bus) ---
- id: pentair_set_speed
  label: Pentair pump set speed
  kind: action
  command: "FF 00 FF A5 {from} {pump_dest} 01 {len} {speed_data} {cksum_hi} {cksum_lo}"
  params:
    - name: from
      type: integer
      description: Source device ID (master = 0x10)
    - name: pump_dest
      type: integer
      description: Pentair pump device ID (0x60-0x6F)
    - name: len
      type: integer
      description: Data length byte
    - name: speed_data
      type: string
      description: RPM or GPM speed payload
    - name: cksum_hi
      type: integer
      description: 16-bit checksum high byte (sum of CMD..last DATA)
    - name: cksum_lo
      type: integer
      description: 16-bit checksum low byte
  notes: PEN_CMD_SPEED (0x01). Pentair framing differs from Jandy.

- id: pentair_remote_control
  label: Pentair pump remote control
  kind: action
  command: "FF 00 FF A5 {from} {pump_dest} 04 {len} {data} {cksum_hi} {cksum_lo}"
  params:
    - name: from
      type: integer
      description: Source device ID
    - name: pump_dest
      type: integer
      description: Pentair pump device ID
    - name: len
      type: integer
      description: Data length
    - name: data
      type: string
      description: Remote control payload
    - name: cksum_hi
      type: integer
      description: Checksum high
    - name: cksum_lo
      type: integer
      description: Checksum low
  notes: PEN_CMD_REMOTECTL (0x04).

- id: pentair_set_power
  label: Pentair pump set power
  kind: action
  command: "FF 00 FF A5 {from} {pump_dest} 06 {len} {power_data} {cksum_hi} {cksum_lo}"
  params:
    - name: from
      type: integer
      description: Source device ID
    - name: pump_dest
      type: integer
      description: Pentair pump device ID
    - name: len
      type: integer
      description: Data length
    - name: power_data
      type: string
      description: "ON/OFF payload"
    - name: cksum_hi
      type: integer
      description: Checksum high
    - name: cksum_lo
      type: integer
      description: Checksum low
  notes: PEN_CMD_POWER (0x06).

- id: pentair_status
  label: Pentair pump status
  kind: action
  command: "FF 00 FF A5 {from} {pump_dest} 07 {len} {data} {cksum_hi} {cksum_lo}"
  params:
    - name: from
      type: integer
      description: Source device ID
    - name: pump_dest
      type: integer
      description: Pentair pump device ID
    - name: len
      type: integer
      description: Data length
    - name: data
      type: string
      description: Status payload
    - name: cksum_hi
      type: integer
      description: Checksum high
    - name: cksum_lo
      type: integer
      description: Checksum low
  notes: PEN_CMD_STATUS (0x07). Bidirectional.
```

## Feedbacks
```yaml
- id: swg_status
  type: enum
  values:
    - on
    - no_flow
    - low_salt
    - high_salt
    - clean_cell
    - turning_off
    - high_current
    - low_volts
    - low_temp
    - check_pcb
    - gen_fault
    - unknown
    - off
  description: SWG_STATUS_* byte returned in CMD_PPM response (0x00=ON, 0x01=NO_FLOW, 0x02=LOW_SALT, 0x04=HI_SALT, 0x08=CLEAN_CELL, 0x09=TURNING_OFF, 0x10=HIGH_CURRENT, 0x20=LOW_VOLTS, 0x40=LOW_TEMP, 0x80=CHECK_PCB, 0xFD=GENFAULT, 0xFE=UNKNOWN, 0xFF=OFF).

- id: swg_ppm
  type: integer
  description: PPM value reported by SWG. Actual PPM = returned PPM_VAL byte * 100.

- id: epump_watts
  type: integer
  description: ePump current watts. Decoded as (status_byte_8 * 256) + status_byte_7.

- id: epump_rpm
  type: integer
  description: ePump current RPM. Decoded as (status_byte_10 * 256) + status_byte_11.

- id: jxi_error
  type: boolean
  description: "True when JXi status byte 6 == 0x10 indicates error condition."

- id: ack_type
  type: enum
  values:
    - normal
    - screen_busy_scroll
    - screen_busy_block
  description: ACK response type (0x80 normal, 0x81 screen busy cache next, 0x83 screen busy block).
```

## Variables
```yaml
# Per-action parameters that take ranges:
- id: swg_percent
  type: integer
  range: "0-255"
  description: "0-100 normal percent; >100 boost mode; 0xFF service all-on mode."
- id: epump_watts_value
  type: integer
  range: "0-65535"
  description: 16-bit watts value, hi then lo byte.
- id: epump_rpm_value
  type: integer
  range: "0-65535"
  description: 16-bit RPM value, hi then lo byte.
- id: frame_delay_ms
  type: integer
  description: Configurable inter-packet delay (milliseconds) to prevent bus collisions.
- id: ftdi_low_latency
  type: boolean
  description: Enable ASYNC_LOW_LATENCY ioctl for FTDI adapters.
```

## Events
```yaml
# Unsolicited notifications the device sends on the bus:
- id: msg_loop_start
  trigger: "0x10 0x02 0x00 0x08 {chksum} 0x10 0x03"
  description: CMD_MSG_LOOP_ST (0x08). Sent by panel when using 0x80 ACK variant to mark loop start.

- id: swg_ppm_update
  trigger: "0x10 0x02 0x00 0x16 {ppm_val} {status} {chksum} 0x10 0x03"
  description: CMD_PPM (0x16) sent by SWG with PPM and status. PPM_VAL is divided by 100 to get real PPM.

- id: epump_status_update
  trigger: "0x10 0x02 0x00 0x1F {orig_cmd} 0x00 {hi_w} {lo_w} {hi_rpm} {lo_rpm} ... {chksum} 0x10 0x03"
  description: CMD_EPUMP_STATUS (0x1F) sent by pump with current watts/RPM/pressure/temperature.

- id: jxi_status_update
  trigger: "0x10 0x02 0x00 0x0D ... {chksum} 0x10 0x03"
  description: CMD_JXI_STATUS (0x0D) sent by JXi heater. Byte 6 = 0x10 means error.

- id: onetouch_keypress
  trigger: "0x10 0x02 0x00 {key_code} {details} {chksum} 0x10 0x03"
  description: OneTouch keypress event. Key codes: UP=0x06, DOWN=0x05, SELECT=0x04, PAGE_UP/SELECT_1=0x03, BACK/SELECT_2=0x02, PAGE_DOWN/SELECT_3=0x01.
```

## Macros
```yaml
# UNRESOLVED: source describes packet-level patterns but no explicit multi-step macro sequences named as such.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
RS485 bus, multi-drop, 8N1 @ 9600 baud, no hardware/software flow control. Frame: DLE STX DEST CMD DATA... CHKSUM DLE ETX. Checksum = (sum of DEST..last DATA) & 0xFF. 0x10 in DATA escaped as 0x10 0x00 (parser skips extra 0x00). Known Jandy OneTouch long-message checksum bug: packets with packet[3]==0x04 && packet[4]==0x03 && packet[length-3]==0x0a have invalid checksums — accept with warning. AqualinkD v1.0 supports only one SWG despite protocol allowing 4 IDs (0x50-0x53). ePump extended IDs 0xE0-0xE3 require panel revision W+. iAqualinkTouch status packets (0x70, 0x71, 0x72) can exceed 128 bytes — buffer must handle up to 512. `frame_delay` ms minimum gap between bus writes. Pentair devices (0x60-0x6F, master 0x10) coexist on the same wire with their own FF 00 FF A5 framing and 16-bit checksum. Connection is half-duplex RS485; do not assume simultaneous TX/RX.

<!-- UNRESOLVED: firmware version compatibility not stated. Source originates from reverse-engineering AqualinkD project, not an official Jandy protocol document. -->

## Provenance

```yaml
source_domains:
  - github.com
source_urls:
  - https://github.com/aqualinkd/AqualinkD/blob/master/JANDY_RS485_PROTOCOL.md
  - https://github.com/aqualinkd/AqualinkD/raw/refs/heads/master/JANDY_RS485_PROTOCOL.md
retrieved_at: 2026-06-02T02:18:33.684Z
last_checked_at: 2026-06-02T08:25:20.670Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T08:25:20.670Z
matched_actions: 45
action_count: 45
confidence: medium
summary: "All 45 spec actions map one-to-one to command tokens present verbatim in the source; transport parameters match exactly; source catalogue is fully covered. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Pentair sub-protocol present on same bus but listed for reference only. Firmware version of controller not stated."
- "source describes packet-level patterns but no explicit multi-step macro sequences named as such."
- "source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements."
- "firmware version compatibility not stated. Source originates from reverse-engineering AqualinkD project, not an official Jandy protocol document."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
