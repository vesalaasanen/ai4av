---
spec_id: admin/denkovi-smartden-ip-16r-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denkovi SmartDen IP-16R Series Control Spec"
manufacturer: Denkovi
model_family: "SmartDen IP-16R"
aliases: []
compatible_with:
  manufacturers:
    - Denkovi
  models:
    - "SmartDen IP-16R"
    - "SmartDen IP-16R-MT"
    - "SmartDen IP-16R-MQ"
  firmware: "IP-16R v1.20 (May 2017); IP-16R-MT v1.21 (Jul 2020); IP-16R-MQ v1.21 (Sep 2020)"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - denkovi.com
source_urls:
  - http://denkovi.com/Documents/smartDen-IP-16R/Current-Version/UserManual.pdf
retrieved_at: 2026-04-30T04:31:35.492Z
last_checked_at: 2026-07-21T21:53:23.152Z
generated_at: 2026-07-21T21:53:23.152Z
firmware_coverage: "IP-16R v1.20 (May 2017); IP-16R-MT v1.21 (Jul 2020); IP-16R-MQ v1.21 (Sep 2020)"
protocol_coverage: []
known_gaps:
  - "source header table lists \"SNMPv2\" for IP-16R while Section 10.1 body states \"SNMPv1\"; discrepancy not resolved"
  - "Appendix 2 (full XML/JSON current_state reply formats) is referenced by the source but not reproduced in the excerpt"
  - "encrypted-MQTT topic protocol and password-encryption algorithm are \"available upon request\" — not in source"
  - "source lists \"Password: admin\" but no explicit username field; username inferred"
  - "no hardware interlock / power-sequencing warnings stated in source beyond the reboot guard above"
  - "source header table lists \"SNMPv2\" for IP-16R while Section 10.1 body states \"SNMPv1\""
  - "Appendix 2 (full XML/JSON current_state reply field formats) referenced but not reproduced in the source excerpt"
  - "MIB file itself not included in source (OID table above transcribed from Section 10.1 prose/tables)"
  - "encrypted-MQTT topic protocol and XML/JSON password-encryption algorithm are \"available upon request\" — not in source"
verification:
  verdict: verified
  checked_at: 2026-07-21T21:53:23.152Z
  matched_actions: 46
  action_count: 46
  confidence: medium
  summary: "All 46 spec actions have verbatim command tokens in source; transport verified; coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Denkovi SmartDen IP-16R Series Control Spec

## Summary
Web-enabled Ethernet-based 16-relay controller modules. Three variants share HTTP/XML/JSON control on TCP port 80 (default IP 192.168.1.100, default password `admin`): SmartDen IP-16R (SNMP), IP-16R-MT (Modbus-TCP), and IP-16R-MQ (MQTT V3.1.1). Each variant additionally exposes one integration protocol — SNMP (UDP 161), Modbus-TCP (502), or MQTT (1883) — documented below. Firmware versions are stated per-variant in the source header table.

<!-- UNRESOLVED: source header table lists "SNMPv2" for IP-16R while Section 10.1 body states "SNMPv1"; discrepancy not resolved -->
<!-- UNRESOLVED: Appendix 2 (full XML/JSON current_state reply formats) is referenced by the source but not reproduced in the excerpt -->
<!-- UNRESOLVED: encrypted-MQTT topic protocol and password-encryption algorithm are "available upon request" — not in source -->

## Transport
```yaml
protocols:
  - http          # all variants
  - udp           # SNMP (IP-16R only)
  - tcp           # Modbus-TCP (IP-16R-MT) and MQTT (IP-16R-MQ), variant-specific ports
addressing:
  base_url: http://192.168.1.100  # default; source 7.1 states configurable, DHCP disabled by default
  port: 80  # HTTP port (all variants). Variant-specific TCP/UDP ports documented below.
auth:
  type: password  # source describes login/password authentication
  default_credentials:
    username: admin  # UNRESOLVED: source lists "Password: admin" but no explicit username field; username inferred
    password: admin
# Variant-specific transport (source Section 7 default settings + Section 10):
#   SNMP       UDP   port 161  - IP-16R only - communities: read-only "public"/"read", read-write "private"/"write"
#   Modbus-TCP TCP   port 502  - IP-16R-MT only - slave/server; only ONE TCP socket at a time (source 8.13)
#   MQTT       TCP   port 1883 - IP-16R-MQ only - V3.1.1 client; Publish QoS 0; Keep Alive 120 s (source 8.14)
# SNMP OID prefix (replace "x" in OIDs below): .1.3.6.1.4.1.42505
```

## Traits
```yaml
- powerable      # relay on/off commands present (HTTP, SNMP, Modbus, MQTT)
- routable       # per-relay and all-relay (bitmap) control present
- queryable      # current_state.xml/json, SNMP snmpget, Modbus Read Coil/Registers return state
```

## Actions
```yaml
# =========================================================================
# HTTP/XML/JSON (all variants) - existing entries
# =========================================================================
- id: set_relay
  label: Set Relay State
  kind: action
  command: "GET /current_state.xml?Relay{relay}={state}&pw={pw}"
  params:
    - name: relay
      type: integer
      description: Relay number (1-16)
    - name: state
      type: integer
      description: "0 = OFF, 1 = ON"
  example: http://192.168.1.100/current_state.xml?Relay1=1&pw=admin

- id: set_all_relays
  label: Set All Relays
  kind: action
  command: "GET /current_state.xml?SetAll={value}&pw={pw}"
  params:
    - name: value
      type: integer
      description: "0-65535 bitmap; bit 0 = relay 1, bit 15 = relay 16"
  example: http://192.168.1.100/current_state.xml?SetAll=65535&pw=admin

- id: pulse_relay
  label: Generate Pulse
  kind: action
  command: "GET /current_state.xml?Pulse{relay}={duration}&pw={pw}  # IP-16R-MQ uses PulseOn{relay}"
  params:
    - name: relay
      type: integer
      description: Relay number (1-16)
    - name: duration
      type: integer
      description: "Pulse duration in ms × 100 (1-65535); e.g. 30 = 3 seconds"
  notes: Pulse_i param on IP-16R/IP-16R-MT; PulseOn_i on IP-16R-MQ
  example: http://192.168.1.100/current_state.xml?Pulse1=30&pw=admin

# IP-16R-MQ only - negative pulse
- id: pulse_off_relay
  label: Generate Negative Pulse
  kind: action
  command: "GET /current_state.json?PulseOff{relay}={duration}&pw={pw}"
  params:
    - name: relay
      type: integer
      description: Relay number (1-16)
    - name: duration
      type: integer
      description: "Pulse duration in ms × 100 (1-65535)"
  example: http://192.168.1.100/current_state.json?PulseOff1=30&pw=admin

# IP-16R-MQ only - relay description
- id: set_relay_description
  label: Set Relay Description
  kind: action
  command: "GET /current_state.json?Description{relay}={description}&pw={pw}"
  params:
    - name: relay
      type: integer
      description: Relay number (1-16)
    - name: description
      type: string
      description: "Max 7 characters"
  example: http://192.168.1.100/current_state.json?Description1=Relay1&pw=admin

# IP-16R-MT / IP-16R-MQ - set date/time
- id: set_datetime
  label: Set Date/Time
  kind: action
  command: "GET /current_state.xml?Date={date}&Time={time}&pw={pw}"
  params:
    - name: date
      type: string
      description: "Format dd/mm/yyyy"
    - name: time
      type: string
      description: "Format hh:mm"
  example: http://192.168.1.100/current_state.xml?Date=10%2F09%2F2020&Time=12%3A00&pw=admin

# =========================================================================
# SNMP (IP-16R only) - OIDs; prefix .1.3.6.1.4.1.42505 ; snmpget/snmpset only
# Source 10.1. Per-source rows preserved. Read-only = query; read-write = action.
# =========================================================================

# --- 10.1.1 Product (read-only) ---
- id: snmp_product_name
  label: SNMP Product Name
  kind: query
  command: ".1.3.6.1.4.1.42505.6.1.1.0"
  params: []
  notes: "DISPLAYSTRING. Description of the module."

- id: snmp_product_version
  label: SNMP Firmware Version
  kind: query
  command: ".1.3.6.1.4.1.42505.6.1.2.0"
  params: []
  notes: "DISPLAYSTRING. Current firmware version."

- id: snmp_product_date
  label: SNMP Firmware Build Date
  kind: query
  command: ".1.3.6.1.4.1.42505.6.1.3.0"
  params: []
  notes: "DISPLAYSTRING. Firmware build date."

# --- 10.1.2 Setup (read-write) ---
- id: snmp_system_date
  label: SNMP System Date
  kind: action
  command: ".1.3.6.1.4.1.42505.6.2.1.0"
  params:
    - name: value
      type: string
      description: "System Date, format dd/mm/yyyy"
  notes: "DISPLAYSTRING, read-write."

- id: snmp_system_time
  label: SNMP System Time
  kind: action
  command: ".1.3.6.1.4.1.42505.6.2.2.0"
  params:
    - name: value
      type: string
      description: "System Time, format hh:mm"
  notes: "DISPLAYSTRING, read-write."

- id: snmp_relay_name
  label: SNMP Relay Name
  kind: action
  command: ".1.3.6.1.4.1.42505.6.2.3.1.2.{i-1}"
  params:
    - name: i
      type: integer
      description: "Relay index 1..16; OID sub-index = i-1 (0..15)"
    - name: value
      type: string
      description: "Relay Name, max length 7"
  notes: "DISPLAYSTRING (SIZE 0..7), read-write."

- id: snmp_relay_state
  label: SNMP Relay State
  kind: action
  command: ".1.3.6.1.4.1.42505.6.2.3.1.3.{i-1}"
  params:
    - name: i
      type: integer
      description: "Relay index 1..16; OID sub-index = i-1 (0..15)"
    - name: value
      type: integer
      description: "INTEGER {off(0), on(1)}"
  notes: "Read-write. Sets/reads individual relay state."

- id: snmp_relay_set_pulse_period
  label: SNMP Relay Set Pulse Period
  kind: action
  command: ".1.3.6.1.4.1.42505.6.2.3.1.4.{i-1}"
  params:
    - name: i
      type: integer
      description: "Relay index 1..16; OID sub-index = i-1 (0..15)"
    - name: value
      type: integer
      description: "INTEGER32 (0..65535), ms x100"
  notes: "Read-write. Relay Set Pulse Period."

- id: snmp_relay_start_pulse
  label: SNMP Relay Start Pulse
  kind: action
  command: ".1.3.6.1.4.1.42505.6.2.3.1.5.{i-1}"
  params:
    - name: i
      type: integer
      description: "Relay index 1..16; OID sub-index = i-1 (0..15)"
    - name: value
      type: integer
      description: "INTEGER32 (0..65535), ms x100"
  notes: "Read-write. Relay Start Pulse."

# --- 10.1.3 Control ---
- id: snmp_relays_state
  label: SNMP All Relays State
  kind: action
  command: ".1.3.6.1.4.1.42505.6.3.1.0"
  params:
    - name: value
      type: integer
      description: "INTEGER32 (0..65535); bit0=Relay1 ... bit15=Relay16"
  notes: "Read-write. Access all relays with single command."

- id: snmp_reboot
  label: SNMP Reboot Device
  kind: action
  command: ".1.3.6.1.4.1.42505.6.3.2.0"
  params:
    - name: value
      type: integer
      description: "INTEGER (0..255) - set to ASCII decimal code of FIRST CHAR of web password (e.g. 'a' -> 97)"
  notes: "Read-write. SAFETY GUARD: reboot only fires when value = ASCII code of first char of Web password (source 10.1.3)."

- id: snmp_sysuptime
  label: SNMP sysUpTime
  kind: query
  command: ".1.3.6.1.4.1.42505.6.3.3.0"
  params: []
  notes: "TIMETICKS, read-only. Hundredths of a second since last re-initialization."

# --- 10.1.4 Week Schedule (read-write, 30 rows index 0..29) ---
- id: snmp_week_schedule_start_date
  label: SNMP Week Schedule Start Date
  kind: action
  command: ".1.3.6.1.4.1.42505.6.4.1.0"
  params:
    - name: value
      type: string
      description: "Start date, format dd/mm/yyyy"
  notes: "DISPLAYSTRING, read-write."

- id: snmp_ws_enabled
  label: SNMP Week Schedule Row Enable
  kind: action
  command: ".1.3.6.1.4.1.42505.6.4.2.1.2.{row}"
  params:
    - name: row
      type: integer
      description: "Row 0..29"
    - name: value
      type: integer
      description: "INTEGER {no(0), yes(1)}"
  notes: "Read-write. Row enable flag."

- id: snmp_ws_outputs
  label: SNMP Week Schedule Row Outputs
  kind: action
  command: ".1.3.6.1.4.1.42505.6.4.2.1.3.{row}"
  params:
    - name: row
      type: integer
      description: "Row 0..29"
    - name: value
      type: integer
      description: "INTEGER32 (0..65535); bit0=Output1 ... bit15=Output16"
  notes: "Read-write. Outputs code bitmap."

- id: snmp_ws_outputs_state
  label: SNMP Week Schedule Row Outputs State
  kind: action
  command: ".1.3.6.1.4.1.42505.6.4.2.1.4.{row}"
  params:
    - name: row
      type: integer
      description: "Row 0..29"
    - name: value
      type: integer
      description: "INTEGER32 (0..65535); off(0)/on(1) per bit"
  notes: "Read-write. Outputs state."

- id: snmp_ws_hour
  label: SNMP Week Schedule Row Hour
  kind: action
  command: ".1.3.6.1.4.1.42505.6.4.2.1.5.{row}"
  params:
    - name: row
      type: integer
      description: "Row 0..29"
    - name: value
      type: string
      description: "Hour, format hh:mm"
  notes: "DISPLAYSTRING, read-write."

- id: snmp_ws_weekdays
  label: SNMP Week Schedule Row WeekDays
  kind: action
  command: ".1.3.6.1.4.1.42505.6.4.2.1.6.{row}"
  params:
    - name: row
      type: integer
      description: "Row 0..29"
    - name: value
      type: integer
      description: "INTEGER (0..127); bit0=Sunday ... bit6=Saturday"
  notes: "Read-write. WeekDays code."

# --- 10.1.5 Auto-reboot (read-write unless noted) ---
- id: snmp_autoreboot_mode_enable
  label: SNMP Auto-reboot Mode Enable
  kind: action
  command: ".1.3.6.1.4.1.42505.6.5.1.0"
  params:
    - name: value
      type: integer
      description: "INTEGER {no(0), yes(1)}"

- id: snmp_ip_address_to_ping
  label: SNMP IP Address To Ping
  kind: action
  command: ".1.3.6.1.4.1.42505.6.5.2.0"
  params:
    - name: value
      type: string
      description: "IP address to monitor"
  notes: "DISPLAYSTRING (SIZE 0..23), read-write."

- id: snmp_interval_between_pings
  label: SNMP Interval Between Pings
  kind: action
  command: ".1.3.6.1.4.1.42505.6.5.3.0"
  params:
    - name: value
      type: integer
      description: "INTEGER32 (1..3600), seconds"

- id: snmp_ping_failures_before_reboot
  label: SNMP Ping Failures Before Reboot
  kind: action
  command: ".1.3.6.1.4.1.42505.6.5.4.0"
  params:
    - name: value
      type: integer
      description: "INTEGER32 (1..100)"

- id: snmp_ping_delay_after_reboot
  label: SNMP Ping Delay After Reboot
  kind: action
  command: ".1.3.6.1.4.1.42505.6.5.5.0"
  params:
    - name: value
      type: integer
      description: "INTEGER32 (1..3600), seconds"

- id: snmp_relay_number
  label: SNMP Auto-reboot Relay Number
  kind: action
  command: ".1.3.6.1.4.1.42505.6.5.6.0"
  params:
    - name: value
      type: integer
      description: "INTEGER32 (1..16)"

- id: snmp_powerup_pulse_enable
  label: SNMP Power-up Pulse Enable
  kind: action
  command: ".1.3.6.1.4.1.42505.6.5.7.0"
  params:
    - name: value
      type: integer
      description: "INTEGER {no(0), yes(1)}"

- id: snmp_powerup_pulse
  label: SNMP Power-up Pulse
  kind: action
  command: ".1.3.6.1.4.1.42505.6.5.8.0"
  params:
    - name: value
      type: integer
      description: "INTEGER32 (1..3600), seconds"

- id: snmp_reboot_pulse1_enable
  label: SNMP Reboot Pulse1 Enable
  kind: action
  command: ".1.3.6.1.4.1.42505.6.5.9.0"
  params:
    - name: value
      type: integer
      description: "INTEGER {no(0), yes(1)}"

- id: snmp_reboot_pulse1
  label: SNMP Reboot Pulse1
  kind: action
  command: ".1.3.6.1.4.1.42505.6.5.10.0"
  params:
    - name: value
      type: integer
      description: "INTEGER32 (1..3600), seconds"

- id: snmp_pulse1_to_pulse2_delay_enable
  label: SNMP Pulse1-to-Pulse2 Delay Enable
  kind: action
  command: ".1.3.6.1.4.1.42505.6.5.11.0"
  params:
    - name: value
      type: integer
      description: "INTEGER {no(0), yes(1)}"

- id: snmp_pulse1_to_pulse2_delay
  label: SNMP Pulse1-to-Pulse2 Delay
  kind: action
  command: ".1.3.6.1.4.1.42505.6.5.12.0"
  params:
    - name: value
      type: integer
      description: "INTEGER32 (1..3600), seconds"

- id: snmp_reboot_pulse2_enable
  label: SNMP Reboot Pulse2 Enable
  kind: action
  command: ".1.3.6.1.4.1.42505.6.5.13.0"
  params:
    - name: value
      type: integer
      description: "INTEGER {no(0), yes(1)}"

- id: snmp_reboot_pulse2
  label: SNMP Reboot Pulse2
  kind: action
  command: ".1.3.6.1.4.1.42505.6.5.14.0"
  params:
    - name: value
      type: integer
      description: "INTEGER32 (1..3600), seconds"

- id: snmp_auto_reboots_number
  label: SNMP Auto-reboots Number
  kind: query
  command: ".1.3.6.1.4.1.42505.6.5.15.0"
  params: []
  notes: "INTEGER32, read-only."

- id: snmp_last_auto_reboot_time
  label: SNMP Last Auto-reboot Time
  kind: query
  command: ".1.3.6.1.4.1.42505.6.5.16.0"
  params: []
  notes: "DISPLAYSTRING, read-only."

# =========================================================================
# Modbus-TCP (IP-16R-MT only) - Function codes; big-endian addresses/data.
# Slave/server device, port 502, unit ID 0, one socket at a time.
# Source 10.2. Literal example payloads from source preserved verbatim.
# =========================================================================
- id: modbus_read_coil_status
  label: Modbus Read Coil Status (FC 01)
  kind: query
  command: "0x01 {start_address} {quantity}"
  params:
    - name: start_address
      type: integer
      description: "0x0000 (Relay 1) to 0x000F (Relay 16); relays addressed 0-15"
    - name: quantity
      type: integer
      description: "0x0001 (1 relay) to 0x0010 (16 relays); start+quantity must not exceed 16"
  notes: "Source example PDU: FC=0x01 Start=0x0000 Qty=0x0003. Response packs 1 coil/bit, LSB=lowest relay, 1=ON/0=OFF. Error FC 0x81 (0x01 unsupported, 0x02 bad addr/qty)."

- id: modbus_write_single_coil
  label: Modbus Write Single Coil (FC 05)
  kind: action
  command: "0x05 {output_address} {output_value}"
  params:
    - name: output_address
      type: integer
      description: "0x0000 (Relay 1) to 0x000F (Relay 16)"
    - name: output_value
      type: integer
      description: "0xFF00 = ON, 0x0000 = OFF, 0xFF02 = TOGGLE; all others illegal"
  notes: "Source example: addr 0x0001 (Relay 2) value 0xFF00 (ON). Error FC 0x85 (0x02 bad addr, 0x03 illegal value)."

- id: modbus_write_multiple_coils
  label: Modbus Write Multiple Coils (FC 0F)
  kind: action
  command: "0x0F {start_address} {quantity} {byte_count} {outputs_value}"
  params:
    - name: start_address
      type: integer
      description: "0x0000 (Relay 1) to 0x000F (Relay 16)"
    - name: quantity
      type: integer
      description: "0x0001 to 0x0010; start+quantity must not exceed 16"
    - name: outputs_value
      type: integer
      description: "Bitmap, bit0=Relay1; first byte = relays 8..1, second byte = relays 16..9"
  notes: "Source example 1: relays 1,3 ON / 2 OFF -> ByteCount 0x01 OutputsValue 0x05. Example 2: relay 1 OFF, 2..16 ON -> ByteCount 0x02 OutputsValue 0xFEFF. Error FC 0x8F (0x02 bad addr/qty)."

- id: modbus_read_holding_registers
  label: Modbus Read Holding Registers (FC 03)
  kind: query
  command: "0x03 {start_register} {quantity}"
  params:
    - name: start_register
      type: integer
      description: "Register address (see Variables: Modbus register map)"
    - name: quantity
      type: integer
      description: "Number of registers; start+quantity must fit the block"
  notes: "Source example: start 0x6100 (Week Schedule Start Date) qty 0x0003 -> returns Day=0x000A Month=0x0009 Year=0x07E4. Error FC 0x83 (0x02 bad addr/qty)."

- id: modbus_write_single_register
  label: Modbus Write Single Register (FC 06)
  kind: action
  command: "0x06 {register_address} {register_value}"
  params:
    - name: register_address
      type: integer
      description: "Register address (see Variables); 0x0000-0x000F = generate pulse on relay"
    - name: register_value
      type: integer
      description: "Value per register range; pulse durations in ms x100"
  notes: "Source example: addr 0x0009 (Relay 10) value 0x001E -> 3-second pulse (30 = 3000 ms). Error FC 0x86 (0x02 bad addr, 0x03 bad value)."

- id: modbus_write_multiple_registers
  label: Modbus Write Multiple Registers (FC 10)
  kind: action
  command: "0x10 {start_register} {quantity} {byte_count} {values}"
  params:
    - name: start_register
      type: integer
      description: "Starting register address"
    - name: quantity
      type: integer
      description: "Number of registers; start+quantity must fit the block"
    - name: values
      type: string
      description: "Values packed 2 bytes/register, ascending order"
  notes: "Source example: start 0x6100 qty 0x0003 -> set Week Schedule Start Date 10/09/2020 (Day 0x000A, Month 0x0009, Year 0x07E4). Error FC 0x90 (0x02 bad addr, 0x03 bad value)."
```

## Feedbacks
```yaml
- id: relay_states
  type: bitmap
  values: [0..65535]
  description: "16-bit bitmap; bit 0 = relay 1, bit 15 = relay 16"
  example: http://192.168.1.100/current_state.xml
  response_format: XML or JSON (see source Appendix 2)

- id: login_key
  type: string
  description: "Random key returned when encrypt password is enabled and login required"
  example: "<LoginKey>65156</LoginKey>"

# Modbus-TCP (IP-16R-MT) - coil status response to FC 0x01
- id: modbus_coil_status
  type: bitmap
  values: [0..65535]
  description: "Coil status packed 1 relay/bit; LSB of first byte = lowest addressed relay; 1=ON, 0=OFF"
  notes: "Returned by Read Coil Status (FC 0x01). Bits beyond requested quantity padded with 0."

# SNMP (IP-16R) - read-only product/identity OIDs
- id: snmp_device_identity
  type: object
  description: "Product Name / Firmware Version / Firmware Build Date (read-only OIDs x.6.1.1-3.0)"
  fields: [name, version, build_date]

# SNMP (IP-16R) - auto-reboot status (read-only)
- id: snmp_auto_reboot_status
  type: object
  description: "Auto-reboots number + last auto-reboot time (read-only OIDs x.6.5.15-16.0)"
  fields: [reboots_number, last_reboot_time]
```

## Variables
```yaml
# IP-16R-MT and IP-16R-MQ only - system date/time settable via HTTP params
- id: system_date
  type: string
  format: dd/mm/yyyy
  access: read-write

- id: system_time
  type: string
  format: hh:mm
  access: read-write

# =========================================================================
# Modbus-TCP holding register map (IP-16R-MT only) - source 10.2.1.
# Accessed via FC 03 (read) / 06 / 10 (write). Addresses big-endian.
# =========================================================================
- id: modbus_reg_generate_pulse
  address: 0x0000-0x000F
  access: write-only
  value_range: 1..65535
  description: "Generate pulse on Relay i (addr 0x0000 = Relay 1 ... 0x000F = Relay 16); value = duration ms x100"

- id: modbus_reg_pulse_width
  address: 0x6000-0x600F
  access: read-write
  value_range: 0..65535
  description: "Set pulse width for Relay i (ms x100)"

- id: modbus_reg_ws_start_day
  address: 0x6100
  access: read-write
  value_range: 1..31
  description: "Week Schedule Start Date (Day)"

- id: modbus_reg_ws_start_month
  address: 0x6101
  access: read-write
  value_range: 1..12
  description: "Week Schedule Start Date (Month)"

- id: modbus_reg_ws_start_year
  address: 0x6102
  access: read-write
  value_range: 2000..2099
  description: "Week Schedule Start Date (Year)"

- id: modbus_reg_ws_row_enable
  address: 0x6200-0x621D
  access: read-write
  value_range: 0..1
  description: "Week Schedule Row Enable Flag; 30 rows, row index = low byte of address (0..29)"

- id: modbus_reg_ws_row_outputs
  address: 0x6300-0x631D
  access: read-write
  value_range: 0..65535
  description: "Week Schedule Row Outputs Code; LSB = Relay 1, MSB = Relay 16"

- id: modbus_reg_ws_row_outputs_state
  address: 0x6400-0x641D
  access: read-write
  value_range: 0..1
  description: "Week Schedule Row Outputs State"

- id: modbus_reg_ws_row_hour
  address: 0x6500-0x651D
  access: read-write
  value_range: 0..23
  description: "Week Schedule Row Hour"

- id: modbus_reg_ws_row_minute
  address: 0x6600-0x661D
  access: read-write
  value_range: 0..59
  description: "Week Schedule Row Minute"

- id: modbus_reg_ws_row_weekdays
  address: 0x6700-0x671D
  access: read-write
  value_range: 0..127
  description: "Week Schedule Row WeekDays Code; bit0 = Sunday ... bit6 = Saturday"

- id: modbus_reg_save_outputs
  address: 0x6800
  access: read-write
  value_range: 0..1
  description: "Save Outputs Option"

- id: modbus_reg_sys_day
  address: 0x6900
  access: read-write
  value_range: 1..31
  description: "System Date (Day)"

- id: modbus_reg_sys_month
  address: 0x6901
  access: read-write
  value_range: 1..12
  description: "System Date (Month)"

- id: modbus_reg_sys_year
  address: 0x6902
  access: read-write
  value_range: 2000..2099
  description: "System Date (Year)"

- id: modbus_reg_sys_hour
  address: 0x6903
  access: read-write
  value_range: 0..23
  description: "System Time (Hour)"

- id: modbus_reg_sys_minute
  address: 0x6904
  access: read-write
  value_range: 0..59
  description: "System Time (Minutes)"

- id: modbus_reg_firmware_version
  address: 0x6A00
  access: read-only
  description: "Firmware Version"
```

## Events
```yaml
# IP-16R-MQ only - MQTT Get topics (published by device). Topic prefix SmartDEN_MQTT16R/<MAC>/
- id: relay_state_change
  topic: SmartDEN_MQTT16R/<MAC>/Get/Ri
  payload: "On, Off"
  description: "Relay i (i=1..16) state. Published periodically, on relay state change (per Publish Mode), or on Set/GetStatus=0."

- id: all_relays_state
  topic: SmartDEN_MQTT16R/<MAC>/Get/All
  payload: "Relays state in XML or JSON format"
  description: "Published upon receiving Set/GetStatus with value 1 (XML) or 2 (JSON). See Appendix 2."

- id: mqtt_status
  topic: SmartDEN_MQTT16R/<MAC>/Get/Status
  payload: "Rebooted, Connected, Disconnected"
  description: "Module status related to the MQTT broker connection."

- id: auto_reboot_notification
  topic: SmartDEN_MQTT16R/<MAC>/Get/Auto-reboot
  payload: "RebootsNumber: i, LastReboot: date time"
  description: "Notification when a monitored device connected to one of the relays is rebooted. date=dd/mm/yyyy, time=hh:mm."

- id: mqtt_all_messages
  topic: SmartDEN_MQTT16R/<MAC>/Get/#
  payload: "various"
  description: "Wildcard subscription for all messages published by smartDEN IP-16R-MQ."
```

## Macros
```yaml
# IP-16R-MQ MQTT Set topics (client publishes; device subscribes). Prefix SmartDEN_MQTT16R/<MAC>/
- id: mqtt_set_single_relay
  label: MQTT Set Single Relay
  topic: SmartDEN_MQTT16R/<MAC>/Set/RSi
  payload: "0 (OFF), 1 (ON), 2 (TOGGLE)"

- id: mqtt_set_all_relays
  label: MQTT Set All Relays
  topic: SmartDEN_MQTT16R/<MAC>/Set/All
  payload: "0-65535 bitmap"

- id: mqtt_pulse_on
  label: MQTT Positive Pulse
  topic: SmartDEN_MQTT16R/<MAC>/Set/RNi
  payload: "1-65535 (ms × 100)"

- id: mqtt_pulse_off
  label: MQTT Negative Pulse
  topic: SmartDEN_MQTT16R/<MAC>/Set/RFi
  payload: "1-65535 (ms × 100)"

- id: mqtt_set_date
  label: MQTT Set Date
  topic: SmartDEN_MQTT16R/<MAC>/Set/Date
  payload: "Date in format dd/mm/yyyy"

- id: mqtt_set_time
  label: MQTT Set Time
  topic: SmartDEN_MQTT16R/<MAC>/Set/Time
  payload: "Time in format hh:mm"

- id: mqtt_set_relay_description
  label: MQTT Set Relay Description
  topic: SmartDEN_MQTT16R/<MAC>/Set/RDi
  payload: "Relay description string (max 7 chars)"

- id: mqtt_query_states
  label: MQTT Query Relay States
  topic: SmartDEN_MQTT16R/<MAC>/Set/GetStatus
  payload: "0 = per-relay (Get/Ri), 1 = XML (Get/All), 2 = JSON (Get/All)"
```

## Safety
```yaml
confirmation_required_for:
  - snmp_reboot        # source 10.1.3: reboot only fires when value = ASCII code of first char of Web password
interlocks:
  - "Modbus-TCP (IP-16R-MT): only ONE TCP socket connection supported at a time; concurrent connections rejected (source 8.13)."
  - "HTTP Multiple Access is not allowed when Encrypt Password is enabled; in that mode only one user may be logged in at a time (source 8.5/9)."
  - "When Multiple Access is disabled, XML/JSON access requires login within Session Timeout (default 3 min) (source 9)."
  - "SNMP access must use snmpget/snmpset to exactly one OID per operation, never a group of OIDs (source 10.1)."
# UNRESOLVED: no hardware interlock / power-sequencing warnings stated in source beyond the reboot guard above
```

## Notes
Three hardware variants share Ethernet HTTP control; each variant additionally exposes one integration protocol — SNMP (IP-16R), Modbus-TCP (IP-16R-MT), or MQTT (IP-16R-MQ) — documented above.

**Relay state convention** (source): ON = NO contacts closed, NC open; OFF = NO open, NC closed.

**HTTP/XML/JSON** (all variants) — `http://<ip>/current_state.xml` or `.json` with query params. Default port 80. Session timeout 3 min (configurable). Encrypt Password option toggles two-step login (encrypted pw) vs plain `pw=` in URL. Multiple Access option enables simultaneous clients (mutually exclusive with Encrypt Password). Access can be restricted by client IP/MAC via Access IP/Mask/MAC settings.

**SNMP** (IP-16R only) — source header table lists **SNMPv2**; Section 10.1 body states **SNMPv1** (uses snmpget/snmpset). Discrepancy unresolved. UDP port 161. OID prefix `.1.3.6.1.4.1.42505`. Communities: read-only `public` and `read`; read-write `private` and `write`. Full OID tables for Product / Setup / Control / Week Schedule (30 rows) / Auto-reboot are in source Section 10.1 and enumerated under Actions above.

**Modbus-TCP** (IP-16R-MT only) — TCP port 502. Slave/server device, unit ID 0, big-endian. One socket at a time. Function codes 0x01 (Read Coil), 0x05 (Write Single Coil; values 0xFF00 ON / 0x0000 OFF / 0xFF02 TOGGLE), 0x0F (Write Multiple Coils), 0x03 (Read Holding Registers), 0x06 (Write Single Register), 0x10 (Write Multiple Registers). Relay coil addresses 0x0000–0x000F. Full holding-register map (pulses, pulse width, week schedule, save-outputs, system date/time, firmware version) in source Section 10.2.1 and enumerated under Variables above. Exception responses echo FC | 0x80.

**MQTT** (IP-16R-MQ only) — TCP port 1883. V3.1.1 client; QoS 0; Keep Alive 120 s. Publish modes: Periodically, Edge Triggered, or Edge Triggered + Periodically (Publish Period 5–250 s). Topic prefix `SmartDEN_MQTT16R/<MAC>/` (MAC without colons). Plain topics enumerated under Events (Get/) and Macros (Set/) above. Encrypted topics + password-encryption algorithm available on request from vendor (not in source).

**Defaults** (source 7.1): IP 192.168.1.100, gateway 192.168.1.1, mask 255.255.255.0, DHCP disabled, password `admin`, Save Outputs = No, HTTP Access IP 192.168.1.0 / Mask 0.0.0.0 / MAC 00:00:00:00:00:00, Session Timeout 3 min, EnableAccess Yes, Encrypt Password No, Multiple Access Yes.

<!-- UNRESOLVED: source header table lists "SNMPv2" for IP-16R while Section 10.1 body states "SNMPv1" -->
<!-- UNRESOLVED: Appendix 2 (full XML/JSON current_state reply field formats) referenced but not reproduced in the source excerpt -->
<!-- UNRESOLVED: MIB file itself not included in source (OID table above transcribed from Section 10.1 prose/tables) -->
<!-- UNRESOLVED: encrypted-MQTT topic protocol and XML/JSON password-encryption algorithm are "available upon request" — not in source -->

## Provenance

```yaml
source_domains:
  - denkovi.com
source_urls:
  - http://denkovi.com/Documents/smartDen-IP-16R/Current-Version/UserManual.pdf
retrieved_at: 2026-04-30T04:31:35.492Z
last_checked_at: 2026-07-21T21:53:23.152Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T21:53:23.152Z
matched_actions: 46
action_count: 46
confidence: medium
summary: "All 46 spec actions have verbatim command tokens in source; transport verified; coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source header table lists \"SNMPv2\" for IP-16R while Section 10.1 body states \"SNMPv1\"; discrepancy not resolved"
- "Appendix 2 (full XML/JSON current_state reply formats) is referenced by the source but not reproduced in the excerpt"
- "encrypted-MQTT topic protocol and password-encryption algorithm are \"available upon request\" — not in source"
- "source lists \"Password: admin\" but no explicit username field; username inferred"
- "no hardware interlock / power-sequencing warnings stated in source beyond the reboot guard above"
- "source header table lists \"SNMPv2\" for IP-16R while Section 10.1 body states \"SNMPv1\""
- "Appendix 2 (full XML/JSON current_state reply field formats) referenced but not reproduced in the source excerpt"
- "MIB file itself not included in source (OID table above transcribed from Section 10.1 prose/tables)"
- "encrypted-MQTT topic protocol and XML/JSON password-encryption algorithm are \"available upon request\" — not in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
